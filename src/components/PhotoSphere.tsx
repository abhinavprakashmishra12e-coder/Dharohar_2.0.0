import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Minus, Plus, RotateCw } from 'lucide-react';

/** Optional viewer for a self-hosted, licensed 2:1 spherical photograph. */
export function PhotoSphere({ url, title }: { url: string; title: string }) {
  const mount = useRef<HTMLDivElement>(null);
  const api = useRef<{ zoom: (amount: number) => void } | null>(null);
  const rotate = useRef(false);
  const [rotating, setRotating] = useState(false);
  const [status, setStatus] = useState('Loading photograph…');
  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true }); }
    catch { setStatus('This device cannot display WebGL panoramas. Use the external tour link instead.'); return; }
    let disposed = false, frame = 0;
    let yaw = 0, pitch = 0, dragging = false, lastX = 0, lastY = 0, previousTime = 0;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1100);
    const geometry = new THREE.SphereGeometry(500, 64, 40);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: '#172b31' });
    scene.add(new THREE.Mesh(geometry, material));
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.domElement.tabIndex = 0;
    renderer.domElement.setAttribute('aria-label', `${title}. Drag to look around. Arrow keys rotate; plus and minus zoom.`);
    renderer.domElement.style.touchAction = 'none';
    host.appendChild(renderer.domElement);
    const texture = new THREE.TextureLoader().load(url, (loaded) => {
      if (disposed) { loaded.dispose(); return; }
      const image = loaded.image as HTMLImageElement;
      if (Math.abs(image.width / image.height - 2) > 0.03) {
        setStatus('This image is not a full 2:1 spherical panorama. Please configure a licensed 360×180° photograph.');
        loaded.dispose(); return;
      }
      loaded.colorSpace = THREE.SRGBColorSpace;
      material.map = loaded; material.color.set('#ffffff'); material.needsUpdate = true;
      setStatus('');
    }, undefined, () => { if (!disposed) setStatus('The photograph could not load. Check the file path, connection, and image sharing permissions.'); });
    const zoom = (amount: number) => { camera.fov = THREE.MathUtils.clamp(camera.fov + amount, 35, 95); camera.updateProjectionMatrix(); };
    api.current = { zoom };
    const canvas = renderer.domElement;
    const down = (event: PointerEvent) => { dragging = true; lastX = event.clientX; lastY = event.clientY; canvas.setPointerCapture(event.pointerId); };
    const move = (event: PointerEvent) => { if (!dragging) return; yaw -= (event.clientX - lastX) * .2; pitch += (event.clientY - lastY) * .2; lastX = event.clientX; lastY = event.clientY; };
    const up = () => { dragging = false; };
    const wheel = (event: WheelEvent) => { event.preventDefault(); zoom(event.deltaY * .03); };
    const key = (event: KeyboardEvent) => {
      if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','='].includes(event.key)) return;
      event.preventDefault();
      if (event.key === 'ArrowLeft') yaw -= 4;
      if (event.key === 'ArrowRight') yaw += 4;
      if (event.key === 'ArrowUp') pitch += 4;
      if (event.key === 'ArrowDown') pitch -= 4;
      if (event.key === '+' || event.key === '=') zoom(-5);
      if (event.key === '-') zoom(5);
    };
    const contextLost = (event: Event) => { event.preventDefault(); setStatus('The graphics connection was interrupted. Reopen this monument or use the external tour.'); };
    canvas.addEventListener('pointerdown', down); canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
    canvas.addEventListener('wheel', wheel, { passive: false }); canvas.addEventListener('keydown', key);
    canvas.addEventListener('webglcontextlost', contextLost);
    const size = () => { const { width, height } = host.getBoundingClientRect(); if (!width || !height) return; renderer.setSize(width, height); camera.aspect = width / height; camera.updateProjectionMatrix(); };
    const observer = new ResizeObserver(size); observer.observe(host); size();
    const look = new THREE.Vector3();
    const render = (time: number) => {
      frame = requestAnimationFrame(render);
      const dt = Math.min((time - previousTime) / 1000, .05); previousTime = time;
      if (document.hidden) return;
      if (rotate.current && !dragging) yaw += dt * 4;
      pitch = THREE.MathUtils.clamp(pitch, -85, 85);
      const phi = THREE.MathUtils.degToRad(90 - pitch), theta = THREE.MathUtils.degToRad(yaw);
      look.set(Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta));
      camera.lookAt(look); renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(render);
    return () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); api.current = null;
      canvas.removeEventListener('pointerdown', down); canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up); canvas.removeEventListener('pointercancel', up);
      canvas.removeEventListener('wheel', wheel); canvas.removeEventListener('keydown', key);
      canvas.removeEventListener('webglcontextlost', contextLost);
      texture.dispose(); material.dispose(); geometry.dispose(); renderer.dispose(); canvas.remove();
    };
  }, [url, title]);
  return <div className="photo-sphere">
    <div ref={mount} className="photo-sphere-canvas" />
    {status && <div className="sphere-status" role="status">{status}</div>}
    <div className="sphere-controls">
      <button aria-label="Zoom in" onClick={() => api.current?.zoom(-8)}><Plus size={18}/></button>
      <button aria-label="Zoom out" onClick={() => api.current?.zoom(8)}><Minus size={18}/></button>
      <button aria-label={rotating ? 'Pause rotation' : 'Start rotation'} aria-pressed={rotating} onClick={() => { rotate.current = !rotate.current; setRotating(rotate.current); }}><RotateCw size={18}/></button>
    </div>
  </div>;
}
