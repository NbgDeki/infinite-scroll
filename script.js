// Unsplash API
const count = 10;
const apiKey = 'ROZOFccOM4atelArVlFHLUhQQN2mliH0ZGub4XqYArk';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get photos from API
const getPhotos = async () => {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
};

getPhotos();
