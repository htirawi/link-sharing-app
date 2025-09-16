import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/utils/session';

export default async function Home() {
    const authUser = await getCurrentUser();

    // If user is logged in, redirect to their profile
    if (authUser) {
        redirect(`/${authUser.username}`);
    }

    // If user is not logged in, redirect to login page
    redirect('/auth/signin');
}
