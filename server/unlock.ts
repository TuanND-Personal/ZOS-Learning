import { createRemoteJWKSet, jwtVerify } from 'jose';

export interface UnlockEnv {
  googleClientId?: string;
  allowedEmail?: string;
  contentKey?: string;
}

export class UnlockError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

const googleKeys = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));

/**
 * Verifies a Google Identity Services ID token and returns the content key of the protected pages
 * when it belongs to the allowed account. The key never ships in the static bundle.
 */
export async function unlock(credential: unknown, env: UnlockEnv): Promise<string> {
  if (!env.googleClientId || !env.allowedEmail || !env.contentKey) {
    throw new UnlockError('Server is missing GOOGLE_CLIENT_ID / ALLOWED_EMAIL / ZOS_CONTENT_KEY', 500);
  }
  if (typeof credential !== 'string' || credential.length < 20) {
    throw new UnlockError('Missing Google credential', 400);
  }
  let payload;
  try {
    ({ payload } = await jwtVerify(credential, googleKeys, {
      issuer: ['https://accounts.google.com', 'accounts.google.com'],
      audience: env.googleClientId,
    }));
  } catch {
    throw new UnlockError('Invalid Google credential', 401);
  }
  const email = String(payload.email ?? '').toLowerCase();
  if (payload.email_verified !== true || email !== env.allowedEmail.toLowerCase()) {
    throw new UnlockError('This Google account is not allowed', 403);
  }
  return env.contentKey;
}
