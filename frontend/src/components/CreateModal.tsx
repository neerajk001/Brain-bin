import  { useState } from 'react';
import { contentStore } from '../store/contentStore';
import { Loader2 } from 'lucide-react';

type ContentType = 'youtube' | 'instagram' | 'twitter' | 'images' | 'documents';

interface CreateModalProps {
  open: boolean;
  close: () => void;
}

function CreateModal({ open, close }: CreateModalProps) {
  const { postContent, isLoading } = contentStore();
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [tags, setTags] = useState('');
  const [type, setType] = useState<ContentType>('youtube');
  if (!open) return null;

  

  const handleSubmit = async () => {
    if (!title || !link || !tags || !type) return;

    const success = await postContent({
      title,
      link,
      tags: tags.split(',').map(tag => tag.trim()), // Convert tags string to array
      type,
    });

    if (success) {
      close(); // close the modal
      setTitle('');
      setLink('');
      setTags('');
      setType('youtube');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-6 w-[90%] max-w-md shadow-2xl border border-white/30">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold text-white">Add your content</h1>
          <button
            onClick={close}
            className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full font-bold text-lg"
          >
            ×
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="bg-white/10 border border-white/30 px-4 py-2 rounded text-white placeholder-white/70"
          />
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            type="text"
            placeholder="Link"
            className="bg-white/10 border border-white/30 px-4 py-2 rounded text-white placeholder-white/70"
          />
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            type="text"
            placeholder="Tags (comma separated)"
            className="bg-white/10 border border-white/30 px-4 py-2 rounded text-white placeholder-white/70"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ContentType)}
            className="bg-white/10 border border-white/30 px-4 py-2 rounded text-white placeholder-white/70 backdrop-blur-md appearance-none"
          >
            <option className="bg-[#1f1f1f] text-white" value="youtube">YouTube</option>
            <option className="bg-[#1f1f1f] text-white" value="instagram">Instagram</option>
            <option className="bg-[#1f1f1f] text-white" value="twitter">Twitter</option>
            <option className="bg-[#1f1f1f] text-white" value="images">Images</option>
            <option className="bg-[#1f1f1f] text-white" value="documents">Documents</option>
          </select>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 flex justify-center items-center hover:bg-blue-700 text-white py-2 rounded-full mt-2 font-semibold"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="size-5 animate-spin" /> : 'Add Content'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateModal;
