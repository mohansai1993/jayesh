//=========== this is new config file ==============
const { accessSecret } = require("./access-secrets.js");
const { config } = require("dotenv");
const withMDX = require("@next/mdx")({
  extension: /\.(md|mdx)?$/,
});

config();

// Load secrets from secret manager to env variables
const loadSecrets = async () => {
  const secretsPayload = await accessSecret("dokodemo_nextjs_settings");
  const secrets = secretsPayload.split("\n");

  for (const secret of secrets) {
    const [key, value] = secret.split("=");
    process.env[key] = value;
  }
};

// Call the function to load secrets
loadSecrets();

/** @type {import('next').NextConfig} */
module.exports = withMDX({
  pageExtensions: ["js", "jsx", "md", "mdx", "tsx", "ts"],
  reactStrictMode: false,
  redirects() {
    return [
      {
        source: "/main",
        destination: "/set-up",
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.jsx$/,
      include: /node_modules/,
      use: ["react-jsx"],
    });

    return config;
  },
});
