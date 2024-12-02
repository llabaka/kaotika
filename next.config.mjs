/** @type {import('next').NextConfig} */
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const json = require("./package.json");

const nextConfig = {
    experimental: {
        esmExternals: "loose", // <-- add this
        serverComponentsExternalPackages: ["mongoose"] // <-- and this
      },
    webpack: (config) => {
    config.experiments = {
        topLevelAwait: true
    };
    return config;
    },
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    publicRuntimeConfig: {
        version: json.version,
    },
};

export default nextConfig;
