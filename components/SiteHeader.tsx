"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MODES } from "@/lib/modes";

const modePaths = new Set(MODES.map((mode) => mode.href));

export default function SiteHeader() {
  const pathname = usePathname();
  const isModeRoute = pathname ? modePaths.has(pathname) : false;
  const navItems = [
    { href: "/", label: "Daily Games" },
    { href: "/#all-games", label: "All Games" },
    { href: "/#leaderboard", label: "Leaderboard" },
    { href: "/faq", label: "How to Play" },
    { href: "/#about", label: "About" },
  ];

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-brand" aria-label="Guess Universe home">
          <Image src="/logo.png" alt="Guess Universe logo" width={48} height={48} priority />
          <span>
            Guess <strong>Universe</strong>
          </span>
        </Link>

        <nav className="site-main-nav" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active || (isModeRoute && item.label === "Daily Games") ? "active" : ""}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="site-actions">
          <span className="streak-chip">12</span>
          <Link href="/game" className="secondary-button px-4 py-2.5">
            Sign In
          </Link>
          <Link href="/game" className="primary-button px-4 py-2.5">
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}
