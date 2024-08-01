import { NextResponse } from 'next/server';
import connect from '@utils/db';
import File from '@models/File';

export async function POST(req) {
  try {
    const body = await req.json();
    console.log('Request body:', body);

    const { emailUser, nameFile, interpretation } = body;

    await connect();  // Ensure database connection

    const newFile = new File({
      emailUser,
      nameFile,
      interpretation,
    });

    await newFile.save();

    return NextResponse.json({ message: "File saved successfully" }, { status: 201 });
  } catch (error) {
    console.error('Failed to save file:', error);
    return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
  }
}
