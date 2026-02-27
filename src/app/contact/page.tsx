"use client";

import { useState } from "react";
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

const SUBJECT_OPTIONS = [
  "Order Support",
  "Sizing Assistance",
  "Wholesale Inquiries",
  "Sponsorships",
  "Other",
];

export default function ContactPage() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: SUBJECT_OPTIONS[0],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: SUBJECT_OPTIONS[0],
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
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
                Shop
              </a>
              <a className="text-foreground hover:text-primary transition-colors text-sm font-medium" href="#">
                About
              </a>
              <a className="text-foreground hover:text-primary transition-colors text-sm font-medium" href="#">
                Community
              </a>
              <Link className="text-primary text-sm font-bold border-b-2 border-primary" href="/contact">
                Contact
              </Link>
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
                  placeholder="Find your gear..."
                />
              </div>
            </label>
            <button className="flex min-w-21 cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary-hover transition-colors">
              <Icon name="shopping_cart" className="mr-2 text-[20px]" />
              <span className="truncate italic uppercase">Cart</span>
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
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <div className="px-4 md:px-10 lg:px-40 py-10">
          <div
            className="flex min-h-[320px] flex-col gap-6 bg-cover bg-center bg-no-repeat rounded-xl items-center justify-center p-8 relative overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(rgba(26, 11, 11, 0.8) 0%, rgba(26, 11, 11, 0.95) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBb3PXf31uhpLXoa2CKg1XdlTL-_QIKEnTjTgaYuIsdiIFwqHxfPiPYvkjPLS9O9JP1PZLpTQyp88s9dKUs2IypxCy2qpUSo7kD594PoL4jE7PyA5d4s6ubf1KVbpbXUBcp_v1TwTKqGHid7r7oj8Z-g1x22lH4pQuM-aSDvQqeGlj3VK6bah8onPR_Y67BQUeG8VenLAggBxWPdlitDZSa0vPFb-U0g-j4AoIvs7DSAErOIBB9jsp0Gy7ZQ43f1WxwwmsNJVNTCL0")`,
            }}
          >
            <div className="flex flex-col gap-4 text-center max-w-2xl relative z-10">
              <h1 className="text-foreground text-4xl font-black leading-tight tracking-tight sm:text-6xl uppercase italic">
                Step into the Ring
              </h1>
              <p className="text-muted text-sm font-normal leading-relaxed sm:text-lg">
                Have questions about our pro-grade boxing gear or sizing? Our team of fighters and experts is here to assist you in finding your perfect strike.
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-sm font-bold uppercase italic tracking-wider hover:scale-105 transition-transform">
                  Browse FAQ
                </button>
                <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-white/10 text-white text-sm font-bold uppercase italic tracking-wider hover:bg-white/20 transition-all backdrop-blur-sm">
                  Support Center
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Split Contact Section */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 lg:px-40 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column: Contact Form */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-black italic uppercase text-foreground mb-2">Send a Message</h2>
              <p className="text-muted">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
            </div>

            {status === "success" && (
              <div className="rounded-lg border border-green-800 bg-green-950 p-4 text-green-300">
                Your message has been sent! We&apos;ll get back to you shortly.
              </div>
            )}
            {status === "error" && (
              <div className="rounded-lg border border-red-800 bg-red-950 p-4 text-red-300">
                Something went wrong. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-bold uppercase tracking-wider text-muted">First Name</span>
                  <input
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Rocky"
                    className="rounded-lg border border-border bg-primary/5 text-foreground focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 outline-none transition-colors"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-bold uppercase tracking-wider text-muted">Last Name</span>
                  <input
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Balboa"
                    className="rounded-lg border border-border bg-primary/5 text-foreground focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 outline-none transition-colors"
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold uppercase tracking-wider text-muted">Email Address</span>
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="champion@fistgear.com"
                  className="rounded-lg border border-border bg-primary/5 text-foreground focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 outline-none transition-colors"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold uppercase tracking-wider text-muted">Subject</span>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="rounded-lg border border-border bg-primary/5 text-foreground focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 outline-none transition-colors"
                >
                  {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-bold uppercase tracking-wider text-muted">Message</span>
                <textarea
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you today?"
                  className="rounded-lg border border-border bg-primary/5 text-foreground focus:border-primary focus:ring-1 focus:ring-primary p-4 outline-none transition-colors resize-none"
                />
              </label>

              <button
                type="submit"
                disabled={status === "sending"}
                className="bg-primary hover:bg-primary-hover text-white font-black italic uppercase py-4 rounded-lg transition-colors flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {status === "sending" ? "Sending..." : "Submit Inquiry"}
                <Icon name="send" className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

          {/* Right Column: Contact Info & Map */}
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-3xl font-black italic uppercase text-foreground mb-2">HQ Details</h2>
              <p className="text-muted">Visit us or reach out via phone and email.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3 p-6 rounded-xl bg-primary/10 border border-primary/20">
                <div className="size-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                  <Icon name="mail" />
                </div>
                <h4 className="font-bold uppercase tracking-wide text-xs text-primary">Email Support</h4>
                <p className="text-foreground font-medium">support@fistgear.com</p>
              </div>

              <div className="flex flex-col gap-3 p-6 rounded-xl bg-primary/10 border border-primary/20">
                <div className="size-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                  <Icon name="call" />
                </div>
                <h4 className="font-bold uppercase tracking-wide text-xs text-primary">Call Us</h4>
                <p className="text-foreground font-medium">+1 (800) FIST-GEAR</p>
              </div>

              <div className="col-span-full flex flex-col gap-3 p-6 rounded-xl bg-primary/10 border border-primary/20">
                <div className="size-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                  <Icon name="location_on" />
                </div>
                <h4 className="font-bold uppercase tracking-wide text-xs text-primary">Showroom Address</h4>
                <p className="text-foreground font-medium">
                  123 Knockout Blvd, Industrial District<br />Las Vegas, NV 89101
                </p>
              </div>
            </div>

            {/* Embedded Map Placeholder */}
            <div className="w-full h-80 rounded-xl overflow-hidden border-4 border-primary/20 relative">
              <div
                className="absolute inset-0 bg-surface flex items-center justify-center bg-cover bg-center"
                style={{
                  backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuDCKwyzg9No_pp5rwWRcaO2poWVquIKzKf73OimW_j316vvOg5n_S3_VwdWVQjHMV3oB4HGMYCZOCkFEX76oG_n4pdkx3KZYGHvCLPDxG2owGRsM2gpF5PbySEtYrV49LAMWy8gfMp_PgkwsTlgJTFMSMj6qXblsVMyCcRi1Krhe6Lb7HkVyOAj8ArQasv9AGsQS5-9zpn9K_kfu3CASXCIWonUZ4CY5ZKetGbEg3gvRlqikGSoi9oEz7xbj2a7UcLlwoXG-uJE-5I")`,
                }}
              >
                <div className="bg-primary text-white p-3 rounded-full shadow-lg animate-pulse">
                  <Icon name="location_on" />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-md p-3 rounded-lg border border-primary/30">
                <p className="text-xs font-bold uppercase italic text-foreground">Visit our Flagship Store</p>
                <p className="text-[10px] text-muted">Open Mon-Sat: 9AM - 8PM</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary/5 py-12 px-4 md:px-10 lg:px-40 mt-12 border-t border-primary/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Link href="/" className="flex items-center gap-4 text-primary">
            <Icon name="sports_martial_arts" className="text-3xl" />
            <h2 className="text-foreground text-lg font-black italic uppercase">Fist Gear</h2>
          </Link>
          <div className="flex gap-8">
            <a className="text-muted hover:text-primary transition-colors" href="#">
              <Icon name="brand_awareness" />
            </a>
            <a className="text-muted hover:text-primary transition-colors" href="#">
              <Icon name="podcasts" />
            </a>
            <a className="text-muted hover:text-primary transition-colors" href="#">
              <Icon name="video_library" />
            </a>
          </div>
          <p className="text-muted text-xs">&copy; 2024 Fist Gear Performance Ltd. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
