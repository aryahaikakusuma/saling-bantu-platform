export type Yayasan = {
  slug: string;
  name: string;
  city: string;
  category: "Panti Asuhan" | "Panti Jompo" | "Pesantren";
  description: string;
  founded: number;
  fulfilled: number;
  total: number;
  totalDonations: string;
  initials: string;
  color: string;
};

export const yayasans: Yayasan[] = [
  {
    slug: "harapan-bunda",
    name: "Panti Asuhan Harapan Bunda",
    city: "Yogyakarta",
    category: "Panti Asuhan",
    description: "Rumah bagi 48 anak yatim piatu yang menempuh pendidikan formal sejak 2003.",
    founded: 2003,
    fulfilled: 12,
    total: 20,
    totalDonations: "Rp 86.4 jt",
    initials: "HB",
    color: "from-emerald-200 to-emerald-100",
  },
  {
    slug: "sejahtera-lansia",
    name: "Panti Jompo Sejahtera",
    city: "Bandung",
    category: "Panti Jompo",
    description: "Merawat 32 lansia tanpa keluarga dengan kasih dan martabat.",
    founded: 1998,
    fulfilled: 7,
    total: 15,
    totalDonations: "Rp 52.1 jt",
    initials: "SJ",
    color: "from-amber-200 to-amber-100",
  },
  {
    slug: "an-nur",
    name: "Pesantren An-Nur",
    city: "Tasikmalaya",
    category: "Pesantren",
    description: "Pesantren tahfidz untuk 120 santri dari keluarga prasejahtera.",
    founded: 2010,
    fulfilled: 18,
    total: 22,
    totalDonations: "Rp 124 jt",
    initials: "AN",
    color: "from-teal-200 to-teal-100",
  },
  {
    slug: "kasih-ibu",
    name: "Panti Asuhan Kasih Ibu",
    city: "Surabaya",
    category: "Panti Asuhan",
    description: "Mengasuh 65 anak dengan fokus pendidikan vokasi dan keterampilan hidup.",
    founded: 2007,
    fulfilled: 5,
    total: 18,
    totalDonations: "Rp 41.8 jt",
    initials: "KI",
    color: "from-lime-200 to-lime-100",
  },
  {
    slug: "rumah-senja",
    name: "Rumah Senja Bahagia",
    city: "Semarang",
    category: "Panti Jompo",
    description: "Pelayanan paliatif & komunitas untuk 28 oma opa di tengah kota.",
    founded: 2015,
    fulfilled: 9,
    total: 14,
    totalDonations: "Rp 38.7 jt",
    initials: "RS",
    color: "from-rose-200 to-rose-100",
  },
  {
    slug: "darul-falah",
    name: "Pesantren Darul Falah",
    city: "Garut",
    category: "Pesantren",
    description: "200 santri belajar Al-Qur'an sekaligus kewirausahaan pertanian.",
    founded: 1995,
    fulfilled: 14,
    total: 25,
    totalDonations: "Rp 98.3 jt",
    initials: "DF",
    color: "from-cyan-200 to-cyan-100",
  },
];

export type WishlistItem = {
  name: string;
  category: string;
  needed: number;
  fulfilled: number;
  emoji: string;
};

export const wishlistItems: WishlistItem[] = [
  { name: "Beras 5 kg", category: "Makanan Pokok", needed: 20, fulfilled: 8, emoji: "🍚" },
  { name: "Seragam Sekolah Anak", category: "Pendidikan", needed: 30, fulfilled: 12, emoji: "👕" },
  { name: "Buku Tulis & Alat Tulis", category: "Pendidikan", needed: 50, fulfilled: 50, emoji: "📚" },
  { name: "Susu Formula", category: "Nutrisi Balita", needed: 15, fulfilled: 4, emoji: "🍼" },
  { name: "Obat-obatan Dasar", category: "Kesehatan", needed: 10, fulfilled: 3, emoji: "💊" },
  { name: "Selimut Tebal", category: "Kebutuhan Harian", needed: 25, fulfilled: 25, emoji: "🛏️" },
  { name: "Minyak Goreng 2L", category: "Makanan Pokok", needed: 18, fulfilled: 6, emoji: "🛢️" },
  { name: "Sepatu Sekolah", category: "Pendidikan", needed: 22, fulfilled: 9, emoji: "👟" },
];

export const proofs = [
  { donor: "Andini W.", date: "12 Mei 2026", item: "Beras 5kg × 4", emoji: "🍚" },
  { donor: "Hamba Allah", date: "10 Mei 2026", item: "Donasi Rp 500.000", emoji: "💚" },
  { donor: "Budi S.", date: "8 Mei 2026", item: "Seragam × 6", emoji: "👕" },
  { donor: "Komunitas KitaPeduli", date: "5 Mei 2026", item: "Buku tulis × 50", emoji: "📚" },
  { donor: "Anonim", date: "3 Mei 2026", item: "Susu Formula × 3", emoji: "🍼" },
  { donor: "Rina P.", date: "1 Mei 2026", item: "Selimut × 10", emoji: "🛏️" },
];
