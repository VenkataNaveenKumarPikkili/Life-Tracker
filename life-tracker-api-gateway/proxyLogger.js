export function logProxy(req, target) {
  const { method, originalUrl } = req;
  const auth = req.headers['authorization'] ? 'with-auth' : 'no-auth';
  console.log(`[GATEWAY] ${method} ${originalUrl} -> ${target} (${auth})`);
}
