import Image from "next/image";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";
import ThreadCard from "@/components/cards/ThreadCard";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { fetchUser, fetchUserLikedPosts } from "@/lib/actions/user.actions";

import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(params.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const likedThreadsUser = await fetchUserLikedPosts(userInfo?._id);

  return (
    <section>
      <ProfileHeader
        // Pass the accountId and authUserId to check whether the account we are watching is ours or somebody else's
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="w-full tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />

                <p className="max-sm:hidden">{tab.label}</p>
                {/* TODO: make all the tabs work dynamically and change the tags to communities */}
                {tab.label === "Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="threads" className="w-full text-light-1">
            {userInfo?.threads?.length > 0 ? (
              <ThreadsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType="User"
              />
            ) : (
              <p className="!text-base-regular text-light-3 mt-9">No threads</p>
            )}
          </TabsContent>
          <TabsContent value="replies" className="w-full text-light-1">
            <section className="mt-9 flex flex-col gap-10">
              <p className="!text-base-regular text-light-3">No replies</p>
            </section>
          </TabsContent>
          <TabsContent value="liked" className="w-full text-light-1">
            <section className="mt-9 flex flex-col gap-10">
              {likedThreadsUser?.likedThreads.length > 0 ? (
                likedThreadsUser?.likedThreads.map((likedThread: any) => (
                  <ThreadCard
                    key={likedThread._id}
                    id={likedThread._id}
                    currentUserId={user?.id || ""}
                    parentId={likedThread.parentId}
                    content={likedThread.text}
                    author={likedThread.author}
                    community={likedThread.community}
                    createdAt={likedThread.createdAt}
                    comments={likedThread.children}
                    likes={likedThread.likes}
                  />
                ))
              ) : (
                <p className="!text-base-regular text-light-3">
                  No liked posts
                </p>
              )}
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
