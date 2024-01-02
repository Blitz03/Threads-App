"use client";

import { repostThread } from "@/lib/actions/thread.actions";
import Image from "next/image";

import { toast } from "sonner";

export default function RepostThread({
  currentUserId,
  threadId,
}: {
  currentUserId: string;
  threadId: string;
}) {
  async function handleClick() {
    try {
      await repostThread({ currentUserId, threadId: JSON.parse(threadId) });
    } catch (error: any) {
      throw new Error(
        `Failed to repost thread/onclick event: ${error.message}`
      );
    }
  }

  return (
    <Image
      src="/assets/repost.svg"
      alt="repost"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
      onClick={() => {
        handleClick();
        toast("Reposted thread successfully!");
      }}
    />
  );
}
