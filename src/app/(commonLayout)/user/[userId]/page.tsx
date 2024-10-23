import { revalidateTag } from "next/cache";
import DynamicProfile from "../../components/Profile/DynamicProfile"

const UserPage = () => {
    revalidateTag("Follow")
    revalidateTag( "unFollow")
    return (
        <div>
            <DynamicProfile/>
        </div>
    );
};

export default UserPage;