
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { Specialist } from '@/entities/Specialist';

export async function GET() {
  try {
    const db = await getDb();
    const result = await db.query("SELECT NOW()");
    
    const count = await db.getRepository(Specialist).count();
    
    return NextResponse.json({ 
      status: 'success', 
      time: result[0].now,
      tables_exist: true,
      specialists_count: count
    });
  } catch (error: any) {
    console.error('Database connection error:', error);
    return NextResponse.json({ 
      status: 'error', 
      message: error.message,
      stack: error.stack 
    }, { status: 500 });
  }
}
