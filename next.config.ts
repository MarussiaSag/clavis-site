import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  // Uploads are already resized/compressed in admin. Skipping the Next optimizer
  // avoids broken images when sharp/libvips fails on the VPS.
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      // Admin project form uploads cover + gallery + room photos in one request.
      bodySizeLimit: "100mb",
      // Host/IP behind nginx — without this, actions can fail with
      // "An unexpected response was received from the server."
      allowedOrigins: [
        "localhost:3000",
        "127.0.0.1:3000",
        "80.78.241.228",
      ],
    },
    // Proxy/middleware path also needs a matching ceiling for large multipart posts.
    proxyClientMaxBodySize: "100mb",
  },
};

export default nextConfig;
