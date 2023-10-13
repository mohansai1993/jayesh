const { config } = require('dotenv');
const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');

config();
const client = new SecretManagerServiceClient();

async function accessSecret(secretName) {
    const [version] = await client.accessSecretVersion({
        name: `projects/adzviser-doraemon/secrets/${secretName}/versions/latest`,
    });

    const payload = version.payload.data.toString('utf8');
    return payload;
}

module.exports = {
    accessSecret, // Export the accessSecret function
};
