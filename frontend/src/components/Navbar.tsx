import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'


function Navbar() {
const btnRef =useRef(null)
const headRef =useRef(null)

useEffect(()=>{
    const  ctx =gsap.context(()=>{
        gsap.from((btnRef.current.children),{
            x:300,
            opacity:0,
            duration:1,
            ease:'power1.inOut',
            stagger:0.3
        })
        
    })
    return ()=>ctx.revert()
},[])

  return (
    <div className='w-[90%] justify-center items-center mx-auto  '>
        <div  className=' z-10 flex  justify-between w-full border-white-1bg-gradient-to-br from-gray-900 via-purple-900 to-black backdrop-blur-2xl py-3 rounded-full text-white px-6 items-center border-black h-auto'>
        <div>
        logo
        </div>
     <div ref={btnRef} className="space-x-4">
  <button className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-md hover:bg-white/20 hover:shadow-lg ">
    Signin
  </button>
  <button className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-md hover:bg-white/20 hover:shadow-lg ">
    Signup
  </button>
  <button className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-md hover:bg-white/20 hover:shadow-lg ">
    Get Started
  </button>
</div>

    </div>
    </div>
  )
}

export default Navbar