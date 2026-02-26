"use client";

import { useState } from "react";
import Link from "next/link";

function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <span className={`material-symbols-outlined ${className ?? ""}`}>
      {name}
    </span>
  );
}

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      {/* Minimal Header */}
      <header className="w-full border-b border-border bg-background/95 backdrop-blur-sm px-4 md:px-10 lg:px-40 py-3">
        <div className="mx-auto flex max-w-300 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <Icon name="sports_martial_arts" className="text-3xl" />
            <h2 className="text-foreground text-xl font-black leading-tight tracking-tighter">
              FIST GEAR
            </h2>
          </Link>
          <p className="text-muted text-xs uppercase tracking-widest hidden sm:block">
            Professional Boxing Equipment
          </p>
        </div>
      </header>

      {/* Main Auth Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border bg-surface">
          {/* Left Panel — Branding / Hero */}
          <div
            className="relative hidden lg:flex flex-col justify-between p-10 bg-cover bg-center min-h-[640px]"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(26, 11, 11, 0.95) 0%, rgba(26, 11, 11, 0.5) 50%, rgba(26, 11, 11, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCo_KgfTkeWR8VKveZQ2iDqn8ZNlPgdA5AQrpvVddUhLTSnH0ctvYsoHoQH6L9o5IlaeAFC00950PwTpkSpZxiIl3UCN8stV-bStCnXRn7UN3NE7wPn1KxrHw4I20ec1GUxPU7hc5W85Qw5MVRVa9gdCP-YKY-zgvKsBTFx81Yi9s2v1363wKLop886OhCRy4CZOTCjAREvJM6aVmvKho1U_jjbd4FRIFCu91J6NFr9B0eOzTUDVk9BELm-C1-jnzWrqelUw-sRPFI")`,
            }}
          >
            <div>
              <div className="inline-flex items-center rounded-full bg-primary/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary border border-primary/30">
                Members Only
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-foreground text-4xl font-black leading-none tracking-tight uppercase italic">
                Step Into <br />
                The <span className="text-primary">Ring</span>
              </h1>
              <p className="text-muted text-sm leading-relaxed max-w-sm">
                Join the Fist Gear community. Get access to pro-series drops,
                exclusive deals, and training content from elite fighters.
              </p>
              <div className="flex gap-6 mt-4">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-primary text-2xl font-black">10K+</span>
                  <span className="text-muted text-[10px] uppercase tracking-widest">Fighters</span>
                </div>
                <div className="w-px bg-border" />
                <div className="flex flex-col items-center gap-1">
                  <span className="text-primary text-2xl font-black">500+</span>
                  <span className="text-muted text-[10px] uppercase tracking-widest">Gyms</span>
                </div>
                <div className="w-px bg-border" />
                <div className="flex flex-col items-center gap-1">
                  <span className="text-primary text-2xl font-black">50+</span>
                  <span className="text-muted text-[10px] uppercase tracking-widest">Countries</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel — Form */}
          <div className="flex flex-col justify-center p-8 md:p-12">
            {/* Tab Toggle */}
            <div className="flex rounded-lg bg-background p-1 mb-8">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 py-2.5 text-sm font-bold uppercase italic tracking-wider rounded-md transition-all cursor-pointer ${
                  mode === "login"
                    ? "bg-primary text-white shadow-lg"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setMode("signup")}
                className={`flex-1 py-2.5 text-sm font-bold uppercase italic tracking-wider rounded-md transition-all cursor-pointer ${
                  mode === "signup"
                    ? "bg-primary text-white shadow-lg"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Sign Up
              </button>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-black italic uppercase text-foreground">
                {mode === "login" ? "Welcome Back" : "Join the Fight"}
              </h2>
              <p className="text-muted text-sm mt-1">
                {mode === "login"
                  ? "Sign in to access your account and gear."
                  : "Create your account and start shopping pro gear."}
              </p>
            </div>

            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* Name fields — only for signup */}
              {mode === "signup" && (
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted">
                      First Name
                    </span>
                    <input
                      type="text"
                      placeholder="Rocky"
                      className="rounded-lg border border-border bg-primary/5 text-foreground focus:border-primary focus:ring-1 focus:ring-primary h-11 px-4 outline-none transition-colors text-sm"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted">
                      Last Name
                    </span>
                    <input
                      type="text"
                      placeholder="Balboa"
                      className="rounded-lg border border-border bg-primary/5 text-foreground focus:border-primary focus:ring-1 focus:ring-primary h-11 px-4 outline-none transition-colors text-sm"
                    />
                  </label>
                </div>
              )}

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  Email Address
                </span>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/50">
                    <Icon name="mail" className="text-[18px]" />
                  </div>
                  <input
                    type="email"
                    placeholder="champion@fistgear.com"
                    className="rounded-lg border border-border bg-primary/5 text-foreground focus:border-primary focus:ring-1 focus:ring-primary h-11 pl-10 pr-4 w-full outline-none transition-colors text-sm"
                  />
                </div>
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-muted">
                  Password
                </span>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/50">
                    <Icon name="lock" className="text-[18px]" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="rounded-lg border border-border bg-primary/5 text-foreground focus:border-primary focus:ring-1 focus:ring-primary h-11 pl-10 pr-11 w-full outline-none transition-colors text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors cursor-pointer"
                  >
                    <Icon
                      name={showPassword ? "visibility_off" : "visibility"}
                      className="text-[18px]"
                    />
                  </button>
                </div>
              </label>

              {mode === "signup" && (
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    Confirm Password
                  </span>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/50">
                      <Icon name="lock" className="text-[18px]" />
                    </div>
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      className="rounded-lg border border-border bg-primary/5 text-foreground focus:border-primary focus:ring-1 focus:ring-primary h-11 pl-10 pr-4 w-full outline-none transition-colors text-sm"
                    />
                  </div>
                </label>
              )}

              {mode === "login" && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-border bg-primary/5 text-primary accent-primary cursor-pointer"
                    />
                    <span className="text-xs text-muted">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-xs text-primary hover:text-primary-hover transition-colors font-medium"
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              {mode === "signup" && (
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mt-0.5 rounded border-border bg-primary/5 text-primary accent-primary cursor-pointer"
                  />
                  <span className="text-xs text-muted leading-relaxed">
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>
              )}

              <Link href="/home">
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white font-black italic uppercase py-3 rounded-lg transition-all flex items-center justify-center gap-2 group hover:scale-[1.02] cursor-pointer text-sm tracking-wider"
                >
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <Icon
                    name="arrow_forward"
                    className="text-[18px] group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </Link>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted uppercase tracking-widest">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Social Login */}
            <div className="flex flex-col gap-3">
              <button className="w-full flex items-center justify-center gap-3 rounded-lg border border-border bg-background hover:bg-surface-light h-11 text-foreground text-sm font-medium transition-colors cursor-pointer">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
              <button className="w-full flex items-center justify-center gap-3 rounded-lg border border-border bg-background hover:bg-surface-light h-11 text-foreground text-sm font-medium transition-colors cursor-pointer">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.18 0-.36-.02-.53-.06-.01-.18-.02-.36-.02-.54 0-1.13.535-2.34 1.217-3.08.34-.39.826-.75 1.397-1.02.57-.27 1.11-.42 1.62-.46.01.18.02.36.02.55h-.54zm4.565 17.46c-.27.63-.56 1.23-.9 1.8-.49.82-1.25 1.84-2.15 1.85-.81.01-1.07-.53-2.22-.52-1.15.01-1.44.53-2.25.52-.9-.01-1.59-.94-2.08-1.76-1.37-2.3-2.42-6.5-.99-9.34.7-1.38 1.97-2.27 3.34-2.29 .86-.01 1.68.58 2.21.58.53 0 1.52-.72 2.56-.61.44.02 1.66.18 2.44 1.34-.06.04-1.46.85-1.44 2.54.02 2.02 1.77 2.69 1.79 2.7-.02.06-.28.96-.87 1.9l.57-.02.03.31z"/>
                </svg>
                Continue with Apple
              </button>
            </div>

            <p className="text-center text-xs text-muted mt-6">
              {mode === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={() => setMode("signup")}
                    className="text-primary font-bold hover:underline cursor-pointer"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="text-primary font-bold hover:underline cursor-pointer"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-border py-6 px-4 md:px-10 lg:px-40">
        <div className="mx-auto max-w-300 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-muted/60 uppercase tracking-widest">
            &copy; 2024 Fist Gear Corp. All rights reserved.
          </p>
          <div className="flex gap-6 text-[10px] text-muted/60 uppercase tracking-widest">
            <a className="hover:text-foreground transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-foreground transition-colors" href="#">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
