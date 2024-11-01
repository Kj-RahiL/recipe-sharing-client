/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Avatar } from "@nextui-org/react";
import { useGetAllRecipe } from "@/hooks/recipe.hook";
import { useUser } from "@/context/user.provider";
import { TRecipe } from "@/types";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetSingleUser } from "@/hooks/user.hook";
import ShareComponent from "./ShareComponent";

const FeedCard = ({ searchParams }: any) => {
  const { searchTerm, sortOption } = searchParams;
  const { user } = useUser();
  const { data: userData } = useGetSingleUser(user?.id as string);

  const router = useRouter();

  // Fetch all recipes using the hook
  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useGetAllRecipe(searchTerm, sortOption);
  const recipes = data?.pages.flatMap((page: any) => page.data) || [];
  console.log(recipes);

  const handleFeedClick = (id: string) => router.push(`/feed/${id}`);
  const handleUserClick = (id: string) => router.push(`/user/${id}`);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load recipes.</p>;

  return (
    <InfiniteScroll
      dataLength={recipes ? recipes?.length : 0}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<p>Loading more recipes...</p>}
    >
      <div className="grid grid-cols-1">
        {recipes?.map((feed: TRecipe) => (
          <div
            key={feed?._id}
            className="p-4 mb-10 rounded-lg shadow-md cursor-pointer dark:bg-gray-900 dark:text-white light:bg-white"
          >
            <div
              className="flex items-center mb-4"
              onClick={() => handleUserClick(feed.author._id!)}
            >
              <Avatar
                src={feed?.author?.image}
                alt={feed.author?.name}
                size="md"
                className="rounded-full"
              />
              <div className="ml-3">
                <p className="font-bold text-lg">{feed.author?.name}</p>
                <p className="text-gray-500 text-sm">{feed.author?.email}</p>
              </div>
            </div>

            <div onClick={() => handleFeedClick(feed._id)}>
              {/* Apply blur only when premium and user is not paid */}
              <div
                className={`relative ${
                  feed.isPremium && !userData?.data?.isPaid
                    ? "blur-sm brightness-150"
                    : ""
                }`}
              >
                <span className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center space-x-1">
                  <span>{feed?.difficulty}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <p className="absolute top-10 right-3 bg-green-500 text-white text-xs px-3 py-2 rounded-full flex items-center space-x-1">{feed.cookingTime} min</p>
                <Image
                  src={feed.image}
                  alt={feed.title}
                  width={600}
                  height={300}
                  className="rounded-lg h-64 md:h-96 mb-3 object-cover"
                />

                {/* Exclusive overlay (better contrast and visibility) */}
                {feed.isPremium && !userData?.data?.isPaid && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent navigation to recipe details
                      router.push("/payment"); // Redirect to payment page
                    }}
                    className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-lg cursor-pointer"
                  >
                    <span
                      className="relative z-10 text-white text-2xl font-extrabold shadow-lg px-4 py-2 rounded-md"
                      style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
                    >
                      Exclusive - Click to Access
                    </span>
                  </div>
                )}

                {/* Recipe info - Always visible */}
                <div>
                  <p className="font-bold text-lg">{feed.title}</p>
                  <p className="text-gray-500 text-sm">{feed.description}</p>
                </div>
              </div>
            </div>
            {/* like, comment & share component */}
            <ShareComponent feed={feed} user={userData?.data} />
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default FeedCard;
