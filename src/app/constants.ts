export const APP_NAME = "Hélice B Automation";
export const APP_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://tracker.vercel.app"
    : "http://localhost:3000";
