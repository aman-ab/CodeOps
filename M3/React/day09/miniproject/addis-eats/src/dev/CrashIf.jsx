// Throw deliberately, to SEE a boundary's fallback — "far better than discovering it in front of a customer".
// Development only: in a production build (npm run build / preview) it never throws.
//   /menu?crash=dish   one dish throws          -> only that region fails
//   /menu?crash=menu   the menu throws          -> cart panel and header keep working
//   /menu?crash=cart   the cart panel throws    -> menu and header keep working
//   /?crash=app        the layout throws        -> the last-resort boundary
function CrashIf({ when, label }) {
  if (when && import.meta.env.DEV) {
    throw new Error(`Deliberate crash (${label}) — development test`);
  }
  return null;
}

export default CrashIf;
