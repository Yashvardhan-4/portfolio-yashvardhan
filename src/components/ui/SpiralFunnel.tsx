"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./SpiralFunnel.css";

export interface SpiralFunnelProps {
  className?: string;
  lineCount?: number;
  particleCount?: number;
  height?: number;
  speed?: number;
  interactive?: boolean;
  color?: string; // Base vortex color
  accentColor?: string; // Top flare & motes accent
  floorColor?: string; // Ground swirl disc color
  opacity?: number;
}

export function SpiralFunnel({
  className = "",
  lineCount = 90,
  particleCount = 220,
  height = 5.2,
  speed = 1.0,
  interactive = true,
  color = "#A855F7",
  accentColor = "#E879F9",
  floorColor = "#7E22CE",
  opacity = 0.95,
}: SpiralFunnelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;
    let width = container.clientWidth || 800;
    let heightPx = container.clientHeight || 600;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 100);
    // Position camera to frame the funnel identically to the reference image
    camera.position.set(0, 2.2, 5.8);
    camera.lookAt(0, 2.0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.className = "spiral-funnel-canvas";
    container.appendChild(renderer.domElement);

    // 2. Color setup
    const baseColorObj = new THREE.Color(color);
    const accentColorObj = new THREE.Color(accentColor);
    const floorColorObj = new THREE.Color(floorColor);

    // 3. Mathematical Funnel Radius function: Hourglass / Tornado waist
    // y in [0, height].
    // At y=0: ground connection r ~ 0.8
    // At y=waist (y ~ 1.5): r ~ 0.45
    // At y=top (y ~ height): flares wide r ~ 2.4
    const getRadius = (yNorm: number) => {
      // yNorm in [0, 1]
      if (yNorm < 0.35) {
        // lower taper: 0.8 down to 0.42
        const t = yNorm / 0.35;
        return THREE.MathUtils.lerp(0.75, 0.42, Math.sin(t * Math.PI * 0.5));
      } else {
        // upper flare: 0.42 up to 2.3 with quadratic flare
        const t = (yNorm - 0.35) / 0.65;
        return 0.42 + 1.85 * Math.pow(t, 1.8);
      }
    };

    // 4. Construct Spun Helical Thread Lines
    const pointsPerLine = 64;
    const totalLineVertices = lineCount * (pointsPerLine - 1) * 2;
    const linePositions = new Float32Array(totalLineVertices * 3);
    const lineColors = new Float32Array(totalLineVertices * 3);

    // Precalculate initial angles and random phase offsets for organic variation
    const linePhases = new Float32Array(lineCount);
    const lineTwistMultipliers = new Float32Array(lineCount);
    for (let i = 0; i < lineCount; i++) {
      linePhases[i] = (i / lineCount) * Math.PI * 2;
      lineTwistMultipliers[i] = 1.0 + (Math.random() - 0.5) * 0.25;
    }

    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );
    linesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(lineColors, 3)
    );

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // 5. Construct Flat Ground Disc Swirl Rings
    const groundRingsCount = 36;
    const pointsPerRing = 72;
    const totalGroundVertices = groundRingsCount * (pointsPerRing - 1) * 2;
    const groundPositions = new Float32Array(totalGroundVertices * 3);
    const groundColors = new Float32Array(totalGroundVertices * 3);

    const groundGeometry = new THREE.BufferGeometry();
    groundGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(groundPositions, 3)
    );
    groundGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(groundColors, 3)
    );

    const groundMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: opacity * 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const groundMesh = new THREE.LineSegments(groundGeometry, groundMaterial);
    scene.add(groundMesh);

    // 6. Floating Particles / Glowing Dust Motes
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount);
    const particleThetas = new Float32Array(particleCount);
    const particleHeights = new Float32Array(particleCount);

    const moteColorA = new THREE.Color("#6EE7B7"); // subtle greenish-cyan glowing mote
    const moteColorB = new THREE.Color("#E9D5FF"); // lavender glow mote
    const moteColorC = new THREE.Color("#F472B6"); // pink luminous mote

    for (let i = 0; i < particleCount; i++) {
      particleHeights[i] = Math.random() * height;
      particleThetas[i] = Math.random() * Math.PI * 2;
      particleVelocities[i] = 0.2 + Math.random() * 0.5;

      const yNorm = particleHeights[i] / height;
      const r = getRadius(yNorm) * (0.8 + Math.random() * 0.4);
      particlePositions[i * 3 + 0] = Math.cos(particleThetas[i]) * r;
      particlePositions[i * 3 + 1] = particleHeights[i];
      particlePositions[i * 3 + 2] = Math.sin(particleThetas[i]) * r;

      const pick = Math.random();
      const col = pick < 0.45 ? moteColorB : pick < 0.75 ? moteColorA : moteColorC;
      particleColors[i * 3 + 0] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    // Create round soft glowing particle texture
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.3, "rgba(235,210,255,0.85)");
    grad.addColorStop(0.7, "rgba(168,85,247,0.3)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.085,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // 7. Interactive Mouse / Parallax
    let targetRotY = 0;
    let targetRotX = 0;
    let currentRotY = 0;
    let currentRotX = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.35;
      targetRotX = y * 0.15;
    };

    if (interactive) {
      window.addEventListener("mousemove", handlePointerMove, { passive: true });
    }

    // 8. Animation Loop
    let time = 0;
    const animate = () => {
      time += 0.012 * speed;

      // Smooth camera parallax
      currentRotY += (targetRotY - currentRotY) * 0.05;
      currentRotX += (targetRotX - currentRotX) * 0.05;
      scene.rotation.y = currentRotY;
      scene.rotation.x = currentRotX;

      // Update Funnel Helical Lines
      let lIdx = 0;
      const posArr = linePositions;
      const colArr = lineColors;

      for (let i = 0; i < lineCount; i++) {
        const baseTheta = linePhases[i] + time * 1.35;
        const twistMult = lineTwistMultipliers[i];

        let prevX = 0, prevY = 0, prevZ = 0;
        let prevR = 0, prevG = 0, prevB = 0;

        for (let j = 0; j < pointsPerLine; j++) {
          const yNorm = j / (pointsPerLine - 1);
          const y = yNorm * height;
          // Spiral twist increases with height
          const theta = baseTheta + yNorm * Math.PI * 4.5 * twistMult;
          const r = getRadius(yNorm);

          const x = Math.cos(theta) * r;
          const z = Math.sin(theta) * r;

          // Color gradient along height
          const mixCol = baseColorObj.clone().lerp(accentColorObj, Math.pow(yNorm, 1.2));
          // Fade bottom and top extremities softly
          const alphaFade = Math.sin(yNorm * Math.PI);
          const cr = mixCol.r * (0.6 + 0.4 * alphaFade);
          const cg = mixCol.g * (0.6 + 0.4 * alphaFade);
          const cb = mixCol.b * (0.6 + 0.4 * alphaFade);

          if (j > 0) {
            posArr[lIdx] = prevX;
            posArr[lIdx + 1] = prevY;
            posArr[lIdx + 2] = prevZ;
            colArr[lIdx] = prevR;
            colArr[lIdx + 1] = prevG;
            colArr[lIdx + 2] = prevB;
            lIdx += 3;

            posArr[lIdx] = x;
            posArr[lIdx + 1] = y;
            posArr[lIdx + 2] = z;
            colArr[lIdx] = cr;
            colArr[lIdx + 1] = cg;
            colArr[lIdx + 2] = cb;
            lIdx += 3;
          }

          prevX = x;
          prevY = y;
          prevZ = z;
          prevR = cr;
          prevG = cg;
          prevB = cb;
        }
      }
      linesGeometry.attributes.position.needsUpdate = true;
      linesGeometry.attributes.color.needsUpdate = true;

      // Update Ground Spiral Disc Rings
      let gIdx = 0;
      const gPos = groundPositions;
      const gCol = groundColors;

      for (let r = 0; r < groundRingsCount; r++) {
        const ringNorm = r / (groundRingsCount - 1);
        const radiusBase = 0.55 + ringNorm * 2.8;
        const ringSpeed = 0.8 + (1 - ringNorm) * 1.4;
        const ringAngleOffset = time * ringSpeed + ringNorm * Math.PI * 3.0;

        let prevX = 0, prevZ = 0;
        let prevR = 0, prevG = 0, prevB = 0;

        for (let p = 0; p < pointsPerRing; p++) {
          const pNorm = p / (pointsPerRing - 1);
          // Archimedian spiral component
          const theta = pNorm * Math.PI * 2 + ringAngleOffset;
          const currentR = radiusBase + Math.sin(pNorm * Math.PI * 2) * 0.08;

          const x = Math.cos(theta) * currentR;
          const z = Math.sin(theta) * currentR;
          const y = 0.02 + ringNorm * 0.05; // slight saucer lift

          // Falloff from center outwards
          const distFromCenter = currentR / 3.4;
          const ringAlpha = Math.max(0, 1 - Math.pow(distFromCenter, 2.2));
          const col = floorColorObj.clone().lerp(baseColorObj, ringNorm * 0.7);
          const cr = col.r * ringAlpha * 0.75;
          const cg = col.g * ringAlpha * 0.75;
          const cb = col.b * ringAlpha * 0.75;

          if (p > 0) {
            gPos[gIdx] = prevX;
            gPos[gIdx + 1] = y;
            gPos[gIdx + 2] = prevZ;
            gCol[gIdx] = prevR;
            gCol[gIdx + 1] = prevG;
            gCol[gIdx + 2] = prevB;
            gIdx += 3;

            gPos[gIdx] = x;
            gPos[gIdx + 1] = y;
            gPos[gIdx + 2] = z;
            gCol[gIdx] = cr;
            gCol[gIdx + 1] = cg;
            gCol[gIdx + 2] = cb;
            gIdx += 3;
          }

          prevX = x;
          prevZ = z;
          prevR = cr;
          prevG = cg;
          prevB = cb;
        }
      }
      groundGeometry.attributes.position.needsUpdate = true;
      groundGeometry.attributes.color.needsUpdate = true;

      // Update Particles drifting upward in the vortex
      const partPos = particlePositions;
      for (let i = 0; i < particleCount; i++) {
        particleHeights[i] += particleVelocities[i] * 0.012 * speed;
        // Reset when reaching top
        if (particleHeights[i] > height) {
          particleHeights[i] = 0.05 + Math.random() * 0.2;
        }

        const yNorm = particleHeights[i] / height;
        const r = getRadius(yNorm) * (0.85 + 0.3 * Math.sin(i + time));
        // Upward swirling angle
        particleThetas[i] += (0.015 + (1 - yNorm) * 0.035) * speed;

        partPos[i * 3 + 0] = Math.cos(particleThetas[i]) * r;
        partPos[i * 3 + 1] = particleHeights[i];
        partPos[i * 3 + 2] = Math.sin(particleThetas[i]) * r;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 800;
      heightPx = container.clientHeight || 600;
      camera.aspect = width / heightPx;
      camera.updateProjectionMatrix();
      renderer.setSize(width, heightPx);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      if (interactive) {
        window.removeEventListener("mousemove", handlePointerMove);
      }
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      linesGeometry.dispose();
      linesMaterial.dispose();
      groundGeometry.dispose();
      groundMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, [lineCount, particleCount, height, speed, interactive, color, accentColor, floorColor, opacity]);

  return (
    <div ref={containerRef} className={`spiral-funnel-container ${className}`} />
  );
}

export default SpiralFunnel;
