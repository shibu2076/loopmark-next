'use client'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'

export default function SharePage() {
  const { id } = useParams()

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
      if (snap.exists()) {
        const data = snap.data()
        window.location.href = `/index.html?v=${data.videoId}&a=${data.abA}&b=${data.abB}`
      } else {
        window.location.href = '/index.html'
      }
    }
    load()
  }, [id])

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'sans-serif',color:'#666'}}>
      読み込み中...
    </div>
  )
}
