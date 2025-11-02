import React, { useEffect, useState } from 'react';
import Loader from './components/Loader.jsx';
import MusicToggle from './components/MusicToggle.jsx';
import Login from './pages/Login.jsx';
import Student from './pages/Student.jsx';
import Teacher from './pages/Teacher.jsx';
import Admin from './pages/Admin.jsx';
import WelcomeKhaled from './pages/WelcomeKhaled.jsx';

export default function App(){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { const t = setTimeout(() => setLoading(false), 800); return () => clearTimeout(t); }, []);
  if (loading) return <Loader/>;
  if (!user) return (<><Login onLogged={setUser}/><MusicToggle/></>);
  if (user.role === 'owner' && user.username === 'mahmoud') return (<><Admin user={user} onLogout={()=>setUser(null)}/><MusicToggle/></>);
  if (user.role === 'teacher' && (user.username === 'khaled' || user.name === 'خالد')) return (<><Teacher user={user} onLogout={()=>setUser(null)}/><MusicToggle/></>);
  return (<><Student user={user} onLogout={()=>setUser(null)}/><MusicToggle/></>);
}