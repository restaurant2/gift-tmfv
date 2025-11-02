import React,{useEffect,useState} from 'react'
import { db, collection, getDocs, deleteDoc, doc } from '../firebase'

export default function Admin(){ const[recs,setRecs]=useState([])
  const load=async()=>{ const s=await getDocs(collection(db,'recordings')); const arr=[]; s.forEach(d=>arr.push({id:d.id,...d.data()})); arr.sort((a,b)=>(b.createdAt?.seconds||0)-(a.createdAt?.seconds||0)); setRecs(arr) }
  useEffect(()=>{load()},[])
  const delOne=async(id)=>{ if(!confirm('حذف التسجيل؟')) return; await deleteDoc(doc(collection(db,'recordings'),id)); await load() }
  return(<div className="min-h-screen bg-lux p-6">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gold mb-4">🎧 تسجيلات الطلاب</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {recs.length===0?<div className="text-gray-300">لا توجد تسجيلات بعد.</div>:
          recs.map(r=>(<div key={r.id} className="bg-white text-royal rounded-2xl p-4 shadow">
            <div className="flex justify-between mb-1"><div className="font-semibold">{r.name}</div><div className="text-xs text-gray-500">{r.createdAt?.toDate?.().toLocaleString?.()||''}</div></div>
            <audio controls src={r.url} className="w-full" />
            <div className="mt-2 flex gap-2"><a href={r.url} target="_blank" className="px-3 py-1 bg-gray-100 rounded text-sm">تنزيل</a><button onClick={()=>delOne(r.id)} className="px-3 py-1 bg-red-100 rounded text-sm">حذف</button></div>
          </div>))}
      </div>
      <p className="mt-8 text-center text-gray-300">تم تصميم الموقع من قبل محمود ابوقاعود 💎</p>
    </div></div>)
}