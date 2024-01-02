"use client";

import { useState } from "react";
import Image from "next/image";

import { likeThread } from "@/lib/actions/thread.actions";

export default function LikeThread({
  threadId,
  currentUserId,
}: {
  threadId: string;
  currentUserId: string;
}) {
  const [alreadyLiked, setAlreadyLiked] = useState(false);

  async function handleClick() {
    try {
      setAlreadyLiked(await likeThread(JSON.parse(threadId), currentUserId));
    } catch (error: any) {
      throw new Error(`Failed to like thread/onclick event: ${error.message}`);
    }
  }

  return (
    <Image
      src={`/assets/${alreadyLiked ? "heart-filled.svg" : "heart-gray.svg"}`}
      alt="heart"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
      onClick={handleClick}
    />
  );
}
