import Image from "next/image";
import Link from "next/link";

import DeleteThread from "../forms/DeleteThread";
import LikeThread from "../forms/LikeThread";
import ShareLink from "../forms/ShareLink";
import RepostThread from "../forms/RepostThread";
import { formatDateString } from "@/lib/utils";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    id: string;
    image: string;
  };
  community: {
    name: string;
    id: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  // isComment is not required so we put ? after it
  isComment?: boolean;
  isLink?: boolean;
  likes: string[];
}

export default function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  isLink,
}: Props) {
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? "px-0 xs:px-7" : isLink ? "px-0 py-4" : "bg-dark-2 p-7"
      }`}>
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="user_community_image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className={`mt-5 flex flex-col gap-3 ${isComment && "mb-10"}`}>
              <div className="flex gap-3.5">
                <LikeThread
                  threadId={JSON.stringify(id)}
                  currentUserId={currentUserId}
                />

                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>

                <RepostThread
                  currentUserId={currentUserId}
                  threadId={JSON.stringify(id)}
                />

                <ShareLink threadId={JSON.stringify(id)} />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="text-subtle-medium text-gray-1">
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
        <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />
      </div>

      {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}
          <Link href={`/thread/${id}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}

      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center">
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)}
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
}
