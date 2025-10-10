"use client";

import {FormEvent, useState} from "react";
import {createUserWithEmailAndPassword} from "@firebase/auth";
import {auth} from "@/lib/firebase";
import {useRouter} from "next/navigation";

const SignUpForm = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSignUp = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            await createUserWithEmailAndPassword(auth, email, password)
            router.push('/');
        } catch (err: any) {
            // Обробка помилок Firebase (наприклад, недійсний email, слабкий пароль)
            setError(err.message || 'Помилка реєстрації.');
        }
    }

    return (
        <form onSubmit={handleSignUp} className="w-full max-w-sm mx-auto p-8 border rounded-lg shadow-lg bg-white mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Реєстрація</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                />
            </div>

            <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Пароль</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                />
            </div>

            <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded w-full"
            >
                Зареєструватися
            </button>
        </form>
    );
}

export default SignUpForm;