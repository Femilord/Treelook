import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './Profile.module.css'

// Sample member data
const memberData = {
  1: {
    id: 1,
    name: 'William Westin',
    initials: 'WW',
    age: 64,
    birthDate: 'March 14, 1962',
    birthYear: 1962,
    birthPlace: 'Lagos, Nigeria',
    location: 'Abuja, Nigeria',
    occupation: 'Civil Engineer',
    maritalStatus: 'Married',
    spouseName: 'Lauren Westin',
    spouseId: 2,
    childrenCount: 3,
    gender: 'male',
    isLive: true,
    isSelf: true,
    generation: '2nd of 3',
    siblings: 4,
    tagline: '"The tree grows as long as the roots hold." — Nicolas Westin Sr.',
    treePosition: 'Son of Nicolas & Maria Westin',
    connections: 18,
    bio: [
      'William Oluwaseun Westin was born on March 14, 1962 in Lagos, Nigeria, the third child of Nicolas Westin Sr. and Maria Westin. He grew up in the heart of Lagos, deeply influenced by his father\'s discipline and his mother\'s warmth — values he carried into his own family and professional life.',
      'He studied Civil Engineering at the University of Lagos, graduating in 1985, and went on to build a distinguished career spanning over three decades. In 1989, he married Lauren Adaeze Obi, and together they raised three children — James, William Jr., and Penelop — all of whom are now active members of the Westin family tree on Treelook.',
      'William is known in the family as the keeper of stories. He has documented much of the Westin family history and was instrumental in bringing the family onto Treelook.',
    ],
    memories: [
      { id: 1, authorInitials: 'EW', authorName: 'Elizabeth Westin', relation: 'Sister', color: '#9B4DAB', text: 'William was always the one who remembered every birthday, every anniversary, every little milestone. Dad always said he had his mother\'s heart and his own mind. So proud of who he has become. 🙏', date: 'February 10, 2026' },
      { id: 2, authorInitials: 'JW', authorName: 'James Westin', relation: 'Son', color: '#2A9D5C', text: 'Dad taught me that family is not just who you\'re born to — it\'s who you choose to keep close. He lives that every single day. Everything I know about being a father, I learnt from watching him. ❤️', date: 'January 28, 2026' },
      { id: 3, authorInitials: 'MW', authorName: 'Maria Westin', relation: 'Mother', color: '#B47AAA', text: 'My William. From the day he was born he has brought nothing but joy into this family. I am so grateful to God for him. 🌿', date: 'December 5, 2025' },
    ],
    timeline: [
      { year: '1962', event: 'Born in Lagos, Nigeria', detail: 'Third child of Nicolas Sr. and Maria Westin', type: 'birth' },
      { year: '1985', event: 'Graduated University of Lagos', detail: 'Bachelor of Science in Civil Engineering', type: 'milestone' },
      { year: '1989', event: 'Married Lauren Adaeze Obi', detail: 'Wedding held in Lagos, Nigeria', type: 'marriage' },
      { year: '1985', event: 'James Westin born', detail: 'First child', type: 'child' },
      { year: '1989', event: 'William Jr. born', detail: 'Second child', type: 'child' },
      { year: '1993', event: 'Penelop Westin born', detail: 'Third child', type: 'child' },
      { year: '2005', event: 'Relocated to Abuja', detail: 'Moved family to FCT for career opportunities', type: 'milestone' },
      { year: '2026', event: 'Joined Treelook', detail: 'Brought the entire Westin family onto the platform', type: 'milestone' },
    ],
    family: {
      parents: [
        { id: 10, name: 'Nicolas Sr.', initials: 'NS', age: 88, rel: 'Father', gender: 'male', isDeceased: true, color: '#6B7A99' },
        { id: 11, name: 'Maria', initials: 'MW', age: 91, rel: 'Mother', gender: 'female', color: '#B47AAA' },
      ],
      spouse: [
        { id: 2, name: 'Lauren', initials: 'LW', age: 37, rel: 'Wife', gender: 'female', color: '#C47494' },
      ],
      siblings: [
        { id: 12, name: 'Nicolas Jr.', initials: 'NJ', age: 72, rel: 'Brother', gender: 'male', color: '#7B8FAA' },
        { id: 13, name: 'Elizabeth', initials: 'EW', age: 67, rel: 'Sister', gender: 'female', color: '#9B4DAB' },
        { id: 14, name: 'Toluwaju', initials: 'TW', age: 61, rel: 'Sister', gender: 'female', color: '#C47494' },
        { id: 15, name: 'John', initials: 'JW', age: 59, rel: 'Brother', gender: 'male', color: '#5B7AAA' },
      ],
      children: [
        { id: 3, name: 'James', initials: 'JW', age: 41, rel: 'Son', gender: 'male', color: '#2A9D5C' },
        { id: 4, name: 'William Jr.', initials: 'WJ', age: 37, rel: 'Son', gender: 'male', color: '#3A7BD5' },
        { id: 5, name: 'Penelop', initials: 'PW', age: 33, rel: 'Daughter', gender: 'female', color: '#D97AB8' },
      ],
    },
    notes: [
      { author: "'Femi · Tree Owner", text: 'William was instrumental in gathering old family photos from our Aunt Kathrine. He holds the original family album from the 1970s.' },
      { author: 'Elizabeth Westin', text: 'William loves jazz music and still plays the piano every Sunday morning. A beautiful tradition he inherited from Grandpa.' },
    ],
    events: [
      { day: '14', month: 'Mar', name: "William's Birthday", detail: 'Turning 64 · 20 days away', type: 'birthday' },
      { day: '22', month: 'Jul', name: 'William & Lauren', detail: '37th Wedding Anniversary', type: 'anniversary' },
    ],
    media: ['🖼️','📷','🖼️','📸','🖼️','📷','🖼️','📸','🖼️'],
  }
}

