'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function SharePage() {
  const { id } = useParams()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { initializeApp, getApps } = await import('firebase/app')
      const { getFirestore, doc, getDoc } = await import('firebase/firestore')
      const firebaseConfig = {
        apiKey: "AIzaSyDukP8QwIhPuM5BNoT2dBRot0dNWgPOGfU",
        authDomain: "loopmark-de961.firebaseapp.com",
        projectId: "loopmark-de961",
        storageBucket: "loopmark-de961.firebasestorage.app",
        messagingSenderId: "320939493127",
        appId: "1:320939493127:web:4ec0fc8f0268efaed1a7a2"
      }
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
      const db = getFirestore(app)
      const snap = await getDoc(doc(db, 'shares', id as string))
      if (snap.exists()) setData(snap.data())
      setLoading(false)
    }
    load()
  }, [id])

  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return m + ':' + String(sec).padStart(2, '0')
  }

  if (loading) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'sans-serif'}}>読み込み中...</div>
  if (!data) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'sans-serif'}}>共有データが見つかりません</div>

  const loopmarkUrl = `/index.html?v=${data.videoId}&a=${data.abA}&b=${data.abB}`

  return (
    <div style={{fontFamily:'sans-serif',maxWidth:'500px',margin:'0 auto',padding:'40px 20px',textAlign:'center'}}>
      <h1 style={{fontSize:'24px',fontWeight:'700',marginBottom:'8px'}}>Loop<span style={{color:'#1D9E75'}}>Mark</span></h1>
      <p style={{color:'#666',marginBottom:'32px',fontSize:'14px'}}>共有された練習区間</p>
      <div style={{background:'#f8f8f6',borderRadius:'12px',padding:'24px',marginBottom:'24px'}}>
        <p style={{fontSize:'14px',color:'#666',marginBottom:'8px'}}>{data.label}</p>
        <p style={{fontSize:'32px',fontWeight:'700',color:'#1D9E75'}}>{fmt(data.abA)} → {fmt(data.abB)}</p>
      </div>
      <a href={loopmarkUrl} style={{display:'block',padding:'14px 24px',background:'#1D9E75',color:'#fff',borderRadius:'8px',textDecoration:'none',fontSize:'16px',fontWeight:'600',marginBottom:'12px'}}>
        LoopMarkで練習する
      </a>
    </div>
  )
}
