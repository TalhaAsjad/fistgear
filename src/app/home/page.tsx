"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <span className={`material-symbols-outlined ${className ?? ""}`}>
      {name}
    </span>
  );
}

export default function Home() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <div className="bg-background text-foreground">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-solid border-border bg-background/95 backdrop-blur-sm px-4 md:px-10 lg:px-40 py-3">
        <div className="mx-auto flex max-w-300 items-center justify-between whitespace-nowrap">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-primary">
              <Icon name="sports_martial_arts" className="text-3xl" />
              <h2 className="text-foreground text-xl font-black leading-tight tracking-tighter">
                FIST GEAR
              </h2>
            </Link>
            <nav className="hidden lg:flex items-center gap-9">
              <a className="text-foreground hover:text-primary transition-colors text-sm font-medium" href="#">
                Pro Series
              </a>
              <a className="text-foreground hover:text-primary transition-colors text-sm font-medium" href="#">
                Sparring
              </a>
              <a className="text-foreground hover:text-primary transition-colors text-sm font-medium" href="#">
                Bag Work
              </a>
              <a className="text-foreground hover:text-primary transition-colors text-sm font-medium" href="#">
                Apparel
              </a>
            </nav>
          </div>
          <div className="flex flex-1 justify-end gap-4 md:gap-6">
            <label className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div className="text-primary/70 flex border-none bg-surface items-center justify-center pl-4 rounded-l-lg">
                  <Icon name="search" className="text-[20px]" />
                </div>
                <input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-foreground focus:outline-0 focus:ring-1 focus:ring-primary border-none bg-surface placeholder:text-primary/40 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal"
                  placeholder="Search gear..."
                />
              </div>
            </label>
            <div className="flex gap-2">
              <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-surface text-foreground hover:bg-border transition-colors cursor-pointer">
                <Icon name="favorite" />
              </button>
              <button className="flex min-w-21 cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors">
                <Icon name="shopping_cart" className="mr-2 text-[20px]" />
                <span className="truncate">Cart</span>
              </button>
              <button
                onClick={handleSignOut}
                className="flex cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-surface text-foreground text-sm font-bold hover:bg-red-500/20 hover:text-red-400 transition-colors border border-border"
              >
                <Icon name="logout" className="mr-2 text-[20px]" />
                <span className="truncate">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-300 px-4 md:px-10 lg:px-40">
        {/* Hero Section */}
        <section className="mt-6">
          <div className="relative overflow-hidden rounded-xl bg-surface">
            <div
              className="flex min-h-130 flex-col gap-8 bg-cover bg-center bg-no-repeat items-start justify-end px-6 pb-12 sm:px-12"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(26, 11, 11, 0.9) 0%, rgba(26, 11, 11, 0.2) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCo_KgfTkeWR8VKveZQ2iDqn8ZNlPgdA5AQrpvVddUhLTSnH0ctvYsoHoQH6L9o5IlaeAFC00950PwTpkSpZxiIl3UCN8stV-bStCnXRn7UN3NE7wPn1KxrHw4I20ec1GUxPU7hc5W85Qw5MVRVa9gdCP-YKY-zgvKsBTFx81Yi9s2v1363wKLop886OhCRy4CZOTCjAREvJM6aVmvKho1U_jjbd4FRIFCu91J6NFr9B0eOzTUDVk9BELm-C1-jnzWrqelUw-sRPFI")`,
              }}
            >
              <div className="flex flex-col gap-4 text-left max-w-2xl">
                <div className="inline-flex items-center self-start rounded-full bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary border border-primary/30">
                  New Arrival: V3 Apex
                </div>
                <h1 className="text-foreground text-5xl font-black leading-none tracking-tight sm:text-7xl uppercase italic">
                  Engineered for <span className="text-primary">Impact</span>
                </h1>
                <p className="text-muted text-base font-normal leading-relaxed sm:text-lg">
                  Professional-grade equipment designed for those who demand
                  ultimate hand protection and uncompromising performance in the
                  ring.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="flex min-w-40 cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-black uppercase italic tracking-wider hover:bg-primary-hover transition-all transform hover:scale-105">
                  Shop Now
                </button>
                <button className="flex min-w-40 cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-transparent border-2 border-foreground text-foreground text-base font-black uppercase italic tracking-wider hover:bg-white hover:text-background transition-all">
                  View Catalog
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Collections */}
        <section className="py-12">
          <div className="flex items-end justify-between mb-8 px-2">
            <div>
              <h2 className="text-primary text-xs font-bold uppercase tracking-widest mb-1">
                Combat Categories
              </h2>
              <h3 className="text-foreground text-3xl font-black uppercase italic">
                Featured Collections
              </h3>
            </div>
            <a
              className="text-muted hover:text-primary text-sm font-bold flex items-center gap-1 transition-colors"
              href="#"
            >
              View All <Icon name="arrow_forward" className="text-sm" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Collection Card 1 */}
            <div className="group relative overflow-hidden rounded-xl bg-surface aspect-4/5 cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(26, 11, 11, 0.9) 0%, rgba(26, 11, 11, 0) 50%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCN-3HJyB0gbvhKIcdyFI0nKWB0f8bnD9YKyRD_rT_xfCkX71AQt2Afi4We-6hBIgiZ1je0KsHdr3YSaM3kUVedh_W0RpZtJzAuMJ4GtrhHlwubpn2iV4d95fl0AvB2VX7PupCCzhdmooXcdLauFJ2gi6QCINvoY2aFjWAtvvVQ6iKP8Gs1e6SiqEfLZnKuXg7MtrnQH1lE92gGD65k0ShcxoLyaXYiQuXhIxDIMWF2HNFt6SYFDuH5TDzHq8I4LYaeYxn3ml9dAwc")`,
                }}
              />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <p className="text-foreground text-2xl font-black uppercase italic tracking-tighter group-hover:text-primary transition-colors">
                  Pro Series
                </p>
                <p className="text-muted text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Competition ready precision
                </p>
              </div>
            </div>
            {/* Collection Card 2 */}
            <div className="group relative overflow-hidden rounded-xl bg-surface aspect-4/5 cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(26, 11, 11, 0.9) 0%, rgba(26, 11, 11, 0) 50%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCqffce8ch9N1Rg03NLVcUAekPe-qfXCt3Dt6V3wnKm7fFYFXyob7MrN44P7TWiu0m3YXQFNhCeef5RIPRrwTXW8q2YQHHk1tj5f1R1wVopyOaOrs7tTwybTIaZDz1bBmDX_Kj0ezGSTUBW8Q2x2biaaO8hCNgObgOoazVhdMqALqqBgaRNY89ak7W1k-CsaHb6chz-Kbclg5ahnVzapkhkx5tKJ2KtsalgD9KPFqIgHQFghjhVXrftlEQetnU46J6QpykqBF9EDrE")`,
                }}
              />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <p className="text-foreground text-2xl font-black uppercase italic tracking-tighter group-hover:text-primary transition-colors">
                  Sparring Essentials
                </p>
                <p className="text-muted text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Maximum protection for partners
                </p>
              </div>
            </div>
            {/* Collection Card 3 */}
            <div className="group relative overflow-hidden rounded-xl bg-surface aspect-4/5 cursor-pointer">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `linear-gradient(0deg, rgba(26, 11, 11, 0.9) 0%, rgba(26, 11, 11, 0) 50%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDJw_LMJh3NHMr6MbhURbgu0h1UlC28fh7Gdv_Xollwh0zzZ5EqwPANiAIKsaXkrGQYYApS7bCblVnBC6a8OrO97MWMl6guCSKua8ivOdBFbEPzxmrWq0vLBKVYD0gvBXwQUSrEbdSilTarotGrXXUL1uGs5wrqbckcY_gqi4vxSydr12kiYAindCSANBpgEQkbCRpOPJSoOXVqRsz26IGhEkVYrSpHBfXzNcOwIDbp2l-dXFIGpCg7GcUBosZRln1jYqTYmZkqfLk")`,
                }}
              />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <p className="text-foreground text-2xl font-black uppercase italic tracking-tighter group-hover:text-primary transition-colors">
                  Bag Work Gold
                </p>
                <p className="text-muted text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  High-density impact absorption
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us / Features */}
        <section className="py-16 border-y border-border my-10">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex flex-col gap-6 flex-1">
              <div className="inline-flex h-1 w-20 bg-primary" />
              <h2 className="text-foreground text-4xl font-black uppercase italic leading-none sm:text-5xl">
                Built for the <br />
                <span className="text-primary underline decoration-primary/30">
                  Grind
                </span>
              </h2>
              <p className="text-muted text-lg leading-relaxed max-w-150">
                At Fist Gear, we don&apos;t just make gloves. We engineer combat
                solutions. Every stitch and layer of padding is tested in the
                harshest gym environments to ensure your hands stay protected
                through every round.
              </p>
              <div className="flex flex-col gap-6 mt-4">
                <div className="flex gap-4 items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface border border-primary/20 text-primary">
                    <Icon name="shield" className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold uppercase tracking-tight">
                      Superior Hand Protection
                    </h4>
                    <p className="text-muted text-sm">
                      Quad-layer anatomical foam padding reduces shock by 40%
                      more than industry standards.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface border border-primary/20 text-primary">
                    <Icon name="fitness_center" className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold uppercase tracking-tight">
                      Industrial-Grade Leather
                    </h4>
                    <p className="text-muted text-sm">
                      Full-grain cowhide leather that gets better with every
                      session. Built to never rip.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface border border-primary/20 text-primary">
                    <Icon name="air" className="text-2xl" />
                  </div>
                  <div>
                    <h4 className="text-foreground font-bold uppercase tracking-tight">
                      Vapor-Flow Cooling
                    </h4>
                    <p className="text-muted text-sm">
                      Integrated palm mesh system and moisture-wicking lining
                      keep your grip dry and cool.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full max-w-125">
              <div className="relative rounded-2xl overflow-hidden border-2 border-primary/20 aspect-square">
                <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
                <div className="absolute inset-0 bg-linear-to-tr from-background to-transparent opacity-60" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Detail of high quality boxing glove stitching"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtqiLjx2nhv7hqKDDmcTt9AZJxY_j6vXxYRBsr1yEUtjyD_sB-KNwb4sJTQ7eYKDywOxr0ZhZyMoBZRdL6v-yl8pZCEy3rZ1cMjU-nEzOW4ykTwnx1Q8cMHDNqTIUVzdYqKcm4PpSz1SQv9E7LSCwRWm0lhVSNO9_DMRieeBDljvzwWKjBrMQtI8CFW4jm8jCo9k0biJ9wdQKZ6EvqWVkjS6Q-wUG5XXEMSiSFy-Tdou-Tiaor1C_w3EM3McEUwDCHM43DQxaEAaI"
                />
                <div className="absolute bottom-6 right-6 bg-primary text-white p-4 rounded-lg font-black italic uppercase shadow-xl">
                  Since 2014
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-12 mb-10">
          <div className="rounded-2xl bg-surface p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-border">
            <div className="max-w-md">
              <h3 className="text-2xl font-black italic uppercase text-foreground mb-2">
                Join the Inner Circle
              </h3>
              <p className="text-muted">
                Get early access to pro-series drops, training tips from elite
                coaches, and exclusive 10% off your first order.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                className="bg-background border border-border text-foreground rounded-lg px-4 py-3 w-full md:w-64 focus:ring-primary focus:border-primary focus:outline-none"
                placeholder="Enter your email"
                type="email"
              />
              <button className="bg-primary hover:bg-primary-hover text-white font-bold uppercase italic px-6 py-3 rounded-lg transition-colors whitespace-nowrap cursor-pointer">
                Sign Up
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-10">
        <div className="mx-auto max-w-300 px-4 md:px-10 lg:px-40 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1">
              <div className="flex items-center gap-2 text-primary mb-6">
                <Icon name="sports_martial_arts" className="text-3xl" />
                <h2 className="text-foreground text-xl font-black leading-tight tracking-tighter">
                  FIST GEAR
                </h2>
              </div>
              <p className="text-muted text-sm leading-relaxed mb-6">
                Premium equipment for those who treat the ring like their second
                home. Quality without compromise.
              </p>
              <div className="flex gap-4">
                <a className="text-muted hover:text-primary transition-colors" href="#">
                  <Icon name="social_leaderboard" />
                </a>
                <a className="text-muted hover:text-primary transition-colors" href="#">
                  <Icon name="photo_camera" />
                </a>
                <a className="text-muted hover:text-primary transition-colors" href="#">
                  <Icon name="video_library" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-foreground font-black italic uppercase mb-6 text-sm tracking-widest">
                Shop
              </h4>
              <ul className="space-y-4 text-sm text-muted">
                <li><a className="hover:text-primary transition-colors" href="#">Pro Series</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Sparring Gear</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Bag Work</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Training Apparel</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-foreground font-black italic uppercase mb-6 text-sm tracking-widest">
                Support
              </h4>
              <ul className="space-y-4 text-sm text-muted">
                <li><a className="hover:text-primary transition-colors" href="#">Shipping Info</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Returns & Exchanges</a></li>
                <li><a className="hover:text-primary transition-colors" href="#">Sizing Guide</a></li>
                <li>
                  <Link className="hover:text-primary transition-colors" href="/contact">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-foreground font-black italic uppercase mb-6 text-sm tracking-widest">
                Location
              </h4>
              <div className="text-sm text-muted mb-4">
                <p>1240 Industrial Way</p>
                <p>Detroit, MI 48201</p>
              </div>
              <p className="text-xs text-muted/60">
                Global shipping available for all professional athletes.
              </p>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted/60 uppercase tracking-widest">
              &copy; 2024 Fist Gear Corp. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-muted/60 uppercase tracking-widest">
              <a className="hover:text-foreground transition-colors" href="#">Privacy Policy</a>
              <a className="hover:text-foreground transition-colors" href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
