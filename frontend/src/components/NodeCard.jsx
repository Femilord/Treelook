import { useNavigate } from 'react-router-dom'
import styles from './NodeCard.module.css'

/**
 * NodeCard — the core tree member card
 * Props:
 *   member: { id, name, age, birthYear, deathYear, gender, isLive, isSelf, initials, color }
 *   size: 'lg' | 'md' | 'sm'
 *   onAdd, onNote, onEdit — callback functions
 */
export default function NodeCard({ member, size = 'md', onAdd, onNote, onEdit }) {
  const navigate = useNavigate()

  const genderClass = member.gender === 'female' ? styles.female : styles.male
  const sizeClass = styles[size]
  const isDeceased = !!member.deathYear

  const handleAvatarClick = () => {
    navigate(`/profile/${member.id}`)
  }

  return (
    <div className={`${styles.card} ${genderClass} ${sizeClass} ${member.isSelf ? styles.self : ''} ${isDeceased ? styles.deceased : ''}`}>

      {/* Live indicator dot */}
      {member.isLive && !isDeceased && (
        <div className={styles.liveDot} title="Live Profile" />
      )}

      {/* Avatar — tap to open profile */}
      <div
        className={styles.avatar}
        onClick={handleAvatarClick}
        title={`View ${member.name}'s profile`}
      >
        {member.photo
          ? <img src={member.photo} alt={member.name} />
          : <span>{member.initials}</span>
        }
      </div>

      {/* Identity */}
      <div className={styles.identity}>
        <div className={styles.nameRow}>
          <span className={styles.age}>{isDeceased ? '†' : ''}{member.age}</span>
          <span className={styles.name}>{member.name}</span>
        </div>
        <div className={styles.years}>
          {isDeceased
            ? `${member.birthYear}–${member.deathYear}`
            : member.birthYear
          }
        </div>
      </div>

      {/* Action icons */}
      <div className={styles.actions}>
        <button
          className={styles.actionBtn}
          title="Add a family member"
          onClick={() => onAdd && onAdd(member)}
        >
          ➕
        </button>
        <button
          className={styles.actionBtn}
          title="Notes"
          onClick={() => onNote && onNote(member)}
        >
          📝
        </button>
        <button
          className={styles.actionBtn}
          title="Edit information"
          onClick={() => onEdit && onEdit(member)}
        >
          ✏️
        </button>
        <button
          className={styles.actionBtn}
          title="Link existing profile"
          onClick={handleAvatarClick}
        >
          🔗
        </button>
      </div>

    </div>
  )
}
