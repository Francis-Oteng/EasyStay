import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./modules/auth/auth.routes.js";
import propertyRoutes from "./modules/property/property.routes.js";
import bookingRoutes from "./modules/booking/booking.routes.js";
import wishlistRoutes from "./modules/wishlist/wishlist.routes.js";
import reviewRoutes from "./modules/review/review.routes.js";
import notificationRoutes from "./modules/notification/notification.routes.js";
import uploadRoutes from "./modules/upload/upload.routes.js";
import paymentRoutes from "./modules/payment/payment.routes.js";
import usersRoutes from "./modules/users/users.routes.js";
import availabilityRoutes from "./modules/availability/availability.routes.js";
import webhooksRoutes from "./modules/webhooks/webhooks.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import { startJobScheduler } from "./modules/jobs/jobs.js";
import { errorHandler } from "./middleware/errorHandler.js";
import prisma from "./config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || "5000", 10);

app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/webhooks", webhooksRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "StayEasy API is running", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

const start = async () => {
  try {
    await prisma.$connect();
    console.log("[DB] Connected to database");

    if (process.env.NODE_ENV !== "test") {
      startJobScheduler();
    }
  } catch (err) {
    console.error("[DB] Connection failed:", err);
  }
};

start();

const server = app.listen(PORT, () => {
  console.log(`StayEasy API server running on port ${PORT}`);
});

const gracefulShutdown = async () => {
  console.log("Shutting down gracefully...");
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });

  setTimeout(() => {
    console.error("Forced shutdown after timeout");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

export default app;