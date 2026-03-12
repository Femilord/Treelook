import { useNavigate } from 'react-router-dom'

export default function Messages() {
  const navigate = useNavigate()
  return (
    <div className="page-wrapper" style={{ display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'16px' }}>
      <div style={{ fontSize:'64px' }}>💬</div>
      <h2 style={{ fontFamily:'var(--font-serif)', color:'var(--purple-dark)', fontSize:'28px' }}>Messages</h2>
      <p style={{ color:'var(--text-mid)' }}>Family messaging — coming soon!</p>
      <button onClick={() => navigate('/dashboard')} style={{ padding:'10px 20px', background:'var(--purple)', color:'white', border:'none', borderRadius:'10px', cursor:'pointer', fontFamily:'var(--font-sans)', fontWeight:600 }}>← Back to Dashboard</button>
    </div>
  )
}
