import { useNavigate } from 'react-router-dom'

export default function Notifications() {
  const navigate = useNavigate()
  return (
    <div className="page-wrapper" style={{ display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'16px' }}>
      <div style={{ fontSize:'64px' }}>🔔</div>
      <h2 style={{ fontFamily:'var(--font-serif)', color:'var(--purple-dark)', fontSize:'28px' }}>Notifications</h2>
      <p style={{ color:'var(--text-mid)' }}>Your family notifications — coming soon!</p>
      <button onClick={() => navigate('/dashboard')} style={{ padding:'10px 20px', background:'var(--green-500)', color:'white', border:'none', borderRadius:'10px', cursor:'pointer', fontFamily:'var(--font-sans)', fontWeight:600 }}>← Back to Dashboard</button>
    </div>
  )
}
