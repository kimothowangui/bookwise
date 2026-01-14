import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  // Get credentials from command line or environment
  const email = process.env.ADMIN_EMAIL || process.argv[2];
  const password = process.env.ADMIN_PASSWORD || process.argv[3];
  const name = process.env.ADMIN_NAME || process.argv[4] || 'Admin';

  if (!email || !password) {
    console.error('❌ Error: Email and password are required!');
    console.log('\nUsage:');
    console.log('  npx tsx scripts/create-admin.ts <email> <password> [name]');
    console.log('\nOr set environment variables:');
    console.log('  ADMIN_EMAIL=your@email.com ADMIN_PASSWORD=yourpass ADMIN_NAME=YourName npx tsx scripts/create-admin.ts');
    process.exit(1);
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      // Update existing user to admin
      const user = await prisma.user.update({
        where: { email },
        data: {
          isAdmin: true,
          password: hashedPassword,
          name: name,
        }
      });
      console.log('✅ Existing user updated to admin!');
      console.log(`📧 Email: ${user.email}`);
      console.log(`👤 Name: ${user.name}`);
      console.log(`🔑 Admin: ${user.isAdmin}`);
    } else {
      // Create new admin user
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          isAdmin: true,
        }
      });
      console.log('✅ Admin account created successfully!');
      console.log(`📧 Email: ${user.email}`);
      console.log(`👤 Name: ${user.name}`);
      console.log(`🔑 Admin: ${user.isAdmin}`);
    }

    console.log('\n🎉 You can now login with your credentials!');
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
