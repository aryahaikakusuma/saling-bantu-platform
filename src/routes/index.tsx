import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { YayasanCard } from "@/components/site/YayasanCard";
import { yayasans } from "@/lib/dummy-data";
import {
  ClipboardList,
  HandHeart,
  CheckCircle2,
  BadgeCheck,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Heart,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SalingBantu — Donasi Tepat Sasaran, Nyata Dampaknya" },
      {
        name: "description",
        content:
          "Yayasan publish kebutuhan nyata mereka. Kamu pilih apa yang ingin kamu bantu. Donasi barang atau uang, transparan dan tepat sasaran.",
      },
      { property: "og:title", content: "SalingBantu — Donasi Tepat Sasaran" },
      { property: "og:description", content: "Platform donasi berbasis wishlist nyata dari yayasan terverifikasi." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HowItWorks />
      <TrustStats />
      <FeaturedYayasan />
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:py-24 lg:px-8">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card/60 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Platform donasi berbasis kebutuhan nyata
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Bantu yang <span className="text-primary">Benar-Benar</span> Dibutuhkan
          </h1>
          <p className="mt-5 max-w-xl text-base text-foreground/70 sm:text-lg">
            Yayasan publish wishlist kebutuhan spesifik mereka. Kamu pilih apa yang ingin kamu bantu —
            barang atau uang — dan dapat bukti penerimaan langsung.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-lg px-6">
              <Link to="/jelajah">
                Mulai Berdonasi <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-lg border-primary/30 px-6 text-primary hover:bg-accent"
            >
              <a href="#daftar">Daftarkan Yayasan</a>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" /> Yayasan terverifikasi
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BadgeCheck className="h-4 w-4 text-[color:var(--color-trust)]" /> Bukti setiap donasi
            </span>
          </div>
        </div>

        <HeroIllustration />
      </div>
    </section>
  );
}

function HeroIllustration() {
  return (
    <div className="relative mx-auto aspect-[5/4] w-full max-w-lg">
      {/* abstract organic shapes */}
      <div className="absolute -left-6 top-8 h-56 w-56 rounded-full bg-mint blur-2xl opacity-60" />
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[color:var(--color-trust)] blur-2xl opacity-40" />

      <div className="relative h-full w-full rounded-[36px] border border-border/60 bg-card/80 p-6 shadow-soft backdrop-blur">
        {/* floating card 1 */}
        <div className="absolute left-3 top-4 w-44 rounded-2xl border border-border/60 bg-card p-4 shadow-soft sm:left-4 sm:top-6 sm:w-56">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint-soft text-lg">🍚</div>
            <div>
              <p className="text-sm font-semibold">Beras 5 kg</p>
              <p className="text-[11px] text-muted-foreground">Panti Harapan Bunda</p>
            </div>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mint-soft">
            <div className="h-full w-2/3 bg-primary" />
          </div>
          <p className="mt-1.5 text-[11px] text-muted-foreground">12 dari 20 terpenuhi</p>
        </div>

        {/* floating card 2 */}
        <div className="absolute bottom-4 right-3 w-48 rounded-2xl border border-border/60 bg-card p-4 shadow-soft sm:bottom-6 sm:right-4 sm:w-60">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 rounded-full bg-mint-soft px-2 py-0.5 text-[10px] font-semibold text-primary">
              <CheckCircle2 className="h-3 w-3" /> Donasi Terkirim
            </span>
            <span className="text-[10px] text-muted-foreground">2 jam lalu</span>
          </div>
          <p className="mt-2 text-sm font-semibold">Seragam Sekolah × 4</p>
          <p className="text-[11px] text-muted-foreground">Diterima oleh Pesantren An-Nur</p>
          <div className="mt-3 flex -space-x-2">
            {["A", "B", "R"].map((c) => (
              <div key={c} className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[10px] font-bold ring-2 ring-card">
                {c}
              </div>
            ))}
          </div>
        </div>

        {/* center heart */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-soft">
            <Heart className="h-10 w-10 fill-current" />
          </div>
        </div>
      </div>
    </div>
  );
}

const steps = [
  {
    icon: ClipboardList,
    title: "Yayasan Publish Wishlist",
    desc: "Yayasan terverifikasi mendaftarkan kebutuhan spesifik mereka — bukan jumlah uang acak.",
  },
  {
    icon: HandHeart,
    title: "Kamu Pilih untuk Bantu",
    desc: "Pilih item yang ingin kamu donasi: kirim barang fisik atau bayar uangnya secara digital.",
  },
  {
    icon: CheckCircle2,
    title: "Konfirmasi & Bukti Penerimaan",
    desc: "Yayasan konfirmasi penerimaan dengan foto. Kamu dapat notifikasi & bukti nyata.",
  },
];

function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Bagaimana Cara Kerjanya?</h2>
        <p className="mt-3 text-foreground/70">
          Tiga langkah sederhana dari kebutuhan nyata sampai bukti penerimaan.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className="relative rounded-2xl border border-border/60 bg-card p-6 shadow-soft"
          >
            <span className="absolute right-5 top-5 text-5xl font-bold text-mint-soft">
              0{i + 1}
            </span>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
              <s.icon className="h-6 w-6" strokeWidth={2} />
            </div>
            <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
            <p className="mt-2 text-sm text-foreground/70">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const stats = [
  { value: "10+", label: "Yayasan Terverifikasi", icon: ShieldCheck },
  { value: "100%", label: "Kebutuhan Nyata", icon: Sparkles },
  { value: "✓", label: "Bukti Penerimaan Setiap Donasi", icon: BadgeCheck },
];

function TrustStats() {
  return (
    <section className="bg-accent/40 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-card p-7 text-center shadow-soft">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-soft text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <p className="mt-4 text-3xl font-bold text-primary">{s.value}</p>
              <p className="mt-1 text-sm font-medium text-foreground/80">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedYayasan() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">Yayasan yang Membutuhkan</h2>
          <p className="mt-2 text-foreground/70">Pilih yayasan, lihat wishlist mereka, mulai bantu hari ini.</p>
        </div>
        <Button asChild variant="ghost" className="hidden text-primary hover:bg-accent sm:inline-flex">
          <Link to="/jelajah">
            Lihat Semua <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-8 -mx-4 flex gap-5 overflow-x-auto px-4 pb-4 scrollbar-hide sm:mx-0 sm:px-0">
        {yayasans.slice(0, 5).map((y) => (
          <div key={y.slug} className="w-[300px] shrink-0">
            <YayasanCard y={y} compact />
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="daftar" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-14 text-primary-foreground sm:px-14">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
        <div className="absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-white/10" />
        <div className="relative max-w-2xl">
          <h2 className="text-3xl font-bold sm:text-4xl">Yayasan kamu butuh bantuan?</h2>
          <p className="mt-3 text-primary-foreground/90">
            Daftarkan yayasan kamu, publish wishlist kebutuhan nyata, dan terima donasi yang tepat sasaran.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" variant="secondary" className="rounded-lg bg-card text-primary hover:bg-card/90">
              Daftarkan Yayasan <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="ghost" className="rounded-lg text-primary-foreground hover:bg-white/10">
              Pelajari Lebih Lanjut
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
