"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  role: "talent" | "client" | "admin";
  onboardingStep: number;
  aptitude?: {
    passed: boolean;
    score: number;
  };
  coding?: {
    passed: boolean;
    score: number;
  };
}

interface AuthContextType {
  user: (User & Partial<UserData>) | null;
  loading: boolean;
  signInWithGoogle: (role: "client" | "talent") => Promise<void>;
  logout: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => { },
  logout: async () => { },
  refreshUserData: async () => { },
});

export const useAuth = () => useContext(AuthContext);

// Route definitions - defined outside component to avoid recreation
const PUBLIC_ROUTES = ["/", "/login", "/signup", "/about", "/services", "/industries", "/contact"];
const TALENT_ONBOARDING_ROUTES = ["/onboarding/step-1", "/assessments/aptitude", "/assessments/coding"];
const CLIENT_ONBOARDING_ROUTES = [
  "/client/onboarding/step-1",
  "/client/onboarding/step-2",
  "/client/onboarding/step-3",
  "/client/onboarding/step-4",
  "/client/onboarding/step-5",
  "/client/onboarding/step-6",
];

// Admin email whitelist - only these emails can access admin dashboard
const ADMIN_EMAILS = [
  "admin@somahorse.com",
  "phutinexus@gmail.com",
  "minenhlecele34@gmail.com",
  // Add more admin emails as needed
];

