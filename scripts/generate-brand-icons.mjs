import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Luxury Modern Architectural Monogram "YB" + Sprout Leaf Nexus
// Engineered with high contrast, bold geometric hairlines, and dual amethyst + petrichor emerald accents
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background Chassis Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0E0A1E"/>
      <stop offset="50%" stop-color="#07050F"/>
      <stop offset="100%" stop-color="#030206"/>
    </linearGradient>

    <!-- Border Glow Gradient -->
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#C084FC" stop-opacity="0.9"/>
      <stop offset="50%" stop-color="#A855F7" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#34D399" stop-opacity="0.8"/>
    </linearGradient>

    <!-- Core Monogram Primary Gradient (Royal Amethyst to Starlight) -->
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="35%" stop-color="#E9D5FF"/>
      <stop offset="70%" stop-color="#C084FC"/>
      <stop offset="100%" stop-color="#9333EA"/>
    </linearGradient>

    <!-- Accent Emerald Petrichor Gradient (Botanical Sprout Harmony) -->
    <linearGradient id="emeraldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="100%" stop-color="#6EE7B7"/>
    </linearGradient>

    <!-- Glow Filter for High-Impact Display -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="16" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Squircle Base Chassis -->
  <rect x="24" y="24" width="464" height="464" rx="112" fill="url(#bgGrad)"/>
  
  <!-- Subtle Internal Glow Aura -->
  <circle cx="256" cy="230" r="160" fill="#A855F7" opacity="0.16" filter="url(#glow)"/>
  <circle cx="340" cy="300" r="100" fill="#10B981" opacity="0.12" filter="url(#glow)"/>

  <!-- Precision Hairline Border -->
  <rect x="24" y="24" width="464" height="464" rx="112" fill="none" stroke="url(#borderGrad)" stroke-width="12"/>

  <!-- GEOMETRIC YB ARCHITECTURAL MONOGRAM -->
  <!-- Left Wing of 'Y' -->
  <path d="M 136 140 L 220 256 L 220 376 C 220 392 234 404 250 404 C 266 404 280 392 280 376 L 280 256 L 364 140 C 375 125 363 104 344 104 L 304 104 C 293 104 282 110 276 120 L 250 162 L 224 120 C 218 110 207 104 196 104 L 156 104 C 137 104 125 125 136 140 Z" 
        fill="url(#primaryGrad)"/>

  <!-- Dynamic 'B' Forward Loop & Sprout Crystal Leaf -->
  <!-- Top Loop of 'B' merging from center stem -->
  <path d="M 276 160 C 328 160 368 188 368 232 C 368 266 342 292 306 298 C 352 304 384 336 384 376 C 384 424 336 456 276 456 L 256 456 C 242 456 232 446 232 432 C 232 418 242 408 256 408 L 276 408 C 310 408 336 390 336 364 C 336 338 310 320 274 320 L 256 320 L 256 272 L 274 272 C 304 272 324 256 324 232 C 324 208 304 192 274 192 L 256 192 C 248 192 240 186 240 176 C 240 166 248 160 256 160 Z" 
        fill="url(#primaryGrad)" opacity="0.95"/>

  <!-- Luminous Emerald Sprout Diamond Accent (Brand Signature) -->
  <path d="M 250 82 L 268 110 L 250 138 L 232 110 Z" fill="url(#emeraldGrad)"/>
  
  <!-- Micro Star Node at Intersection -->
  <circle cx="250" cy="110" r="4" fill="#FFFFFF"/>
</svg>
`;

async function generateIcons() {
  console.log("Generating high-resolution brand icons from luxury SVG...");
  
  const publicDir = path.resolve('public');
  
  // 1. Write the master SVG
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent, 'utf-8');
  console.log("✓ Saved public/favicon.svg");

  const svgBuffer = Buffer.from(svgContent);

  // 2. Generate standard resolution PNGs
  const sizes = [
    { name: 'icon-48.png', size: 48 },      // Official Google Search Favicon Crawler Spec
    { name: 'icon-96.png', size: 96 },      // High-DPI Google Crawler
    { name: 'icon-192.png', size: 192 },    // Standard Android PWA / Search Spec
    { name: 'icon-512.png', size: 512 },    // High-Res Splash / PWA Icon
    { name: 'apple-touch-icon.png', size: 180 }, // Apple iOS & Safari
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-16x16.png', size: 16 }
  ];

  for (const item of sizes) {
    await sharp(svgBuffer)
      .resize(item.size, item.size)
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(path.join(publicDir, item.name));
    console.log(`✓ Saved public/${item.name} (${item.size}x${item.size})`);
  }

  // 3. Generate a binary multi-resolution favicon.ico containing 48, 32, 16 px
  // Using sharp to output a 48x48 PNG buffer then wrapping as a standard valid ICO
  const png48Buffer = await sharp(svgBuffer).resize(48, 48).png().toBuffer();
  const png32Buffer = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
  const png16Buffer = await sharp(svgBuffer).resize(16, 16).png().toBuffer();

  // Simple, standard ICO format wrapper for PNG images (supported by all modern browsers & Google)
  function createIcoFromPngs(pngBuffers) {
    const numImages = pngBuffers.length;
    const headerSize = 6;
    const entrySize = 16;
    let offset = headerSize + entrySize * numImages;

    const header = Buffer.alloc(headerSize);
    header.writeUInt16LE(0, 0); // reserved
    header.writeUInt16LE(1, 2); // ICO type = 1
    header.writeUInt16LE(numImages, 4);

    const entries = [];
    const imageDatas = [];

    for (const buf of pngBuffers) {
      const metadata = [48, 32, 16][entries.length]; // sizes
      const entry = Buffer.alloc(entrySize);
      entry.writeUInt8(metadata === 256 ? 0 : metadata, 0); // width
      entry.writeUInt8(metadata === 256 ? 0 : metadata, 1); // height
      entry.writeUInt8(0, 2); // color palette
      entry.writeUInt8(0, 3); // reserved
      entry.writeUInt16LE(1, 4); // color planes
      entry.writeUInt16LE(32, 6); // bits per pixel
      entry.writeUInt32LE(buf.length, 8); // image size
      entry.writeUInt32LE(offset, 12); // image offset

      entries.push(entry);
      imageDatas.push(buf);
      offset += buf.length;
    }

    return Buffer.concat([header, ...entries, ...imageDatas]);
  }

  const icoBuffer = createIcoFromPngs([png48Buffer, png32Buffer, png16Buffer]);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log(`✓ Saved public/favicon.ico (${icoBuffer.length} bytes, multi-resolution 48/32/16)`);

  console.log("\nAll brand icons generated successfully!");
}

generateIcons().catch(console.error);
