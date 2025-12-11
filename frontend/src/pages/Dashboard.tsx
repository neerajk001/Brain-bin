import React, { useEffect, useState, useMemo } from 'react';
import { Plus, Share2, Menu, PanelLeftClose, PanelLeftOpen, Search } from 'lucide-react';
import { contentStore } from '../store/contentStore';
import toast from 'react-hot-toast';

// Components
import Button from '../components/Button';
import Sidebar from '../components/Sidebar';
import CreateModal from '../components/CreateModal';
import Card from '../components/Card';

function Dashboard() {
  // UI State
  const [openModal, setOpenModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [contentFilter, setContentFilter] = useState("all"); // Default to 'all' or empty string

  // Data Store
  const { contents, getContents, isLoading, deleteContent, shareContent } = contentStore();

  // Fetch Data on Mount
  useEffect(() => {
    getContents();
  }, [getContents]);

  // Memoized Filter Logic (Performance Optimization)
  const filteredContents = useMemo(() => {
    if (!contentFilter || contentFilter === "all") return contents;
    return contents.filter((item) => item.type === contentFilter);
  }, [contentFilter, contents]);

  // Handlers
  const handleShare = async () => {
    try {
      const shareURL = await shareContent(true);
      if (shareURL) {
        await navigator.clipboard.writeText(shareURL);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      toast.error("Failed to generate share link");
    }
  };

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden">
      
      {/* --- Modals --- */}
      <CreateModal open={openModal} close={() => setOpenModal(false)} />

      {/* --- Sidebar (Desktop) --- */}
      <div 
        className={`
          hidden md:flex flex-col border-r border-zinc-800 bg-black transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'w-64' : 'w-0 opacity-0 overflow-hidden'}
        `}
      >
        <div className="p-4">
           <Sidebar setFilter={setContentFilter} activeFilter={contentFilter} />
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col h-full relative overflow-y-auto scrollbar-hide">
        
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-20 flex justify-between items-center p-4 md:px-8 border-b border-zinc-800 bg-[#121212]">
          <div className="flex items-center gap-4">
            {/* Sidebar Toggle (Desktop) */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:flex items-center justify-center p-2 rounded-lg hover:bg-zinc-800 text-gray-400 hover:text-white transition-colors"
            >
              {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
            </button>
            
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-[#1DB954] bg-clip-text text-transparent">
              Brain-Bin
            </h1>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button onClick={handleShare} variant="secondary" startIcons={<Share2 size={18} />}>
              Share
            </Button>
            <Button onClick={() => setOpenModal(true)} variant="primary" startIcons={<Plus size={18} />}>
              Add Content
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden p-2 text-white hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <Menu />
          </button>
        </header>

        {/* Mobile Action Menu (Dropdown) */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#121212] border-b border-zinc-800 p-4 flex flex-col gap-3 animate-in slide-in-from-top-2">
            <Button onClick={() => { setOpenModal(true); setIsMobileMenuOpen(false); }} variant="primary" startIcons={<Plus />}>
              Add Content
            </Button>
            <Button onClick={handleShare} variant="secondary" startIcons={<Share2 />}>
              Share Board
            </Button>
            {/* Optional: Add mobile sidebar filters here if needed */}
          </div>
        )}

        {/* Content Grid */}
        <main className="p-4 md:p-8 w-full max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : filteredContents.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center text-gray-400">
              <div className="bg-zinc-900 p-4 rounded-full mb-4">
                <Search size={32} />
              </div>
              <h3 className="text-lg font-medium text-white">No content found</h3>
              <p className="max-w-xs mt-2 text-sm">
                {contentFilter === "all" || !contentFilter 
                  ? "Your brain bin is empty. Start by adding some content!"
                  : `No content found for the "${contentFilter}" filter.`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredContents.map((item) => (
                <Card
                  key={item._id}
                  title={item.title}
                  type={item.type}
                  tags={item.tags}
                  link={item.link}
                  onDelete={() => deleteContent(item._id)}
                />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

export default Dashboard;