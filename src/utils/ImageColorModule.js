import { NativeModules } from "react-native";
const { ImageColorModule } = NativeModules;

export const getDominantColor = async (source) => {
  try {
    const color = await ImageColorModule.getDominantColor(source);
    return adjustColor(color); // Cek apakah warna perlu di-darken
  } catch (error) {
    console.error("Error mendapatkan warna dominan:", error);
    return "#FFFFFF"; // Warna fallback
  }
};


export const darkenColor = (hex, factor = 0.8) => {
  if (!hex || !hex.startsWith("#") || hex.length !== 7) {
    console.warn("Hex color tidak valid:", hex);
    return "#000000"; // Fallback ke hitam kalau warna tidak valid
  }

  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  r = Math.max(0, Math.floor(r * factor));
  g = Math.max(0, Math.floor(g * factor));
  b = Math.max(0, Math.floor(b * factor));

  // Pastikan output tetap dalam format #RRGGBB
  const toHex = (c) => c.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};


const adjustColor = (hex) => {
  if (!hex || !hex.startsWith("#") || hex.length !== 7) {
    console.warn("Hex color tidak valid:", hex);
    return "#000000"; // Fallback hitam
  }

  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);

  // **Cek apakah warna terlalu putih atau abu-abu**
  const isTooBright = r > 200 && g > 200 && b > 200;
  const isGray = Math.abs(r - g) < 10 && Math.abs(g - b) < 10; // Warna hampir sama (abu-abu)

  // **Cek apakah warna terlalu kuning** (R & G tinggi, B rendah)
  const isTooYellow = r > 200 && g > 200 && b < 100;

  if (isTooBright || isGray || isTooYellow) {
    console.log("Warna terlalu terang/abu-abu/kuning, menggelapkan...");
    return darkenColor(hex, 0.7);
  }

  return hex; // Warna asli kalau tidak terlalu putih/kuning
};
