const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Starting migration: Add universal product fields...');

  try {
    // SQLite doesn't support ALTER TABLE ADD COLUMN with DEFAULT in one statement
    // We need to add columns one by one
    
    // Note: This is a manual migration script
    // In production, we should use Prisma migrations, but for SQLite we'll do it manually
    
    console.log('✅ Migration script ready');
    console.log('⚠️  Please run SQL commands manually:');
    console.log('');
    console.log('ALTER TABLE products ADD COLUMN price INTEGER;');
    console.log("ALTER TABLE products ADD COLUMN price_type TEXT DEFAULT 'fixed';");
    console.log('ALTER TABLE products ADD COLUMN category TEXT;');
    console.log("ALTER TABLE products ADD COLUMN product_type TEXT DEFAULT 'cylinder';");
    console.log("UPDATE products SET product_type = 'cylinder' WHERE product_type IS NULL;");
    console.log("UPDATE products SET price_type = 'fixed' WHERE price_type IS NULL;");
    console.log('');
    console.log('Then run: npx prisma generate');
  } catch (error) {
    console.error('❌ Migration error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
