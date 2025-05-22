# 3D Product Viewer

An interactive 3D product viewer built with Three.js that allows users to explore a 3D chair model made from basic geometries.

## ✨ Features

- Interactive 3D chair model built from basic geometries
- Automatic camera rotation around the product
- Mouse interaction for part selection and highlighting
- Responsive design that adapts to window size
- Information panel showing selected part details
- Initial instructions displayed on load
- Detailed part information on hover
- Visual feedback with part highlighting and pop-out effects
- Click interaction with rotation animation

## 🛠️ Setup

1. Clone or download this repository
2. Open `index.html` in a modern web browser that supports ES modules
   - For local development, you may need to use a local server due to CORS policies
   - You can use Python's built-in server: `python -m http.server`
   - Or use VS Code's Live Server extension

## 🎮 Controls

- **Left Mouse Button + Drag**: Rotate the camera
- **Right Mouse Button + Drag**: Pan the camera
- **Mouse Wheel**: Zoom in/out
- **Click on parts**: Select and highlight parts with rotation animation
- **Hover over parts**: See part highlighting and detailed information
- **Initial Load**: View product overview and interaction instructions

## 📁 Project Structure

- `index.html`: Main HTML file
- `style.css`: Styling for the application
- `js/main.js`: Main application entry point
- `js/initScene.js`: Scene, camera, and renderer setup
- `js/createProduct.js`: 3D chair model creation with detailed part information
- `js/addLighting.js`: Scene lighting setup
- `js/interaction.js`: Mouse interaction, part selection, and information display
- `js/cameraAnimation.js`: Automatic camera rotation

## 📦 Technologies Used

- Three.js (loaded via CDN)
- JavaScript (ES6+)
- HTML5
- CSS3   
