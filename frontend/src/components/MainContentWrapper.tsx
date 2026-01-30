"use client";

import { useMenu } from "@/context/MenuContext";
import { usePathname } from "next/navigation";

export default function MainContentWrapper({ children }: { children: React.ReactNode }) {
    const { isMenuOpen, closeMenu } = useMenu();
    const pathname = usePathname();

    // Check if Navbar is hidden for this route (logic mirrored from Navbar.tsx)
    const isNavbarHidden = pathname === '/login' ||
        pathname === '/signup' ||
        pathname?.startsWith('/auth') ||
        pathname?.startsWith('/onboarding') ||
        pathname?.startsWith('/client/onboarding') ||
        pathname?.startsWith('/assessments') ||
        pathname?.startsWith('/admin') ||
        pathname === '/dashboard';

    return (
        <div
            className={`transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-64" : "translate-x-0"} ${isNavbarHidden ? "" : "pt-20"}`}
        >
            {/* Overlay to close menu when clicking outside on mobile */}
            {isMenuOpen && (
                <div
                    onClick={closeMenu}
                    className="absolute inset-0 bg-black/20 z-[60] cursor-pointer"
                    aria-hidden="true"
                />
            )}
            {children}
        </div>
    );
}
