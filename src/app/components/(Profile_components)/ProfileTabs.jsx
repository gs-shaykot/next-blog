import PostGrid from '@/app/components/(Profile_components)/PostGrid';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function ProfileTabs({ loading, savedPosts, likedPosts }) {
  console.log(savedPosts, likedPosts)
  return (
    <div className="profile-tabs-container">
      <Tabs>
        <TabList>
          <Tab>
            <span>🔖</span>
            <span>Saved Posts ({savedPosts.length})</span>
          </Tab>
          <Tab>
            <span>👍</span>
            <span>Liked Posts ({likedPosts.length})</span>
          </Tab>
        </TabList>

        <TabPanel>
          {loading ? (
            <p className="text-center mt-8 text-gray-500">Loading saved posts...</p>
          ) : savedPosts.length === 0 ? (
            <div className="text-center mt-12">
              <div className="text-5xl mb-4">🔖</div>
              <p className="text-gray-500">No saved posts yet.</p>
              <p className="text-sm text-gray-400 mt-2">Posts you save will appear here</p>
            </div>
          ) : (
            <PostGrid posts={savedPosts} />
          )}
        </TabPanel>

        <TabPanel>
          {loading ? (
            <p className="text-center mt-8 text-gray-500">Loading your posts...</p>
          ) : likedPosts.length === 0 ? (
            <div className="text-center mt-12">
              <div className="text-5xl mb-4">📝</div>
              <p className="text-gray-500">No posts yet.</p>
              <p className="text-sm text-gray-400 mt-2">Start creating your first post!</p>
            </div>
          ) : (
            <PostGrid posts={likedPosts} />
          )}
        </TabPanel>
      </Tabs>
    </div>
  );
}