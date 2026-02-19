const getVercelHostname = () => {
  if (process.env.VERCEL_ENV === "production") {
    return (
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      process.env.VERCEL_URL ||
      process.env.VERCEL_BRANCH_URL
    );
  }

  return process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL;
};

export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : (() => {
        const hostname = getVercelHostname();
        return hostname ? `https://${hostname}` : "";
      })();
