import { useEffect } from "react";
import Navbar from "../navbar/navbar";
import { useSession } from "next-auth/react";
import PostForm from "../post/createPost";
import PostCard from "../post/postCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  likeAndDislike,
} from "../../redux/features/posts/postSlice";
import { fetchUser } from "../../redux/features/user/userSlice";
const Home = () => {
  const { data: session } = useSession();
  const email = session?.user?.email;
  const user_id = useSelector((state) => state?.user?.user?.user_id);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const handleLikePost = (e, post_id) => {
    e.preventDefault();
    dispatch(
      likeAndDislike({
        user_id,
        post_id,
      })
    );
  };
  const posts = useSelector((state) => state.posts.posts);
  const postCreationLoading = useSelector(
    (state) => state?.posts?.postCreationLoading
  );
  const deletingPostLoading = useSelector(
    (state) => state?.user?.deletingPostLoading
  );
  console.log(postCreationLoading);
  useEffect(() => {
    dispatch(fetchUser(email));
  }, []);
  return (
    <div>
      {postCreationLoading || deletingPostLoading ? (
        <div>
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <Navbar />
          <PostForm />
          <div className="flex flex-col items-center justify-center gap-8 mt-8">
            {posts?.map((x) => (
              <PostCard
                handleLikePost={(e) => handleLikePost(e, x?.post_id)}
                post={x}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default Home;
