/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGO_URL: 'mongodb+srv://dhan36677:bOemuQMym9lpATS3@cluster0.qr2tmi1.mongodb.net',
        NEXTAUTH_SECRET: 'ldfjalsdjflasjkdflkajdslf',
        JWT_SECRET: 'SECRET',
    }
};

// /?retryWrites=true&w=majority&appName=Cluster0
export default nextConfig;
