import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Donasi Tepat Sasaran, Nyata Dampaknya. Platform yang menghubungkan kebutuhan
              nyata yayasan dengan kebaikan tulus dari kamu.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Twitter, Facebook, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground/70 shadow-soft transition-colors hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Navigasi</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">Beranda</Link></li>
              <li><Link to="/jelajah" className="hover:text-foreground">Jelajah Yayasan</Link></li>
              <li><Link to="/yayasan/harapan-bunda" className="hover:text-foreground">Wishlist</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Untuk Yayasan</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Daftarkan Yayasan</a></li>
              <li><a href="#" className="hover:text-foreground">Panduan Verifikasi</a></li>
              <li><a href="#" className="hover:text-foreground">Pusat Bantuan</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} SalingBantu. Dibuat dengan ❤ di Indonesia.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Syarat</a>
            <a href="#" className="hover:text-foreground">Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
