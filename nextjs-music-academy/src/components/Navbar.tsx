"use client";
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
          <MenuItem
            setActive={setActive}
            active={active}
            item="Home"
          ></MenuItem>
        </Link>
        <MenuItem setActive={setActive} active={active} item="Cources">
          <div className="flex flex-col">
            <HoveredLink href={`/courses`}>All Cources</HoveredLink>
            <HoveredLink href={`/courses`}>Basic Theory</HoveredLink>
            <HoveredLink href={`/courses`}>Composition</HoveredLink>
            <HoveredLink href={`/courses`}>Song Writing</HoveredLink>
            <HoveredLink href={`/courses`}>Music Production</HoveredLink>
          </div>
        </MenuItem>
        <Link href={`/contact-us`}>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Contact us"
          ></MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
