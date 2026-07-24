import prisma from "./config/database.js";
import bcrypt from "bcryptjs";

async function main() {
  console.log("[Seed] Starting...");

  const adminEmail = "admin@stayeasy.com";
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("admin123", 12);
    await prisma.user.create({
      data: {
        fullName: "Admin User",
        email: adminEmail,
        phoneNumber: "+233504855702",
        password: hashedPassword,
        role: "ADMIN",
      },
    });
    console.log("[Seed] Admin user created (admin@stayeasy.com / admin123)");
  } else {
    console.log("[Seed] Admin user already exists");
  }

  const sampleOwnerEmail = "owner@stayeasy.com";
  const existingOwner = await prisma.user.findUnique({ where: { email: sampleOwnerEmail } });

  if (!existingOwner) {
    const hashedPassword = await bcrypt.hash("owner123", 12);
    await prisma.user.create({
      data: {
        fullName: "Sample Owner",
        email: sampleOwnerEmail,
        phoneNumber: "+233509648282",
        password: hashedPassword,
        role: "OWNER",
      },
    });
    console.log("[Seed] Sample owner created (owner@stayeasy.com / owner123)");
  }

  const sampleCustomerEmail = "customer@stayeasy.com";
  const existingCustomer = await prisma.user.findUnique({ where: { email: sampleCustomerEmail } });

  if (!existingCustomer) {
    const hashedPassword = await bcrypt.hash("customer123", 12);
    await prisma.user.create({
      data: {
        fullName: "Sample Customer",
        email: sampleCustomerEmail,
        phoneNumber: "+233504855703",
        password: hashedPassword,
        role: "CUSTOMER",
      },
    });
    console.log("[Seed] Sample customer created (customer@stayeasy.com / customer123)");
  }

  console.log("[Seed] Complete!");
}

main()
  .catch((e) => {
    console.error("[Seed] Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
