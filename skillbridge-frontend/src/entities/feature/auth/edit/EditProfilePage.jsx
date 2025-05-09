import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../../firebase";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from "../../../../components/Header/Header";
import Footer from "../../../../components/Footer/Footer";
import styles from "./ui/EditProfile.module.sass";

const EditProfilePage = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateProfile(user, {
                displayName,
                photoURL,
            });
            setMessage("Profile updated successfully!");
            setTimeout(() => navigate("/profile"), 1500);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.formWrapper}>
                    <h2>Edit Profile</h2>
                    {message && <p className={styles.message}>{message}</p>}
                    <form onSubmit={handleSubmit}>
                        <label>
                            Display Name:
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </label>
                        <label>
                            Profile Photo URL:
                            <input
                                type="text"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                            />
                        </label>
                        <button type="submit">Save Changes</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EditProfilePage;
