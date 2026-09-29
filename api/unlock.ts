import type { VercelRequest, VercelResponse } from '@vercel/node';
import { unlock, UnlockError } from '../server/unlock';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'POST only' });
    return;
  }
  try {
    const key = await unlock(req.body?.credential, {
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      allowedEmail: process.env.ALLOWED_EMAIL,
      contentKey: process.env.ZOS_CONTENT_KEY,
    });
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({ key });
  } catch (e) {
    res.status(e instanceof UnlockError ? e.status : 500).json({ error: e instanceof Error ? e.message : 'unlock failed' });
  }
}
