import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  experimental: {
    serverActions: {
      // Admin project form uploads cover + gallery + room photos in one request.
      bodySizeLimit: "100mb",
    },
    // Proxy/middleware path also needs a matching ceiling for large multipart posts.
    proxyClientMaxBodySize: "100mb",
  },
};

export default nextConfig;
