'use client';

import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {onAuthStateChanged, User} from "@firebase/auth";
import {auth} from "@/lib/firebase";

type AuthContextType = {
    user: User | null,
    isLoading: boolean,
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Встановлюємо Listener: він спрацьовує при зміні статусу (вхід/вихід)
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsLoading(false);
            console.log("currentUser", currentUser);
        })
        // Важливо: відписуємося від Listener при демонтажі
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}


// Хук для зручного використання
// Ви просто викликаєте:
// const { user, isLoading } = useAuth(); // набагато чистіше
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}