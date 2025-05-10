const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

exports.makeAdmin = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const {uid} = req.body;

    if (!uid) {
      return res.status(400).json({message: "UID не передан"});
    }

    try {
      // Установка кастомных клеймов (claims)
      await admin.auth().setCustomUserClaims(uid, {admin: true});

      // Обновление Firestore: добавление роли admin в коллекцию users
      const userRef = admin.firestore().collection("users").doc(uid);
      await userRef.set({role: "admin"}, {merge: true});

      return res.status(200).json({message: "Пользователь назначен админом"});
    } catch (error) {
      console.error("Ошибка при назначении админа:", error);
      // eslint-disable-next-line max-len
      return res.status(500).json({message: "Ошибка при назначении", error: error.message});
    }
  });
});

