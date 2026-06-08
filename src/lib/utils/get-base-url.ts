export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  }

  if (process.env.production) {
    return `https://electro-pi-task-gamma.vercel.app`;
  }

  return "http://localhost:3000";
}
