import React from 'react';import {motion} from 'framer-motion'
export default function Loader(){return(<div className="min-h-screen bg-lux flex flex-col items-center justify-center">
<motion.div className="w-16 h-16 rounded-full border-4 border-gold border-t-white" animate={{rotate:360}} transition={{repeat:Infinity,duration:1.2}}/>
<div className="mt-4 text-gold text-xl font-semibold">جاري التحميل…</div></div>)}