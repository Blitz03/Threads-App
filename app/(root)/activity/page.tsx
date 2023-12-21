import Link from "next/link";
import Image from "next/image";
import ThreadCard from "@/components/cards/ThreadCard";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { fetchThreadById } from "@/lib/actions/thread.actions";

export default async function Page() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity = await getActivity(userInfo._id);

  const threadRequests = activity.map(async (activityItem) => {
    const parentThread = await fetchThreadById(activityItem.parentId);
    return { activityItem, parentThread };
  });

  const results = await Promise.all(threadRequests);

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          results.map(({ activityItem, parentThread }) => {
            return (
              <div className="activity-card">
                <Link
                  key={activityItem._id}
                  href={`/thread/${activityItem.parentId}`}>
                  <article>
                    <div className="activity-card_header">
                      <Image
                        src={activityItem.author.image}
                        alt="Profile Picture"
                        width={20}
                        height={20}
                        className="rounded-full object-cover"
                      />

                      <p className="!text-small-regular text-light-1">
                        <span className="mr-1 text-primary-500">
                          {activityItem.author.name}
                        </span>
                        {""}
                        replied to your thread
                      </p>
                    </div>

                    <div className="mt-4 h-0.5 w-full bg-neutral-800" />
                  </article>
                </Link>
                <ThreadCard
                  key={parentThread._id}
                  id={parentThread._id}
                  currentUserId={user?.id || ""}
                  parentId={parentThread.parentId}
                  content={parentThread.text}
                  author={parentThread.author}
                  community={parentThread.community}
                  createdAt={parentThread.createdAt}
                  comments={parentThread.children}
                  isLink
                />
                <div className="mt-5">
                  <ThreadCard
                    key={activityItem._id}
                    id={activityItem._id}
                    currentUserId={user?.id || ""}
                    parentId={activityItem.parentId}
                    content={activityItem.text}
                    author={activityItem.author}
                    community={activityItem.community}
                    createdAt={activityItem.createdAt}
                    comments={activityItem.children}
                    isComment
                    isLink
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="!text-base-regular text-light-3">No activity yet</p>
        )}
      </section>
    </section>
  );
}
