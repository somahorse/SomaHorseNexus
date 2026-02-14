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
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const { isMenuOpen, toggleMenu } = useMenu();
    const pathname = usePathname();

    // Hide Navbar on specific routes
    const isHidden = pathname === '/login' ||
        pathname === '/signup' ||
        pathname === '/forgot-password' ||
        pathname?.startsWith('/auth') ||
        pathname?.startsWith('/onboarding') ||
        pathname?.startsWith('/client/onboarding') ||
        pathname?.startsWith('/assessments') ||
        pathname?.startsWith('/admin') ||
        pathname?.startsWith('/dashboard') ||
        pathname?.startsWith('/projects');

    if (isHidden) {
        return null;
    }

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-xl shadow-sm transition-transform duration-300 border-b border-slate-200 ${isMenuOpen ? "translate-x-64" : "translate-x-0"}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex h-20 items-center justify-between py-3">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative h-12 w-12 transition-transform group-hover:scale-105 rounded-xl bg-white shadow-md p-1.5">
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
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-slate-900 tracking-tight">
                                    Somahorse Nexus
                                </span>
                                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white">
                                    Beta
                                </span>
                            </div>
                            <span className="text-[10px] uppercase tracking-wider font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600">
                                Operating System for Africa&apos;s AI Economy
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav - Glass Boxes */}
                    <div className="hidden lg:flex items-center gap-4">
                        <nav className="flex items-center bg-slate-100/80 backdrop-blur-md rounded-full p-1.5 border border-slate-200/50 shadow-inner">
                            {navLinks.map((link, index) => {
                                const isActive = pathname === link.href;
                                return (
                                    <div key={link.label} className="flex items-center">
                                        <Link
                                            href={link.href}
                                            className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive
                                                ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-lg shadow-violet-500/25"
                                                : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                        {/* Dot separator */}
                                        {index < navLinks.length - 1 && (
                                            <div className="w-1 h-1 rounded-full bg-slate-300 mx-1" />
                                        )}
                                    </div>
                                );
                            })}
                        </nav>

                        {/* Auth Buttons */}
                        <div className="flex items-center gap-3 ml-2">
                            <Link
                                href="/login"
                                className="px-5 py-2.5 rounded-full text-sm font-semibold text-slate-700 bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:bg-white hover:shadow-md transition-all duration-300"
                            >
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="px-6 py-2.5 rounded-full text-sm font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 bg-gradient-to-r from-cyan-500 to-violet-600 hover:shadow-violet-500/30"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        type="button"
                        aria-label="Toggle navigation"
                        onClick={toggleMenu}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-slate-900 transition hover:bg-white lg:hidden border border-slate-200/50 shadow-sm"
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
