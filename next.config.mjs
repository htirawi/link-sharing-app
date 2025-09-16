/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '7kiwlluwypvx1sql.public.blob.vercel-storage.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'dcipbfgxhnqb9o2v.public.blob.vercel-storage.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
