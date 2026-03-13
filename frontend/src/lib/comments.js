const API_BASE_URL = "http://localhost:4000";

export async function createComment(postId, content) {
    const token = localStorage.getItem("treelook_token");

    const response = await fetch(`${API_BASE_URL}/comments/${postId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
    });

    if (!response.ok) {
        throw new Error("Failed to create comment");
    }

    return response.json();
}