import Banner from "@/app/components/(home_components)/banner";
import FeaturedPost from "@/app/components/(home_components)/FeaturePost";
import axios from "axios";
import Image from "next/image";

export const getHomeData = async () => {
  const res = await axios.get('http://localhost:3000/api/posts/homeData')
  return res.data
}

export default async function Home() {

  const { featurePosts, latestPosts, categories } = await getHomeData()

  return (
    <div>
      <Banner />
      <FeaturedPost featurePosts={featurePosts} />
    </div>
  );
}
