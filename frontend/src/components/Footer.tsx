import Link from "next/link";
import { Twitter, Linkedin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative bg-slate-900 text-white overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/40 to-violet-900/40 pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl font-bold tracking-tight">Somahorse Nexus</span>
                        </div>
                        <p className="text-sm text-slate-300">
                            Connecting Africa&apos;s top AI talent with global opportunities. The operating system for the future of work.
                        </p>
                        <div className="mt-6 flex gap-4">
                            <SocialLink href="https://x.com/somahorsenexus?s=21" icon={<Twitter size={20} />} label="Twitter" />
                            <SocialLink href="https://www.linkedin.com/company/somahorse-nexus/"  icon={<Linkedin size={20} />} label="LinkedIn" />
                            <SocialLink href="https://www.instagram.com/somahorsenexus?igsh=dzg2emMweDdmMGQ2" icon={<Instagram size={20} />} label="Instagram" />
                            <SocialLink href="https://www.facebook.com/share/1DmopsomF6/?mibextid=wwXIfr" icon={<Facebook size={20} />} label="Instagram" />
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-cyan-400">Platform</h3>
                        <ul className="mt-4 space-y-3">
                            <FooterLink href="/" label="Home" />
                            <FooterLink href="/about" label="About Us" />
                            <FooterLink href="/services" label="Services" />
                            <FooterLink href="/industries" label="Industries" />
                            <FooterLink href="/pricing" label="Pricing" />
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-cyan-400">Legal</h3>
                        <ul className="mt-4 space-y-3">
                            <FooterLink href="/privacy" label="Privacy Policy" />
                            <FooterLink href="/terms" label="Terms of Service" />
                            <FooterLink href="/cookies" label="Cookie Policy" />
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-sm font-semibold tracking-wider uppercase text-cyan-400">Stay Updated</h3>
                        <p className="mt-4 text-sm text-slate-300">Subscribe to our newsletter for the latest AI trends and platform updates.</p>
                        <form className="mt-4 flex gap-2">
                            <input type="email" placeholder="Enter your email" className="w-full min-w-0 flex-auto rounded-md border-0 bg-white/10 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/20 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-cyan-500 sm:text-sm sm:leading-6" />
                            <button type="submit" className="flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:scale-105 transition-all bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                <div className="mt-12 border-t border-slate-800 pt-8 text-center space-y-2">
                    <p className="text-xs leading-5 text-slate-400">&copy; {new Date().getFullYear()} Somahorse Nexus. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

function FooterLink({ href, label }: { href: string; label: string }) {
    return (
        <li>
            <Link href={href} className="text-sm text-slate-300 hover:text-cyan-400 transition-colors">
                {label}
            </Link>
        </li>
    )
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a href={href} className="text-slate-400 hover:text-cyan-400 transition-colors" aria-label={label}>
            {icon}
        </a>
    )
}
