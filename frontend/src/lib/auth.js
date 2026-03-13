const API_BASE_URL = "http://localhost:4000";

export async function getCurrentUser() {
    const token = localStorage.getItem("treelook_token");

    if (!token) {
        throw new Error("No token found");
    }

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch current user");
    }

    return response.json();
}