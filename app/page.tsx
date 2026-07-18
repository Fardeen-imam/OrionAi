"use client";

import { HoleBackground } from "@/components/animate-ui/components/backgrounds/hole";
import {
  BlueTitle,
  GrayTitle,
  SectionHeading,
  SectionLabel,
} from "@/components/reusable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { PricingTable, SignInButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { PLACEHOLDERS, SUGGESTIONS, FEATURES, STEPS } from "@/lib/data";
import { ArrowRight, ChevronDown, ChevronRight } from "lucide-react";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [prompt, setPrompt] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  //for rotating the placeholder
  useEffect(() => {
    if (isFocused || prompt) return;
    const t = setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(t);
  }, [isFocused, prompt]);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [prompt]);

  const handleSubmit = () => {
    if (!prompt.trim() || !isSignedIn) return;
    router.push(`/workspace?prompt=${encodeURIComponent(prompt.trim())}`);
  };
  // Sumbit on Enter, allow Shift+Enter for newLines

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestion = (s: string) => {
    setPrompt(s);
    textareaRef.current?.focus();
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] selection:bg-white/20">
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 pb-24 pt-40 text-center">
        <HoleBackground
          strokeColor="rgba(255,255,255,0.05)"
          className="absolute inset-0 h-full w-full pointer-events-none"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 50%, transparent 100%",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 50%, transparent 100%",
          }}
        />

        <Badge variant={"outline"} className="gap-2 p-4 backdrop-blur-sm">
          {" "}
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Powered by Gemini 3.5 Flash
        </Badge>

        <h1 className="mx-auto max-w-3xl text-balance font-serif text-5xl leading-tight tracking-tight sm:text-5xl lg:text-7xl z-10">
          <GrayTitle>Orion your dream</GrayTitle>
          <br />
          <BlueTitle>from a single prompt</BlueTitle>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-balance text-base leading-relaxed text-white/40 z-10">
          Describe what you want to build. AI writes the code, picks the
          packages, and renders a live preview inside your browser.
        </p>

        {/* Prompt Box */}
        <div className="relative mx-auto mt-12 w-full max-w-2xl">
          <div
            className={cn(
              "rounded-2xl border bg-[#111111] duration-200",
              isFocused
                ? "border-white/20 ring-1 ring-white/80"
                : "border-white/8",
            )}
          >
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              rows={1}
              placeholder={PLACEHOLDERS[placeholderIndex]}
              className="bg-transparent 
              w-full resize-none px-5 pb-4 pt-5 text-sm
              placeholder:text-white/20 focus:outline-none sm:text-base"
              style={{ minHeight: 56, maxHeight: 200 }}
            />
            <div className="flex items-center justify-between border-t border-white/6 px-4 py-2.5">
              <span className="text-xs text-white/20">
                Press enter to generate. Shift + enter for new line
              </span>
              {isSignedIn ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!prompt.trim()}
                  className="h-8 rounded-full px-5 font-semibold"
                  variant={prompt.trim() ? "default" : "secondary"}
                >
                  Generate
                </Button>
              ) : (
                <SignInButton mode="modal">
                  <Button className="h-8 rounded-full bg-white px-5 font semibold cursor-pointer">
                    {" "}
                    Generate
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestion(s)}
                className="rounded-full border border-white/8 bg-white/4 px-3 py-1.5 tex-xs text-white/40 hover:border-white/15 hover:bg-white/8 hover:text-white/70"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-10 text-xs text-white/20">
          No credit card required - 10 free generations on sign up
        </p>
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 pb-24">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#090909]/95 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]">
          <div className="border-b border-white/10 bg-[#0f0f0f]/95 px-5 py-4 backdrop-blur-sm">
            <div className="mx-auto flex max-w-3xl items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] shadow-[0_0_0_4px_rgba(255,95,86,0.12)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] shadow-[0_0_0_4px_rgba(255,189,46,0.12)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] shadow-[0_0_0_4px_rgba(39,201,63,0.12)]" />
              </div>
              <div className="mx-auto flex max-w-[600px] flex-1 items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/50">
                orionai.app/workspace
              </div>
            </div>
          </div>

          <div className="grid gap-6 px-6 py-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="flex min-h-[520px] flex-col rounded-3xl border border-white/10 bg-[#0d0d0d] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-white/30">
                    Chat
                  </p>
                  <h2 className="mt-2 text-xl font-semibold text-white">
                    Workspace assistant
                  </h2>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/50">
                  AI · Draft mode
                </div>
              </div>

              <div className="space-y-4 overflow-hidden rounded-3xl border border-white/10 bg-[#111111] p-5">
                <div className="rounded-3xl bg-white/5 p-4 text-sm text-white/90 shadow-[0_10px_30px_-24px_rgba(255,255,255,0.35)]">
                  <p className="font-medium text-white">
                    Can you scaffold the new dashboard layout for the team
                    workspace?
                  </p>
                  <p className="mt-2 text-sm text-white/60">
                    Show a split view with chat on the left and a kanban preview
                    on the right.
                  </p>
                </div>
                <div className="rounded-3xl bg-[#141414] p-4 text-sm text-white/80 shadow-[0_10px_30px_-24px_rgba(255,255,255,0.2)]">
                  <p className="font-medium text-white">
                    Absolutely. I’ll prepare the layout and include column
                    cards, tabs, and a realistic input flow.
                  </p>
                </div>
                <div className="rounded-3xl bg-[#161616] p-4 text-sm text-white/80 shadow-[0_10px_30px_-24px_rgba(255,255,255,0.18)]">
                  <div className="mb-3 font-medium text-white">
                    Sure, here’s the preview.
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/60 animate-pulse" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/40 animate-pulse delay-75" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20 animate-pulse delay-150" />
                    Typing...
                  </div>
                </div>
              </div>

              <div className="mt-auto rounded-3xl border border-white/10 bg-[#111111]/80 p-4">
                <div className="mb-3 flex items-center gap-2 text-xs text-white/40">
                  <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
                  Ready to send your next idea
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#121212] px-4 py-3 text-sm text-white/60">
                  <span className="flex-1 text-white/40">Type a message…</span>
                  <span className="rounded-full bg-slate-700 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/60">
                    Send
                  </span>
                </div>
              </div>
            </div>

            <div className="flex min-h-[520px] flex-col rounded-3xl border border-white/10 bg-[#0d0d0d] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
              <div className="mb-5 flex items-center gap-3 rounded-3xl border border-white/10 bg-[#111111]/90 px-4 py-3">
                <button className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
                  Overview
                </button>
                <button className="rounded-2xl px-4 py-2 text-sm text-white/40 hover:text-white/80">
                  Files
                </button>
                <button className="rounded-2xl px-4 py-2 text-sm text-white/40 hover:text-white/80">
                  Preview
                </button>
              </div>

              <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#111111]/95 p-5">
                <div className="mb-5 flex items-center justify-between text-sm text-white/50">
                  <span>Kanban preview</span>
                  <span>Updated just now</span>
                </div>
                <div className="grid gap-4 lg:grid-cols-3">
                  {[
                    {
                      title: "Todo",
                      accent: "bg-sky-500/15 text-sky-300",
                      cards: ["Align design tokens", "Add real-time chat"],
                    },
                    {
                      title: "In Progress",
                      accent: "bg-violet-500/15 text-violet-300",
                      cards: ["Build workspace mockup"],
                    },
                    {
                      title: "Done",
                      accent: "bg-emerald-500/15 text-emerald-300",
                      cards: ["Finalize hero copy", "Create browser chrome"],
                    },
                  ].map((column) => (
                    <div
                      key={column.title}
                      className="rounded-3xl bg-[#121212] p-4 shadow-[0_20px_50px_-40px_rgba(0,0,0,0.8)]"
                    >
                      <div className="mb-4 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-white/40">
                        <span>{column.title}</span>
                        <span className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-white/50">
                          {column.cards.length}
                        </span>
                      </div>
                      <div className="space-y-3">
                        {column.cards.map((card) => (
                          <div
                            key={card}
                            className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/80"
                          >
                            <div className="mb-2 h-3.5 w-24 rounded-full bg-white/10" />
                            <p>{card}</p>
                          </div>
                        ))}
                        <div className="rounded-3xl border border-dashed border-white/10 bg-white/5/40 p-4 text-sm text-white/40">
                          + Add card
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 pb-32">
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <SectionLabel>Everything you need</SectionLabel>
          <SectionHeading gray="From prompt" blue="to production." />
        </div>

        {/* <div className="mx-auto grid max-w-5xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/6 bg-white/6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: FeatureIcon, label, desc }) => {
            return (
              <div
                key={label}
                className="group bg-[#0a0a0a] p-7 hover:bg-[#0f0f0f]"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-whtie/4 group-hover:border-white/15 group-hover:bg-white/8">
                  <Icon className="h-4 w-4 text-white/60 group-hover:text-blue-400/70"></Icon>
                </div>
                <p className="mb-2 text-sm font-semibold">{label}</p>
                <p className="text-sm leading-relaxed text-white/40">{desc}</p>
              </div>
            );
          })}
        </div> */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/6 bg-white/6 sm:grid-cols-2 lg:grid-cols-3">
          {/* 🟢 Destructure lowercase 'icon' and alias it to uppercase 'FeatureIcon' */}
          {FEATURES.map(({ icon: FeatureIcon, label, desc }) => {
            return (
              <div
                key={label}
                className="group bg-[#0a0a0a] p-7 hover:bg-[#0f0f0f]"
              >
                {/* Fixed typo: bg-whtie/4 ➡️ bg-white/4 */}
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/4 group-hover:border-white/15 group-hover:bg-white/8">
                  {/* 🟢 Render 'FeatureIcon' conditionally if it exists */}
                  {FeatureIcon && (
                    <FeatureIcon className="h-4 w-4 text-white/60 group-hover:text-blue-400/70" />
                  )}
                </div>
                <p className="mb-2 text-sm font-semibold">{label}</p>
                <p className="text-sm leading-relaxed text-white/40">{desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-4 pb-32">
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <SectionLabel>\How it works</SectionLabel>
          <SectionHeading gray="Four steps" blue="to a working app." />
        </div>
        <div className="mx-auto max-w-3xl">
          {STEPS.map((step, i) => (
            <div key={step.number} className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/4">
                  <span className="font-mono text-xs font-semibold text-white/50">
                    {step.number}
                  </span>
                </div>

                {i < STEPS.length - 1 && (
                  <div className="mt-2 h-full w-px bg-white/6"></div>
                )}
              </div>
              <div className="pb-10 pt-1.5">
                <p className="mb-1.5 text-sm font-semibold sm:text-base">
                  {step.label}
                </p>
                <p className="text-sm leading-relaxed text-white/40">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="px-4 pb-32">
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <SectionLabel>Simple Pricing</SectionLabel>
          <SectionHeading
            gray="Start Free,"
            blue="scale when ready."
          ></SectionHeading>

          <p className="mx-auto mt-4 max-w-sm text-sm text-white/35">
            No crdit card required. Upgrade or downgrade anytime
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <PricingTable
            checkoutProps={{
              appearance: {
                elements: {
                  drawerRoot: {
                    zIndex: 2000,
                  },
                },
              },
            }}
          />
        </div>
      </section>

      <section className="relative mx-auto mb-32 max-w-5xl overflow-hidden rounded-2xl border border-white/8 px-10 py-24 text-center">
        <HoleBackground
          strokeColor="rgba(255,255,255,0.05)"
          className="absolute inset-0 h-full w-full pointer-events-none"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 50%, transparent 100%",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.5) 50%, transparent 100%",
          }}
        />
        <SectionHeading gray="Start building," blue="for free." />
        <p className="mb-8 text-sm leading-relaxed text-white/40">
          Get 10 free generations on sign up. No credit card required.
          <br />
          Upgrade when you&apos; re ready.
        </p>

        <SignInButton mode="modal">
          <Button
            size="lg"
            className="relative h-11 rounded-full bg-white px-8"
          >
            {" "}
            Get started for free <ChevronRight className="h-4 w-4" />
          </Button>
        </SignInButton>
      </section>
      <footer className="relative z-10 border-t border-white/7 py-12 mx-auto px-6 flex flex-wrap items-center justify-center text-stone-400">
        {" "}
        All rights reserved @2026
      </footer>
    </main>
  );
}
