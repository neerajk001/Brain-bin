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
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-[#121212] rounded-2xl p-6 w-[90%] max-w-md shadow-2xl border border-zinc-800">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold text-white">Add your content</h1>
          <button
            onClick={close}
            className="text-white bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded-full font-bold text-lg transition-colors"
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
            className="bg-[#2a2a2a] border border-zinc-700 px-4 py-2 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#1DB954] transition-colors"
          />
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            type="text"
            placeholder="Link"
            className="bg-[#2a2a2a] border border-zinc-700 px-4 py-2 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#1DB954] transition-colors"
          />
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            type="text"
            placeholder="Tags (comma separated)"
            className="bg-[#2a2a2a] border border-zinc-700 px-4 py-2 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#1DB954] transition-colors"
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as ContentType)}
            className="bg-[#2a2a2a] border border-zinc-700 px-4 py-2 rounded-lg text-white focus:outline-none focus:border-[#1DB954] transition-colors appearance-none cursor-pointer"
          >
            <option className="bg-[#121212] text-white" value="youtube">YouTube</option>
            <option className="bg-[#121212] text-white" value="instagram">Instagram</option>
            <option className="bg-[#121212] text-white" value="twitter">Twitter</option>
            <option className="bg-[#121212] text-white" value="images">Images</option>
            <option className="bg-[#121212] text-white" value="documents">Documents</option>
          </select>

          <button
            onClick={handleSubmit}
            className="bg-[#1DB954] flex justify-center items-center hover:bg-[#1ed760] text-black py-3 rounded-full mt-2 font-semibold transition-all"
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
