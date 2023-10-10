const { accessSecret } = require('./access-secrets.js');
const { config } = require('dotenv');

config();

// Load secrets from secret manager to env variables
const loadSecrets = async () => {
  const secretsPayload = await accessSecret("dokodemo_nextjs_settings");
  const secrets = secretsPayload.split('\n'); // Split the payload into lines

  for (const secret of secrets) {
    const [key, value] = secret.split('='); // Split each line into a key and a value
    process.env[key] = value;
  }
};

// Call the function to load secrets
loadSecrets();

module.exports = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: false,
  compiler: {
    // removeConsole: process.env.NODE_ENV === "production",
  },
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/main",
        destination: "/set-up",
        permanent: true,
      },
    ];
  },
};