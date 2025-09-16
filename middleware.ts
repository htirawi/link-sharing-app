import { withAuth } from 'next-auth/middleware';

export default withAuth(
    function middleware(req) {
        // Add any additional middleware logic here if needed
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                // Allow access to public pages
                const publicPaths = ['/', '/auth/signin', '/auth/signup'];
                if (publicPaths.includes(req.nextUrl.pathname)) {
                    return true;
                }

                // Allow access to user profile pages (dynamic routes)
                if (req.nextUrl.pathname.match(/^\/[^\/]+$/)) {
                    return true;
                }

                // For protected routes, require authentication
                return !!token;
            },
        },
    },
);

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
