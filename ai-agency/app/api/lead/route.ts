// app/api/lead/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const LeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  project: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = LeadSchema.parse(body);

    const lead = await prisma.lead.create({
      data: parsed,
    });

    // Trigger n8n workflow for CRM automation
    if (process.env.N8N_WEBHOOK_URL) {
      fetch(process.env.N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      }).catch(console.error); 
    }

    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid payload." }, { status: 400 });
  }
}