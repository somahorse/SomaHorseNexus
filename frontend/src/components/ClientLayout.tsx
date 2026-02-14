"use client";

import { useMenu, MenuProvider } from "@/context/MenuContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define nav links here to reuse
const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/industries", label: "Industries" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
];

function MobileMenu() {
    const { isMenuOpen, closeMenu } = useMenu();
    const pathname = usePathname();

    return (
        <div
            className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 shadow-xl transform transition-transform duration-300 ease-in-out z-40 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
        >
            <div className="flex flex-col h-full p-6">
                <div className="mb-8 mt-2">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight text-slate-900">Somahorse Nexus</span>
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white">
                            Beta
                        </span>
                    </div>
                </div>

                <nav className="flex flex-col gap-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={closeMenu}
                                className={`text-lg px-4 py-3 rounded-lg transition-all duration-300 ${isActive
                                    ? "bg-gradient-to-r from-cyan-400/10 to-violet-500/10 text-slate-900 font-bold border-l-4 border-cyan-400"
                                    : "text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-cyan-400/5 hover:to-violet-500/5"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto flex flex-col gap-4 border-t border-slate-100 pt-6">
                    <Link
                        href="/login"
                        onClick={closeMenu}
                        className="text-slate-600 hover:text-slate-900 font-semibold px-4 transition-colors"
                    >
                        Login
                    </Link>
                    <Link
                        href="/signup"
                        onClick={closeMenu}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-3 rounded-xl text-center font-bold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all hover:scale-[1.02]"
                    >
                        Signup
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <MenuProvider>
            <MobileMenu />
            {children}
        </MenuProvider>
    );
}
