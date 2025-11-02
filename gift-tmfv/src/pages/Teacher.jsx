import React, { useEffect, useState } from 'react';
import { db, collection, getDocs } from '../firebase';

export default function Teacher({ user, onLogout }){
  const [list, setList] = useState([]);
  useEffect(() => { (async () => {
    const snap = await getDocs(collection(db, 'recordings')); const arr = [];
    snap.forEach(d => arr.push({ id: d.id, ...d.data() }));
    arr.sort((a,b) => (b.createdAt?.seconds||0)-(a.createdAt?.seconds||0));
    setList(arr);
  })(); }, []);

  return (
    <div className="min-h-screen bg-lux p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gold">🎧 تسجيلات الطلاب</h2>
          <button onClick={onLogout} className="text-sm text-deepRed underline">تسجيل خروج</button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {list.length===0? <div className="text-gray-300">لا توجد تسجيلات بعد.</div> :
            list.map(r => (
              <div key={r.id} className="card p-4">
                <div className="flex justify-between mb-1">
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-xs text-gray-500">{r.createdAt?.toDate?.().toLocaleString?.()||''}</div>
                </div>
                <audio controls src={r.url} className="w-full"/>
              </div>
            ))
          }
        </div>
        <p className="mt-10 text-center footer">تم تصميم الموقع من قبل محمود ابوقاعود 💎</p>
      </div>
    </div>
  );
}