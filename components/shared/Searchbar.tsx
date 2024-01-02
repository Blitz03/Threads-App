"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Input } from "../ui/input";

export default function Searchbar({ routeType }: { routeType: string }) {
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`/${routeType}?q=` + search);
      } else {
        router.push(`/${routeType}`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, routeType]);

  return (
    <div className="searchbar">
      <Image
        src="/assets/search-gray.svg"
        alt="search"
        width={24}
        height={24}
        className="object-contain"
      />
      <Input
        id="text"
        className="no-focus searchbar_input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={
          routeType === "search" ? "Search creators" : "Search communities"
        }
      />
    </div>
  );
}
