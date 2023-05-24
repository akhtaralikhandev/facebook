import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  deletePost,
  likeAndDislike,
  updatePost,
} from "../../redux/features/posts/postSlice";

const PostCard = ({ post, handleLikePost }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showComments, setShowComments] = useState(false);
  // editPost
  const [editPost, setEditPost] = useState(false);
  const [editText, setEditTexts] = useState(post?.texts);
  const [comment, setComment] = useState("");
  const profilePic = useSelector((state) => state?.user?.user?.profilePic);
  const postCreationLoading = useSelector(
    (state) => state?.posts?.postCreationLoading
  );

  const currentUser = useSelector((state) => state?.user?.user?.username);
  const user_id = useSelector((state) => state?.user?.user?.user_id);
  const dispatch = useDispatch();
  const handleMoreClick = () => {
    setShowOptions(!showOptions);
  };

  const handleCommentsClick = () => {
    setShowComments(!showComments);
  };
  const handlePostDelete = (e, post_id) => {
    e.preventDefault();
    dispatch(
      deletePost({
        user_id: user_id,
        post_id: post_id,
      })
    );
  };
  const isCurrentUserPost = post?.user?.username === currentUser;
  const handleAddComment = (e, post_id) => {
    e.preventDefault();
    if (comment) {
      dispatch(
        addComment({
          user_id: user_id,
          post_id: post_id,
          comment: comment,
        })
      );
      setComment("");
    } else {
      alert("plz write something");
    }
  };
  const handlePostEdit = (e, post_id) => {
    e.preventDefault();
    if (editText) {
      dispatch(
        updatePost({
          user_id: user_id,
          post_id: post_id,
          texts: editText,
        })
      );
      setEditTexts("");
      setEditPost(false);
    } else {
      alert("plz write something");
    }
  };
  return (
    <div className="postCard shadow-lg p-4 m-2 xl:w-1/3 rounded-lg">
      <div className="postCard_wrapper flex flex-col gap-6">
        <div className="postCardUpper flex items-center justify-between">
          <div className="postCardUpperLeft flex gap-2 flex-col">
            <Link href={`/friends/profile/${post?.userId}`}>
              <img
                src={post?.user?.profilePic}
                className="w-14 h-14 rounded-full"
                alt=""
              />
              <span>{post?.user?.username}</span>{" "}
            </Link>
          </div>
          <div className="postCardUpperRight relative">
            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
            <button
              className="absolute right-0 top-0 w-10 h-full bg-transparent"
              onClick={handleMoreClick}
            ></button>
            {showOptions && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow-lg rounded-lg">
                <ul className="py-2">
                  {isCurrentUserPost && (
                    <>
                      <li
                        onClick={() => setEditPost(!editPost)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Edit
                      </li>
                      <li
                        onClick={(e) => handlePostDelete(e, post?.post_id)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        Delete
                      </li>
                    </>
                  )}
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Block User
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="postCardCenter flex items-center justify-between">
          {editPost ? (
            <div className="flex flex-col gap-2">
              <textarea
                placeholder="write text here"
                className="border w-full border-blue-500"
                value={editText}
                onChange={(e) => setEditTexts(e.target.value)}
              />
              <button
                onClick={(e) => handlePostEdit(e, post?.post_id)}
                className="border border-green-800  p-2 rounded-lg hover:bg-green-500 cursor-pointer hover:border-none hover:text-white"
              >
                Submit
              </button>
            </div>
          ) : (
            post?.texts && <span className="text-xl">{post?.texts}</span>
          )}
          {post?.image && <img src={post?.image} alt="" />}
        </div>
        <div className="postCardBottom flex items-center justify-between">
          <span onClick={(e) => handleLikePost(e, post?.post_id)}>
            {" "}
            {post?.Likes?.length > 0 && <span>{post?.Likes?.length}</span>}
            <i
              className="fa fa-heart text-3xl text-red-500 hover:text-red-600 cursor-pointer"
              aria-hidden="true"
            ></i>
          </span>
          <span onClick={handleCommentsClick} className="cursor-pointer">
            comments
            <i
              className="fa fa-wechat text-3xl text-green-500 hover:text-green-600 cursor-pointer"
              aria-hidden="true"
            ></i>
          </span>
        </div>
        {showComments && (
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">Comments</h3>
            <ul>
              {post?.Comments?.map((comment, index) => (
                <li key={index} className="mb-2 flex gap-8">
                  <span>{comment?.user?.username}</span>{" "}
                  <span> {comment?.comment}</span>
                </li>
              ))}
            </ul>
            {/* Add comment section */}
            <form className="mt-4">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full h-20 border border-blue-500  resize-none hover:outline-blue-700 rounded-md p-2"
                placeholder="Add a comment..."
              ></textarea>
              <button
                type="submit"
                onClick={(e) => handleAddComment(e, post?.post_id)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-2"
              >
                Add Comment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
