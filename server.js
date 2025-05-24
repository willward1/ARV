import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Image categories with contrast pairs
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

// Helper function to get random item from array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Helper function to get image from Unsplash
async function getUnsplashImage(query) {
  try {
    // Using Unsplash Source API (no API key needed)
    const imageUrl = `https://source.unsplash.com/400x400/?${query}&${Date.now()}`;
    return {
      url: imageUrl,
      label: query,
      source: 'unsplash'
    };
  } catch (error) {
    console.error('Unsplash error:', error);
    return null;
  }
}

// Helper function to get image from Lorem Picsum
async function getPicsumImage(label) {
  try {
    const imageUrl = `https://picsum.photos/400/400?random=${Date.now()}`;
    return {
      url: imageUrl,
      label: label,
      source: 'picsum'
    };
  } catch (error) {
    console.error('Picsum error:', error);
    return null;
  }
}

// Helper function to get dog image
async function getDogImage() {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    
    if (data.status === 'success') {
      return {
        url: data.message,
        label: 'dog',
        source: 'dog-api'
      };
    }
    return null;
  } catch (error) {
    console.error('Dog API error:', error);
    return null;
  }
}

// API Routes
app.get('/api/contrasting-images', async (req, res) => {
  try {
    // Get random contrast pair
    const [category1, category2] = getRandomItem(contrastPairs);
    const item1 = getRandomItem(categories[category1]);
    const item2 = getRandomItem(categories[category2]);

    // Fetch images
    const [image1, image2] = await Promise.all([
      getUnsplashImage(item1),
      getUnsplashImage(item2)
    ]);

    res.json({
      success: true,
      images: [
        image1 || { url: `https://via.placeholder.com/400x400/FF6B6B/white?text=${item1}`, label: item1, source: 'fallback' },
        image2 || { url: `https://via.placeholder.com/400x400/4ECDC4/white?text=${item2}`, label: item2, source: 'fallback' }
      ],
      categories: [category1, category2]
    });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch images' });
  }
});

app.get('/api/random-images', async (req, res) => {
  try {
    const allItems = Object.values(categories).flat();
    const item1 = getRandomItem(allItems);
    let item2 = getRandomItem(allItems);
    
    // Ensure different items
    while (item2 === item1) {
      item2 = getRandomItem(allItems);
    }

    const [image1, image2] = await Promise.all([
      getUnsplashImage(item1),
      getUnsplashImage(item2)
    ]);

    res.json({
      success: true,
      images: [
        image1 || { url: `https://via.placeholder.com/400x400/FF6B6B/white?text=${item1}`, label: item1, source: 'fallback' },
        image2 || { url: `https://via.placeholder.com/400x400/4ECDC4/white?text=${item2}`, label: item2, source: 'fallback' }
      ]
    });
  } catch (error) {
    console.error('Random API error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch random images' });
  }
});

app.get('/api/dogs-vs-objects', async (req, res) => {
  try {
    const object = getRandomItem(categories.objects);
    
    const [dogImage, objectImage] = await Promise.all([
      getDogImage(),
      getUnsplashImage(object)
    ]);

    res.json({
      success: true,
      images: [
        dogImage || { url: `https://via.placeholder.com/400x400/FFB6C1/white?text=Dog`, label: 'dog', source: 'fallback' },
        objectImage || { url: `https://via.placeholder.com/400x400/87CEEB/white?text=${object}`, label: object, source: 'fallback' }
      ]
    });
  } catch (error) {
    console.error('Dogs vs objects error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch images' });
  }
});

// Serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Open http://localhost:${PORT} to view the app`);
});