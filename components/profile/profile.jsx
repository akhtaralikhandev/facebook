import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";
import Navbar from "../navbar/navbar";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, updateUser } from "../../redux/features/user/userSlice";

const ProfileComp = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(false);
  const [editName, setEditName] = useState(false);
  const { data: session } = useSession();
  const username = session?.user?.username;
  const user = useSelector((state) => state?.user?.user);
  const email = user?.email;
  const updateUserLoading = useSelector(
    (state) => state?.user?.updateUserLoading
  );
  const [editUsername, setEditUsername] = useState(user?.username);
  console.log(user);
  console.log(session);
  useEffect(() => {
    dispatch(fetchUser(user?.email));
  }, []);

  useEffect(() => {
    // Check if profile image URL exists in local storage
    const storedProfileImage = localStorage.getItem("profileImage");
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
  }, []);

  const handleImageUpload = async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("profile-image-input");
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "aafl5vm4");
    setLoading(true);
    try {
      // Make a request to Cloudinary to upload the image
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dzumurjj4/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      // Delete the old profile image using the proxy server
      if (profileImage) {
        const publicId = profileImage.split("/").pop().split(".")[0];
        await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/cloudinary/${publicId}`,
          {
            method: "DELETE",
          }
        );
      }
      setProfileImage(data.secure_url);
      setPreviewImage(null);
      setLoading(false);
      // Save the profile image URL in local storage
      localStorage.setItem("profileImage", data.secure_url);

      // Send a request to your API to save the profile image URL
      try {
        const profileSaveResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API}/profile/profile?email=${user?.email}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              profilePic: data.secure_url,
            }),
          }
        );
        if (profileSaveResponse.ok) {
          // Profile image URL saved successfully
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      setLoading(false);
    }
  };
  const handleNameUpdate = (e) => {
    e.preventDefault();
    if (editUsername) {
      dispatch(updateUser({ username: editUsername, email: email }));
      setEditName(false);
      console.log("dispatch is called");
    }
  };
  const handleImagePreview = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };
  const handleEditImage = (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("profile-image-input");
    fileInput.click();
  };
  const showUploadButton = previewImage !== null;
  console.log(user?.profilePic);
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        {updateUserLoading ? (
          <InfinitySpin width="200" color="#4fa94d" />
        ) : (
          <div className="profileCard relative mt-32 w-96 p-8 m-8 shadow-lg  flex flex-col items-center justify-center gap-8">
            {editName ? (
              <button
                onClick={() => setEditName(!editName)}
                className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-md"
              >
                cancel
              </button>
            ) : (
              <button
                onClick={() => setEditName(!editName)}
                className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 rounded-md"
              >
                edit
              </button>
            )}

            <div className="relative">
              {(loading || profileImage) && (
                <img
                  src={user?.profilePic}
                  alt="Profile"
                  className="w-48 h-48 object-cover rounded-full"
                />
              )}

              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="absolute inset-0 w-48 h-48 object-cover rounded-full"
                />
              )}

              <button
                onClick={(e) => handleEditImage(e)}
                className="absolute bottom-0 right-0 bg-blue-500 text-white px-2 py-1 rounded-md"
              >
                Edit
              </button>
            </div>

            <form onSubmit={(e) => handleImagePreview(e)}>
              <input
                type="file"
                accept="image/*"
                id="profile-image-input"
                onChange={handleImagePreview}
                className="hidden"
              />
              {showUploadButton && (
                <button
                  onClick={(e) => handleImageUpload(e)}
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg mt-2"
                  disabled={loading} // Disable the button while uploading
                >
                  {loading ? "Uploading..." : "Upload"}
                </button>
              )}
            </form>
            <span className="text-xl  mb-4">
              {editName ? (
                <>
                  <input
                    placeholder="write user name here"
                    onChange={(e) => setEditUsername(e.target.value)}
                    value={editUsername}
                    className="border border-blue-500 p-2 rounded-lg outline-blue-800"
                  />
                  <button
                    onClick={(e) => handleNameUpdate(e)}
                    className="py-2 px-4 bg-blue-500 text-white rounded-lg mt-2"
                  >
                    save
                  </button>{" "}
                </>
              ) : (
                <p> {user?.username}</p>
              )}
              <p className="mb-4">{user?.email}</p>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileComp;