const isPublicRoute = (path: string) => PUBLIC_ROUTES.includes(path) || path.startsWith("/auth");
const isTalentOnboardingRoute = (path: string) => TALENT_ONBOARDING_ROUTES.some((r) => path.startsWith(r));
const isClientOnboardingRoute = (path: string) => CLIENT_ONBOARDING_ROUTES.some((r) => path.startsWith(r));
const isAdminRoute = (path: string) => path.startsWith("/admin");
const isAdminEmail = (email: string | null | undefined) => email ? ADMIN_EMAILS.includes(email.toLowerCase()) : false;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<(User & Partial<UserData>) | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const refreshUserData = useCallback(async () => {
    if (!auth.currentUser) return;

    try {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data() as UserData;
        setUser({ ...auth.currentUser, ...userData });
      }
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  }, []);

  // Helper: Determine where a talent user SHOULD be based on their progress
  const getTalentDestination = useCallback((userData: Partial<UserData>): string => {
    const step = userData.onboardingStep ?? 1;
    const aptitudePassed = userData.aptitude?.passed === true;
    const codingPassed = userData.coding?.passed === true;

    if (step <= 1) return "/onboarding/step-1";
    if (!aptitudePassed) return "/assessments/aptitude";
    if (!codingPassed) return "/assessments/coding";
    return "/dashboard";
  }, []);

  // Helper: Check if talent user is allowed on current path
  const isTalentAllowedOnPath = useCallback((path: string, userData: Partial<UserData>): boolean => {
    const step = userData.onboardingStep ?? 1;
    const aptitudePassed = userData.aptitude?.passed === true;
    const codingPassed = userData.coding?.passed === true;

    // Step 1: Only allowed on step-1
    if (step <= 1) {
      return path.startsWith("/onboarding/step-1");
    }

    // Step 2 (step=2, aptitude not passed): Allowed on aptitude test
    if (!aptitudePassed) {
      return path.startsWith("/assessments/aptitude");
    }

    // Step 3 (aptitude passed, coding not passed): Allowed on coding test
    if (!codingPassed) {
      return path.startsWith("/assessments/coding");
    }

    // Fully verified: Allowed on dashboard and any route
    return true;
  }, []);

  // Auth state listener - only handles initial auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data() as UserData;
            setUser({ ...firebaseUser, ...userData });
          } else {
            setUser(firebaseUser);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUser(firebaseUser);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Unified route guard - single source of truth for all routing decisions
  useEffect(() => {
    if (loading) return;

    const currentPath = pathname;

    // Case 1: No user - must be on public route or redirect to login
    if (!user) {
      if (!isPublicRoute(currentPath)) {
        router.replace("/login");
      }
      return;
    }

    // Case 2: User exists but no Firestore data yet (just signed up via Firebase)
    const role = (user as any).role;
    const onboardingStep = (user as any).onboardingStep;
    const userEmail = user.email;

    if (!role || onboardingStep === undefined) {
      // Data not hydrated yet - refresh and wait
      refreshUserData();
      return;
    }

    // Admin route protection - check email whitelist
    if (isAdminRoute(currentPath)) {
      if (!isAdminEmail(userEmail)) {
        // Not an admin - redirect away
        router.replace("/dashboard");
        return;
      }
      // User is admin, allow access to admin routes
      return;
    }

    // Case 3: Admin role user - redirect to admin dashboard from public routes
    if (role === "admin" || isAdminEmail(userEmail)) {
      if (isPublicRoute(currentPath)) {
        router.replace("/admin");
      }
      return;
    }

    // Case 4: Client - enforce client onboarding flow
    if (role === "client") {
      const clientOnboardingStep = (user as any).clientOnboardingStep ?? 1;
      const clientOnboardingCompleted = (user as any).clientOnboardingCompleted === true;

      // If onboarding completed, redirect to dashboard from public/onboarding routes
      if (clientOnboardingCompleted) {
        if (isPublicRoute(currentPath) || isClientOnboardingRoute(currentPath) || isTalentOnboardingRoute(currentPath)) {
          router.replace("/dashboard");
        }
        return;
      }

      // Client onboarding not completed - enforce flow
      const clientDestination = `/client/onboarding/step-${clientOnboardingStep}`;

      // If on public route, redirect to current onboarding step
      if (isPublicRoute(currentPath) || isTalentOnboardingRoute(currentPath)) {
        router.replace(clientDestination);
        return;
      }

      // If on client onboarding route, check if allowed
      if (isClientOnboardingRoute(currentPath)) {
        const currentStepMatch = currentPath.match(/step-(\d+)/);
        const currentStep = currentStepMatch ? parseInt(currentStepMatch[1]) : 1;

        // Only allow current step or previous steps
        if (currentStep > clientOnboardingStep) {
          router.replace(clientDestination);
        }
        return;
      }

      // If trying to access dashboard before completing onboarding
      if (currentPath.startsWith("/dashboard")) {
        router.replace(clientDestination);
        return;
      }

      return;
    }

    // Case 5: Talent user - enforce onboarding flow
    const userData: Partial<UserData> = {
      onboardingStep,
      aptitude: (user as any).aptitude,
      coding: (user as any).coding,
    };

    // If on a public route, redirect to appropriate onboarding step
    if (isPublicRoute(currentPath)) {
      router.replace(getTalentDestination(userData));
      return;
    }

    // If on an onboarding/assessment route, check if allowed
    if (isTalentOnboardingRoute(currentPath)) {
      if (!isTalentAllowedOnPath(currentPath, userData)) {
        router.replace(getTalentDestination(userData));
      }
      // Allowed - stay on current page
      return;
    }

    // If trying to access dashboard or other protected routes
    if (!isTalentAllowedOnPath(currentPath, userData)) {
      router.replace(getTalentDestination(userData));
      return;
    }

    // Allowed on current path - do nothing
  }, [user, loading, pathname, router, refreshUserData, getTalentDestination, isTalentAllowedOnPath]);

  const signInWithGoogle = async (role: "client" | "talent") => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const userDocRef = doc(db, "users", firebaseUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          role: role,
          onboardingStep: 1,
          clientOnboardingStep: 1,
          createdAt: new Date().toISOString(),
        });

        if (role === "talent") {
          router.push("/onboarding/step-1");
        } else {
          router.push("/client/onboarding/step-1");
        }
      } else {
        const existing = userDoc.data() as Partial<UserData>;
        const mergedRole = existing.role || role;
        const mergedStep = existing.onboardingStep || 1;
        await setDoc(
          userDocRef,
          {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            role: mergedRole,
            onboardingStep: mergedStep,
            updatedAt: new Date().toISOString(),
          },
          { merge: true },
        );
        await refreshUserData();
      }
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-cyan-500 border-r-violet-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-500 font-medium">
            Loading Somahorse Nexus...
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signInWithGoogle, logout, refreshUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
