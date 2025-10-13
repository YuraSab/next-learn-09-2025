'use client';

import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {auth} from "@/lib/firebase";

const SignInForm = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSignIn = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/');
        } catch (error) {
            setError(error.message || 'Помилка входу. Перевірте email та пароль.');
        }
    }


    return (
        <form onSubmit={handleSignIn}
              className={"w-full max-w-sm mx-auto p-8 border rounded-lg shadow-lg bg-white mt-10"}>
            <h2 className={"text-2xl font-bold mb-6 text-center"}>Вхід</h2>
            <div>
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    id="email"
                    className={"w-full border rounded py-2 px-3 block text-gray-700 font-bold mb-2 leading-tight"}
                />
                {/*className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"*/}

            </div>
            <div>
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    id="password"
                    className={"w-full border rounded py-2 px-3 block text-gray-700 font-bold mb-6 leading-tight"}
                />
            </div>
            <button className={"bg-blue-600 hover:bg-blue-700 font-bold text-white rounded w-full py-2 px-4"}>
                Login
            </button>
            {error && <p className={"text-red-500 mt-4"}>{error}</p>}
        </form>
)
}

export default SignInForm;