// Banner tree nodes
const bannerTree = {
  gen1: [
    { initials: 'NS', name: 'Nicolas Sr.', age: '†88', gender: 'male', top: 62, leftOffset: -160 },
    { initials: 'MW', name: 'Maria', age: '91', gender: 'female', top: 62, leftOffset: 80 },
  ],
  gen2: [
    { initials: 'NJ', name: 'Nicolas Jr.', age: '', gender: 'male', top: 160, leftOffset: -440, opacity: 0.5, size: 'md' },
    { initials: 'EW', name: 'Elizabeth', age: '', gender: 'female', top: 160, leftOffset: -240, opacity: 0.7, size: 'md' },
    { initials: 'WW', name: 'William Westin', age: 'Age 64', gender: 'male', top: 148, leftOffset: -36, isSelf: true, size: 'xl' },
    { initials: 'JW', name: 'John', age: '', gender: 'male', top: 160, leftOffset: 180, opacity: 0.7, size: 'md' },
    { initials: 'KW', name: 'Kathrine', age: '', gender: 'female', top: 160, leftOffset: 360, opacity: 0.5, size: 'md' },
    { initials: 'LW', name: 'Lauren', age: '37', gender: 'female', top: 192, leftOffset: 96, size: 'md', isSpouse: true },
  ],
  gen3: [
    { initials: 'JW', name: 'James', age: '', gender: 'male', top: 280, leftOffset: -200, opacity: 0.8, size: 'sm' },
    { initials: 'WJ', name: 'William Jr.', age: '', gender: 'male', top: 280, leftOffset: -20, opacity: 0.8, size: 'sm' },
    { initials: 'PW', name: 'Penelop', age: '', gender: 'female', top: 280, leftOffset: 160, opacity: 0.8, size: 'sm' },
  ],
}

const TABS = ['Story', 'Timeline', 'Family', 'Media']
const TAB_ICONS = { Story: '📖', Timeline: '📅', Family: '🌳', Media: '🖼️' }

