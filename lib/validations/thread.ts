import * as z from "zod";

// (Schema)
export const ThreadValidation = z.object({
  thread: z.string().min(3, { message: "Minimum 3 charecters" }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  thread: z.string().min(3, { message: "Minimum 3 charecters" }),
});
