// netlify/functions/dogs-vs-objects.js
const https = require('https');

const categories = {
  objects: ['car', 'phone', 'computer', 'book', 'chair', 'lamp', 'bicycle', 'clock']
};

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

function getUnsplashImage(query) {
  const imageUrl = `https://source.unsplash.com/400x400/?${query}&${Date.now()}`;
  return {
    url: imageUrl,
    label: query,
    source: 'unsplash'
  };
}

function getDogImage() {
  return new Promise((resolve, reject) => {
    const req = https.get('https://dog.ceo/api/breeds/image/random', (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.status === 'success') {
            resolve({
              url: result.message,
              label: 'dog',
              source: 'dog-api'
            });
          } else {
            resolve({
              url: 'https://via.placeholder.com/400x400/FFB6C1/white?text=Dog',
              label: 'dog',
              source: 'fallback'
            });
          }
        } catch (error) {
          resolve({
            url: 'https://via.placeholder.com/400x400/FFB6C1/white?text=Dog',
            label: 'dog',
            source: 'fallback'
          });
        }
      });
    });
    
    req.on('error', (error) => {
      resolve({
        url: 'https://via.placeholder.com/400x400/FFB6C1/white?text=Dog',
        label: 'dog',
        source: 'fallback'
      });
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        url: 'https://via.placeholder.com/400x400/FFB6C1/white?text=Dog',
        label: 'dog',
        source: 'fallback'
      });
    });
  });
}

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const object = getRandomItem(categories.objects);
    
    const dogImage = await getDogImage();
    const objectImage = getUnsplashImage(object);

    const response = {
      success: true,
      images: [dogImage, objectImage]
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response)
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: 'Failed to fetch images' })
    };
  }
};