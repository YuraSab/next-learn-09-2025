'use client';

import {useEffect} from "react";

interface Props {
    error: Error  & { digest?: string },
    reset: () => void,
}

const Error = ({ error, reset }: Props) => {

    useEffect(() => {
        // Тут можна відправити помилку до служби логування (наприклад, Sentry, LogRocket)
        console.log(error);
    }, [error]);

    return (
        <div className={"flex flex-col min-h-screen justify-center items-center p-24 text-center"}>
            <h2 className={"text-2xl font-bold mb-4"}>Something wrong!</h2>
            <p className={"text-lg text-red-500 mb-8"}>Error loading post.</p>
            <button
                // Спроба відновити роботу сегмента, який викликав помилку
                onClick={() => reset()}
                className={"bg-red-500 text-white px-6 px-3 rounded-md hover:bg-red-600 transition-colors"}
            >
                Try again
            </button>
        </div>
    )
}

export  default Error;