import { useState } from "react"
import styles from "../pages/Dashboard.module.css"

export default function PostComposer({ initials, onCreatePost, onProfileClick }) {
    const [content, setContent] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [posting, setPosting] = useState(false)

    const handleSubmit = async () => {
        if (!content.trim()) return

        try {
            setPosting(true)
            await onCreatePost(content, imageUrl)
            setContent("")
            setImageUrl("")
        } finally {
            setPosting(false)
        }
    }

    return (
        <div className="card" style={{ padding: "16px" }}>
            <div className={styles.composeRow}>
                <div
                    className={styles.composeAvatar}
                    onClick={onProfileClick}
                    title="Go to profile"
                    style={{ cursor: "pointer" }}
                >
                    {initials}
                </div>

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share a memory, milestone or update with your family…"
                    style={{
                        flex: 1,
                        minHeight: "80px",
                        border: "1px solid #ddd",
                        borderRadius: "12px",
                        padding: "12px",
                        resize: "vertical",
                        fontFamily: "inherit",
                        fontSize: "14px",
                    }}
                />
            </div>

            <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Optional image URL"
                style={{
                    width: "100%",
                    marginTop: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "12px",
                    padding: "10px 12px",
                    fontSize: "13px",
                }}
            />

            <div className={styles.composeActions}>
                <button
                    type="button"
                    className={`${styles.composeBtn} ${styles.memory}`}
                    onClick={handleSubmit}
                    disabled={posting}
                >
                    {posting ? "Posting..." : "📝 Post"}
                </button>

                <button type="button" className={`${styles.composeBtn} ${styles.video}`}>
                    🎥 Video
                </button>

                <button type="button" className={`${styles.composeBtn} ${styles.photo}`}>
                    📷 Photo
                </button>
            </div>
        </div>
    )
}