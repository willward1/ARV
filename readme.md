# Contrasting Images App

A simple Node.js app that loads contrasting labeled images from real APIs.

## 📁 File Structure

```
contrasting-images-app/
├── package.json          # Dependencies and scripts
├── server.js             # Main server file
├── public/
│   └── index.html        # Frontend HTML
└── README.md             # This file
```

## 🚀 Quick Start

1. **Create the project folder:**
   ```bash
   mkdir contrasting-images-app
   cd contrasting-images-app
   ```

2. **Create the files:**
   - Copy `package.json` content to `package.json`
   - Copy `server.js` content to `server.js`
   - Create `public/` folder and copy `index.html` to `public/index.html`

3. **Install and run:**
   ```bash
   npm install
   npm start
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

## ✨ Features

- ✅ Real API integration (Unsplash, Dog CEO API)
- ✅ Smart contrasting image pairs with labels
- ✅ Multiple loading modes:
  - Contrasting categories (nature vs technology)
  - Random pairs 
  - Dogs vs objects
- ✅ Responsive design
- ✅ Fallback images if APIs fail
- ✅ No API keys required

## 🌐 Deploy Options

### Vercel (Recommended)
```bash
npm i -g vercel
vercel --prod
```

### Netlify
1. Upload files to Netlify
2. Build command: `npm install`
3. Publish directory: `public`

### Heroku
```bash
git init
git add .
git commit -m "Initial commit"
heroku create your-app-name
git push heroku main
```

### Railway
1. Connect your GitHub repo
2. Auto-deploys on push

## 🔗 API Endpoints

- `/api/contrasting-images` - Smart contrasting pairs
- `/api/random-images` - Random image pairs  
- `/api/dogs-vs-objects` - Dogs vs everyday objects

## 🛠️ Technologies

- **Backend:** Node.js, Express.js
- **APIs:** Unsplash Source API, Dog CEO API
- **Frontend:** Vanilla HTML/CSS/JavaScript
- **Styling:** Modern CSS with gradients and animations

## 📝 Notes

- No API keys required - uses free, public APIs
- Server-side fetching avoids CORS issues
- Automatic fallbacks for reliable operation
- Mobile-responsive design

Ready to deploy and use!