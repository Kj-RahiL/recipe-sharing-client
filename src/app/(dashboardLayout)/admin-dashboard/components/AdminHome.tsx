'use client'
import FeedCard from "@/app/(commonLayout)/components/feed/FeedCard";
import { useSearchContext } from "../../components/searchContext/search-context";


const AdminHome = () => {
    const { searchValue } = useSearchContext();
   const sortOption = 'latest'
    return (
        <div className="w-full md:w-2/3  mx-auto">
            <FeedCard searchParams={{ searchTerm: searchValue, sortOption}}/>
        </div>
    );
};

export default AdminHome;