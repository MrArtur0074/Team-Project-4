import { useState } from "react";
import AdminHeader from "../../../components/AdminHeader/AdminHeader";
import styles from "./ui/AdminUsers.module.sass";

const AdminUsersPage = () => {
    const [uid, setUid] = useState("");
    const [status, setStatus] = useState("");

    const handleMakeAdmin = async () => {
        setStatus("Обработка...");
        try {
            const res = await fetch("https://us-central1-skillbridge-5340e.cloudfunctions.net/makeAdmin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${await getAuthToken()}`,
                },
                body: JSON.stringify({ uid }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("Успешно назначен админом!");
            } else {
                setStatus(`Ошибка: ${data.message}`);
            }
        } catch (err) {
            setStatus("Сетевая ошибка");
        }
    };

    const getAuthToken = async () => {
        const user = await import("firebase/auth").then(m => m.getAuth().currentUser);
        return user ? await user.getIdToken() : "";
    };

    return (
        <>
            <AdminHeader />
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Назначить администратора</h1>
                <input
                    type="text"
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                    placeholder="Введите UID пользователя"
                    className={styles.input}
                />
                <button
                    onClick={handleMakeAdmin}
                    className={styles.button}
                >
                    Назначить админом
                </button>
                {status && <p className={styles.status}>{status}</p>}
            </div>
        </>
    );
};

export default AdminUsersPage;

