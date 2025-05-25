// netlify/functions/load-images.js - THE ONLY FUNCTION YOU NEED
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

const themes = {
  // Animals
  'cat': { emoji: '🐱', color: 'FF6B9D' },
  'dog': { emoji: '🐕', color: '4ECDC4' },
  'bird': { emoji: '🐦', color: '96CEB4' },
  'fish': { emoji: '🐠', color: '5DADE2' },
  'horse': { emoji: '🐎', color: 'F39C12' },
  'elephant': { emoji: '🐘', color: '95A5A6' },
  'tiger': { emoji: '🐅', color: 'E67E22' },
  'bear': { emoji: '🐻', color: '8D6E63' },
  
  // Objects  
  'car': { emoji: '🚗', color: 'E74C3C' },
  'phone': { emoji: '📱', color: '9B59B6' },
  'computer': { emoji: '💻', color: '34495E' },
  'book': { emoji: '📚', color: 'E67E22' },
  'chair': { emoji: '🪑', color: 'A0522D' },
  'lamp': { emoji: '💡', color: 'F1C40F' },
  'bicycle': { emoji: '🚲', color: '2ECC71' },
  'clock': { emoji: '🕐', color: '3498DB' },
  
  // Nature
  'forest': { emoji: '🌲', color: '27AE60' },
  'mountain': { emoji: '🏔️', color: '7F8C8D' },
  'ocean': { emoji: '🌊', color: '3498DB' },
  'desert': { emoji: '🏜️', color: 'D4A574' },
  'waterfall': { emoji: '💧', color: '85C1E9' },
  'sunset': { emoji: '🌅', color: 'F39C12' },
  'flowers': { emoji: '🌸', color: 'E91E63' },
  'lake': { emoji: '🏞️', color: '5DADE2' },
  
  // Food
  'pizza': { emoji: '🍕', color: 'FF6B35' },
  'apple': { emoji: '🍎', color: 'E74C3C' },
  'burger': { emoji: '🍔', color: 'D2691E' },
  'cake': { emoji: '🎂', color: 'FF69B4' },
  'coffee': { emoji: '☕', color: '8B4513' },
  'salad': { emoji: '🥗', color: '32CD32' },
  'pasta': { emoji: '🍝', color: 'DAA520' },
  'fruit': { emoji: '🍓', color: 'DC143C' },
  
  // Technology
  'robot': { emoji: '🤖', color: '607D8B' },
  'drone': { emoji: '🚁', color: '546E7A' },
  'laptop': { emoji: '💻', color: '455A64' },
  'smartphone': { emoji: '📱', color: '7E57C2' },
  'vr': { emoji: '🥽', color: '5E35B1' },
  'ai': { emoji: '🧠', color: '673AB7' },
  'coding': { emoji: '💻', color: '3F51B5' },
  'digital': { emoji: '📊', color: '2196F3' }
};

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

function getThemedImage(query) {
  const theme = themes[query] || { emoji: '❓', color: '6C757D' };
  // Use placehold.co which is very reliable
  return {
    url: `https://placehold.co/400x400/${theme.color}/white?text=${encodeURIComponent(theme.emoji + ' ' + query)}`,
    label: query,
    source: 'themed-emoji'
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
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Get random contrast pair
    const [category1, category2] = getRandomItem(contrastPairs);
    const item1 = getRandomItem(categories[category1]);
    const item2 = getRandomItem(categories[category2]);

    // Generate themed images that match labels perfectly
    const image1 = getThemedImage(item1);
    const image2 = getThemedImage(item2);

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
      body: JSON.stringify({ success: false, error: 'Failed to generate images' })
    };
  }
};
