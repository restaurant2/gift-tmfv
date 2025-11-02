import React,{useRef,useState,useEffect} from 'react'
import { storage, db, collection, addDoc, serverTimestamp } from '../firebase'
import { ref as sref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default function Student({user,onLogout}){
  const[rec,setRec]=useState(null); const[chunks]=useState([]); const[mr,setMr]=useState(null); const[aurl,setAurl]=useState(null); const[busy,setBusy]=useState(false)

  const start=async()=>{
    const stream=await navigator.mediaDevices.getUserMedia({audio:true})
    const r=new MediaRecorder(stream); setMr(r); chunks.length=0
    r.ondataavailable=e=>{ if(e.data.size>0) chunks.push(e.data) }
    r.onstop=()=>{ const blob=new Blob(chunks,{type:'audio/webm'}); setRec(blob); setAurl(URL.createObjectURL(blob)); stream.getTracks().forEach(t=>t.stop()) }
    r.start()
  }
  const stop=()=>{ if(mr && mr.state!=='inactive') mr.stop() }

  const upload=async()=>{
    if(!rec) return alert('لا يوجد تسجيل')
    setBusy(true)
    try{
      const key=Date.now()
      const path=`voices/${user.username}_${key}.webm`
      const sr=sref(storage, path)
      await uploadBytes(sr, rec)
      const url=await getDownloadURL(sr)
      await addDoc(collection(db,'recordings'), { username:user.username, name:user.name, url, createdAt: serverTimestamp() })
      new Audio('/ping.mp3').play().catch(()=>{})
      alert('تم الحفظ بنجاح')
      setRec(null); setAurl(null)
    }catch(e){ alert('فشل الرفع') }
    setBusy(false)
  }

  return(<div className="min-h-screen bg-lux p-6">
    <div className="max-w-2xl mx-auto bg-white text-royal rounded-2xl p-6 shadow">
      <div className="flex justify-between items-center mb-3">
        <div className="font-bold">مرحباً {user.name}</div>
        <button onClick={onLogout} className="text-sm text-deepRed underline">تسجيل خروج</button>
      </div>
      <p className="text-gray-600">سجّل رسالتك الصوتية ثم احفظها لتصل لأستاذك.</p>
      <div className="mt-4 flex gap-3">
        <button onClick={start} className="px-4 py-2 bg-deepRed text-white rounded">🎙️ ابدأ</button>
        <button onClick={stop} className="px-4 py-2 bg-gray-200 rounded">⏹️ إيقاف</button>
        <button onClick={upload} disabled={!rec||busy} className={`px-4 py-2 rounded ${rec&&!busy?'bg-royal text-white':'bg-gray-200 text-gray-400'}`}>⏫ حفظ</button>
      </div>
      <div className="mt-4">{aurl?<audio controls src={aurl} className="w-full"/>:<div className="text-gray-400">لا يوجد تسجيل بعد.</div>}</div>
    </div>
    <p className="mt-6 text-center text-gray-300">تم تصميم الموقع من قبل محمود ابوقاعود 💎</p>
  </div>)
}