// api.js
const getApiUrl = () => {
  const ngrokUrl = "https://75e2-176-219-223-107.ngrok-free.app"; // Güncel ngrok URL'sini buraya yaz
  return `${ngrokUrl}/api/UgvRobot`;
};

export default getApiUrl; 