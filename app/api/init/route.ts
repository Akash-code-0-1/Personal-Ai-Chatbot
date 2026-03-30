import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST() {
  try {
    console.log('[v0] Running database initialization...');
    
    // Create tables via Prisma (Prisma Client generates SQL based on schema)
    // First, let's verify the database is accessible by trying a simple query
    const result = await prisma.$executeRaw`SELECT 1`;
    console.log('[v0] Database connection successful');

    // Create demo user if it doesn't exist
    const demoUser = await prisma.user.upsert({
      where: { id: 'demo-user-1' },
      update: {},
      create: {
        id: 'demo-user-1',
        email: 'demo@chatbot.local',
        password: 'demo',
        name: 'Demo User',
      },
    });

    console.log('[v0] Demo user initialized:', demoUser.id);

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      userId: demoUser.id,
    });
  } catch (error: any) {
    console.error('[v0] Database initialization error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Database initialization failed',
        error: error.message,
        hint: 'Make sure DATABASE_URL is set correctly and the database exists',
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
