import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Register.module.css";

export default function Register() {
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:4000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Registration failed");
            }

            setSuccess("Account created successfully. Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 1200);
        } catch (err) {
            setError(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper">
            <div className={styles.registerPage}>
                <div className={styles.registerShell}>
                    <div className={styles.registerIntro}>
                        <div className={styles.kicker}>Join Treelook</div>
                        <h1 className={styles.title}>Create your family network account</h1>
                        <p className={styles.subtitle}>
                            Start building your family tree, preserving memories, and linking generations together.
                        </p>

                        <div className={styles.featureList}>
                            <div className={styles.featureItem}>
                                <span className={styles.featureIcon}>🌳</span>
                                <span>Build your own living family tree</span>
                            </div>
                            <div className={styles.featureItem}>
                                <span className={styles.featureIcon}>👨‍👩‍👧‍👦</span>
                                <span>Add relatives and define family relationships</span>
                            </div>
                            <div className={styles.featureItem}>
                                <span className={styles.featureIcon}>📖</span>
                                <span>Preserve stories, heritage, and family history</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardTitle}>Register</div>
                            <div className={styles.cardText}>
                                Create your Treelook account to begin.
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.field}>
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Your full name"
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a password"
                                    required
                                />
                            </div>

                            <div className={styles.field}>
                                <label>Confirm Password</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Repeat your password"
                                    required
                                />
                            </div>

                            {error && <div className={styles.error}>{error}</div>}
                            {success && <div className={styles.success}>{success}</div>}

                            <button type="submit" className={styles.registerBtn} disabled={loading}>
                                {loading ? "Creating account..." : "Create Account"}
                            </button>
                        </form>

                        <div className={styles.footerText}>
                            Already have an account?{" "}
                            <Link to="/login" className={styles.link}>
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}