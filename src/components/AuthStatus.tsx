'use client';

import React from 'react';
import {useAuth} from "@/context/AuthContext";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {signOut} from "@firebase/auth";
import {auth} from "@/lib/firebase";
import {clearSessionCookie} from "@/actions/auth";

const AuthStatus = () => {
    const {user, isLoading} = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut(auth);
        await clearSessionCookie();
        // Оскільки clearSessionCookie містить redirect('/signin'), цей рядок
        // (router.push('/signin')) не буде виконаний
    }

    if (isLoading) {
        return (
            <div className={"text-sm text-gray"}>Loading...</div>
        )
    }

    if (!user) {
        return (
            <div className={"space-x-4"}>
                <Link href={"/signin"} className={"text-white hover:text-gray-300"}>
                    Login
                </Link>
                <Link href={"/signup"} className={"text-white hover:text-gray-300"}>
                    Register
                </Link>
            </div>
        )
    }

    return (
        <div className={"flex items-center space-x-4"}>
            <span className={"text-md text-white"}>Hello, {user.email}!</span>
            <button
                className={"bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 text-sm"}
                onClick={handleSignOut}
            >
                Sign out
            </button>
        </div>
    );
};

export default AuthStatus;