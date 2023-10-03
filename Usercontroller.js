// userController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function registerUser(username, password, email, role) {
  try {
    // ตรวจสอบว่ามีผู้ใช้ที่มีชื่อผู้ใช้หรืออีเมลนี้อยู่แล้วหรือไม่
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      throw new Error("ชื่อผู้ใช้หรืออีเมลนี้ถูกใช้แล้ว");
    }

    // สร้างผู้ใช้ใหม่
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        email,
        role,
      },
    });

    return newUser;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = { registerUser };
