const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Setting up demo data...');

  try {
    // Create demo user
    const demoUser = await prisma.user.upsert({
      where: { email: 'demo@example.com' },
      update: {},
      create: {
        email: 'demo@example.com',
        password: await bcrypt.hash('password123', 10),
        name: 'Demo User',
      },
    });

    console.log('✅ Demo user created:', demoUser.email);

    // Create demo folders
    const folder1 = await prisma.folder.create({
      data: {
        name: 'Work Notes',
        userId: demoUser.id,
      },
    });

    const folder2 = await prisma.folder.create({
      data: {
        name: 'Personal',
        userId: demoUser.id,
      },
    });

    console.log('✅ Demo folders created');

    // Create demo items
    const item1 = await prisma.item.create({
      data: {
        title: 'Project Kickoff Meeting',
        content: 'Discussed timeline, requirements, and team structure. Key decision: using Next.js for frontend.',
        userId: demoUser.id,
        folderId: folder1.id,
        tags: ['work', 'meeting'],
      },
    });

    const item2 = await prisma.item.create({
      data: {
        title: 'Learning Goals',
        content: 'Focus on: TypeScript, System Design, and Cloud Architecture. Target: Complete by Q2.',
        userId: demoUser.id,
        folderId: folder2.id,
        tags: ['learning', 'goals'],
      },
    });

    console.log('✅ Demo items created');

    console.log('\n✨ Setup complete! Demo credentials:');
    console.log('📧 Email: demo@example.com');
    console.log('🔑 Password: password123');
  } catch (error) {
    console.error('❌ Error setting up demo data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
