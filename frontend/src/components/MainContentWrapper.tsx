"use client";

import { useMenu } from "@/context/MenuContext";

export default function MainContentWrapper({ children }: { children: React.ReactNode }) {
    const { isMenuOpen, closeMenu } = useMenu();

    return (
        <div
            className={`transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-64" : "translate-x-0"}`}
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
