import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Dashboard.module.css'

const linkedMembers = [
  { id: 3, name: 'James Westin', rel: 'Your Son', initials: 'JW', status: 'live', color: '#7B2D8B' },
  { id: 4, name: 'Gracie Brown', rel: 'Daughter-in-law', initials: 'GB', status: 'live', color: '#2A9D5C' },
  { id: 5, name: 'Penelop Westin', rel: 'Granddaughter', initials: 'PW', status: 'pending', color: '#ccc' },
  { id: 6, name: 'Arnold Brown', rel: 'Son-in-law', initials: 'AB', status: 'pending', color: '#ccc' },
]

const suggestions = [
  { id: 7, name: 'Jide Ogunyomi', connections: 12, initials: 'JO', color: '#7B2D8B', action: 'Verify' },
  { id: 8, name: 'Shade Wemimo', connections: 8, initials: 'SW', color: '#C47494', action: 'Verify' },
  { id: 9, name: 'Ayo Bamishe', connections: 5, initials: 'AB', color: '#2A9D5C', action: 'Link' },
  { id: 10, name: 'Kathrine Westin', connections: null, initials: 'KW', color: '#E8A020', action: 'Link', note: 'On your tree · unlinked' },
]

const events = [
  { day: '28', month: 'Feb', name: "Maria Westin's Birthday", who: 'Your Mother · Turning 92', type: 'birthday' },
  { day: '15', month: 'Mar', name: 'James & Gracie Anniversary', who: 'Wedding Anniversary · 3 yrs', type: 'anniversary' },
  { day: '02', month: 'Apr', name: "William Jr.'s Birthday", who: 'Your Grandson · Turning 38', type: 'birthday' },
]

const posts = [
  {
    id: 1,
    authorInitials: 'NW',
    authorColor: '#6B7A99',
    author: 'Nicolas Westin Jr.',
    rel: 'Your Brother',
    time: '2 hours ago',
    text: "Dad would have turned 89 today. Sharing this photo from the last family reunion we had together in 2022. He always said — the tree grows as long as the roots hold. 🌳❤️",
    reactions: '❤️🙏😢',
    reactionCount: 24,
    comments: 8,
    hasImage: true,
  },
  {
    id: 2,
    authorInitials: 'JW',
    authorColor: '#2A9D5C',
    author: 'James Westin',
    rel: 'Your Son',
    time: 'Yesterday',
    text: "Gracie and I are thrilled to announce — Baby Westin is on the way! 🎉 Adding a new branch to the tree. Gran Maria, this one's for you! 👶🌿",
    reactions: '🎉❤️😍',
    reactionCount: 41,
    comments: 15,
    hasImage: false,
  },
]

