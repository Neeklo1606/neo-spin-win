-- Migration: Add universal product fields
-- This migration adds new fields while keeping old ones for backward compatibility

-- Add new columns (all nullable for backward compatibility)
ALTER TABLE products ADD COLUMN price INTEGER;
ALTER TABLE products ADD COLUMN price_type TEXT DEFAULT 'fixed';
ALTER TABLE products ADD COLUMN category TEXT;
ALTER TABLE products ADD COLUMN product_type TEXT DEFAULT 'cylinder';

-- Make old price fields nullable (they were required before)
-- Note: SQLite doesn't support ALTER COLUMN, so we need to recreate the table
-- But for safety, we'll just add defaults and make them work with existing data

-- Update existing products to have productType = 'cylinder'
UPDATE products SET product_type = 'cylinder' WHERE product_type IS NULL;

-- Update existing products to have priceType = 'fixed'
UPDATE products SET price_type = 'fixed' WHERE price_type IS NULL;
