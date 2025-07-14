// utils/getCurrentUserInfo.js

import { auth } from "../../firebase/firebaseConfig";
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
  const defaultPhoto = "https://i.pinimg.com/736x/72/55/d5/7255d538cacadc975b299f17e2bcd10b.jpg"; // Avatar random based on name

  let updated = false;

  // ✨ Auto-set name if empty
  if (!displayName && email) {
    displayName = defaultName;
    updated = true;
  }

  // ✨ Auto-set photo if empty
  if (!photoURL) {
    photoURL = defaultPhoto;
    updated = true;
  }

  // 💾 Simpan ke Firebase jika ada perubahan
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

  return {
    name: displayName,
    email,
    phone: phoneNumber,
    photo: photoURL,
    provider,
    uid,
  };
};

    // cara pakai 
    // const userInfo = getCurrentUserInfo();

    // if (userInfo) {
    // console.log('🔗 Provider:', userInfo);
    // } else {
    // console.log('🚫 Belum ada user login');
    // }

export default getCurrentUserInfo;
