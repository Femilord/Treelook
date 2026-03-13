const API_BASE_URL = "http://localhost:4000";

export async function toggleReaction(postId) {
    const token = localStorage.getItem("treelook_token");

    const response = await fetch(`${API_BASE_URL}/reactions/${postId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to toggle reaction");
    }

    return response.json();
}