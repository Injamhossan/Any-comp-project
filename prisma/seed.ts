
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding ...')

  // Create a default user
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      role: 'USER',
      description: 'A demo user for testing',
    },
  })

  // Create a specialist
  const specialist = await prisma.specialist.upsert({
    where: { slug: 'demo-service' },
    update: {},
    create: {
      title: 'Expert Web Development',
      slug: 'demo-service',
      description: 'Professional web development services using Next.js and Prisma.',
      base_price: 500,
      platform_fee: 50,
      final_price: 550,
      duration_days: 7,
      is_verified: true,
      verification_status: 'VERIFIED',
      secretary_name: 'Jane Doe', 
      secretary_company: 'Tech Solutions Ltd',
      secretary_email: 'secretary@techsolutions.com',
    },
  })

  console.log({ user, specialist })
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
