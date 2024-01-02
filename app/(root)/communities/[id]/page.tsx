import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { communityTabs } from "@/constants";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";

import UserCard from "@/components/cards/UserCard";
import ProfileHeader from "@/components/shared/ProfileHeader";
import ThreadsTab from "@/components/shared/ThreadsTab";

import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const communityDetails = await fetchCommunityDetails(params.id);

  return (
    <section>
      <ProfileHeader
        // Pass the accountId and authUserId to check whether the account we are watching is ours or somebody else's
        accountId={communityDetails.id}
        authUserId={user.id}
        name={communityDetails.name}
        username={communityDetails.username}
        imgUrl={communityDetails.image}
        bio={communityDetails.bio}
        type="Community"
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="w-full tab">
            {communityTabs.map((tab) => (
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
                    {communityDetails?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="threads" className="w-full text-light-1">
            <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accountType="Community"
            />
          </TabsContent>
          <TabsContent value="members" className="w-full text-light-1">
            <section className="mt-9 flex flex-col gap-10">
              {communityDetails?.members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  imgUrl={member.image}
                  personType="User"
                />
              ))}
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
