import connect from '@utils/db';
import File from '@models/File';
import { getServerSession } from "next-auth";

export async function GET(req) {
  const session = await getServerSession(req);
  
  if (!session) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  try {
    await connect();
    const files = await File.find({ emailUser: session.user.email }).sort({ createdAt: -1 });
    return new Response(JSON.stringify(files), { status: 200 });
  } catch (error) {
    console.error('Failed to fetch file history:', error);
    return new Response(JSON.stringify({ message: 'Failed to fetch file history' }), { status: 500 });
  }
}
