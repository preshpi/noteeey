const { pluginoptions } = require("@mightymeld/runtime");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "lh3.googleusercontent.com"],
  },
  experimental: {
    swcPlugins: [
      ["@mightymeld/runtime/swc-plugin-mightymeld", pluginoptions()],
    ],
  },
  reactStrictMode: true,
};

module.exports = withPWA(nextConfig);
