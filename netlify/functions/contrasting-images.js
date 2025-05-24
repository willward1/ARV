// netlify/functions/contrasting-images.js
const categories = {
  animals: ['cat', 'dog', 'bird', 'fish', 'horse', 'elephant', 'tiger', 'bear'],
  objects: ['car', 'phone', 'computer', 'book', 'chair', 'lamp', 'bicycle', 'clock'],
  nature: ['forest', 'mountain', 'ocean', 'desert', 'waterfall', 'sunset', 'flowers', 'lake'],
  food: ['pizza', 'apple', 'burger', 'cake', 'coffee', 'salad', 'pasta', 'fruit'],
  technology: ['robot', 'drone', 'laptop', 'smartphone', 'vr', 'ai', 'coding', 'digital']
};

const contrastPairs = [
  ['animals', 'objects'],
  ['nature', 'technology'],
  ['food', 'objects'],
  ['animals', 'technology'],
  ['nature', 'objects']
];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

function getWorkingImage(query) {
  const timestamp = Date.now();
  const randomId = Math.floor(Math.random() * 1000);
  
  // Use working image APIs
  const imageUrl = `https://picsum.photos/400/400?random=${timestamp}${randomId}`;
  
  return {
    url: imageUrl,
    label: query,
    source: 'picsum'
  };
}

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Get random contrast pair
    const [category1, category2] = getRandomItem(contrastPairs);
    const item1 = getRandomItem(categories[category1]);
    const item2 = getRandomItem(categories[category2]);

    // Generate working image URLs 
    const image1 = getWorkingImage(item1);
    const image2 = getWorkingImage(item2);

    const response = {
      success: true,
      images: [image1, image2],
      categories: [category1, category2]
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
