import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { contentStore } from "../store/contentStore";
import Card from "../components/Card";
import { Brain, ArrowLeft, ExternalLink } from "lucide-react";

function Share() {
  const { shareId } = useParams();
  const { sharedContent, getSharedContent, isLoading } = contentStore();

  useEffect(() => {
    if (shareId) {
      getSharedContent(shareId);
    }
  }, [shareId, getSharedContent]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1DB954] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading shared content...</p>
        </div>
      </div>
    );
  }

  if (!sharedContent) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="bg-zinc-900 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <Brain size={48} className="text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Content Not Found</h1>
          <p className="text-gray-400 mb-6">This link is invalid or has expired.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold py-3 px-6 rounded-full transition-colors"
          >
            <ArrowLeft size={20} />
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#121212] border-b border-zinc-800 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-gray-400 hover:text-white"
              >
                <ArrowLeft size={20} />
              </Link>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#1DB954]/20 rounded-lg border border-[#1DB954]/30">
                  <Brain size={24} className="text-[#1DB954]" />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white to-[#1DB954] bg-clip-text text-transparent">
                    Brain-Bin
                  </h1>
                  <p className="text-sm text-gray-400">Shared Collection</p>
                </div>
              </div>
            </div>
            <Link
              to="/signup"
              className="hidden sm:flex items-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold py-2 px-4 rounded-full transition-colors text-sm"
            >
              Create Your Own
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Info Banner */}
        <div className="bg-gradient-to-r from-[#1DB954]/10 to-transparent border border-zinc-800 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1DB954] to-[#1ed760] rounded-full flex items-center justify-center text-black font-bold text-2xl">
              {sharedContent.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-400 mb-1">Shared by</p>
              <h2 className="text-2xl font-bold text-white">@{sharedContent.username}</h2>
              <p className="text-sm text-gray-400 mt-1">
                {sharedContent.content?.length || 0} {sharedContent.content?.length === 1 ? 'item' : 'items'} shared
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        {sharedContent.content && sharedContent.content.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sharedContent.content.map((item: any) => (
              <Card
                key={item._id}
                title={item.title}
                link={item.link}
                type={item.type}
                tags={item.tags}
                onDelete={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-zinc-900 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Brain size={32} className="text-gray-600" />
            </div>
            <p className="text-gray-400">No content shared yet.</p>
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <footer className="border-t border-zinc-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-[#1DB954]/20 to-transparent border border-[#1DB954]/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Want to create your own Brain-Bin?</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Save and organize your favorite content from across the web in one beautiful place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold py-3 px-6 rounded-full transition-colors"
              >
                Get Started Free
              </Link>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold py-3 px-6 rounded-full border border-zinc-800 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Share;
