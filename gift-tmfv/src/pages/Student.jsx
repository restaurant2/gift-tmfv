import React, { useEffect, useState } from 'react';
import { storage, db, collection, addDoc, serverTimestamp, query, where, getDocs, deleteDoc, doc } from '../firebase';
import { ref as sref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function Student({ user, onLogout }){
  const [chunks] = useState([]);
  const [recBlob, setRecBlob] = useState(null);
  const [aurl, setAurl] = useState(null);
  const [mr, setMr] = useState(null);
  const [list, setList] = useState([]);
  const [busy, setBusy] = useState(false);

  const loadMine = async () => {
    const q = query(collection(db, 'recordings'), where('username', '==', user.username));
    const snap = await getDocs(q); const arr = [];
    snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
    arr.sort((a,b) => (b.createdAt?.seconds||0)-(a.createdAt?.seconds||0));
    setList(arr);
  };
  useEffect(() => { loadMine(); }, []);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const r = new MediaRecorder(stream); setMr(r); chunks.length = 0;
    r.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };
    r.onstop = () => { const blob = new Blob(chunks, { type: 'audio/webm' }); setRecBlob(blob); setAurl(URL.createObjectURL(blob)); stream.getTracks().forEach(t => t.stop()); };
    r.start();
  };
  const stop = () => { if (mr && mr.state !== 'inactive') mr.stop(); };

  const upload = async () => {
    if (!recBlob) return alert('لا يوجد تسجيل');
    setBusy(true);
    try {
      const key = Date.now();
      const path = `voices/${user.username}_${key}.webm`;
      const sr = sref(storage, path);
      await uploadBytes(sr, recBlob);
      const url = await getDownloadURL(sr);
      await addDoc(collection(db, 'recordings'), { username: user.username, name: user.name, url, createdAt: serverTimestamp() });
      new Audio('/ping.mp3').play().catch(()=>{});
      setRecBlob(null); setAurl(null);
      await loadMine();
      alert('تم الحفظ بنجاح ✅');
    } catch (e) { alert('فشل الرفع'); }
    setBusy(false);
  };

  const delMine = async (id) => {
    if (!confirm('حذف تسجيلك؟')) return;
    await deleteDoc(doc(collection(db, 'recordings'), id));
    await loadMine();
  };

  return (
    <div className="min-h-screen bg-lux p-6">
      <div className="card p-6 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-2">
          <div className="font-bold">مرحباً {user.name}</div>
          <button onClick={onLogout} className="text-sm text-deepRed underline">تسجيل خروج</button>
        </div>
        <p className="text-gray-600">سجّل رسالتك ثم احفظها.</p>
        <div className="mt-4 flex gap-3">
          <button onClick={start} className="px-4 py-2 bg-deepRed text-white rounded">🎙️ ابدأ</button>
          <button onClick={stop} className="px-4 py-2 bg-gray-200 rounded">⏹️ إيقاف</button>
          <button onClick={upload} disabled={!recBlob||busy} className={`px-4 py-2 rounded ${recBlob&&!busy?'bg-royal text-white':'bg-gray-200 text-gray-400'}`}>⏫ حفظ</button>
        </div>
        <div className="mt-4">{aurl ? <audio controls src={aurl} className="w-full"/> : <div className="text-gray-400">لا يوجد تسجيل جديد.</div>}</div>
      </div>

      <div className="max-w-3xl mx-auto mt-6">
        <h3 className="text-gold font-bold mb-2">تسجيلاتك</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {list.length===0? <div className="text-gray-300">لا يوجد بعد.</div> :
            list.map(r => (
              <div key={r.id} className="card p-4">
                <div className="text-sm text-gray-500 mb-2">{r.createdAt?.toDate?.().toLocaleString?.()||''}</div>
                <audio controls src={r.url} className="w-full"/>
                <div className="mt-2"><button onClick={()=>delMine(r.id)} className="px-3 py-1 bg-red-100 rounded text-sm">حذف</button></div>
              </div>
            ))
          }
        </div>
      </div>

      <p className="mt-10 text-center footer">تم تصميم الموقع من قبل محمود ابوقاعود 💎</p>
    </div>
  );
}