import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../redux/features/posts/postSlice";
const PostForm = () => {
  const [formData, setFormData] = useState({
    texts: "",
    image: null,
    previewImage: null,
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  console.log(user);
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [texts, setTexts] = useState("");
  const handleChange = (e) => {
    if (e.target.name === "image") {
      const selectedImage = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          image: selectedImage,
          previewImage: reader.result,
        });
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async (e, user) => {
    e.preventDefault();

    const fileInput = document.getElementById("profile-image-input");
    const file = fileInput.files[0];

    if (file) {
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

        setProfileImage(data.secure_url);
        setPreviewImage(null);
        setLoading(false);
        // Save the profile image URL in local storage
        localStorage.setItem("profileImage", data.secure_url);

        const postData = {
          texts: texts,
          image: data.secure_url,
          email: user?.email,
        };
        dispatch(createPost(postData));

        // Send a request to your API to save the profile image URL
        // try {
        //   const profileSaveResponse = await fetch(
        //     `http://localhost:3000/api/profile/profile?email=${user?.email}`,
        //     {
        //       method: "PUT",
        //       headers: {
        //         "Content-Type": "application/json",
        //       },
        //       body: JSON.stringify({
        //         profilePic: data.secure_url,
        //       }),
        //     }
        //   );
        //   if (profileSaveResponse.ok) {
        //     // Profile image URL saved successfully
        //   } else {
        //   }
        // } catch (error) {
        //   console.log(error);
        // }
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        setLoading(false);
      }
    } else {
      const postData = {
        texts: texts,
        email: user?.email,
      };
      dispatch(createPost(postData));
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
  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={(e) => handleSubmit(e, user)}
        className="bg-white p-6 rounded shadow"
      >
        <h2 className="text-xl font-bold mb-6">Create a Post</h2>
        <div className="mb-4">
          <textarea
            id="texts"
            name="texts"
            value={texts}
            placeholder="write your post here"
            onChange={(e) => setTexts(e.target.value)}
            className="w-full resize-none outline-blue-600 border-gray-300 border rounded p-2 mt-1"
            rows={4}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="text-gray-700">
            Image
          </label>
          {previewImage && (
            <img src={previewImage} alt="Preview" className=" object-cover " />
          )}
          <form onSubmit={(e) => handleImagePreview(e)}>
            <input
              type="file"
              accept="image/*"
              id="profile-image-input"
              onChange={handleImagePreview}
            />
          </form>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostForm;
