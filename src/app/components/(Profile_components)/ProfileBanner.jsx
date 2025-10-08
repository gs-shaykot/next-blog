"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";
import axios from "axios";
import { FaCamera } from "react-icons/fa";

export default function ProfileBanner({ userDtl }) {
  const themeMode = useSelector((mode) => mode.themeToggle.mode);
  console.log(userDtl)
  const [name, setName] = useState(userDtl?.name || "");
  const [isEditing, setIsEditing] = useState(false);
  const [photo, setPhoto] = useState(userDtl?.image || "/defaultUser.jpg");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      const Img_Res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      const imageLink = Img_Res.data.secure_url;
      setPhoto(imageLink);

      // Update photo in DB
      await axios.patch("/api/users", {
        id: userDtl.id,
        photoUrl: imageLink,
      });
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };


  const handleNameSave = async () => {
    if (!name.trim()) return alert("Name cannot be empty!");
    setLoading(true);
    try {
      await axios.patch("/api/users", {
        id: userDtl.id,
        fullname: name,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update name:", error);
      alert("Failed to update name");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full z-2">
      {/* Banner */}
      <div className="relative w-full h-48 md:h-56">
        {/* make the camera icon near the Image */}
        <div className="relative w-full h-48 md:h-56">
          <Image
            src="/profileBg.jpg"
            alt="Profile Banner"
            fill
            priority
            className="object-cover"
          />

          {/* Camera Icon */}
          <button
            onClick={handleCameraClick}
            className="absolute bottom-2 left-2 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700 transition-all z-10"
            title="Change photo"
          >
            <FaCamera size={16} />
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-purple-600/80" />

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isEditing ? (
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-3 py-1 rounded-md text-gray-800 focus:outline-none"
              />
              <button
                onClick={handleNameSave}
                disabled={loading}
                className="bg-white text-indigo-600 px-3 py-1 rounded-md font-semibold hover:bg-indigo-100 transition-all"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          ) : (
            <h1
              className="text-3xl md:text-4xl font-bold text-white cursor-pointer"
              onClick={() => setIsEditing(true)}
              title="Click to edit name"
            >
              {name || "User Name"}
            </h1>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div
        className={`${themeMode === "dark"
          ? "bg-gray-800 text-gray-400"
          : "bg-white text-gray-600"
          } px-6 md:px-10 py-6 relative z-10`}
      >
        <div className="flex flex-col md:flex-row gap-6">

          <div className="-mt-16 md:-mt-20 relative">
            <Image
              src={photo || "/defaultUser.jpg"}
              alt={name || "User"}
              width={120}
              height={120}
              className="rounded-full border-4 border-white shadow-lg object-cover"
            />

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 md:mt-4">
            <h1 className="text-sm font-bold">{userDtl?.email || "Your Email"}</h1>
            <p className="text-sm mb-1">Senior Content Editor & Publisher</p>
            <p className="text-sm mb-4">Cumilla, Bangladesh • Joined March 2023</p>

            {/* Bio */}
            <p className="text-sm leading-relaxed mb-4 max-w-3xl">
              Passionate about technology, innovation, and storytelling. I write
              about the latest trends in AI, web development, and digital
              transformation. Always exploring new ways to craft compelling
              narratives that inspire and educate.
            </p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                Technology
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                AI & ML
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                Web Development
              </span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                Innovation
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
