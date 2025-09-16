'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormik } from 'formik';
import { signIn, useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { Lock, User } from 'lucide-react';

import { signinDto, SigninDtoType } from './sign.dto';
import { Input } from '@/components/input';
import Button from '@/components/button';
import { formikPropsGenerator } from '@/utils/formik-props-generator';

const initialValues: SigninDtoType = {
    username: '',
    password: '',
};

const Page = () => {
    const router = useRouter();
    const { data: session, update } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues,
        validationSchema: signinDto,
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                const res = await signIn('credentials', {
                    username: values.username,
                    password: values.password,
                    redirect: false,
                });

                if (!res?.ok) {
                    toast.error('Invalid credentials');
                    return;
                }

                await update();
            } catch (err) {
                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : 'An unexpected error occurred';
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        },
    });

    useEffect(() => {
        if (!session?.user) return;
        router.replace(`/${session?.user.username}`);
    }, [session?.user]);

    return (
        <div className="">
            <h1 className="text-3xl font-semibold mb-2">Login</h1>
            <p>Welcome back! Let&apos;s get you started sharing your links!</p>

            <form onSubmit={formik.handleSubmit} className="mt-10 space-y-4">
                <Input
                    label="Username or Email"
                    id="username"
                    type="text"
                    placeholder="Your Username or Email"
                    prefixIcon={<User size={16} />}
                    {...formikPropsGenerator(formik, 'username')}
                />
                <Input
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Your Password"
                    prefixIcon={<Lock size={16} />}
                    {...formikPropsGenerator(formik, 'password')}
                />

                <Button
                    type="submit"
                    disabled={isLoading}
                    isLoading={isLoading}
                    className="w-full"
                >
                    Sign In
                </Button>
            </form>

            <p className="mt-10 text-center">
                Don&apos;t have an account?{' '}
                <Link href="/auth/signup" className="text-primary">
                    Sign Up
                </Link>
            </p>
        </div>
    );
};

export default Page;
