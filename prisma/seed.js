const { PrismaClient } = require('@prisma/client')
const { faker } = require('@faker-js/faker')

const prisma = new PrismaClient()

async function main() {
  console.log('Cleaning database...')
  
  const steellgoldUser = await prisma.user.upsert({
    where: { username: 'steellgold' },
    update: {},
    create: {
      email: 'steellgold@example.com',
      username: 'steellgold',
      name: 'Steellgold',
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      isVerified: true,
      verifiedStatus: 'VERIFIED',
      verifiedType: 'STAFF',
    },
  })

  await prisma.user.deleteMany({ where: { NOT: { id: steellgoldUser.id } } })

  console.log('Database cleaned, seeding users...')

  const verifiedTypes = ['PERSONALITY', 'ORGANIZATION', 'STAFF']
  const verifiedStatuses = ['PENDING', 'VERIFIED', 'REJECTED']
  const users = []

  for (let i = 0; i < 200; i++) {
    const shouldFollowSteellgold = Math.random() < 0.5
    const shouldSteellgoldFollow = Math.random() < 0.5
    const isVerified = Math.random() < 0.3
    
    const user = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      username: faker.internet.username(),
      emailVerified: Math.random() < 0.8,
      image: faker.image.avatar(),
      bio: faker.lorem.paragraph(),
      banner: faker.image.url(),
      createdAt: faker.date.past(),
      updatedAt: new Date(),
      isVerified,
      verifiedAt: isVerified ? faker.date.past() : null,
      verifiedStatus: isVerified ? verifiedStatuses[Math.floor(Math.random() * verifiedStatuses.length)] : null,
      verifiedType: isVerified ? verifiedTypes[Math.floor(Math.random() * verifiedTypes.length)] : null,
      isLocked: Math.random() < 0.1,
      following: shouldFollowSteellgold ? {
        connect: { id: steellgoldUser.id }
      } : undefined,
      followers: shouldSteellgoldFollow ? {
        connect: { id: steellgoldUser.id }
      } : undefined
    }
    
    users.push(user)
  }

  let created = 0
  for (const user of users) {
    try {
      await prisma.user.create({
        data: user
      })
      created++
      if (created % 10 === 0) {
        console.log(`${created} users created...`)
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  const finalCount = await prisma.user.count()
  console.log(`Seeding ended. ${finalCount} users created.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })