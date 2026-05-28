import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Package,
  Wallet,
  Truck,
  Building2,
  CreditCard,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import type { WishlistItem } from "@/lib/dummy-data";

export type DonationMode = "goods" | "money";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: DonationMode;
  item?: WishlistItem;
  yayasanName: string;
};

const NOMINALS = [50_000, 100_000, 250_000, 500_000];
const PAYMENTS = [
  { id: "bank", label: "Transfer Bank", icon: Building2 },
  { id: "ewallet", label: "E-Wallet", icon: Wallet },
  { id: "card", label: "Kartu Kredit/Debit", icon: CreditCard },
];

function rupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export function DonationModal({ open, onOpenChange, mode, item, yayasanName }: Props) {
  const [step, setStep] = useState<"form" | "success">("form");

  // shared
  const [name, setName] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [note, setNote] = useState("");

  // goods
  const [qty, setQty] = useState(1);
  const [courier, setCourier] = useState<"self" | "pickup">("self");
  const [address, setAddress] = useState("");

  // money
  const [amount, setAmount] = useState<number>(100_000);
  const [payment, setPayment] = useState<string>("bank");

  useEffect(() => {
    if (open) {
      setStep("form");
      setName("");
      setAnonymous(false);
      setNote("");
      setQty(1);
      setCourier("self");
      setAddress("");
      setAmount(100_000);
      setPayment("bank");
    }
  }, [open, mode]);

  const title =
    step === "success"
      ? "Donasi berhasil dikirim"
      : mode === "goods"
        ? "Kirim Barang Donasi"
        : "Donasi Dana";

  const canSubmit =
    (anonymous || name.trim().length > 0) &&
    (mode === "goods"
      ? qty > 0 && (courier === "self" || address.trim().length > 5)
      : amount >= 10_000 && !!payment);

  function handleSubmit() {
    if (!canSubmit) return;
    setStep("success");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        {step === "form" ? (
          <>
            <DialogHeader>
              <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full bg-mint-soft px-3 py-1 text-xs font-semibold text-primary">
                {mode === "goods" ? <Package className="h-3.5 w-3.5" /> : <Wallet className="h-3.5 w-3.5" />}
                {mode === "goods" ? "Donasi Barang" : "Donasi Uang"}
              </div>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>
                Untuk <span className="font-semibold text-foreground">{yayasanName}</span>
                {item ? <> · kebutuhan <span className="font-semibold text-foreground">{item.name}</span></> : null}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5">
              {mode === "goods" ? (
                <>
                  {item && (
                    <div className="flex items-center gap-3 rounded-2xl bg-secondary/60 p-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-2xl">
                        {item.emoji}
                      </div>
                      <div className="text-sm">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Masih dibutuhkan {Math.max(0, item.needed - item.fulfilled)} unit
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="qty">Jumlah unit yang dikirim</Label>
                    <div className="mt-1.5 flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                      >
                        −
                      </Button>
                      <Input
                        id="qty"
                        type="number"
                        min={1}
                        value={qty}
                        onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                        className="text-center"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setQty((q) => q + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Metode pengiriman</Label>
                    <div className="mt-1.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <CourierOption
                        active={courier === "self"}
                        onClick={() => setCourier("self")}
                        icon={Truck}
                        title="Kirim mandiri"
                        sub="Saya antar/kirim sendiri"
                      />
                      <CourierOption
                        active={courier === "pickup"}
                        onClick={() => setCourier("pickup")}
                        icon={Package}
                        title="Dijemput kurir"
                        sub="Kurir SalingBantu menjemput"
                      />
                    </div>
                  </div>

                  {courier === "pickup" && (
                    <div>
                      <Label htmlFor="addr">Alamat penjemputan</Label>
                      <Textarea
                        id="addr"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Jl. ... No. ..., Kota, Kode Pos"
                        className="mt-1.5"
                        rows={3}
                      />
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div>
                    <Label>Pilih nominal</Label>
                    <div className="mt-1.5 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {NOMINALS.map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setAmount(n)}
                          className={`rounded-xl border px-2 py-2.5 text-sm font-semibold transition-colors ${
                            amount === n
                              ? "border-primary bg-mint-soft text-primary"
                              : "border-border bg-card text-foreground/80 hover:border-primary/40"
                          }`}
                        >
                          {rupiah(n)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="amt">Nominal lain</Label>
                    <Input
                      id="amt"
                      type="number"
                      min={10000}
                      step={1000}
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value) || 0)}
                      className="mt-1.5"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">Minimum {rupiah(10_000)}</p>
                  </div>

                  <div>
                    <Label>Metode pembayaran</Label>
                    <div className="mt-1.5 space-y-2">
                      {PAYMENTS.map((p) => {
                        const Icon = p.icon;
                        const active = payment === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setPayment(p.id)}
                            className={`flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${
                              active
                                ? "border-primary bg-mint-soft"
                                : "border-border bg-card hover:border-primary/40"
                            }`}
                          >
                            <Icon className={`h-4 w-4 ${active ? "text-primary" : "text-foreground/60"}`} />
                            <span className="font-medium">{p.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="name">Nama donatur</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama yang ditampilkan"
                  disabled={anonymous}
                  className="mt-1.5"
                />
                <label className="mt-2 inline-flex cursor-pointer items-center gap-2 text-xs text-foreground/70">
                  <input
                    type="checkbox"
                    checked={anonymous}
                    onChange={(e) => setAnonymous(e.target.checked)}
                    className="h-3.5 w-3.5 accent-[color:var(--color-primary)]"
                  />
                  Donasi sebagai Hamba Allah / Anonim
                </label>
              </div>

              <div>
                <Label htmlFor="note">Pesan untuk yayasan (opsional)</Label>
                <Textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Semoga bermanfaat..."
                  className="mt-1.5"
                  rows={2}
                />
              </div>
            </div>

            <DialogFooter className="mt-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Batal
              </Button>
              <Button onClick={handleSubmit} disabled={!canSubmit}>
                {mode === "goods" ? "Konfirmasi Donasi Barang" : `Lanjut Bayar ${rupiah(amount)}`}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <div className="py-2 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mint-soft">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mt-4 text-xl font-bold">Terima kasih{!anonymous && name ? `, ${name}` : ""}!</h3>
            <p className="mt-2 text-sm text-foreground/70">
              {mode === "goods"
                ? `Donasi ${qty}× ${item?.name ?? "barang"} untuk ${yayasanName} sudah tercatat. ${
                    courier === "pickup"
                      ? "Kurir akan menghubungi kamu untuk penjemputan."
                      : "Silakan kirim ke alamat yayasan yang akan kami kirim via email."
                  }`
                : `Donasi ${rupiah(amount)} untuk ${yayasanName} sedang diproses. Instruksi pembayaran sudah dikirim.`}
            </p>

            <div className="mt-5 rounded-2xl bg-secondary/60 p-4 text-left text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/60">Nomor donasi</span>
                <span className="font-mono font-semibold">
                  SB-{Math.floor(Math.random() * 900000 + 100000)}
                </span>
              </div>
              <div className="mt-1.5 flex justify-between">
                <span className="text-foreground/60">Status</span>
                <span className="inline-flex items-center gap-1 font-semibold text-primary">
                  <Sparkles className="h-3.5 w-3.5" /> Tercatat
                </span>
              </div>
            </div>

            <DialogFooter className="mt-6 sm:justify-center">
              <Button variant="outline" onClick={() => setStep("form")}>
                <ArrowLeft className="h-4 w-4" /> Donasi lagi
              </Button>
              <Button onClick={() => onOpenChange(false)}>Selesai</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CourierOption({
  active,
  onClick,
  icon: Icon,
  title,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-colors ${
        active ? "border-primary bg-mint-soft" : "border-border bg-card hover:border-primary/40"
      }`}
    >
      <Icon className={`mt-0.5 h-4 w-4 ${active ? "text-primary" : "text-foreground/60"}`} />
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-foreground/60">{sub}</p>
      </div>
    </button>
  );
}
