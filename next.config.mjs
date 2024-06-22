/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGO_URL: 'mongodb+srv://dhan36677:bOemuQMym9lpATS3@cluster0.qr2tmi1.mongodb.net',
        NEXTAUTH_SECRET: 'ldfjalsdjflasjkdflkajdslf',
        JWT_SECRET: 'SECRET',
        URL_API: 'https://mahalaxmi-traders.vercel.app/'
        // URL_API: 'http://localhost:3001'
    }
};

// /?retryWrites=true&w=majority&appName=Cluster0
export default nextConfig;
