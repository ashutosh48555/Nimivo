import 'dotenv/config';
import bcrypt from 'bcrypt';
import { db } from './db/index.js';
import { users, services, providers } from './db/schema.js';

async function seed() {
  console.log('🌱 Seeding database...');

  // Seed services
  const serviceData = [
    {
      name: 'Deep Cleaning',
      description: 'Professional deep cleaning for your entire home. Includes kitchen, bathrooms, bedrooms, and living areas.',
      category: 'cleaning' as const,
      basePrice: 499,
      estimatedDurationMinutes: 120,
    },
    {
      name: 'Plumbing',
      description: 'Expert plumbing services for leaks, clogs, pipe repairs, and installations.',
      category: 'plumbing' as const,
      basePrice: 349,
      estimatedDurationMinutes: 60,
    },
    {
      name: 'Electrician',
      description: 'Licensed electricians for wiring, repairs, installations, and safety inspections.',
      category: 'electrical' as const,
      basePrice: 399,
      estimatedDurationMinutes: 90,
    },
    {
      name: 'Carpentry',
      description: 'Skilled carpenters for furniture repair, woodwork, installations, and custom builds.',
      category: 'carpentry' as const,
      basePrice: 599,
      estimatedDurationMinutes: 150,
    },
    {
      name: 'Painting',
      description: 'Professional interior and exterior painting with premium paints and clean finishes.',
      category: 'painting' as const,
      basePrice: 799,
      estimatedDurationMinutes: 180,
    },
    {
      name: 'Salon at Home',
      description: 'Professional beauty and grooming services at your doorstep. Haircuts, facials, and more.',
      category: 'salon' as const,
      basePrice: 449,
      estimatedDurationMinutes: 90,
    },
  ];

  await db.insert(services).values(serviceData).onConflictDoNothing();
  console.log('✅ Services seeded');

  // Seed demo users
  const passwordHash = await bcrypt.hash('demo123', 10);

  const demoUsers = [
    { fullName: 'Demo Customer', email: 'customer@demo.com', phone: '9876543210', passwordHash, role: 'customer' as const },
    { fullName: 'Demo Provider', email: 'provider@demo.com', phone: '9876543211', passwordHash, role: 'provider' as const },
    { fullName: 'Demo Admin', email: 'admin@demo.com', phone: '9876543212', passwordHash, role: 'admin' as const },
  ];

  for (const u of demoUsers) {
    const [inserted] = await db
      .insert(users)
      .values(u)
      .onConflictDoNothing()
      .returning();

    if (inserted && u.role === 'provider') {
      await db.insert(providers).values({
        userId: inserted.id,
        serviceCategory: 'plumbing',
        isVerified: true,
        isAvailable: true,
        averageRating: '4.8',
        completedJobs: 42,
      }).onConflictDoNothing();
    }
  }

  console.log('✅ Demo users seeded');
  console.log('🌱 Seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
