import { useEffect, useState } from "react";
import { createPerson, getPersons } from "../lib/api";

export default function AddFamilyMember() {
    const [relationship, setRelationship] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [persons, setPersons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadPersons = async () => {
        try {
            const data = await getPersons();
            setPersons(data);
        } catch {
            setError("Failed to load family members");
        }
    };

    useEffect(() => {
        loadPersons();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await createPerson({
                firstName,
                lastName,
                gender,
                relationship,
            });

            setFirstName("");
            setLastName("");
            setGender("");
            setRelationship("");

            await loadPersons();
        } catch {
            setError("Failed to save family member");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper">
            <div style={{ padding: "2rem", maxWidth: "720px", margin: "0 auto" }}>
                <h1>Add Family Member</h1>
                <p style={{ marginBottom: "1.5rem", color: "#666" }}>
                    Start building your Treelook family network by adding a family member.
                </p>

                <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>

                    <div style={{ marginBottom: "1rem" }}>
                        <label>Relationship to You</label>
                        <select
                            value={relationship}
                            onChange={(e) => setRelationship(e.target.value)}
                            required
                            style={{
                                display: "block",
                                width: "100%",
                                padding: "0.75rem",
                                marginTop: "0.5rem",
                            }}
                        >
                            <option value="">Select relationship</option>
                            <option value="Father">Father</option>
                            <option value="Mother">Mother</option>
                            <option value="Brother">Brother</option>
                            <option value="Sister">Sister</option>
                            <option value="Son">Son</option>
                            <option value="Daughter">Daughter</option>
                            <option value="Husband">Husband</option>
                            <option value="Wife">Wife</option>
                            <option value="Ex-husband">Ex-husband</option>
                            <option value="Ex-wife">Ex-wife</option>
                            <option value="Grandfather">Grandfather</option>
                            <option value="Grandmother">Grandmother</option>
                            <option value="Uncle">Uncle</option>
                            <option value="Aunt">Aunt</option>
                            <option value="First Cousin">First Cousin</option>
                            <option value="Second Cousin">Second Cousin</option>
                            <option value="Nephew">Nephew</option>
                            <option value="Niece">Niece</option>
                            <option value="Brother-in-law">Brother-in-law</option>
                            <option value="Sister-in-law">Sister-in-law</option>
                            <option value="Father-in-law">Father-in-law</option>
                            <option value="Mother-in-law">Mother-in-law</option>
                            <option value="Stepfather">Stepfather</option>
                            <option value="Stepmother">Stepmother</option>
                            <option value="Half-brother">Half-brother</option>
                            <option value="Half-sister">Half-sister</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                        <label>First Name</label>
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                            style={{
                                display: "block",
                                width: "100%",
                                padding: "0.75rem",
                                marginTop: "0.5rem",
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                        <label>Last Name</label>
                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            style={{
                                display: "block",
                                width: "100%",
                                padding: "0.75rem",
                                marginTop: "0.5rem",
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                        <label>Gender</label>
                        <input
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            style={{
                                display: "block",
                                width: "100%",
                                padding: "0.75rem",
                                marginTop: "0.5rem",
                            }}
                        />
                    </div>

                    <button type="submit" disabled={loading} style={{ padding: "0.8rem 1.2rem" }}>
                        {loading ? "Saving..." : "Save Family Member"}
                    </button>
                </form>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <h2>Recently Added Members</h2>

                {persons.length === 0 ? (
                    <p>No family members added yet.</p>
                ) : (
                    <ul>
                        {persons.map((person) => (
                            <li key={person.id}>
                                {person.firstName} {person.lastName || ""}{" "}
                                {person.relationship ? `— ${person.relationship}` : ""}{" "}
                                {person.gender ? `(${person.gender})` : ""}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div >
    );
}