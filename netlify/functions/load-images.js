// netlify/functions/load-images.js
const categories = {
  animals: ['cat', 'dog', 'bird', 'fish'],
  objects: ['car', 'phone', 'computer', 'book'],
  nature: ['forest', 'mountain', 'ocean', 'sunset'],
  food: ['pizza', 'apple', 'burger', 'cake']
};

const contrastPairs = [
  ['animals', 'objects'],
  ['nature', 'objects'],
  ['food', 'objects'],
  ['animals', 'nature']
];

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Get random contrast pair
    const [category1, category2] = getRandomItem(contrastPairs);
    const item1 = getRandomItem(categories[category1]);
    const item2 = getRandomItem(categories[category2]);

    // Generate images
    const seed1 = item1.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
    const seed2 = item2.split('').reduce((a, b) => a + b.charCodeAt(0), 0);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        images: [
          {
            url: `https://picsum.photos/seed/${seed1}/400/400`,
            label: item1
          },
          {
            url: `https://picsum.photos/seed/${seed2}/400/400`,
            label: item2
          }
        ]
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: 'Failed to load images' })
    };
  }
};
