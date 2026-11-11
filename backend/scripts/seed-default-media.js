/**
 * Backfill CMS hero image and product imageUrl when empty or pointing at dev-only paths.
 * Static files must exist in frontend public/: logobalonc.png, cylinder-5l.png, cylinder-10l.png
 */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const DEFAULT_HERO_IMAGE = '/logobalonc.png';
const DEFAULT_CYLINDER_IMAGE = '/cylinder-5l.png';
const DEFAULT_ACCESSORY_IMAGE = '/assets/accessory-balloons.png';

function isBrokenImageUrl(url) {
  if (!url || !String(url).trim()) return true;
  const u = String(url);
  return u.startsWith('/src/') || u.includes('localhost') || u.startsWith('/uploads/');
}

async function main() {
  const hero = await prisma.contentBlock.findUnique({ where: { key: 'hero_image' } });
  if (!hero) {
    await prisma.contentBlock.create({
      data: {
        key: 'hero_image',
        value: DEFAULT_HERO_IMAGE,
        type: 'image',
        page: 'home',
        block: 'hero',
        label: 'Изображение',
      },
    });
    console.log('hero_image: created', DEFAULT_HERO_IMAGE);
  } else if (!hero.value || !hero.value.trim()) {
    await prisma.contentBlock.update({
      where: { key: 'hero_image' },
      data: { value: DEFAULT_HERO_IMAGE },
    });
    console.log('hero_image: updated', DEFAULT_HERO_IMAGE);
  } else {
    console.log('hero_image: ok', hero.value);
  }

  const products = await prisma.product.findMany();
  for (const product of products) {
    if (!isBrokenImageUrl(product.imageUrl)) {
      console.log(`product #${product.id}: ok`, product.imageUrl);
      continue;
    }
    const fallback =
      product.productType === 'accessory' || product.category === 'accessories'
        ? DEFAULT_ACCESSORY_IMAGE
        : product.price10l != null
          ? '/cylinder-10l.png'
          : DEFAULT_CYLINDER_IMAGE;
    await prisma.product.update({
      where: { id: product.id },
      data: { imageUrl: fallback },
    });
    console.log(`product #${product.id}: fixed → ${fallback}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
