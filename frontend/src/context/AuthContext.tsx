"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    User,
    RecaptchaVerifier
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signInWithGoogle: (role: "client" | "talent") => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signInWithGoogle: async () => { },
    logout: async () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // User is signed in
                try {
                    const userDocRef = doc(db, "users", firebaseUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        const currentStep = userData.onboardingStep || 1;
                        const role = userData.role;

                        setUser(firebaseUser);

                        // Session Redirection Logic
                        const pathname = window.location.pathname;
                        const isPublicPage = pathname === "/" || pathname === "/login" || pathname === "/signup" || pathname.startsWith("/auth");

                        if (isPublicPage) {
                            if (role === 'talent') {
                                if (currentStep === 1) router.replace('/onboarding/step-1');
                                else if (currentStep === 2) router.replace('/assessments/aptitude');
                                else if (currentStep === 3) router.replace('/assessments/coding');
                                else router.replace('/dashboard');
                            } else {
                                // Default for client or unknown
                                router.replace('/dashboard');
                            }
                        }
                    } else {
                        // User exists in Auth but not Firestore (rare edge case, or new user before creation)
                        setUser(firebaseUser);
                    }
                } catch (error) {
                    console.error("Error fetching user profile:", error);
                    setUser(firebaseUser); // Fallback to just setting user
                }
            } else {
                // User is signed out
                setUser(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    const signInWithGoogle = async (role: "client" | "talent") => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    role: role,
                    onboardingStep: 1,
                    createdAt: new Date().toISOString()
                });

                if (role === 'talent') {
                    router.push('/onboarding/step-1');
                } else {
                    router.push('/dashboard');
                }
            } else {
                // existing user, the onAuthStateChanged will handle the redirect
            }

        } catch (error) {
            console.error("Error signing in with Google", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            router.push('/');
        } catch (error) {
            console.error("Error signing out", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="relative w-16 h-16">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-200 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-cyan-500 rounded-full animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
