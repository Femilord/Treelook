import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:4000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Login failed");
            }

            localStorage.setItem("treelook_token", data.token);
            localStorage.setItem("treelook_user", JSON.stringify(data.user));

            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page-wrapper">
            <div className={styles.loginPage}>
                <div className={styles.loginShell}>
                    <div className={styles.loginIntro}>
                        <div className={styles.kicker}>Welcome back to Treelook</div>
                        <h1 className={styles.title}>Sign in to your family network</h1>
                        <p className={styles.subtitle}>
                            Continue building your family tree, stories, memories, and connections.
                        </p>

                        <div className={styles.featureList}>
                            <div className={styles.featureItem}>
                                <span className={styles.featureIcon}>🌳</span>
                                <span>Access your living family tree</span>
                            </div>
                            <div className={styles.featureItem}>
                                <span className={styles.featureIcon}>👨‍👩‍👧‍👦</span>
                                <span>Manage family members and relationships</span>
                            </div>
                            <div className={styles.featureItem}>
                                <span className={styles.featureIcon}>📖</span>
                                <span>Preserve stories, photos, and memories</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.cardTitle}>Login</div>
                            <div className={styles.cardText}>
                                Enter your details to continue.
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
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
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            {error && <div className={styles.error}>{error}</div>}

                            <button type="submit" className={styles.loginBtn} disabled={loading}>
                                {loading ? "Signing in..." : "Sign In"}
                            </button>
                        </form>

                        <div className={styles.footerText}>
                            Don’t have an account?{" "}
                            <Link to="/register" className={styles.link}>
                                Create one
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}