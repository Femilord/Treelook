import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Dashboard.module.css'
import { useAuth } from '../context/AuthContext'
import { getPosts, createPost } from '../lib/posts'
import { toggleReaction } from '../lib/reactions'
import { createComment } from '../lib/comments'
import PostComposer from '../components/PostComposer'
import PostCard from '../components/PostCard'

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

const stories = []

export default function Dashboard() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [posts, setPosts] = useState([])
  const [commentInputs, setCommentInputs] = useState({})

  const commentRefs = useRef({})

  const initials = user?.fullName
    ? user.fullName
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
    : 'FO'

  const loadPosts = async () => {
    try {
      const data = await getPosts()
      setPosts(data)
    } catch (error) {
      console.error('Failed to load posts', error)
    }
  }

  useEffect(() => {
    loadPosts()
  }, [])

  const handleCreatePost = async (content, imageUrl) => {
    try {
      await createPost(content, imageUrl)
      await loadPosts()
    } catch (error) {
      console.error('Failed to create post', error)
    }
  }

  const handleToggleReaction = async (postId) => {
    try {
      await toggleReaction(postId)
      await loadPosts()
    } catch (error) {
      console.error('Failed to toggle reaction', error)
    }
  }

  const handleCommentChange = (postId, value) => {
    setCommentInputs((prev) => ({
      ...prev,
      [postId]: value,
    }))
  }

  const focusCommentInput = (postId) => {
    const input = commentRefs.current[postId]
    if (input) input.focus()
  }

  const handleCreateComment = async (postId) => {
    const content = commentInputs[postId]

    if (!content || !content.trim()) return

    try {
      await createComment(postId, content)
      setCommentInputs((prev) => ({
        ...prev,
        [postId]: '',
      }))
      await loadPosts()
      focusCommentInput(postId)
    } catch (error) {
      console.error('Failed to create comment', error)
    }
  }

  return (
    <div className="page-wrapper">
      <div className={styles.layout}>

        <aside className={styles.sidebarLeft}>
          <div className="card">
            <div className={styles.quickActions}>
              <div className={styles.sectionTitle}>Quick Actions</div>
              {[
                { icon: '➕', label: 'Add a Family Member', color: 'green', path: '/add-family-member' },
                { icon: '📨', label: 'Invite a Family Member', color: 'purple' },
                { icon: '💍', label: 'New Family Marriage', color: 'amber' },
                { icon: '📸', label: 'Create a Memory', color: 'red' },
              ].map(a => (
                <button
                  key={a.label}
                  className={styles.qaBtn}
                  type="button"
                  onClick={() => a.path && navigate(a.path)}
                >
                  <div className={`${styles.qaIcon} ${styles[a.color]}`}>{a.icon}</div>
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <div className={styles.linkedSection}>
              <div className={styles.sectionTitle}>Newly Linked to Your Tree</div>
              <div className={styles.linkedList}>
                {linkedMembers.map(m => (
                  <div
                    key={m.id}
                    className={styles.linkedItem}
                    onClick={() => navigate(`/profile/${m.id}`)}
                  >
                    <div
                      className={`${styles.linkedAvatar} ${m.status === 'live' ? styles.linkedLive : styles.linkedPending}`}
                      style={{
                        background: m.status === 'live'
                          ? `linear-gradient(135deg, ${m.color}, ${m.color}99)`
                          : '#f0f0f5'
                      }}
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

        <main className={styles.centerFeed}>
          <div className={`card ${styles.storiesCard}`}>
            <div className={styles.storiesScroll}>
              <div
                className={styles.storyItem}
                onClick={() => navigate('/profile/1')}
                title="Go to profile"
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.addStoryBtn}>
                  <div className={styles.addStoryAvatar}>{initials}</div>
                  <div className={styles.addStoryPlus}>+</div>
                </div>
                <span className={styles.storyName}>Add Story</span>
              </div>

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

              {stories.length === 0 && (
                <div className={styles.storiesEmpty}>
                  <span>Family stories will appear here</span>
                </div>
              )}
            </div>
          </div>

          <PostComposer
            initials={initials}
            onProfileClick={() => navigate('/profile/1')}
            onCreatePost={handleCreatePost}
          />

          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              toggleReaction={handleToggleReaction}
              commentInputs={commentInputs}
              handleCommentChange={handleCommentChange}
              handleCreateComment={handleCreateComment}
              commentRefs={commentRefs}
              focusCommentInput={focusCommentInput}
            />
          ))}
        </main>

        <aside className={styles.sidebarRight}>
          <div className="card" style={{ padding: '16px' }}>
            <div className={styles.sugTitle}>
              Family Suggestions
              <span className={styles.aiBadge}>AI Matched</span>
            </div>
            {suggestions.map(s => (
              <div key={s.id} className={styles.sugItem}>
                <div
                  className={styles.sugAvatar}
                  style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}99)` }}
                >
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