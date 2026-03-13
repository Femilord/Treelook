import styles from "../pages/Dashboard.module.css"

export default function PostCard({
    post,
    toggleReaction,
    commentInputs,
    handleCommentChange,
    handleCreateComment,
    commentRefs,
    focusCommentInput,
}) {
    const postInitials = post.author?.fullName
        ? post.author.fullName
            .split(" ")
            .map((p) => p[0])
            .slice(0, 2)
            .join("")
            .toUpperCase()
        : "TL"

    return (
        <div className="card">
            <div className={styles.postHeader}>
                <div
                    className={styles.postAvatar}
                    style={{ background: "linear-gradient(135deg,#1E9952,#14703b)" }}
                >
                    {postInitials}
                </div>

                <div className={styles.postMeta}>
                    <div className={styles.postAuthor}>
                        {post.author?.fullName || "Treelook User"}
                        <span className={styles.postAction}> shared a post</span>
                    </div>

                    <div className={styles.postRel}>
                        <span className={styles.postTime}>
                            {new Date(post.createdAt).toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className={styles.postMenu}>⋯</div>
            </div>

            <div className={styles.postBody}>{post.content}</div>

            {post.imageUrl && (
                <div style={{ marginTop: "12px" }}>
                    <img
                        src={post.imageUrl}
                        alt="Post attachment"
                        style={{
                            width: "100%",
                            borderRadius: "12px",
                            maxHeight: "420px",
                            objectFit: "cover",
                        }}
                    />
                </div>
            )}

            <div className={styles.postReactions}>
                <span className={styles.reactionCount}>
                    {post.reactionCount || 0} family members reacted
                </span>

                <span className={styles.commentCount}>
                    {post.commentCount || 0} comments
                </span>
            </div>

            <div className={styles.postDivider} />

            <div className={styles.postActions}>
                <button
                    type="button"
                    className={styles.postActionBtn}
                    onClick={() => toggleReaction(post.id)}
                >
                    ❤️ {post.hasReacted ? "Reacted" : "React"}
                </button>

                <button
                    type="button"
                    className={styles.postActionBtn}
                    onClick={() => focusCommentInput(post.id)}
                >
                    💬 Comment
                </button>

                <button type="button" className={styles.postActionBtn}>
                    📤 Share
                </button>
            </div>

            <div style={{ padding: "12px 16px 16px" }}>
                {post.comments?.length > 0 && (
                    <div style={{ marginBottom: "12px", display: "grid", gap: "10px" }}>
                        {post.comments.map((comment) => {
                            const commentInitials = comment.user?.fullName
                                ? comment.user.fullName
                                    .split(" ")
                                    .map((part) => part[0])
                                    .slice(0, 2)
                                    .join("")
                                    .toUpperCase()
                                : "TL"

                            return (
                                <div
                                    key={comment.id}
                                    style={{
                                        display: "flex",
                                        gap: "10px",
                                        alignItems: "flex-start",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "34px",
                                            height: "34px",
                                            borderRadius: "50%",
                                            background: "linear-gradient(135deg, #7B2D8B, #1E9952)",
                                            color: "#fff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: "12px",
                                            fontWeight: 700,
                                            flexShrink: 0,
                                        }}
                                    >
                                        {commentInitials}
                                    </div>

                                    <div
                                        style={{
                                            background: "#f7f7f4",
                                            borderRadius: "12px",
                                            padding: "10px 12px",
                                            flex: 1,
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: "13px",
                                                fontWeight: 700,
                                                marginBottom: "4px",
                                            }}
                                        >
                                            {comment.user?.fullName || "Treelook User"}
                                        </div>
                                        <div style={{ fontSize: "13px", color: "var(--text-mid)" }}>
                                            {comment.content}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <input
                        ref={(el) => {
                            commentRefs.current[post.id] = el
                        }}
                        type="text"
                        value={commentInputs[post.id] || ""}
                        onChange={(e) => handleCommentChange(post.id, e.target.value)}
                        placeholder="Write a comment..."
                        style={{
                            width: "100%",
                            border: "1px solid #ddd",
                            borderRadius: "999px",
                            padding: "10px 14px",
                            fontSize: "13px",
                        }}
                    />

                    <button
                        type="button"
                        onClick={() => handleCreateComment(post.id)}
                        style={{
                            border: "none",
                            background: "var(--primary)",
                            color: "#fff",
                            borderRadius: "999px",
                            padding: "8px 14px",
                            cursor: "pointer",
                        }}
                    >
                        Comment
                    </button>
                </div>
            </div>
        </div>
    )
}