"use client";

import { usePathname, useRouter } from "next/navigation";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { CommentValidation } from "@/lib/validations/thread";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

export default function Comment({
  threadId,
  currentUserImg,
  currentUserId,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    try {
      await addCommentToThread({
        threadId,
        commentText: values.thread,
        userId: JSON.parse(currentUserId),
        path: pathname,
      });

      form.reset();
    } catch (error: any) {
      throw new Error(`Error adding comment to thread: ${error.message}`);
    }
  }

  // This is the data that we'll pass to the Form component (Schema)
  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex gap-3 w-full items-center">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt={"Profile Image"}
                  width={48}
                  height={48}
                  className="rounded-full object-contain"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="Comment..."
                  {...field}
                  className="no-focus text-light-1 outline-none"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
}
