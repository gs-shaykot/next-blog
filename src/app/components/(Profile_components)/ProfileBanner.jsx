import Image from "next/image";
import { useSelector } from "react-redux";

export default function ProfileBanner({ userDtl }) {
  const themeMode = useSelector((mode) => mode.themeToggle.mode);
  return (
    <div className={`relative w-full z-2`}>
      {/* Banner Image */}
      <div className="relative w-full h-48 md:h-56">
        <Image
          src="/profileBg.jpg"
          alt="Profile Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/80 to-purple-600/80" />
 
        <div className="absolute inset-0 flex items-center flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">{userDtl?.name || "User Name"}</h1>
        </div>
      </div>
 
      <div className={`${themeMode === 'dark' ? 'bg-gray-800 !text-gray-400' : 'bg-white text-gray-600'} px-6 md:px-10 py-6 relative z-10`}>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Profile Image */}
          <div className="-mt-16 md:-mt-20">
            <Image
              src={userDtl?.image || "/defaultUser.jpg"}
              alt={userDtl?.name || "User"}
              width={120}
              height={120}
              className="rounded-full border-4 border-white shadow-lg"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 md:mt-4">
            <h1 className="text-sm md:text-sm font-bold">{userDtl?.email || "Your Email should be here"}</h1>
            <p className="text-sm mb-1">
              Senior Content Editor & Publisher
            </p>
            <p className="text-sm mb-4">
              Cumilla, Bangladesh • Joined March 2023
            </p>

            {/* Bio */}
            <p className="text-sm leading-relaxed mb-4 max-w-3xl">
              Passionate about technology, innovation, and storytelling. I write about the latest trends in AI, web development, and digital transformation. Always exploring new ways to craft compelling narratives that inspire and educate.
            </p>
 
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
  )
}