import  { useEffect } from "react";
import { useParams } from "react-router-dom";
import { contentStore } from "../store/contentStore";
import Card from "../components/Card";

function Share() {
  const { shareId } = useParams();
  const { sharedContent, getSharedContent, isLoading } = contentStore();

  useEffect(() => {
    if (shareId) {
      getSharedContent(shareId);
    }
  }, [shareId]);

  if (isLoading) return <p className="text-white p-4">Loading...</p>;
  if (!sharedContent) return <p className="text-white p-4">Invalid or expired link.</p>;

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h2 className="text-xl font-bold mb-4">Shared by @{sharedContent.username}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sharedContent.content.map((item:any) => (
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
    </div>
  );
}

export default Share;
