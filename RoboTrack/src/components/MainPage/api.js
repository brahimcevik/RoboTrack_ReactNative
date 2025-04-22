// api.js
const getApiUrl = () => {
  const ngrokUrl = "https://2c3e-46-154-126-179.ngrok-free.app"; // Güncel ngrok URL'sini buraya yaz
  return `${ngrokUrl}/api/UgvRobot`;
};

export default getApiUrl;  