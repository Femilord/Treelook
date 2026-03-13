const API_BASE_URL = "http://localhost:4000";

export async function getPosts() {
    const token = localStorage.getItem("treelook_token");

    const response = await fetch(`${API_BASE_URL}/posts`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }

    return response.json();
}

export async function createPost(content, imageUrl = "") {
    const token = localStorage.getItem("treelook_token");

    const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content, imageUrl }),
    });

    if (!response.ok) {
        throw new Error("Failed to create post");
    }

    return response.json();
}