const API_BASE_URL = "http://localhost:4000";

export async function getPersons() {
    const response = await fetch(`${API_BASE_URL}/persons`);
    if (!response.ok) throw new Error("Failed to fetch persons");
    return response.json();
}

export async function createPerson(data) {
    const response = await fetch(`${API_BASE_URL}/persons`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to create person");
    return response.json();
}