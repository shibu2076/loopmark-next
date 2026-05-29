'use client'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      router.push('/index.html')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100vh',background:'#f8f8f6'}}>
      <div style={{fontFamily:'sans-serif',textAlign:'center'}}>
        <h1 style={{fontSize:'32px',fontWeight:'700',marginBottom:'8px'}}>Loop<span style={{color:'#1D9E75'}}>Mark</span></h1>
        <p style={{color:'#666',marginBottom:'32px',fontSize:'14px'}}>YouTubeの練習プレイヤー</p>
        <button onClick={handleLogin} style={{display:'flex',alignItems:'center',gap:'10px',padding:'12px 24px',border:'1px solid #ddd',borderRadius:'8px',background:'#fff',fontSize:'15px',cursor:'pointer',fontFamily:'sans-serif'}}>
          <img src="https://www.google.com/favicon.ico" width="20" height="20" alt="Google"/>
          Googleでログイン
        </button>
      </div>
    </div>
  )
}
