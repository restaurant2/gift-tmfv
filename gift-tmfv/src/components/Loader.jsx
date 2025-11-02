import React from 'react';import {motion} from 'framer-motion'
export default function Loader(){return(<div className='min-h-screen bg-lux flex flex-col items-center justify-center text-center'>
<motion.div className='w-20 h-20 rounded-full border-4 border-gold border-t-white' animate={{rotate:360}} transition={{repeat:Infinity,duration:1.2,ease:'linear'}}/>
<motion.h1 className='mt-6 text-2xl font-bold text-gold' initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}>جاري تحميل gift-tmfv 🎁</motion.h1>
</div>)}