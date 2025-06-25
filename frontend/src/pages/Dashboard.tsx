import React, { useEffect, useState } from 'react'
import Button from '../components/Button'
import { Plus, Share2, DoorOpen, PanelRight, Menu } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import CreateModal from '../components/CreateModal'
import Card from '../components/Card'
import { contentStore } from '../store/contentStore'
import toast from 'react-hot-toast'

function Dashboard() {
  const [openModal, setOpenmodal] = useState(false)
  const [isOpen, setIsOpen] = useState(true)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const [contentFilter , setContentFilter] =useState("")



  const {contents ,getContents, isLoading,deleteContent,shareContent} =contentStore()
    const filteredContents =contentFilter ? contents.filter((item)=>item.type ===contentFilter):contents

  useEffect(()=>{
    getContents()
  },[])

  const toggleBar = () => setIsOpen(!isOpen)
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu)

  const handleShare = async () => {
  const shareURL = await shareContent(true); // send `false` to delete
  if (shareURL) {
    await navigator.clipboard.writeText(shareURL);
    toast.success("Link copied to clipboard!");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br relative from-gray-900 via-purple-900 to-black">
      <CreateModal open={openModal} close={() => setOpenmodal(false)} />

      {/* Topbar */}
      <div className="flex justify-between items-center p-4 md:px-6">
        <div className="text-white font-bold text-xl">Brain-Bin</div>

        {/* Desktop buttons */}
        <div className="hidden md:flex space-x-4">
          <Button onClick={() => setOpenmodal(true)} variant="primary" startIcons={<Plus />}>
            Add Content
          </Button>
          <Button onClick={handleShare}
          variant="secondary" startIcons={<Share2 />}>
            Share Content
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white p-2">
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile menu buttons */}
      {showMobileMenu && (
        <div className="flex flex-col gap-2 px-4 md:hidden">
          <Button onClick={() => setOpenmodal(true)} variant="primary" startIcons={<Plus />}>
            Add Content
          </Button>
          <Button variant="secondary" startIcons={<Share2 />}>
            Share Content
          </Button>
        </div>
      )}

      {/* Layout wrapper */}
      <div className="flex">
        {/* Sidebar */}
        {isOpen && (
          <div className="w-64 hidden md:block transition-all duration-300">
            <Sidebar setFilter={setContentFilter} />
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={toggleBar}
          className="absolute top-20 left-2 z-50 text-white p-2 bg-white/10 rounded-full border border-white/30 backdrop-blur"
        >
          {isOpen ? <DoorOpen size={20} /> : <PanelRight size={20} />}
        </button>
        
        {/* Main content area */}
        <div className="flex justify-content ml-12 flex-wrap gap-4 p-4">
      {isLoading && <p className="text-white">Loading...</p>}
       {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : filteredContents.length === 0 ? (
            <p className="text-white">No content found.</p>
          ) : (
            filteredContents.map((item) => (
              <Card
                key={item._id}
                title={item.title}
                type={item.type}
                tags={item.tags}
                link={item.link}
                onDelete={() => {deleteContent(item._id!)}}
              />
            ))
          )}
    </div>
      </div>
    </div>
  )
}

export default Dashboard
