"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { toast } from "sonner";

export default function ShareLink({ threadId }: { threadId: string }) {
  const path = `threads-app-gray.vercel.app/thread/${JSON.parse(threadId)}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src="/assets/share.svg"
          alt="share"
          width={24}
          height={24}
          className="cursor-pointer object-contain"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#09090b] border-[#27272a] outline-none">
        <DialogHeader>
          <DialogTitle className="text-white">Share link</DialogTitle>
          <DialogDescription className="text-[#909098]">
            Copy the link:
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={path}
              readOnly
              className="bg-[#09090b] border-[#27272a] text-white"
            />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3 bg-white hover:bg-[#dcdcdc]"
            onClick={() => {
              navigator.clipboard.writeText(path);
              return toast("Copied to clipboard");
            }}>
            <span className="sr-only">Copy</span>
            <Image
              src="/assets/copy-black.svg"
              alt="share"
              width={24}
              height={24}
              className="cursor-pointer object-contain"
            />
          </Button>
        </div>
        <DialogDescription className="text-[#909098]">
          Share on social media:
        </DialogDescription>
        <div className="flex items-center space-x-2">
          <FacebookShareButton url={path}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>

          <LinkedinShareButton url={path}>
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>

          <RedditShareButton url={path}>
            <RedditIcon size={32} round={true} />
          </RedditShareButton>

          <TelegramShareButton url={path}>
            <TelegramIcon size={32} round={true} />
          </TelegramShareButton>

          <TwitterShareButton url={path}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>

          <WhatsappShareButton url={path}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="bg-[#27272a] text-white hover:bg-[#1f1f21]">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