export default function Profile() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Story')

  const member = memberData[id] || memberData[1]

  return (
    <div className={styles.profilePage}>

      {/* ── FULL WIDTH TREE BANNER ── */}
      <div className={styles.banner}>
        <div className={styles.bannerGrid} />

        {/* SVG Connectors */}
        <svg className={styles.bannerSvg} viewBox="0 0 1400 420" preserveAspectRatio="none">
          <line x1="560" y1="100" x2="840" y2="100" stroke="rgba(200,180,220,0.4)" strokeWidth="1.5" strokeDasharray="5,4"/>
          <line x1="700" y1="100" x2="700" y2="180" stroke="rgba(200,180,220,0.4)" strokeWidth="1.5"/>
          <line x1="300" y1="200" x2="1100" y2="200" stroke="rgba(200,180,220,0.3)" strokeWidth="1.5"/>
          <line x1="300" y1="180" x2="300" y2="200" stroke="rgba(200,180,220,0.4)" strokeWidth="1.5"/>
          <line x1="500" y1="180" x2="500" y2="200" stroke="rgba(200,180,220,0.4)" strokeWidth="1.5"/>
          <line x1="700" y1="180" x2="700" y2="200" stroke="rgba(200,180,220,0.4)" strokeWidth="1.5"/>
          <line x1="900" y1="180" x2="900" y2="200" stroke="rgba(200,180,220,0.4)" strokeWidth="1.5"/>
          <line x1="1100" y1="180" x2="1100" y2="200" stroke="rgba(200,180,220,0.4)" strokeWidth="1.5"/>
          <line x1="700" y1="230" x2="820" y2="230" stroke="rgba(200,180,220,0.5)" strokeWidth="1.5" strokeDasharray="5,4"/>
          <line x1="760" y1="230" x2="760" y2="300" stroke="rgba(200,180,220,0.4)" strokeWidth="1.5"/>
          <line x1="580" y1="300" x2="940" y2="300" stroke="rgba(200,180,220,0.3)" strokeWidth="1.5"/>
          <line x1="580" y1="300" x2="580" y2="320" stroke="rgba(200,180,220,0.4)" strokeWidth="1.5"/>
          <line x1="760" y1="300" x2="760" y2="320" stroke="rgba(200,180,220,0.4)" strokeWidth="1.5"/>
          <line x1="940" y1="300" x2="940" y2="320" stroke="rgba(200,180,220,0.4)" strokeWidth="1.5"/>
        </svg>

        {/* Tree nodes */}
        {[...bannerTree.gen1, ...bannerTree.gen2, ...bannerTree.gen3].map((node, i) => (
          <div
            key={i}
            className={styles.bannerNode}
            style={{ top: node.top, left: `calc(50% + ${node.leftOffset}px)`, opacity: node.opacity || 1 }}
          >
            <div className={`
              ${styles.bannerAvatar}
              ${styles[node.size || 'lg']}
              ${node.gender === 'female' ? styles.bannerFemale : styles.bannerMale}
              ${node.isSelf ? styles.bannerSelf : ''}
              ${node.isSpouse ? styles.bannerSpouse : ''}
            `}>
              {node.initials}
            </div>
            <div className={styles.bannerName}>{node.name}</div>
            {node.age && <div className={styles.bannerAge}>{node.age}</div>}
          </div>
        ))}

        {/* Banner overlays */}
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerLabel}>🗺️ Family Tree — {member.name}</div>
        <div className={styles.bannerActions}>
          <button className={styles.bannerBtn}>✏️ Edit Banner</button>
          <button className={styles.bannerBtn} onClick={() => navigate('/tree')}>🔍 Full Tree</button>
        </div>
        <div className={styles.zoomControls}>
          <div className={styles.zoomBtn}>+</div>
          <div className={styles.zoomBtn}>−</div>
        </div>
        <button className={styles.recenterBtn}>🎯 Recenter</button>
      </div>

      {/* ── IDENTITY CARD ── */}
      <div className={styles.identityWrap}>
        <div className={styles.identityCard}>
          <div className={styles.identityTop}>

            {/* Avatar */}
            <div className={styles.avatarWrap}>
              <div className={styles.avatarLarge}>{member.initials}</div>
              {member.isLive && <div className={styles.liveDot} />}
            </div>

            {/* Info */}
            <div className={styles.identityInfo}>
              <div className={styles.profileName}>
                {member.name}
                <span className={styles.verifiedBadge}>✓ Live Profile</span>
              </div>
              <div className={styles.tagline}>{member.tagline}</div>
              <div className={styles.treePos}>
                🌳 {member.treePosition} &nbsp;·&nbsp; Generation {member.generation} &nbsp;·&nbsp; {member.connections} family connections
              </div>
            </div>

            {/* Actions */}
            <div className={styles.identityActions}>
              <button className={`${styles.actionBtn} ${styles.ghost}`}>✨ Add Memory</button>
              <button className={`${styles.actionBtn} ${styles.secondary}`}>💬 Message</button>
              <button className={`${styles.actionBtn} ${styles.secondary}`} onClick={() => navigate('/tree')}>🌳 View on Tree</button>
              <button className={`${styles.actionBtn} ${styles.primary}`}>✏️ Edit Profile</button>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className={styles.statsBar}>
            {[
              { icon: '🎂', label: 'Born', value: member.birthDate },
              { icon: '📍', label: 'Birthplace', value: member.birthPlace },
              { icon: '🏡', label: 'Location', value: member.location },
              { icon: '💍', label: 'Married to', value: member.spouseName },
              { icon: '💼', label: 'Occupation', value: member.occupation },
              { icon: '👶', label: 'Children', value: `${member.childrenCount} on tree` },
            ].map(s => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statIcon}>{s.icon}</span>
                <div>
                  <div className={styles.statLabel}>{s.label}</div>
                  <div className={styles.statValue}>{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PROFILE BODY ── */}
      <div className={styles.profileBody}>

        {/* LEFT: Tabs + Content */}
        <div className={styles.tabsSection}>

          {/* Tab bar */}
          <div className={styles.tabsBar}>
            {TABS.map(tab => (
              <div
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                <span>{TAB_ICONS[tab]}</span> {tab}
              </div>
            ))}
          </div>

          {/* ── STORY TAB ── */}
          {activeTab === 'Story' && (
            <div className={styles.tabContent}>

              {/* Biography */}
              <div className={styles.contentCard}>
                <div className={styles.contentCardHeader}>
                  <div className={styles.contentCardTitle}>📖 Biography</div>
                  <div className={styles.contentCardAction}>Edit ✏️</div>
                </div>
                <div className={styles.contentCardBody}>
                  {member.bio.map((para, i) => (
                    <p key={i} className={styles.bioText}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Memories */}
              <div className={styles.contentCard}>
                <div className={styles.contentCardHeader}>
                  <div className={styles.contentCardTitle}>✨ Family Memories</div>
                  <div className={styles.contentCardAction}>+ Add Memory</div>
                </div>
                <div className={styles.contentCardBody} style={{ paddingTop: '8px' }}>
                  {member.memories.map(m => (
                    <div key={m.id} className={styles.memoryItem}>
                      <div className={styles.memoryAvatar} style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}99)` }}>
                        {m.authorInitials}
                      </div>
                      <div className={styles.memoryContent}>
                        <div className={styles.memoryAuthor}>
                          {m.authorName} <span className={styles.memoryRel}>· {m.relation}</span>
                        </div>
                        <div className={styles.memoryText}>{m.text}</div>
                        <div className={styles.memoryTime}>Added {m.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── TIMELINE TAB ── */}
          {activeTab === 'Timeline' && (
            <div className={styles.tabContent}>
              <div className={styles.contentCard}>
                <div className={styles.contentCardHeader}>
                  <div className={styles.contentCardTitle}>📅 Life Timeline</div>
                  <div className={styles.contentCardAction}>+ Add Event</div>
                </div>
                <div className={styles.contentCardBody}>
                  <div className={styles.timeline}>
                    {member.timeline.map((item, i) => (
                      <div key={i} className={styles.timelineItem}>
                        <div className={`${styles.timelineDot} ${styles[item.type]}`} />
                        <div className={styles.timelineYear}>{item.year}</div>
                        <div className={styles.timelineEvent}>{item.event}</div>
                        <div className={styles.timelineDetail}>{item.detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── FAMILY TAB ── */}
          {activeTab === 'Family' && (
            <div className={styles.tabContent}>
              {Object.entries(member.family).map(([group, members]) => (
                <div key={group} className={styles.contentCard}>
                  <div className={styles.contentCardHeader}>
                    <div className={styles.contentCardTitle}>
                      {group === 'parents' ? '👴👵 Parents' : group === 'spouse' ? '💍 Spouse' : group === 'siblings' ? '👫 Siblings' : '👶 Children'}
                    </div>
                  </div>
                  <div className={styles.contentCardBody}>
                    <div className={styles.familyRow}>
                      {members.map(p => (
                        <div key={p.id} className={styles.familyPerson} onClick={() => navigate(`/profile/${p.id}`)}>
                          <div
                            className={`${styles.familyAvatar} ${p.gender === 'female' ? styles.familyFemale : styles.familyMale}`}
                            style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}99)` }}
                          >
                            {p.initials}
                          </div>
                          <div className={styles.familyName}>{p.name}</div>
                          <div className={styles.familyRel}>{p.rel}</div>
                          <div className={styles.familyAge}>{p.isDeceased ? `†${p.age}` : `Age ${p.age}`}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── MEDIA TAB ── */}
          {activeTab === 'Media' && (
            <div className={styles.tabContent}>
              <div className={styles.contentCard}>
                <div className={styles.contentCardHeader}>
                  <div className={styles.contentCardTitle}>🖼️ Photos & Documents</div>
                  <div className={styles.contentCardAction}>+ Upload</div>
                </div>
                <div className={styles.contentCardBody}>
                  <div className={styles.mediaGrid}>
                    {member.media.map((icon, i) => (
                      <div key={i} className={styles.mediaItem}>{icon}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.rightCol}>

          {/* Tree Position */}
          <div className={styles.rightCard}>
            <div className={styles.rightCardHeader}>🌳 Position on Tree</div>
            <div className={styles.rightCardBody}>
              <div className={styles.treePosVisual}>
                {/* Gen 1 */}
                <div className={styles.tpGen}>
                  <div className={styles.tpNode}>
                    <div className={`${styles.tpAvatar} ${styles.tpLg}`}>NS</div>
                    <div className={styles.tpName}>Nicolas Sr.</div>
                  </div>
                  <div className={styles.tpConnector} />
                  <div className={styles.tpNode}>
                    <div className={`${styles.tpAvatar} ${styles.tpLg}`}>MW</div>
                    <div className={styles.tpName}>Maria</div>
                  </div>
                </div>
                <div className={styles.tpVertical} />
                {/* Gen 2 */}
                <div className={styles.tpGen}>
                  <div className={styles.tpNode}>
                    <div className={`${styles.tpAvatar} ${styles.tpMd} ${styles.tpSelf}`}>WW</div>
                    <div className={styles.tpName} style={{ color: 'white', fontWeight: 700 }}>William</div>
                  </div>
                  <div className={styles.tpConnector} />
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>💍</div>
                  <div className={styles.tpConnector} />
                  <div className={styles.tpNode}>
                    <div className={`${styles.tpAvatar} ${styles.tpMd} ${styles.tpSpouse}`}>LW</div>
                    <div className={styles.tpName}>Lauren</div>
                  </div>
                </div>
                <div className={styles.tpVertical} />
                {/* Gen 3 */}
                <div className={styles.tpGen} style={{ gap: '10px' }}>
                  {member.family.children.map(c => (
                    <div key={c.id} className={styles.tpNode}>
                      <div className={`${styles.tpAvatar} ${styles.tpSm}`}>{c.initials}</div>
                      <div className={styles.tpName}>{c.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {[
                { label: 'Generation', value: member.generation },
                { label: 'Siblings on Tree', value: member.siblings },
                { label: 'Children on Tree', value: member.childrenCount },
                { label: 'Live Linked', value: '✓ Yes', highlight: true },
                { label: 'Tree Owner', value: "'Femi Ogunyomi", purple: true },
              ].map(s => (
                <div key={s.label} className={styles.treeStatRow}>
                  <span className={styles.treeStatLabel}>{s.label}</span>
                  <span className={styles.treeStatVal} style={{ color: s.highlight ? 'var(--green)' : s.purple ? 'var(--purple)' : 'var(--text)' }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className={styles.rightCard}>
            <div className={styles.rightCardHeader}>
              📝 Notes
              <span className={styles.notesSubtitle}>Visible to tree members</span>
            </div>
            <div className={styles.rightCardBody}>
              {member.notes.map((note, i) => (
                <div key={i} className={styles.noteItem}>
                  <div className={styles.noteAuthor}>{note.author}</div>
                  {note.text}
                </div>
              ))}
              <button className={styles.addNoteBtn}>+ Add a note about {member.name.split(' ')[0]}</button>
            </div>
          </div>

          {/* Events */}
          <div className={styles.rightCard}>
            <div className={styles.rightCardHeader}>🎂 Upcoming Events</div>
            <div className={styles.rightCardBody}>
              {member.events.map((e, i) => (
                <div key={i} className={styles.eventItem}>
                  <div className={styles.eventDate}>
                    <div className={styles.eventDay}>{e.day}</div>
                    <div className={styles.eventMonth}>{e.month}</div>
                  </div>
                  <div className={styles.eventInfo}>
                    <div className={styles.eventName}>{e.name}</div>
                    <div className={styles.eventDetail}>{e.detail}</div>
                  </div>
                  <span style={{ fontSize: '18px' }}>{e.type === 'birthday' ? '🎂' : '💍'}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
