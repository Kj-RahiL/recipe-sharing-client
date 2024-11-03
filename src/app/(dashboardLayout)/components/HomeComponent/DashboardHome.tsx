"use client";
import FeedCard from "@/app/(commonLayout)/components/feed/FeedCard";
import { useSearchContext } from "../searchContext/search-context";

const DashboardHome = () => {
  const { searchValue } = useSearchContext();
  const sortOption = "latest";
  return (
    <div className="w-full md:w-2/3  mx-auto">
      <FeedCard searchParams={{ searchTerm: searchValue, sortOption }} />
    </div>
  );
};

export default DashboardHome;
