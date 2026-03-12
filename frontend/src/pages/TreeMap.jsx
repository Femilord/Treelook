import { useRef, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './TreeMap.module.css'

// ── FAMILY DATA ─────────────────────────────────────────────────────────────
const members = {
  1:  { id: 1,  name: 'Nicolas Westin Sr.', year: '1931–2023', gender: 'male',   status: 'static', initials: 'NW' },
  2:  { id: 2,  name: 'Maria Westin',       year: '1935–2026', gender: 'female',  status: 'live',   initials: 'MW' },
  3:  { id: 3,  name: 'Nicolas Westin Jr.', year: '1954',      gender: 'male',   status: 'live',   initials: 'NW' },
  4:  { id: 4,  name: 'Elizabeth Westin',   year: '1959',      gender: 'female',  status: 'live',   initials: 'EW' },
  5:  { id: 5,  name: 'William Westin',     year: '1962',      gender: 'male',   status: 'live',   initials: 'WW', isSelf: true },
  6:  { id: 6,  name: 'Toluwaju Westin',    year: '1965',      gender: 'female',  status: 'live',   initials: 'TW' },
  7:  { id: 7,  name: 'John Westin',        year: '1967',      gender: 'male',   status: 'live',   initials: 'JW' },
  8:  { id: 8,  name: 'Kathrine Westin',    year: '1969',      gender: 'female',  status: 'static', initials: 'KW' },
  9:  { id: 9,  name: 'David Garland',      year: '1954',      gender: 'male',   status: 'static', initials: 'DG' },
  10: { id: 10, name: 'Wendy Garland',      year: '1982',      gender: 'female',  status: 'live',   initials: 'WG' },
  11: { id: 11, name: 'James Westin',       year: '1985',      gender: 'male',   status: 'live',   initials: 'JW' },
  12: { id: 12, name: 'Lauren Westin',      year: '1989',      gender: 'female',  status: 'live',   initials: 'LW' },
  13: { id: 13, name: 'George Westin',      year: '1993',      gender: 'male',   status: 'live',   initials: 'GW' },
  14: { id: 14, name: 'Kathrine Westin',    year: '1994',      gender: 'female',  status: 'live',   initials: 'KW' },
  15: { id: 15, name: 'Arnold Brown',       year: '1982',      gender: 'male',   status: 'static', initials: 'AB' },
  16: { id: 16, name: 'Gracie Brown',       year: '1987',      gender: 'female',  status: 'live',   initials: 'GB' },
  17: { id: 17, name: 'William Westin Jr.', year: '1989',      gender: 'male',   status: 'live',   initials: 'WW' },
  18: { id: 18, name: 'Penelop Westin',     year: '1993',      gender: 'female',  status: 'live',   initials: 'PW' },
}

// ── LAYOUT: x, y positions in a large canvas (px) ───────────────────────────
// Canvas origin is top-left. Cards are 200px wide, 72px tall.
// Generations sit at fixed Y levels. X positions spread siblings evenly.
const CARD_W = 200
const CARD_H = 72
const GEN_Y  = { 0: 80, 1: 260, 2: 440, 3: 620 }  // Y per generation

const layout = {
  // Gen 0 — grandparents (center top)
  1:  { x: 680,  y: GEN_Y[0] },  // Nicolas Sr.
  2:  { x: 920,  y: GEN_Y[0] },  // Maria

  // Gen 1 — their 5 children + spouses
  3:  { x: 80,   y: GEN_Y[1] },  // Nicolas Jr.
  4:  { x: 330,  y: GEN_Y[1] },  // Elizabeth
  5:  { x: 580,  y: GEN_Y[1] },  // William ← SELF
  6:  { x: 830,  y: GEN_Y[1] },  // Toluwaju
  7:  { x: 1060, y: GEN_Y[1] },  // John
  8:  { x: 1290, y: GEN_Y[1] },  // Kathrine

  // Gen 2 — grandchildren
  9:  { x: 0,    y: GEN_Y[2] },  // David Garland (Nicolas Jr spouse)
  10: { x: 220,  y: GEN_Y[2] },  // Wendy Garland
  11: { x: 440,  y: GEN_Y[2] },  // James Westin
  12: { x: 660,  y: GEN_Y[2] },  // Lauren Westin
  13: { x: 1080, y: GEN_Y[2] },  // George Westin
  14: { x: 1300, y: GEN_Y[2] },  // Kathrine Westin (younger)

  // Gen 3 — great grandchildren
  15: { x: 360,  y: GEN_Y[3] },  // Arnold Brown
  16: { x: 560,  y: GEN_Y[3] },  // Gracie Brown
  17: { x: 760,  y: GEN_Y[3] },  // William Jr.
  18: { x: 960,  y: GEN_Y[3] },  // Penelop
}

// ── CONNECTOR LINES ──────────────────────────────────────────────────────────
// Each entry: { from: id, to: id, type: 'parent'|'spouse' }
const connections = [
  // Nicolas Sr + Maria → children
  { from: 1, to: 3,  type: 'parent' },
  { from: 1, to: 4,  type: 'parent' },
  { from: 1, to: 5,  type: 'parent' },
  { from: 1, to: 6,  type: 'parent' },
  { from: 1, to: 7,  type: 'parent' },
  { from: 1, to: 8,  type: 'parent' },
  // Nicolas Jr → children
  { from: 3, to: 10, type: 'parent' },
  // William → children
  { from: 5, to: 11, type: 'parent' },
  { from: 5, to: 12, type: 'parent' },
  { from: 7, to: 13, type: 'parent' },
  { from: 7, to: 14, type: 'parent' },
  // Gen3
  { from: 11, to: 15, type: 'parent' },
  { from: 11, to: 16, type: 'parent' },
  { from: 11, to: 17, type: 'parent' },
  { from: 11, to: 18, type: 'parent' },
]

// ── CANVAS SIZE ───────────────────────────────────────────────────────────────
const CANVAS_W = 1600
const CANVAS_H = 780

// Card center helper
const cx = (id) => layout[id].x + CARD_W / 2
const cy = (id) => layout[id].y + CARD_H / 2

// ── SVG CONNECTOR PATHS ───────────────────────────────────────────────────────
function buildPaths() {
  // Group children by parent
  const childrenOf = {}
  connections.filter(c => c.type === 'parent').forEach(c => {
    if (!childrenOf[c.from]) childrenOf[c.from] = []
    childrenOf[c.from].push(c.to)
  })

  const paths = []

  Object.entries(childrenOf).forEach(([parentId, childIds]) => {
    const pid = Number(parentId)
    const parentX = cx(pid)
    const parentY = layout[pid].y + CARD_H
    const midY = parentY + (GEN_Y[Math.floor((layout[childIds[0]].y) / 200)] - parentY) / 2

    // Vertical from parent down to mid
    paths.push(`M ${parentX} ${parentY} L ${parentX} ${midY}`)

    if (childIds.length === 1) {
      const childX = cx(childIds[0])
      const childY = layout[childIds[0]].y
      paths.push(`M ${parentX} ${midY} L ${childX} ${midY} L ${childX} ${childY}`)
    } else {
      const leftX  = cx(childIds[0])
      const rightX = cx(childIds[childIds.length - 1])
      // Horizontal spine
      paths.push(`M ${leftX} ${midY} L ${rightX} ${midY}`)
      // Drop to each child
      childIds.forEach(cid => {
        const childX = cx(cid)
        const childY = layout[cid].y
        paths.push(`M ${childX} ${midY} L ${childX} ${childY}`)
      })
    }
  })

  return paths
}

const svgPaths = buildPaths()

// ── NODE CARD ─────────────────────────────────────────────────────────────────
function NodeCard({ member, onClick }) {
  const pos = layout[member.id]
  const isMale   = member.gender === 'male'
  const isLive   = member.status === 'live'
  const isSelf   = member.isSelf

  return (
    <g
      transform={`translate(${pos.x}, ${pos.y})`}
      onClick={() => onClick(member)}
      style={{ cursor: 'pointer' }}
      className={styles.nodeGroup}
    >
      {/* Self glow */}
      {isSelf && (
        <rect
          x={-4} y={-4}
          width={CARD_W + 8} height={CARD_H + 8}
          rx={44} ry={44}
          fill="none"
          stroke="var(--green-400)"
          strokeWidth={3}
          opacity={0.6}
          className={styles.selfGlow}
        />
      )}

      {/* Card body */}
      <rect
        x={0} y={0}
        width={CARD_W} height={CARD_H}
        rx={36} ry={36}
        fill="var(--neutral-100)"
        stroke={isMale ? '#2A2A2A' : 'var(--purple-400)'}
        strokeWidth={isSelf ? 2.5 : 1.8}
      />

      {/* Photo circle */}
      <circle
        cx={38} cy={CARD_H / 2}
        r={28}
        fill="var(--neutral-300)"
        stroke={isMale ? '#2A2A2A' : 'var(--purple-400)'}
        strokeWidth={1.8}
      />

      {/* Person silhouette in circle */}
      <circle cx={38} cy={CARD_H / 2 - 8} r={9} fill="var(--neutral-400)" />
      <ellipse cx={38} cy={CARD_H / 2 + 16} rx={14} ry={10} fill="var(--neutral-400)" />

      {/* Name */}
      <text
        x={76} y={CARD_H / 2 - 8}
        fontFamily="var(--font-sans)"
        fontSize={11}
        fontWeight={600}
        fill="var(--neutral-800)"
      >
        {member.name.length > 18 ? member.name.slice(0, 17) + '…' : member.name}
      </text>

      {/* Year */}
      <text
        x={76} y={CARD_H / 2 + 6}
        fontFamily="var(--font-sans)"
        fontSize={10}
        fill="var(--neutral-500)"
      >
        {member.year}
      </text>

      {/* Action icons row */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${76 + i * 24}, ${CARD_H / 2 + 16})`}>
          <rect x={0} y={0} width={18} height={18} rx={5} fill="var(--neutral-200)" />
          <text x={9} y={13} textAnchor="middle" fontSize={9} fill="var(--neutral-500)">
            {['♪', '✎', '⊕'][i]}
          </text>
        </g>
      ))}

      {/* Status dot */}
      <circle
        cx={CARD_W - 10} cy={CARD_H / 2}
        r={6}
        fill={isLive ? 'var(--green-500)' : 'var(--neutral-400)'}
        stroke="white"
        strokeWidth={1.5}
      />
    </g>
  )
}

// ── MAIN TREEMAP PAGE ─────────────────────────────────────────────────────────
export default function TreeMap() {
  const navigate   = useNavigate()
  const canvasRef  = useRef(null)
  const wrapperRef = useRef(null)

  // Pan state
  const [pan, setPan]         = useState({ x: 0, y: 0 })
  const [zoom, setZoom]       = useState(1)
  const [dragging, setDragging] = useState(false)
  const dragStart = useRef(null)
  const panStart  = useRef(null)

  // Center on William (id=5) on mount
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const vw = wrapper.clientWidth
    const vh = wrapper.clientHeight
    const williamX = layout[5].x + CARD_W / 2
    const williamY = layout[5].y + CARD_H / 2
    setPan({
      x: vw / 2 - williamX * zoom,
      y: vh / 2 - williamY * zoom,
    })
  }, [])

  // Recenter
  const recenter = useCallback(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const vw = wrapper.clientWidth
    const vh = wrapper.clientHeight
    const williamX = layout[5].x + CARD_W / 2
    const williamY = layout[5].y + CARD_H / 2
    setPan({
      x: vw / 2 - williamX * zoom,
      y: vh / 2 - williamY * zoom,
    })
  }, [zoom])

  // Mouse drag handlers
  const onMouseDown = (e) => {
    setDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
    panStart.current  = { ...pan }
  }

  const onMouseMove = (e) => {
    if (!dragging) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y
    setPan({ x: panStart.current.x + dx, y: panStart.current.y + dy })
  }

  const onMouseUp = () => setDragging(false)

  // Scroll to zoom
  const onWheel = (e) => {
    e.preventDefault()
    const delta  = e.deltaY > 0 ? -0.08 : 0.08
    setZoom(z => Math.min(2, Math.max(0.4, z + delta)))
  }

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const onNodeClick = (member) => {
    navigate(`/profile/${member.id}`)
  }

  return (
    <div className="page-wrapper">
      <div
        ref={wrapperRef}
        className={styles.viewport}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        style={{ cursor: dragging ? 'grabbing' : 'grab' }}
      >
        {/* Panning + zooming canvas */}
        <div
          ref={canvasRef}
          className={styles.canvas}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
          }}
        >
          <svg
            width={CANVAS_W}
            height={CANVAS_H}
            className={styles.connectorSvg}
          >
            {/* Connector lines */}
            {svgPaths.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="var(--neutral-300)"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            ))}
          </svg>

          {/* Node cards rendered as SVG */}
          <svg
            width={CANVAS_W}
            height={CANVAS_H}
            className={styles.nodeSvg}
          >
            {Object.values(members).map(m => (
              <NodeCard key={m.id} member={m} onClick={onNodeClick} />
            ))}
          </svg>
        </div>

        {/* ── CONTROLS ── */}
        <div className={styles.controls}>
          {/* Recenter */}
          <button className={styles.recenterBtn} onClick={recenter} title="Recenter on me">
            <span className={styles.recenterIcon}>⊙</span>
            <span>Recenter</span>
          </button>

          {/* Zoom */}
          <div className={styles.zoomBtns}>
            <button onClick={() => setZoom(z => Math.min(2, z + 0.15))}>+</button>
            <span>{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(z => Math.max(0.4, z - 0.15))}>−</button>
          </div>
        </div>

        {/* ── LEGEND ── */}
        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={styles.legendDot} style={{ background: 'var(--green-500)' }} />
            <span>Live member</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendDot} style={{ background: 'var(--neutral-400)' }} />
            <span>Static card</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendSwatch} style={{ borderColor: '#2A2A2A' }} />
            <span>Male</span>
          </div>
          <div className={styles.legendItem}>
            <div className={styles.legendSwatch} style={{ borderColor: 'var(--purple-400)' }} />
            <span>Female</span>
          </div>
        </div>

      </div>
    </div>
  )
}
