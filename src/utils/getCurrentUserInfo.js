// utils/getCurrentUserInfo.js

import { auth, db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const getCurrentUserInfo = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  let {
    displayName,
    email,
    phoneNumber,
    photoURL,
    uid,
    providerData,
  } = user;

  const provider = providerData?.[0]?.providerId || "unknown";

  // 🌟 Default values
  const defaultName = email?.split("@")[0] || "User";
  const defaultPhoto = "https://i.pinimg.com/736x/72/55/d5/7255d538cacadc975b299f17e2bcd10b.jpg";

  let updated = false;

  if (!displayName && email) {
    displayName = defaultName;
    updated = true;
  }

  if (!photoURL) {
    photoURL = defaultPhoto;
    updated = true;
  }

  if (updated) {
    try {
      await updateProfile(user, {
        displayName,
        photoURL,
      });
      console.log("✅ Profil user diperbarui di Firebase");
    } catch (err) {
      console.error("❌ Gagal update profil:", err);
    }
  }

  // 🔥 Fetch Firestore data
  let firestoreData = {};
  try {
    const userDocRef = doc(db, "users", uid);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      firestoreData = docSnap.data();
      console.log("📦 Data dari Firestore:", firestoreData);
    } else {
      console.log("🚫 Data user tidak ditemukan di Firestore");
    }
  } catch (err) {
    console.error("❌ Gagal fetch data Firestore:", err);
  }

  // 🧩 Merge semua data
  const mergedUserData = {
    uid,
    name: displayName,
    email,
    phone: phoneNumber,
    photo: photoURL,
    provider,
    ...firestoreData, // 🔁 Overwrite atau tambahkan field baru dari Firestore
  };

  return mergedUserData;
};

export default getCurrentUserInfo;
