import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { YayasanCard } from "@/components/site/YayasanCard";
import { yayasans } from "@/lib/dummy-data";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/jelajah")({
  head: () => ({
    meta: [
      { title: "Jelajah Yayasan — SalingBantu" },
      { name: "description", content: "Temukan yayasan terverifikasi yang membutuhkan bantuanmu. Filter berdasarkan kategori, jenis donasi, dan lokasi." },
      { property: "og:title", content: "Jelajah Yayasan — SalingBantu" },
      { property: "og:description", content: "Temukan yayasan terverifikasi yang membutuhkan bantuanmu." },
    ],
  }),
  component: Browse,
});

const categories = ["Semua", "Panti Asuhan", "Panti Jompo", "Pesantren"] as const;
const donationTypes = ["Semua Donasi", "Barang Fisik", "Uang Digital"] as const;
const cities = ["Semua Kota", "Yogyakarta", "Bandung", "Tasikmalaya", "Surabaya", "Semarang", "Garut"];

function Browse() {
  const [cat, setCat] = useState<(typeof categories)[number]>("Semua");
  const [type, setType] = useState<(typeof donationTypes)[number]>("Semua Donasi");
  const [city, setCity] = useState<string>("Semua Kota");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return yayasans.filter((y) => {
      if (cat !== "Semua" && y.category !== cat) return false;
      if (city !== "Semua Kota" && y.city !== city) return false;
      if (q && !y.name.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [cat, city, q]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="bg-hero">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold sm:text-4xl">Temukan Yayasan yang Butuh Bantuanmu</h1>
          <p className="mt-3 max-w-2xl text-foreground/70">
            {yayasans.length} yayasan terverifikasi membutuhkan dukungan. Pilih yang ingin kamu bantu hari ini.
          </p>

          {/* Search */}
          <div className="mt-6 flex max-w-xl items-center gap-2 rounded-xl border border-border/60 bg-card px-4 py-2.5 shadow-soft">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari nama yayasan..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground/60">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Filter:
          </div>

          <Chips options={categories as unknown as string[]} value={cat} onChange={(v) => setCat(v as typeof cat)} />

          <Select label="Jenis Donasi" value={type} onChange={(v) => setType(v as typeof type)} options={donationTypes as unknown as string[]} />
          <Select label="Lokasi" value={city} onChange={setCity} options={cities} />

          <span className="ml-auto text-xs text-muted-foreground">
            {filtered.length} hasil
          </span>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <EmptyState onReset={() => { setCat("Semua"); setCity("Semua Kota"); setType("Semua Donasi"); setQ(""); }} />
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((y) => (
                <YayasanCard key={y.slug} y={y} />
              ))}
              {/* skeleton placeholders */}
              {filtered.length >= 3 && <SkeletonCard />}
            </div>

            <div className="mt-12 flex items-center justify-center">
              <Button variant="outline" className="rounded-lg border-primary/30 text-primary hover:bg-accent">
                Muat Lebih Banyak
              </Button>
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}

function Chips({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
            value === o
              ? "bg-primary text-primary-foreground"
              : "bg-card text-foreground/70 hover:bg-accent"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <label className="flex items-center gap-2 rounded-full bg-card px-3 py-1.5 text-xs">
      <span className="text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent font-medium text-foreground outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function SkeletonCard() {
  return (
    <div className="hidden animate-pulse flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft lg:flex">
      <div className="h-32 bg-mint-soft" />
      <div className="space-y-3 p-5 pt-9">
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="h-3 w-1/2 rounded bg-muted" />
        <div className="h-2 w-full rounded bg-muted" />
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className="h-9 rounded bg-muted" />
          <div className="h-9 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-accent text-primary">
        <Inbox className="h-9 w-9" />
      </div>
      <h3 className="mt-5 text-xl font-bold">Tidak ada yayasan ditemukan</h3>
      <p className="mt-2 text-sm text-foreground/70">
        Coba ubah filter atau kata kunci pencarian kamu untuk menemukan yayasan lain yang butuh bantuan.
      </p>
      <Button onClick={onReset} className="mt-6 rounded-lg">
        Reset Filter
      </Button>
    </div>
  );
}
