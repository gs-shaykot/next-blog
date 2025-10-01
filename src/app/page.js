import Banner from "@/app/components/(home_components)/banner";
import CategorySec from "@/app/components/(home_components)/CategorySec";
import FeaturedPost from "@/app/components/(home_components)/FeaturePost";
import LatestPosts from "@/app/components/(home_components)/LatestPosts";
import Subscribe from "@/app/components/(home_components)/Subscribe";
import AlertDevNotice from "@/app/components/AlertDevNotice";
import axios from "axios";

export const getHomeData = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/homeData`)
  return res.data
}

export default async function Home() {
  const { featurePosts, latestPosts, categories } = await getHomeData()


  return (
    <div>
      <AlertDevNotice />
      <Banner />
      <FeaturedPost featurePosts={featurePosts} />
      <CategorySec categories={categories} />
      <LatestPosts latestPosts={latestPosts} />
      <Subscribe />
    </div>
  );
}
