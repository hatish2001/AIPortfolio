const fs = require('fs');
const path = require('path');

// Simple SVG placeholder generator with better colors
function generatePlaceholderSVG(text, width, height, type = 'default') {
  const gradients = {
    apps: ['#6B46C1', '#3B82F6'],       // Purple to blue
    education: ['#8B5CF6', '#6366F1'],  // Purple gradient
    experience: ['#7C3AED', '#4F46E5'], // Violet to indigo
    default: ['#18181b', '#27272a']     // Neutral dark
  };
  
  const [color1, color2] = gradients[type] || gradients.default;
  
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad-${type}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#grad-${type})"/>
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle" alignment-baseline="middle" opacity="0.9">${text}</text>
  </svg>`;
}

// Create directories if they don't exist
const directories = [
  'public/images',
  'public/images/apps',
  'public/images/edu',
  'public/images/exp',
  'public/video',
  'public/files'
];

directories.forEach(dir => {
  const fullPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// Generate placeholder images with consistent 16:9 aspect ratio
const placeholders = [
  // Apps
  { path: 'public/images/apps/compliance-ai.jpg', text: 'AI Compliance', width: 1280, height: 720, type: 'apps' },
  { path: 'public/images/apps/compliance-1.png', text: 'Compliance 1', width: 1280, height: 720, type: 'apps' },
  { path: 'public/images/apps/compliance-2.png', text: 'Compliance 2', width: 1280, height: 720, type: 'apps' },
  { path: 'public/images/apps/mistral-support.jpg', text: 'Mistral LLM', width: 1280, height: 720, type: 'apps' },
  { path: 'public/images/apps/insurance-rag.jpg', text: 'Insurance RAG', width: 1280, height: 720, type: 'apps' },
  { path: 'public/images/apps/av-hubert.jpg', text: 'AV-HuBERT', width: 1280, height: 720, type: 'apps' },
  // Education
  { path: 'public/images/edu/northeastern.jpg', text: 'Northeastern', width: 1280, height: 720, type: 'education' },
  // Experience
  { path: 'public/images/exp/customstacks.jpg', text: 'CustomStacks', width: 1280, height: 720, type: 'experience' },
  { path: 'public/images/exp/factoryspace.jpg', text: 'Factoryspace', width: 1280, height: 720, type: 'experience' },
  { path: 'public/images/exp/american-fidelity.jpg', text: 'American Fidelity', width: 1280, height: 720, type: 'experience' },
  { path: 'public/images/exp/cgi.jpg', text: 'CGI Inc', width: 1280, height: 720, type: 'experience' },
  // Profile & Meta
  { path: 'public/images/me.jpg', text: 'Harishraj', width: 800, height: 800, type: 'default' },
  { path: 'public/og-image.jpg', text: 'DevFolio', width: 1200, height: 630, type: 'default' },
  { path: 'public/favicon.ico', text: 'D', width: 32, height: 32, type: 'default' },
  { path: 'public/apple-touch-icon.png', text: 'D', width: 180, height: 180, type: 'default' },
  { path: 'public/icon-192x192.png', text: 'D', width: 192, height: 192, type: 'default' },
  { path: 'public/icon-512x512.png', text: 'D', width: 512, height: 512, type: 'default' },
];

placeholders.forEach(({ path: filePath, text, width, height, type }) => {
  const fullPath = path.join(__dirname, '..', filePath);
  const svg = generatePlaceholderSVG(text, width, height, type);
  fs.writeFileSync(fullPath.replace(/\.(jpg|png|ico)$/, '.svg'), svg);
  console.log(`Generated placeholder: ${filePath}`);
});

// Create dummy video files
fs.writeFileSync(path.join(__dirname, '..', 'public/video/compliance-ai.mp4'), '');
fs.writeFileSync(path.join(__dirname, '..', 'public/video/prop65-loop.mp4'), '');

// Create a dummy PDF file
fs.writeFileSync(path.join(__dirname, '..', 'public/files/Harishraj_resume.pdf'), '');

console.log('\nAll placeholder files generated!');
console.log('Note: These are SVG placeholders. For production, replace with real images.');
