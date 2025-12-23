"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/betygskalkylator", label: "Betyg" },
  { href: "/skarmtid", label: "Skärmtid" },
  { href: "/matte-ak-3", label: "Matte åk 3" },
  { href: "/matte-ak-6", label: "Matte åk 6" },
  { href: "/matte-ak-9", label: "Matte åk 9" },
  { href: "/nationella-prov", label: "Nationella prov" },
  { href: "/gymnasieval", label: "Gymnasieval" },
];

export default function MainNav() {
  const pathname = usePathname();

  return (
    <nav
      className="
        -mx-4 px-4 pb-3
        flex items-center gap-2
        overflow-x-auto whitespace-nowrap
        [-webkit-overflow-scrolling:touch]
        scrollbar-none
      "
    >
      {links.map((link) => {
        const isActive =
          pathname === link.href ||
          pathname.startsWith(link.href + "/");

        return (
          <Link
            key={link.href}
            href={link.href}
            className={[
              "shrink-0 rounded-full px-3 py-2 text-sm transition",
              isActive
                ? "bg-white text-black shadow-sm"
                : "text-white/70 hover:bg-white/5 hover:text-white",
            ].join(" ")}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}