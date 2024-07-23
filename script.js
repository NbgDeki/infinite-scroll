const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'ROZOFccOM4atelArVlFHLUhQQN2mliH0ZGub4XqYArk';

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded
const imageLoaded = () => {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
};

// helper function to set attributes on DOM Elements
function setAttributes(el, attr) {
  for (const key in attr) {
    el.setAttribute(key, attr[key]);
  }
}

// Create Elements For Links & Photos, add to DOM
const displayPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach((photo) => {
    // Create <a></a> to link to Unsplash
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank'
    });

    // Create img for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description
    });

    // event listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // Put img inside a, then put both inside imagecontainer el
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};

// Get photos from API
const getPhotos = async () => {
  try {
    const res = await fetch(apiUrl);
    photosArray = await res.json();

    displayPhotos();
  } catch (error) {
    console.log(error);
  }
};

// Check to see if scrolling near bootom of page, load more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// onload
document.addEventListener('DOMContentLoaded', getPhotos);
