// Create an admin or change an admin's password.
// Run on the server from the backend folder:
//   node scripts/set-admin-password.js admin@example.com 'NewPassword' ['Name']
// Without a password argument a strong random one is generated and printed once.
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { PrismaClient } = require('@prisma/client');

async function main() {
  const [email, passwordArg, name] = process.argv.slice(2);
  if (!email) {
    console.error("Usage: node scripts/set-admin-password.js <email> [password] [name]");
    process.exit(1);
  }
  const password = passwordArg || crypto.randomBytes(12).toString('base64url');
  if (password.length < 10) {
    console.error('Password must be at least 10 characters');
    process.exit(1);
  }

  const prisma = new PrismaClient();
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.adminUser.upsert({
      where: { email },
      update: { password: hash, ...(name ? { name } : {}) },
      create: { email, password: hash, name: name || 'Admin', role: 'admin' },
    });
    console.log(`OK: admin #${user.id} ${user.email}`);
    if (!passwordArg) console.log(`Generated password: ${password}`);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
