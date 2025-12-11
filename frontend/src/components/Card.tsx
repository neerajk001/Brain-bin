import { useEffect, useState } from "react";
import { Brain, Share2, Trash2 } from "lucide-react";

interface CardProps {
  link: string;
  title: string;
  tags: string[];
  type: "twitter" | "youtube" | "images" | "documents" | "instagram";
  onDelete: () => void;
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

const Card = ({ title, link, type, tags=[], onDelete }: CardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (type === "twitter") {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => window.twttr?.widgets.load();
    } else if (type === "instagram") {
      // Load Instagram embed script
      if (!window.instgrm) {
        const script = document.createElement("script");
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => {
          if (window.instgrm) {
            window.instgrm.Embeds.process();
          }
        };
      } else {
        // If script already loaded, just process embeds
        window.instgrm.Embeds.process();
      }
    }
  }, [type, link]);

  const getYouTubeEmbedLink = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setIsModalOpen(true)}
        className="rounded-2xl shadow-xl bg-[#181818] border border-zinc-800 p-4 h-[320px] cursor-pointer hover:bg-[#282828] transition-all group relative overflow-hidden flex flex-col"
      >
        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1DB954]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        
        {/* Header */}
        <div className="flex justify-between items-start mb-3 relative z-10">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="p-1.5 bg-[#1DB954]/20 rounded-lg border border-[#1DB954]/30">
              <Brain size={20} className="text-[#1DB954]" />
            </div>
            <h1 className="font-semibold text-white text-sm truncate flex-1">{title}</h1>
          </div>
          <div className="flex items-center gap-1">
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 text-gray-400 hover:text-[#1DB954] hover:bg-zinc-800 rounded-lg transition"
            >
              <Share2 size={16} />
            </a>
            <button 
              onClick={(e) => { e.stopPropagation(); onDelete(); }} 
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-zinc-800 rounded-lg transition"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-xl border border-zinc-800 overflow-hidden bg-black/40 mb-3 h-[180px] relative">
          {type === "youtube" && (
            <iframe
              className="w-full h-full"
              src={getYouTubeEmbedLink(link)}
              title="YouTube Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
          {type === "twitter" && (
            <div className="w-full h-full overflow-auto">
              <blockquote className="twitter-tweet">
                <a href={link.replace("x.com", "twitter.com")}></a>
              </blockquote>
            </div>
          )}
          {type === "images" && (
            <img src={link} alt="Uploaded" className="w-full h-full object-cover" />
          )}
          {type === "documents" && (
            <iframe src={link} className="w-full h-full" title="Document Viewer"></iframe>
          )}
          {type === "instagram" && (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-4">
              <div className="text-center">
                <div className="mb-2 text-gray-400">
                  <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <p className="text-sm text-gray-300 mb-2">Instagram Post</p>
                <a 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs text-[#1DB954] hover:text-[#1ed760] underline"
                >
                  View on Instagram
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 relative z-10">
          {tags?.map((tag, idx) => (
            <span
              key={idx}
              className="text-green-200 text-xs bg-[#1DB954]/20 px-2 py-0.5 rounded-full border border-[#1DB954]/30"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Modal Preview */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black/90 backdrop-blur-md">
          <div className="bg-[#121212] border border-zinc-800 rounded-2xl p-6 w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl hover:bg-zinc-800 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            >
              ✖
            </button>

            <div className="text-white">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-[#1DB954] bg-clip-text text-transparent">{title}</h2>

              {type === "youtube" && (
                <iframe
                  className="w-full h-[400px] rounded-lg border border-zinc-800"
                  src={getYouTubeEmbedLink(link)}
                  title="YouTube"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}

              {type === "twitter" && (
                <blockquote className="twitter-tweet w-full">
                  <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>
              )}

              {type === "instagram" && (
                <div className="w-full bg-[#181818] rounded-lg border border-zinc-800 p-6">
                  <div className="text-center mb-4">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <p className="text-gray-300 mb-4">Instagram embeds have limited support in custom interfaces.</p>
                  </div>
                  <a 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-semibold py-3 px-4 rounded-full text-center transition-colors"
                  >
                    View on Instagram
                  </a>
                </div>
              )}

              {type === "images" && (
                <img src={link} alt="preview" className="w-full h-auto rounded-lg border border-zinc-800" />
              )}

              {type === "documents" && (
                <iframe src={link} className="w-full h-[600px] rounded-lg border border-zinc-800" title="Document Viewer"></iframe>
              )}

              {/* Tags in modal */}
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-[#1DB954]/20 text-green-200 px-3 py-1 rounded-full text-sm border border-[#1DB954]/30"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
