"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMenu } from "@/context/MenuContext";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/industries", label: "Industries" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const { isMenuOpen, toggleMenu } = useMenu();
    const pathname = usePathname();

    // Hide Navbar on specific routes
    const isHidden = pathname === '/login' ||
        pathname === '/signup' ||
        pathname?.startsWith('/auth') ||
        pathname?.startsWith('/onboarding') ||
        pathname?.startsWith('/assessments') ||
        pathname === '/dashboard';

    if (isHidden) {
        return null;
    }

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur shadow-sm transition-transform duration-300 border-b border-slate-100 ${isMenuOpen ? "translate-x-64" : "translate-x-0"}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex h-20 items-center justify-between py-3">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative h-12 w-12 transition-transform group-hover:scale-105">
                            <Image
                                src="/somahorse-logo.png"
                                alt="Somahorse Nexus logo"
                                fill
                                sizes="48px"
                                className="object-contain"
                                priority
                            />
                        </div>
                        <div className="hidden sm:flex flex-col leading-tight">
                            <span className="text-xl font-bold text-slate-900 tracking-tight">
                                Somahorse Nexus
                            </span>
                            <span className="text-[10px] uppercase tracking-wider font-bold text-blue-600">
                                Operating System for Africa&apos;s AI Economy
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8">
                        <nav className="flex items-center gap-6 text-sm font-medium">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className={`relative px-2 py-2 transition-colors duration-300 group ${isActive ? "text-slate-900 font-bold" : "text-slate-600 hover:text-slate-900"
                                            }`}
                                    >
                                        {link.label}
                                        {/* Underline element */}
                                        <span className={`absolute left-0 bottom-0 h-1 w-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-transform duration-300 origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
                            <Link
                                href="/login"
                                className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:bg-slate-800 hover:scale-105 active:scale-95 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 hover:shadow-blue-500/25"
                            >
                                Signup
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        type="button"
                        aria-label="Toggle navigation"
                        onClick={toggleMenu}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-900 transition hover:bg-slate-100 lg:hidden border border-slate-200"
                    >
                        <svg
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            {isMenuOpen ? (
                                <path d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
}
