"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import React from "react";
import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs";
import { Button } from "./ui/button";
import PricingModal from "./PricingModal";
import { PLANS } from "@/lib/constants";
import type { Plan } from "@/types/plan";

interface Props {
  user: null | { credits: number; plan: Plan };
}

const HeaderClient = ({ user }: Props) => {
  return (
    <>
      <Show when="signed-in">
        <Link
          href={"/projects"}
          className="text -[13px] font-medium text-white/40 transition-colors hover:text-white/80"
        >
          Projects
        </Link>
        {user && (
          <PricingModal>
            <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-xs text-white/70">
              <Zap className="h-3 w-3 fill-white/70" />
              {user.credits} / {PLANS[user.plan].credits} credits
            </span>
          </PricingModal>
        )}
        <UserButton />
      </Show>

      <Show when="signed-out">
        <SignInButton mode="modal">
          <Button
            variant="ghost"
            size="sm"
            className={"text-white/40 cursor-pointer hover:text-white/80"}
          >
            Sign in
          </Button>
        </SignInButton>
        <SignUpButton mode="modal">
          <Button
            size="sm"
            className={
              "h-8 rounded-full font-semibold active:scale-95  cursor-pointer px-4 pt-0.3"
            }
          >
            Get Started
            <ArrowRight className="h-3 w-3 opacity-60" />
          </Button>
        </SignUpButton>
      </Show>
    </>
  );
};

export default HeaderClient;