// Stories — just the Add Story button for now
// Family member stories will populate here once the feature is live
const stories = []

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="page-wrapper">
      <div className={styles.layout}>

        {/* LEFT SIDEBAR */}
        <aside className={styles.sidebarLeft}>

          {/* Quick Actions */}
          <div className="card">
            <div className={styles.quickActions}>
              <div className={styles.sectionTitle}>Quick Actions</div>
              {[
                { icon: '➕', label: 'Add a Family Member', color: 'green' },
                { icon: '📨', label: 'Invite a Family Member', color: 'purple' },
                { icon: '💍', label: 'New Family Marriage', color: 'amber' },
                { icon: '📸', label: 'Create a Memory', color: 'red' },
              ].map(a => (
                <button key={a.label} className={styles.qaBtn}>
                  <div className={`${styles.qaIcon} ${styles[a.color]}`}>{a.icon}</div>
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          {/* Newly Linked */}
          <div className="card">
            <div className={styles.linkedSection}>
              <div className={styles.sectionTitle}>Newly Linked to Your Tree</div>
              <div className={styles.linkedList}>
                {linkedMembers.map(m => (
                  <div key={m.id} className={styles.linkedItem} onClick={() => navigate(`/profile/${m.id}`)}>
                    <div
                      className={`${styles.linkedAvatar} ${m.status === 'live' ? styles.linkedLive : styles.linkedPending}`}
                      style={{ background: m.status === 'live' ? `linear-gradient(135deg, ${m.color}, ${m.color}99)` : '#f0f0f5' }}
                    >
                      {m.status === 'live' ? m.initials : '👤'}
                    </div>
                    <div className={styles.linkedInfo}>
                      <div className={styles.linkedName}>{m.name}</div>
                      <div className={styles.linkedRel}>{m.rel}</div>
                    </div>
                    <span className={`${styles.linkedStatus} ${styles[m.status]}`}>
                      {m.status === 'live' ? 'Live' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </aside>

        {/* CENTER FEED */}
        <main className={styles.centerFeed}>

          {/* ── STORIES BAR ── */}
          <div className={`card ${styles.storiesCard}`}>
            <div className={styles.storiesScroll}>

              {/* Add Your Story — always first */}
              <div className={styles.storyItem}>
                <div className={styles.addStoryBtn}>
                  <div className={styles.addStoryAvatar}>FO</div>
                  <div className={styles.addStoryPlus}>+</div>
                </div>
                <span className={styles.storyName}>Add Story</span>
              </div>

              {/* Family member stories render here when available */}
              {stories.map(s => (
                <div key={s.id} className={styles.storyItem}>
                  <div
                    className={styles.storyRing}
                    style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}99)` }}
                  >
                    <div className={styles.storyAvatar}>{s.initials}</div>
                  </div>
                  <span className={styles.storyName}>{s.name}</span>
                </div>
              ))}

              {/* Empty state hint when no stories yet */}
              {stories.length === 0 && (
                <div className={styles.storiesEmpty}>
                  <span>Family stories will appear here</span>
                </div>
              )}

            </div>
          </div>

          {/* Compose */}
          <div className="card" style={{ padding: '16px' }}>
            <div className={styles.composeRow}>
              <div className={styles.composeAvatar}>FO</div>
              <div className={styles.composeInput}>
                Share a memory, milestone or update with your family…
              </div>
            </div>
            <div className={styles.composeActions}>
              <button className={`${styles.composeBtn} ${styles.video}`}>🎥 Video</button>
              <button className={`${styles.composeBtn} ${styles.photo}`}>📷 Photo</button>
              <button className={`${styles.composeBtn} ${styles.memory}`}>✨ Memory</button>
            </div>
          </div>

          {/* Posts */}
          {posts.map(post => (
            <div key={post.id} className="card">
              <div className={styles.postHeader}>
                <div className={styles.postAvatar} style={{ background: `linear-gradient(135deg, ${post.authorColor}, ${post.authorColor}99)` }}>
                  {post.authorInitials}
                </div>
                <div className={styles.postMeta}>
                  <div className={styles.postAuthor}>
                    {post.author} <span className={styles.postAction}>shared a post</span>
                  </div>
                  <div className={styles.postRel}>
                    <span className={styles.relTag}>{post.rel}</span>
                    <span className={styles.postTime}> · {post.time}</span>
                  </div>
                </div>
                <div className={styles.postMenu}>⋯</div>
              </div>
              <div className={styles.postBody}>{post.text}</div>
              {post.hasImage && (
                <div className={styles.postImagePlaceholder}>🖼️</div>
              )}
              <div className={styles.postReactions}>
                <span className={styles.reactionEmojis}>{post.reactions}</span>
                <span className={styles.reactionCount}>{post.reactionCount} family members reacted</span>
                <span className={styles.commentCount}>{post.comments} comments</span>
              </div>
              <div className={styles.postDivider} />
              <div className={styles.postActions}>
                <div className={styles.postActionBtn}>❤️ React</div>
                <div className={styles.postActionBtn}>💬 Comment</div>
                <div className={styles.postActionBtn}>📤 Share</div>
              </div>
            </div>
          ))}

        </main>

        {/* RIGHT SIDEBAR */}
        <aside className={styles.sidebarRight}>

          {/* Suggestions */}
          <div className="card" style={{ padding: '16px' }}>
            <div className={styles.sugTitle}>
              Family Suggestions
              <span className={styles.aiBadge}>AI Matched</span>
            </div>
            {suggestions.map(s => (
              <div key={s.id} className={styles.sugItem}>
                <div className={styles.sugAvatar} style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}99)` }}>
                  {s.initials}
                </div>
                <div className={styles.sugInfo}>
                  <div className={styles.sugName}>{s.name}</div>
                  <div className={styles.sugSub}>{s.note || `${s.connections} mutual connections`}</div>
                </div>
                <button className={`${styles.sugBtn} ${s.action === 'Verify' ? styles.verify : styles.link}`}>
                  {s.action}
                </button>
              </div>
            ))}
          </div>

          {/* Events */}
          <div className="card" style={{ padding: '16px' }}>
            <div className={styles.eventsTitle}>📅 Upcoming Events</div>
            {events.map((e, i) => (
              <div key={i} className={styles.eventItem}>
                <div className={styles.eventDate}>
                  <div className={styles.eventDay}>{e.day}</div>
                  <div className={styles.eventMonth}>{e.month}</div>
                </div>
                <div className={styles.eventInfo}>
                  <div className={styles.eventName}>{e.name}</div>
                  <div className={styles.eventWho}>{e.who}</div>
                </div>
                <span className={`${styles.eventBadge} ${styles[e.type]}`}>
                  {e.type === 'birthday' ? '🎂' : '💍'}
                </span>
              </div>
            ))}
          </div>

          {/* Tree Stats */}
          <div className="card" style={{ padding: '16px' }}>
            <div className={styles.statsTitle}>🌳 Your Tree at a Glance</div>
            <div className={styles.statsGrid}>
              {[
                { val: 18, label: 'Members', color: 'var(--purple)', bg: 'var(--purple-pale)' },
                { val: 11, label: 'Live Linked', color: 'var(--green)', bg: 'var(--green-light)' },
                { val: 4, label: 'Pending', color: 'var(--amber)', bg: '#FEF3E2' },
                { val: 3, label: 'Generations', color: 'var(--red)', bg: '#FDE8E6' },
              ].map(s => (
                <div key={s.label} className={styles.statBox} style={{ background: s.bg }}>
                  <div className={styles.statVal} style={{ color: s.color }}>{s.val}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

        </aside>

      </div>
    </div>
  )
}
