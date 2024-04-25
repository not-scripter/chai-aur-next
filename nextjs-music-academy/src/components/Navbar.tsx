"use client"
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";

export default function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <Link href={`/`}>
          <MenuItem setActive={setActive} active={active} item="Home">
          </MenuItem>
        </Link>
        <MenuItem setActive={setActive} active={active} item="Cources">
          <HoveredLink href={`/cources`}>All Cources</HoveredLink>
          <HoveredLink href={`/cources`}>Basic Theory</HoveredLink>
          <HoveredLink href={`/cources`}>Composition</HoveredLink>
          <HoveredLink href={`/cources`}>Song Writing</HoveredLink>
          <HoveredLink href={`/cources`}>Music Production</HoveredLink>
        </MenuItem>
        <Link href={`/contact`}>
          <MenuItem setActive={setActive} active={active} item="Contact us">5
          </MenuItem>
        </Link>
      </Menu>
    </div>
  )
}
