

export const getGreeting = () => {
    const hours = new Date().getHours();
  
    if (hours >= 5 && hours < 12) {
      return "Selamat Pagi";
    } else if (hours >= 12 && hours < 15) {
      return "Selamat Siang";
    } else if (hours >= 15 && hours < 18) {
      return "Selamat Sore";
    } else {
      return "Selamat Malam";
    }
};
  