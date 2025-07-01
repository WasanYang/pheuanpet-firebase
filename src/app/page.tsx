
import PostCard from '@/components/PostCard';
import KnowledgeCard from '@/components/KnowledgeCard';
import ExpertSpotlightCard from '@/components/ExpertSpotlightCard';
import { getHomePageFeed, type FeedItem } from '@/lib/data';

export default function Home() {
  const feedItems = getHomePageFeed();

  const renderFeedItem = (item: FeedItem) => {
    switch (item.type) {
      case 'post':
        return <PostCard key={`post-${item.data.post.id}`} post={item.data.post} pet={item.data.pet} user={item.data.user} />;
      case 'knowledge':
        return <KnowledgeCard key={`knowledge-${item.data.id}`} tip={item.data} />;
      case 'expert':
        return <ExpertSpotlightCard key={`expert-${item.data.id}`} expert={item.data} />;
      default:
        return null;
    }
  };

  return (
      <main className="w-full animate-in fade-in duration-500">
        <div className="flex flex-col gap-6">
          {feedItems.map(renderFeedItem)}
        </div>
      </main>
  );
}
