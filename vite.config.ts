import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { unlock, UnlockError, type UnlockEnv } from './server/unlock';

// Serves POST /api/unlock during `npm run dev`, the same handler Vercel runs from api/unlock.ts.
function devUnlockApi(env: UnlockEnv): Plugin {
  return {
    name: 'dev-unlock-api',
    configureServer(server) {
      server.middlewares.use('/api/unlock', (req, res) => {
        let body = '';
        req.on('data', (chunk) => (body += chunk));
        req.on('end', async () => {
          res.setHeader('Content-Type', 'application/json');
          try {
            const { credential } = JSON.parse(body || '{}');
            const key = await unlock(credential, env);
            res.end(JSON.stringify({ key }));
          } catch (e) {
            res.statusCode = e instanceof UnlockError ? e.status : 500;
            res.end(JSON.stringify({ error: e instanceof Error ? e.message : 'unlock failed' }));
          }
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      devUnlockApi({
        googleClientId: env.GOOGLE_CLIENT_ID || env.VITE_GOOGLE_CLIENT_ID,
        allowedEmail: env.ALLOWED_EMAIL,
        contentKey: env.ZOS_CONTENT_KEY,
      }),
    ],
    server: { port: 5173, strictPort: true },
  };
});
