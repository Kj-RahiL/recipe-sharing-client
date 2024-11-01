import { useRecipe } from "@/hooks/recipe.hook";
import { TRecipe, TUser } from "@/types";
import { Avatar } from "@nextui-org/react";
import { MessageCircle, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";


const ShareComponent = ({feed, user} : {feed:TRecipe, user?:TUser}) => {
 
  const { upvoteMutation, downvoteMutation, commentMutation } = useRecipe();
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const [comment, setComment] = useState("");

    const toggleCommentInput = (id: string) => {
        setActiveCommentId(activeCommentId === id ? null : id); // Toggle comment input
        setComment(""); // Clear comment field when toggling
      };
    
      const handleCommentSubmit = (feedId: string) => {
        if (!comment.trim()) {
          toast.error("Comment cannot be empty!");
          return;
        }
        commentMutation.mutate({ recipeId: feedId, comment });
        setComment("");
      };
    
      const handleShare = (title: string) => {
        if (navigator.share) {
          navigator
            .share({
              title,
              text: "Check out this amazing recipe!",
              url: window.location.href,
            })
            .catch((error) => console.error("Error sharing:", error));
        } else {
          alert("Share feature not supported in this browser.");
        }
      };
    return (
        <div>
             <div className="flex justify-around items-center mt-4 text-gray-600">
              <button
                onClick={() => upvoteMutation.mutate(feed?._id)}
                className={`flex items-center space-x-1 ${
                  feed?.upVotes?.includes(user?._id)
                    ? "text-blue-600 font-medium"
                    : "text-gray-600"
                }`}
              >
                <ThumbsUp
                  className={`w-5 h-5 flex items-center gap-1 ${
                    feed?.upVotes?.includes(user?._id)
                      ? "fill-blue-500"
                      : "fill-none"
                  }`}
                />
                <span >{feed?.upVotes?.length}</span>
                <span className="hidden sm:block "> Likes</span>
              </button>
              <button
                onClick={() => downvoteMutation.mutate(feed?._id)}
                className={`flex items-center space-x-1 ${
                  feed?.downVotes?.includes(user?._id)
                    ? "text-pink-700 text-medium"
                    : ""
                }`}
              >
                <ThumbsDown
                  className={`w-5 h-5 flex items-center ${
                    feed?.downVotes?.includes(user?._id)
                      ? "fill-pink-700"
                      : "fill-none"
                  }`}
                /><span>{feed?.downVotes?.length}</span>
                <span className="hidden sm:block"> Dislikes</span>
              </button>
              <button
                onClick={() => toggleCommentInput(feed?._id)}
                className={`flex items-center space-x-1 ${
                  activeCommentId === feed?._id
                    ? "text-blue-500 font-medium"
                    : ""
                }`}
              >
                <MessageCircle
                  className={`w-5 h-5 ${
                    activeCommentId === feed?._id ? "fill-blue-500" : "fill-none"
                  }`}
                />
                <span className="hidden sm:block">Comment</span>
              </button>
              <button
                onClick={() => handleShare(feed?.title)}
                className="flex items-center space-x-1"
              >
                <Share2 className="w-5 h-5" />
                <span className="hidden sm:block">Share</span>
              </button>
            </div>

            {/* Comment Input Field */}
            {activeCommentId === feed?._id && (
              <div className="mt-4 flex items-center justify-between space-x-2">
                <Avatar
                  src={user?.image}
                  alt={user?.name}
                  size="md"
                  className="rounded-full hidden sm:block"
                />
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="p-1 text-sm md:text-base md:p-2 flex-1 border rounded-lg dark:bg-gray-800 dark:text-white"
                />
                <button
                  onClick={() => handleCommentSubmit(feed?._id)}
                  className="px-2 py-1 text-xs md:text-base md:px-4 md:py-2 button-bg text-white rounded-lg "
                >
                  Submit
                </button>
              </div>
            )}
        </div>
    );
};

export default ShareComponent;