import { NativeModules } from "react-native";
const { ImageColorModule } = NativeModules;

export const getDominantColor = async (source) => {
  try {
    const color = await ImageColorModule.getDominantColor(source);
    return adjustColor(color); // ⬅️ Ini sekarang return object { background, text }
  } catch (error) {
    console.error("Error mendapatkan warna dominan:", error);
    return {
      background: "#FFFFFF",
      text: "#FFFFFF",
    };
  }
};

// 💡 Gelapkan warna
export const darkenColor = (hex, factor = 0.8) => {
  if (!hex || !hex.startsWith("#") || hex.length !== 7) {
    console.warn("Hex color tidak valid:", hex);
    return "#000000";
  }

  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  r = Math.max(0, Math.floor(r * factor));
  g = Math.max(0, Math.floor(g * factor));
  b = Math.max(0, Math.floor(b * factor));

  const toHex = (c) => c.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const getLuminance = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const a = [r, g, b].map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  );

  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};

export const autoAdjustColor = (hex, darkThreshold = 0.3, lightThreshold = 0.8) => {
  const luminance = getLuminance(hex);

  if (luminance < darkThreshold) {
    console.log("🔦 Terlalu gelap, diterangkan");
    return lightenColor(hex, 1.6);
  }

  if (luminance > lightThreshold) {
    console.log("🌘 Terlalu terang, digelapkan");
    return darkenColor(hex, 0.7);
  }

  return hex; // Aman, biarkan seperti aslinya
};

// 💡 Terangkan warna
export const lightenColor = (hex, factor = 1.2) => {
  if (!hex || !hex.startsWith("#") || hex.length !== 7) {
    console.warn("Hex color tidak valid:", hex);
    return "#FFFFFF";
  }

  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  r = Math.min(255, Math.floor(r * factor));
  g = Math.min(255, Math.floor(g * factor));
  b = Math.min(255, Math.floor(b * factor));

  const toHex = (c) => c.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// 🎯 Fungsi penyesuaian warna & teks
const adjustColor = (hex) => {
  if (!hex || !hex.startsWith("#") || hex.length !== 7) {
    console.warn("Hex color tidak valid:", hex);
    return {
      background: "#FFFFFF",
      text: "#000000",
    };
  }

  const adjusted = autoAdjustColor(hex); // 🔁 otomatis dark/light
  const luminance = getLuminance(adjusted);

  const textColor = luminance > 0.5 ? "#000000" : "#FFFFFF"; // 🧠 teks harus kontras

  return {
    background: adjusted,
    text: textColor,
  };
};




