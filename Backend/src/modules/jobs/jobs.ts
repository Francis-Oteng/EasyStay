import prisma from "../../config/database.js";

export const cancelExpiredPendingBookings = async (): Promise<{ cancelled: number }> => {
  const twoDaysAgo = new Date();
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

  const result = await prisma.booking.updateMany({
    where: {
      status: "PENDING",
      createdAt: { lt: twoDaysAgo },
    },
    data: { status: "CANCELLED" },
  });

  return { cancelled: result.count };
};

export const completePastBookings = async (): Promise<{ completed: number }> => {
  const now = new Date();

  const result = await prisma.booking.updateMany({
    where: {
      status: "CONFIRMED",
      checkOut: { lt: now },
    },
    data: { status: "COMPLETED" },
  });

  return { completed: result.count };
};

export const cleanupOldNotifications = async (): Promise<{ deleted: number }> => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const result = await prisma.notification.deleteMany({
    where: {
      createdAt: { lt: thirtyDaysAgo },
      isRead: true,
    },
  });

  return { deleted: result.count };
};

export const generateDailyRevenueReport = async (): Promise<{
  date: string;
  totalRevenue: number;
  completedBookings: number;
  newUsers: number;
}> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [revenue, completedBookings, newUsers] = await Promise.all([
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "COMPLETED", paidAt: { gte: today, lt: tomorrow } },
    }),
    prisma.booking.count({
      where: { status: "COMPLETED", updatedAt: { gte: today, lt: tomorrow } },
    }),
    prisma.user.count({
      where: { createdAt: { gte: today, lt: tomorrow } },
    }),
  ]);

  return {
    date: today.toISOString().split("T")[0],
    totalRevenue: revenue._sum.amount || 0,
    completedBookings,
    newUsers,
  };
};

export const logJobResult = async (job: string, status: "COMPLETED" | "FAILED", message: string): Promise<void> => {
  await prisma.jobLog.create({
    data: { job, status, message, completedAt: status === "COMPLETED" ? new Date() : undefined },
  });
};

export const runAllJobs = async (): Promise<void> => {
  console.log("[Jobs] Starting scheduled job run...");

  try {
    const expired = await cancelExpiredPendingBookings();
    console.log(`[Jobs] Cancelled ${expired.cancelled} expired pending bookings`);
    await logJobResult("cancelExpiredPendingBookings", "COMPLETED", `Cancelled ${expired.cancelled} bookings`);
  } catch (err) {
    console.error("[Jobs] cancelExpiredPendingBookings failed:", err);
    await logJobResult("cancelExpiredPendingBookings", "FAILED", (err as Error).message);
  }

  try {
    const completed = await completePastBookings();
    console.log(`[Jobs] Completed ${completed.completed} past bookings`);
    await logJobResult("completePastBookings", "COMPLETED", `Completed ${completed.completed} bookings`);
  } catch (err) {
    console.error("[Jobs] completePastBookings failed:", err);
    await logJobResult("completePastBookings", "FAILED", (err as Error).message);
  }

  try {
    const cleaned = await cleanupOldNotifications();
    console.log(`[Jobs] Cleaned ${cleaned.deleted} old notifications`);
    await logJobResult("cleanupOldNotifications", "COMPLETED", `Deleted ${cleaned.deleted} notifications`);
  } catch (err) {
    console.error("[Jobs] cleanupOldNotifications failed:", err);
    await logJobResult("cleanupOldNotifications", "FAILED", (err as Error).message);
  }

  try {
    const report = await generateDailyRevenueReport();
    console.log(`[Jobs] Daily report: $${report.totalRevenue} revenue, ${report.completedBookings} bookings, ${report.newUsers} users`);
    await logJobResult("generateDailyRevenueReport", "COMPLETED", JSON.stringify(report));
  } catch (err) {
    console.error("[Jobs] generateDailyRevenueReport failed:", err);
    await logJobResult("generateDailyRevenueReport", "FAILED", (err as Error).message);
  }

  console.log("[Jobs] Scheduled job run complete");
};

export const startJobScheduler = (intervalMs = 3600000): void => {
  console.log(`[Jobs] Scheduler started (interval: ${intervalMs}ms)`);

  runAllJobs();

  setInterval(() => {
    runAllJobs();
  }, intervalMs);
};
