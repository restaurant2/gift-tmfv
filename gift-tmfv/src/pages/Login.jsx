import React,{useEffect,useState} from 'react'
import { db, collection, doc, getDoc, setDoc, getDocs } from '../firebase'

const seed=[
  {username:'mahmoud', name:'محمود ابوقاعود', role:'admin', password:'admin2025'},
  {username:'mohammed.m', name:'محمد محيسن', role:'student', password:'moh2025'},
  {username:'mohammed.s', name:'محمد شنير', role:'student', password:'shn2025'},
  {username:'thar.q', name:'ثأر قسوم', role:'student', password:'thar2025'},
  {username:'zahia', name:'زهيه', role:'student', password:'zah2025'},
  {username:'wafa', name:'وفاء', role:'student', password:'wafa2025'},
  {username:'shaima', name:'شيماء', role:'student', password:'sha2025'},
  {username:'nabila', name:'نبيله', role:'student', password:'nab2025'},
  {username:'nafeen', name:'نفين', role:'student', password:'naf2025'},
  {username:'sana', name:'سناء', role:'student', password:'san2025'},
  {username:'ibrahim.d', name:'ابراهيم دنف', role:'student', password:'ibr2025'},
  {username:'dana', name:'دنه', role:'student', password:'dan2025'},
  {username:'yara', name:'ياره', role:'student', password:'yar2025'},
  {username:'fatma.n', name:'فاطمه نور', role:'student', password:'fat2025'},
  {username:'noreen', name:'نورين', role:'student', password:'nor2025'},
  {username:'amer', name:'أمر', role:'student', password:'amr2025'}
]

export default function Login({onLogged}){
  const[username,setUsername]=useState('')
  const[password,setPassword]=useState('')
  const[busy,setBusy]=useState(false)

  useEffect(()=>{(async()=>{
    const col=collection(db,'users'); const snap=await getDocs(col)
    if(snap.empty){ for(const u of seed){ await setDoc(doc(col,u.username),u) } }
  })()},[])

  const submit=async()=>{
    setBusy(true)
    try{
      const ref=doc(collection(db,'users'), username.trim())
      const s=await getDoc(ref)
      if(!s.exists()) throw new Error('no user')
      const u=s.data()
      if(u.password!==password.trim()) throw new Error('bad')
      onLogged(u)
    }catch(e){ alert('بيانات الدخول غير صحيحة') }
    setBusy(false)
  }

  return(<div className="min-h-screen bg-lux flex items-center justify-center p-6">
    <div className="bg-white text-royal rounded-2xl p-6 w-full max-w-md shadow">
      <h1 className="text-2xl font-bold text-center mb-4">gift-tmfv 🎁</h1>
      <input className="w-full p-3 border rounded mb-3 text-center" placeholder="اسم المستخدم" value={username} onChange={e=>setUsername(e.target.value)}/>
      <input className="w-full p-3 border rounded mb-4 text-center" placeholder="كلمة المرور" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button onClick={submit} disabled={busy} className="w-full py-3 bg-deepRed text-white rounded">{busy?'جاري التحقق…':'دخول'}</button>
      <p className="mt-4 text-center text-gray-500">تم تصميم الموقع من قبل محمود ابوقاعود 💎</p>
    </div>
  </div>)
}