import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { Menu } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Beranda" },
  { to: "/jelajah", label: "Jelajah Yayasan" },
  { to: "/yayasan/harapan-bunda", label: "Wishlist" },
  { to: "/", label: "Tentang", hash: true },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
              activeProps={{ className: "text-foreground bg-accent" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" className="text-foreground/70">
            Masuk
          </Button>
          <Button asChild className="rounded-lg">
            <Link to="/jelajah">Mulai Berdonasi</Link>
          </Button>
        </div>

        <button
          className="rounded-md p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="space-y-1 px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-accent"
              >
                {l.label}
              </Link>
            ))}
            <Button asChild className="mt-2 w-full rounded-lg">
              <Link to="/jelajah">Mulai Berdonasi</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
