import { useEffect, useState } from "react";
import ProfileComp from "../../../components/user/profile/profile";
import axios from "axios";
import { useRouter } from "next/router";
const ProfilePage = () => {
  const [user, setUser] = useState("");
  const router = useRouter();
  const user_id = router.query?.id;

  useEffect(() => {
    const fetchUser = async (user_id) => {
      try {
        const resp = await axios.get(
          `http://localhost:3000/api/friends/single?user_id=${user_id}`
        );
        setUser(resp.data);
        console.log(resp.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser(user_id);
  }, []);
  return (
    <div>
      <ProfileComp user={user} />
    </div>
  );
};
export default ProfilePage;
