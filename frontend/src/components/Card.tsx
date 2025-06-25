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
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => window.instgrm?.Embeds.process();
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
        className="rounded-2xl shadow-xl bg-white/10 backdrop-blur-md border border-white/20 px-4 py-5 w-[350px] h-[250px] cursor-pointer hover:scale-105 transition-all ease-in mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <Brain size={28} className="text-white" />
            <h1 className="font-bold text-white text-lg truncate">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-white hover:scale-110 transition">
              <Share2 size={20} />
            </a>
            <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="text-white hover:scale-110 transition">
              <Trash2 size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-xl border border-white/20 overflow-hidden h-[140px] bg-black/10">
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
            <blockquote className="twitter-tweet w-full h-full">
              <a href={link.replace("x.com", "twitter.com")}></a>
            </blockquote>
          )}
          {type === "images" && (
            <img src={link} alt="Uploaded" className="w-full h-full object-cover rounded-md" />
          )}
          {type === "documents" && (
            <iframe src={link} className="w-full h-full" title="Document Viewer"></iframe>
          )}
          {type === "instagram" && (
            <blockquote className="instagram-media w-full h-full" data-instgrm-permalink={link} data-instgrm-version="13">
              <a href={link}></a>
            </blockquote>
          )}
        </div>

        {/* Tags */}
        <div className="mt-2 flex flex-wrap gap-2">
          {tags?.map((tag, idx) => (
            <span
              key={idx}
              className="text-white text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur-md border border-white/30"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Modal Preview */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black/60 backdrop-blur-md">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 w-[90%] max-w-3xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              ✖
            </button>

            <div className="text-white">
              <h2 className="text-2xl font-bold mb-4">{title}</h2>

              {type === "youtube" && (
                <iframe
                  className="w-full h-[400px] rounded-lg"
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
                <blockquote
                  className="instagram-media w-full"
                  data-instgrm-permalink={link}
                  data-instgrm-version="13"
                >
                  <a href={link}></a>
                </blockquote>
              )}

              {type === "images" && (
                <img src={link} alt="preview" className="w-full h-auto rounded-lg" />
              )}

              {type === "documents" && (
                <iframe src={link} className="w-full h-[600px] rounded-lg" title="Document Viewer"></iframe>
              )}

              {/* Tags in modal */}
              <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-white/20 px-3 py-1 rounded-full text-sm border border-white/30"
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
