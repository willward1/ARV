// netlify/functions/load-images.js
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    // Generate two different random images
    const timestamp = Date.now();
    const random1 = Math.floor(Math.random() * 1000);
    const random2 = Math.floor(Math.random() * 1000);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        images: [
          { url: `https://picsum.photos/400/400?random=${timestamp}${random1}` },
          { url: `https://picsum.photos/400/400?random=${timestamp}${random2}` }
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
