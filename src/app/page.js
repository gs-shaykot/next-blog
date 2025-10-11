export const dynamic = "force-dynamic";
import Banner from "@/app/components/(home_components)/banner";
import CategorySec from "@/app/components/(home_components)/CategorySec";
import FeaturedPost from "@/app/components/(home_components)/FeaturePost";
import LatestPosts from "@/app/components/(home_components)/LatestPosts";
import Subscribe from "@/app/components/(home_components)/Subscribe"; 
import { getHomeData } from "../../lib/posts";

export default async function Home() {
  const { featurePosts, latestPosts, categories } = await getHomeData();

  return (
    <div> 
      <Banner />
      <FeaturedPost featurePosts={featurePosts} />
      <CategorySec categories={categories} />
      <LatestPosts latestPosts={latestPosts} />
      <Subscribe />
    </div>
  );
}
