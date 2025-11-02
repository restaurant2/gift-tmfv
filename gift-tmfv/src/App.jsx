import React,{useState,useEffect} from 'react'
import Loader from './components/Loader.jsx'
import MusicToggle from './components/MusicToggle.jsx'
import Login from './pages/Login.jsx'
import Student from './pages/Student.jsx'
import Admin from './pages/Admin.jsx'
import WelcomeKhaled from './pages/WelcomeKhaled.jsx'

export default function App(){
  const[user,setUser]=useState(null)
  const[loading,setLoading]=useState(true)
  useEffect(()=>{ const t=setTimeout(()=>setLoading(false),900); return()=>clearTimeout(t) },[])
  if(loading) return <Loader/>
  if(!user) return(<><Login onLogged={setUser}/><MusicToggle/></>)
  if(user.role==='admin' && user.username==='mahmoud') return(<><Admin/><MusicToggle/></>)
  if(user.name==='خالد' || user.username==='khaled') return(<><WelcomeKhaled/><MusicToggle/></>)
  return(<><Student user={user} onLogout={()=>setUser(null)}/><MusicToggle/></>)
}