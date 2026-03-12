import { useNavigate } from 'react-router-dom'
import styles from './MiniTree.module.css'

// Sample Westin family data
const treeData = {
  gen1: [
    { id: 10, name: 'Nicolas Sr.', age: 88, birthYear: 1931, deathYear: 2023, gender: 'male', initials: 'NS', isLive: false },
    { id: 11, name: 'Maria', age: 91, birthYear: 1935, gender: 'female', initials: 'MW', isLive: true },
  ],
  gen2self: { id: 1, name: 'William', age: 64, birthYear: 1962, gender: 'male', initials: 'WW', isLive: true, isSelf: true },
  gen2spouse: { id: 2, name: 'Lauren', age: 37, birthYear: 1989, gender: 'female', initials: 'LW', isLive: true },
  gen3: [
    { id: 3, name: 'James', age: 41, birthYear: 1985, gender: 'male', initials: 'JW', isLive: true },
    { id: 4, name: 'William Jr.', age: 37, birthYear: 1989, gender: 'male', initials: 'WJ', isLive: false },
    { id: 5, name: 'Penelop', age: 33, birthYear: 1993, gender: 'female', initials: 'PW', isLive: false },
  ]
}

function TreeNode({ member, size = 'md' }) {
  const navigate = useNavigate()
  const isDeceased = !!member.deathYear
  const genderColor = member.gender === 'female' ? '#D97AB8' : '#7B9DD9'

  return (
    <div className={styles.treeNode}>
      <div
        className={`${styles.nodeAvatar} ${styles[size]} ${member.isSelf ? styles.selfAvatar : ''}`}
        style={{ borderColor: member.isSelf ? 'white' : genderColor }}
        onClick={() => navigate(`/profile/${member.id}`)}
        title={`View ${member.name}`}
      >
        {member.initials}
      </div>
      <div className={styles.nodeName}>{member.name}</div>
      <div className={styles.nodeAge}>
        {isDeceased ? `†${member.age}` : member.age}
        {member.isLive && !isDeceased && <span className={styles.liveDot} />}
      </div>
    </div>
  )
}

export default function MiniTree({ onRecenter }) {
  return (
    <div className={styles.canvas}>
      <span className={styles.genLabel}>Core View</span>

      {/* SVG connectors */}
      <svg className={styles.svg} viewBox="0 0 600 210" preserveAspectRatio="none">
        <line x1="210" y1="55" x2="390" y2="55" stroke="rgba(200,180,220,0.5)" strokeWidth="1.5" strokeDasharray="5,4"/>
        <line x1="300" y1="55" x2="300" y2="120" stroke="rgba(200,180,220,0.5)" strokeWidth="1.5"/>
        <line x1="300" y1="140" x2="410" y2="140" stroke="rgba(200,180,220,0.5)" strokeWidth="1.5" strokeDasharray="5,4"/>
        <line x1="300" y1="158" x2="300" y2="185" stroke="rgba(200,180,220,0.5)" strokeWidth="1.5"/>
        <line x1="160" y1="185" x2="440" y2="185" stroke="rgba(200,180,220,0.4)" strokeWidth="1.5"/>
        <line x1="160" y1="185" x2="160" y2="200" stroke="rgba(200,180,220,0.5)" strokeWidth="1.5"/>
        <line x1="300" y1="185" x2="300" y2="200" stroke="rgba(200,180,220,0.5)" strokeWidth="1.5"/>
        <line x1="440" y1="185" x2="440" y2="200" stroke="rgba(200,180,220,0.5)" strokeWidth="1.5"/>
      </svg>

      {/* Gen 1 */}
      <div className={styles.genRow}>
        {treeData.gen1.map(m => <TreeNode key={m.id} member={m} size="lg" />)}
      </div>

      {/* Gen 2 — self + spouse */}
      <div className={styles.genRow}>
        <TreeNode member={treeData.gen2self} size="lg" />
        <div className={styles.marriageSymbol}>💍</div>
        <TreeNode member={treeData.gen2spouse} size="md" />
      </div>

      {/* Gen 3 */}
      <div className={styles.genRow}>
        {treeData.gen3.map(m => <TreeNode key={m.id} member={m} size="sm" />)}
      </div>

      {/* Controls */}
      <button className={styles.recenterBtn} onClick={onRecenter}>
        🎯 Recenter
      </button>
    </div>
  )
}
