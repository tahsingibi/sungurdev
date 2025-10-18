import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.vercel.app",
      },
    ],
  },
  env: {
    STAGE:
      process.env.NODE_ENV === "production"
        ? "production"
        : process.env.NODE_ENV === "test"
        ? "test"
        : "development",
  },
};

const withMDX = createMDX();
export default withMDX(nextConfig);
