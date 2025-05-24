// netlify/functions/random-images.js
const categories = {
  animals: ['cat', 'dog', 'bird', 'fish', 'horse', 'elephant', 'tiger', 'bear'],
  objects: ['car', 'phone', 'computer', 'book', 'chair', 'lamp', 'bicycle', 'clock'],
  nature: ['forest', 'mountain', 'ocean', 'desert', 'waterfall', 'sunset', 'flowers', 'lake'],
  food: ['pizza', 'apple', 'burger', 'cake', 'coffee', 'salad', 'pasta', 'fruit'],
  technology: ['robot', 'drone', 'laptop', 'smartphone', 'vr', 'ai', 'coding', 'digital']
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
    const allItems = Object.values(categories).flat();
    const item1 = getRandomItem(allItems);
    let item2 = getRandomItem(allItems);
    
    // Ensure different items
    while (item2 === item1) {
      item2 = getRandomItem(allItems);
    }

    const image1 = getUnsplashImage(item1);
    const image2 = getUnsplashImage(item2);

    const response = {
      success: true,
      images: [image1, image2]
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
      body: JSON.stringify({ success: false, error: 'Failed to fetch random images' })
    };
  }
};