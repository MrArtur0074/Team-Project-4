import { useState } from "react";

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
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Назначить администратора</h1>
            <input
                type="text"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                placeholder="Введите UID пользователя"
                className="border p-2 w-full mb-4"
            />
            <button
                onClick={handleMakeAdmin}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Назначить админом
            </button>
            {status && <p className="mt-3">{status}</p>}
        </div>
    );
};

export default AdminUsersPage;
