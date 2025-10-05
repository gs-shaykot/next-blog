import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function PostGrid({ posts }) {

  const themeMode = useSelector((mode) => mode.themeToggle.mode);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {posts.map((post) => (
        <Link
          key={post._id}
          href={`/blogs/${post._id}`}>
          <div
            className={`${themeMode === 'dark' ? 'bg-gray-700 text-white' : 'bg-white'} border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300`}
          >
            {post.post_image && (
              <Image
                src={post.post_image}
                alt={post.title}
                width={600}
                height={400}
                className="object-cover w-full h-48"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1 line-clamp-2">
                {post.title}
              </h3>
              <p className={`${themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm line-clamp-3`}>{post.subtitle}</p>
              <div className="mt-3 text-xs text-gray-500 flex justify-between">
                <span>{post.author}</span>
                <span>{post.posted_date}</span>
              </div>
            </div>
          </div>
        </Link>

      ))}
    </div>
  );
}
