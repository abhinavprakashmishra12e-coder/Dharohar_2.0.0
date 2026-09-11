import { useEffect, useRef } from 'react';
import type { CSSProperties, JSX } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { INDIAN_STATES } from '../data/indiaHeritageData';
import { HERITAGE_LANDMARKS } from '../data/landmarksData';
import type { StateHeritage } from '../types/heritage';

export interface HeritageDioramaProps {
  replayKey: number;
  skipIntro: boolean;
  reducedMotion: boolean;
  onIntroEnd: () => void;
  onSelectLandmark: (id: string) => void;
  onSelectState: (stateId: string) => void;
  onUnavailable: () => void;
}

type Intro = { active: boolean; key: number; started: number; from: THREE.Vector3; to: THREE.Vector3 };
type Featured = { id: string; label: string; map: { x: number; y: number }; offset: [number, number] };

const SCALE = 0.018;
const MAP_CENTER = { x: 387.5, y: 400 };
const FEATURED: Featured[] = [
  { id: 'taj-mahal', label: 'Taj Mahal', map: { x: 290, y: 255 }, offset: [58, -60] },
  { id: 'golden-temple', label: 'Sri Harmandir Sahib', map: { x: 185, y: 155 }, offset: [-155, -52] },
  { id: 'hawa-mahal', label: 'Hawa Mahal', map: { x: 195, y: 245 }, offset: [-158, 30] },
  { id: 'amber-fort', label: 'Amber Fort', map: { x: 230, y: 285 }, offset: [65, 50] },
];

function mapPoint(x: number, y: number, height = 0.2): THREE.Vector3 {
  return new THREE.Vector3((x - MAP_CENTER.x) * SCALE, height, (y - MAP_CENTER.y) * SCALE);
}

function simplify(points: THREE.Vector2[], tolerance = 1.1, maxPoints = 170): THREE.Vector2[] {
  if (points.length <= 3) return points;
  const sqTolerance = tolerance * tolerance;
  const kept: THREE.Vector2[] = [points[0]];
  let previous = points[0];
  for (let i = 1; i < points.length - 1; i += 1) {
    if (previous.distanceToSquared(points[i]) >= sqTolerance) {
      kept.push(points[i]);
      previous = points[i];
    }
  }
  kept.push(points[points.length - 1]);
  if (kept.length <= maxPoints) return kept;
  const stride = Math.ceil(kept.length / maxPoints);
  return kept.filter((_, index) => index === 0 || index === kept.length - 1 || index % stride === 0);
}

function simplifiedShape(shape: THREE.Shape): THREE.Shape {
  const extracted = shape.extractPoints(4);
  const next = new THREE.Shape(simplify(extracted.shape).map(p => new THREE.Vector2((p.x - MAP_CENTER.x) * SCALE, (MAP_CENTER.y - p.y) * SCALE)));
  extracted.holes.forEach((holePoints) => {
    const hole = new THREE.Path(simplify(holePoints).map(p => new THREE.Vector2((p.x - MAP_CENTER.x) * SCALE, (MAP_CENTER.y - p.y) * SCALE)));
    next.holes.push(hole);
  });
  return next;
}

function material(color: string, roughness = 0.78, metalness = 0): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness, flatShading: true });
}

function addBox(parent: THREE.Object3D, size: [number, number, number], position: [number, number, number], color: string) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material(color));
  mesh.position.set(...position);
  parent.add(mesh);
  return mesh;
}

function addDome(parent: THREE.Object3D, position: [number, number, number], radius: number, color: string) {
  const dome = new THREE.Mesh(new THREE.SphereGeometry(radius, 12, 7, 0, Math.PI * 2, 0, Math.PI / 2), material(color, 0.55, 0.1));
  dome.position.set(...position);
  parent.add(dome);
  return dome;
}

function addTower(parent: THREE.Object3D, position: [number, number, number], height: number, color: string, cap = color) {
  const tower = new THREE.Group();
  tower.position.set(...position);
  tower.add(new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.105, height, 8), material(color)));
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.11, 0.18, 8), material(cap, 0.58, 0.08));
  tip.position.y = height / 2 + 0.08;
  tower.add(tip);
  parent.add(tower);
  return tower;
}

function addMonument(parent: THREE.Group, id: string, point: THREE.Vector3): THREE.Group {
  const monument = new THREE.Group();
  monument.position.copy(point);
  monument.userData.landmarkId = id;
  parent.add(monument);
  if (id === 'taj-mahal') {
    addBox(monument, [1.18, 0.08, 0.9], [0, 0.04, 0], '#f7fafc');
    addBox(monument, [0.68, 0.58, 0.48], [0, 0.36, 0], '#f6f2e9');
    addDome(monument, [0, 0.72, 0], 0.28, '#fffaf0');
    addTower(monument, [-0.58, 0.42, -0.34], 0.72, '#efe9db', '#f9f1d0');
    addTower(monument, [0.58, 0.42, -0.34], 0.72, '#efe9db', '#f9f1d0');
    addTower(monument, [-0.58, 0.42, 0.34], 0.72, '#efe9db', '#f9f1d0');
    addTower(monument, [0.58, 0.42, 0.34], 0.72, '#efe9db', '#f9f1d0');
  } else if (id === 'golden-temple') {
    const pool = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 0.055, 24), material('#6ec9dd', 0.3, 0.1));
    pool.position.y = 0.03;
    monument.add(pool);
    addBox(monument, [0.55, 0.36, 0.55], [0, 0.25, 0], '#eabf35');
    addDome(monument, [0, 0.5, 0], 0.28, '#f5cc42');
    addTower(monument, [0, 0.57, 0], 0.54, '#e6b82d', '#fff0a0');
  } else if (id === 'hawa-mahal') {
    const pink = '#ec91a1';
    for (let row = 0; row < 4; row += 1) {
      const width = 0.95 - row * 0.18;
      addBox(monument, [width, 0.2, 0.23], [0, 0.12 + row * 0.2, 0], pink);
      for (let window = -2; window <= 2; window += 1) {
        const w = width / 5;
        const arch = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.04, 8), material('#fff0d6'));
        arch.rotation.x = Math.PI / 2;
        arch.position.set(window * w, 0.12 + row * 0.2, -0.14);
        monument.add(arch);
      }
    }
    addDome(monument, [0, 0.93, 0], 0.15, '#f4adad');
  } else {
    const sandstone = '#bf7541';
    addBox(monument, [1.05, 0.46, 0.62], [0, 0.24, 0], sandstone);
    addBox(monument, [0.72, 0.34, 0.46], [0, 0.62, 0], '#d58c50');
    [-0.46, 0.46].forEach((x) => {
      addTower(monument, [x, 0.52, 0], 0.86, '#c98248', '#e6b167');
    });
    for (let x = -0.38; x <= 0.38; x += 0.19) addBox(monument, [0.11, 0.16, 0.13], [x, 0.86, -0.02], '#e6b167');
  }
  return monument;
}

function addRiver(scene: THREE.Scene, coordinates: Array<[number, number]>, color: string) {
  const curve = new THREE.CatmullRomCurve3(coordinates.map(([x, y]) => mapPoint(x, y, 0.12)));
  const geometry = new THREE.TubeGeometry(curve, 34, 0.035, 5, false);
  scene.add(new THREE.Mesh(geometry, material(color, 0.22, 0.08)));
}

function addIndiaLettering(scene: THREE.Scene) {
  const lettering = document.createElement('canvas');
  lettering.width = 1024;
  lettering.height = 220;
  const context = lettering.getContext('2d');
  if (!context) return;
  context.clearRect(0, 0, lettering.width, lettering.height);
  context.font = '900 152px system-ui, sans-serif';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillStyle = '#ffffff';
  context.fillText('INDIA', lettering.width / 2, lettering.height / 2 + 8);
  const texture = new THREE.CanvasTexture(lettering);
  texture.colorSpace = THREE.SRGBColorSpace;
  const shadowTexture = texture.clone();
  const shadowMaterial = new THREE.MeshBasicMaterial({ map: shadowTexture, color: '#356579', transparent: true, opacity: 0.52, side: THREE.DoubleSide });
  const whiteMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
  const plane = new THREE.PlaneGeometry(4.2, 0.9);
  const shadow = new THREE.Mesh(plane, shadowMaterial);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0, 0.48, 3.35);
  shadow.position.x += 0.08;
  shadow.position.z += 0.1;
  scene.add(shadow);
  const white = new THREE.Mesh(plane.clone(), whiteMaterial);
  white.rotation.x = -Math.PI / 2;
  white.position.set(0, 0.54, 3.35);
  scene.add(white);
}

function addMountain(scene: THREE.Scene, x: number, y: number, radius: number, height: number, snow = false) {
  const mountain = new THREE.Group();
  mountain.position.copy(mapPoint(x, y, 0.03));
  const base = new THREE.Mesh(new THREE.ConeGeometry(radius, height, 7), material(snow ? '#8daac0' : '#488756'));
  base.position.y = height / 2;
  mountain.add(base);
  if (snow) {
    const cap = new THREE.Mesh(new THREE.ConeGeometry(radius * 0.45, height * 0.42, 7), material('#f6fbff', 0.65));
    cap.position.y = height * 0.8;
    mountain.add(cap);
  }
  scene.add(mountain);
}

export function HeritageDiorama({
  replayKey,
  skipIntro,
  reducedMotion,
  onIntroEnd,
  onSelectLandmark,
  onSelectState,
  onUnavailable,
}: HeritageDioramaProps): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const calloutRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const replayKeyRef = useRef(replayKey);
  const skipRef = useRef(skipIntro);
  const reducedRef = useRef(reducedMotion);
  const callbacks = useRef({ onIntroEnd, onSelectLandmark, onSelectState, onUnavailable });
  const introRef = useRef<Intro | null>(null);
  const readyRef = useRef(false);
  const initializedReplayRef = useRef<number | null>(null);
  const settledKeyRef = useRef<number | null>(null);
  const startIntroRef = useRef<(key: number) => void>(() => undefined);
  const settleRef = useRef<(key: number) => void>(() => undefined);
  const controlsRef = useRef<OrbitControls | null>(null);
  replayKeyRef.current = replayKey;
  skipRef.current = skipIntro;
  reducedRef.current = reducedMotion;
  callbacks.current = { onIntroEnd, onSelectLandmark, onSelectState, onUnavailable };

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return undefined;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      callbacks.current.onUnavailable();
      return undefined;
    }
    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.Fog('#e6eee1', 29, 55);
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    const settledPosition = new THREE.Vector3(0, 15.5, 15.5);
    camera.position.set(0, 26, 27);
    camera.lookAt(0, 0, 0);
    const controls = new OrbitControls(camera, canvas);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 10;
    controls.maxDistance = 29;
    controls.maxPolarAngle = Math.PI * 0.47;
    controls.minPolarAngle = Math.PI * 0.17;
    controls.enabled = false;
    controls.target.set(0, 0, 0);

    const hemisphere = new THREE.HemisphereLight('#fffaf0', '#597796', 2.2);
    scene.add(hemisphere);
    const keyLight = new THREE.DirectionalLight('#fff4d3', 3.2);
    keyLight.position.set(-8, 18, 11);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight('#cceeff', 1.3);
    rimLight.position.set(10, 7, -14);
    scene.add(rimLight);

    const ocean = new THREE.Mesh(new THREE.CylinderGeometry(10.4, 10.4, 0.48, 72), material('#9ed8e8', 0.5));
    ocean.position.y = -1.1;
    scene.add(ocean);
    const oceanRing = new THREE.Mesh(new THREE.TorusGeometry(8.9, 0.11, 6, 72), material('#c9eef4', 0.4));
    oceanRing.rotation.x = Math.PI / 2;
    oceanRing.position.y = -0.83;
    scene.add(oceanRing);
    const shadow = new THREE.Mesh(new THREE.CircleGeometry(8.9, 64), new THREE.MeshBasicMaterial({ color: '#507c93', transparent: true, opacity: 0.2 }));
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.84;
    scene.add(shadow);
    addIndiaLettering(scene);

    const stateMeshes: THREE.Mesh[] = [];
    const terrainColors: Record<StateHeritage['terrainType'], string> = {
      snow_mountain: '#bdd9d8',
      lush_plains: '#65b878',
      arid_desert: '#e7bb61',
      plateau: '#9cbd70',
      coastal_tropical: '#4eb587',
      forest_hills: '#429a72',
    };
    const stateGroup = new THREE.Group();
    scene.add(stateGroup);
    const loader = new SVGLoader();
    INDIAN_STATES.forEach((state) => {
      try {
        const parsed = loader.parse(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 775 800"><path d="${state.svgPath}"/></svg>`);
        const shapes = parsed.paths.flatMap((path) => SVGLoader.createShapes(path)).map(simplifiedShape);
        const group = new THREE.Group();
        group.userData.stateId = state.id;
        shapes.forEach((shape) => {
          const geometry = new THREE.ExtrudeGeometry(shape, { depth: 0.42, bevelEnabled: false, curveSegments: 1, steps: 1 });
          geometry.rotateX(-Math.PI / 2);
          geometry.translate(0, -0.42, 0);
          geometry.computeVertexNormals();
          const mesh = new THREE.Mesh(geometry, material(terrainColors[state.terrainType] ?? state.colorTheme.base));
          mesh.userData.stateId = state.id;
          group.add(mesh);
          stateMeshes.push(mesh);
          const edge = new THREE.LineSegments(new THREE.EdgesGeometry(geometry, 24), new THREE.LineBasicMaterial({ color: state.colorTheme.border, transparent: true, opacity: 0.52 }));
          edge.userData.decorative = true;
          group.add(edge);
        });
        stateGroup.add(group);
      } catch {
        // A malformed micro-island should not prevent the rest of the diorama from loading.
      }
    });

    // Low-poly relief, deliberately symbolic rather than photoreal.
    [
      [205, 95, 0.64, 1.25], [250, 108, 0.56, 1.05], [305, 112, 0.48, 0.92], [355, 122, 0.46, 0.84],
      [405, 134, 0.4, 0.74], [450, 145, 0.34, 0.62],
    ].forEach(([x, y, r, h]) => addMountain(scene, x, y, r, h, true));
    [[170, 235, 0.42, 0.42], [220, 350, 0.48, 0.5], [360, 410, 0.6, 0.4], [470, 520, 0.55, 0.44], [310, 605, 0.4, 0.44]].forEach(([x, y, r, h]) => addMountain(scene, x, y, r, h));
    addRiver(scene, [[230, 120], [265, 200], [320, 280], [345, 410], [340, 600], [365, 735]], '#37a8d0');
    addRiver(scene, [[510, 182], [470, 240], [430, 320], [395, 400], [345, 470]], '#299ac7');
    addRiver(scene, [[285, 230], [350, 265], [420, 305], [505, 340], [570, 390]], '#56bedb');

    const monuments = new THREE.Group();
    scene.add(monuments);
    const landmarksById = new Map(HERITAGE_LANDMARKS.map((landmark) => [landmark.id, landmark]));
    FEATURED.forEach((featured) => {
      const source = landmarksById.get(featured.id);
      const map = source?.mapPosition ?? featured.map;
      addMonument(monuments, featured.id, mapPoint(map.x, map.y, 0.06));
    });

    const clouds: THREE.Object3D[] = [];
    const cloudMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff', transparent: true, opacity: 0.83, roughness: 1 });
    [[-7.8, -1.45, 5.8], [7.9, -1.4, 4.8], [-8.2, -0.7, -2.2], [8.2, -0.85, -1.5], [-4.5, -1.7, -7.6], [4.8, -1.55, -7.5]].forEach(([x, y, z], index) => {
      const puff = new THREE.Group();
      puff.position.set(x, y, z);
      for (let i = 0; i < 4; i += 1) {
        const bubble = new THREE.Mesh(new THREE.SphereGeometry(0.72 + (i % 2) * 0.18, 10, 7), cloudMaterial);
        bubble.position.set((i - 1.5) * 0.58, (i % 2) * 0.25, (i % 2 ? 0.16 : -0.06));
        puff.add(bubble);
      }
      puff.userData.phase = index * 0.8;
      puff.userData.baseY = y;
      scene.add(puff);
      clouds.push(puff);
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerDown = { x: 0, y: 0, time: 0 };
    const onPointerDown = (event: PointerEvent) => { pointerDown = { x: event.clientX, y: event.clientY, time: performance.now() }; };
    const onPointerUp = (event: PointerEvent) => {
      if (!introRef.current || introRef.current.active || !controls.enabled) return;
      const moved = Math.hypot(event.clientX - pointerDown.x, event.clientY - pointerDown.y);
      if (moved > 7 || performance.now() - pointerDown.time > 650) return;
      const rect = canvas.getBoundingClientRect();
      pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(stateMeshes, false)[0];
      if (hit?.object.userData.stateId) callbacks.current.onSelectState(hit.object.userData.stateId as string);
    };
    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointerup', onPointerUp);
    const onContextLost = (event: Event) => { event.preventDefault(); callbacks.current.onUnavailable(); };
    canvas.addEventListener('webglcontextlost', onContextLost, false);

    const resize = () => {
      const width = Math.max(1, root.clientWidth);
      const height = Math.max(1, root.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(root);
    resize();

    const settle = (key: number) => {
      introRef.current = { active: false, key, started: performance.now(), from: settledPosition.clone(), to: settledPosition.clone() };
      camera.position.copy(settledPosition);
      controls.target.set(0, 0, 0);
      controls.enabled = true;
      controls.update();
      if (settledKeyRef.current !== key) {
        settledKeyRef.current = key;
        callbacks.current.onIntroEnd();
      }
    };
    const startIntro = (key: number) => {
      const from = skipRef.current || reducedRef.current ? settledPosition.clone() : new THREE.Vector3(0, 28, 29);
      const to = settledPosition.clone();
      introRef.current = { active: !(skipRef.current || reducedRef.current), key, started: performance.now(), from, to };
      camera.position.copy(from);
      controls.target.set(0, 0, 0);
      controls.enabled = false;
      if (!introRef.current.active) settle(key);
    };
    startIntroRef.current = startIntro;
    settleRef.current = settle;
    readyRef.current = true;
    initializedReplayRef.current = replayKeyRef.current;
    startIntro(replayKeyRef.current);

    let frame = 0;
    let stopped = false;
    const renderFrame = (time: number) => {
      if (stopped) return;
      if (document.hidden) { frame = 0; return; }
      const intro = introRef.current;
      if (intro?.active) {
        const progress = Math.min(1, (time - intro.started) / 6000);
        const eased = 1 - Math.pow(1 - progress, 3);
        camera.position.lerpVectors(intro.from, intro.to, eased);
        camera.lookAt(0, 0, 0);
        if (progress >= 1) settle(intro.key);
      } else {
        controls.update();
      }
      if (!reducedRef.current) {
        clouds.forEach((cloud) => { cloud.position.y = (cloud.userData.baseY as number) + Math.sin(time * 0.00035 + (cloud.userData.phase as number)) * 0.12; });
      }
      const rect = root.getBoundingClientRect();
      FEATURED.forEach((featured) => {
        const element = calloutRefs.current[featured.id];
        if (!element) return;
        const projected = mapPoint((landmarksById.get(featured.id)?.mapPosition ?? featured.map).x, (landmarksById.get(featured.id)?.mapPosition ?? featured.map).y, 0.8).project(camera);
        const x = Math.max(6, Math.min(rect.width - 182, (projected.x * 0.5 + 0.5) * rect.width + featured.offset[0]));
        const y = Math.max(6, Math.min(rect.height - 42, (-projected.y * 0.5 + 0.5) * rect.height + featured.offset[1]));
        element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        element.style.opacity = projected.z > 1 ? '0' : '1';
      });
      renderer.render(scene, camera);
      frame = requestAnimationFrame(renderFrame);
    };
    const wake = () => { if (!stopped && !document.hidden && !frame) frame = requestAnimationFrame(renderFrame); };
    const onVisibility = () => { if (document.hidden) { if (frame) cancelAnimationFrame(frame); frame = 0; } else wake(); };
    document.addEventListener('visibilitychange', onVisibility);
    frame = requestAnimationFrame(renderFrame);

    return () => {
      stopped = true;
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      controls.dispose();
      controlsRef.current = null;
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const materials = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
        materials.forEach((entry) => {
          const textured = entry as THREE.Material & { map?: THREE.Texture | null };
          textured.map?.dispose();
          entry.dispose();
        });
      });
      renderer.renderLists.dispose();
      renderer.dispose();
      readyRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (readyRef.current && initializedReplayRef.current !== replayKey) {
      initializedReplayRef.current = replayKey;
      startIntroRef.current(replayKey);
    }
  }, [replayKey]);

  useEffect(() => {
    if (readyRef.current && (skipIntro || reducedMotion) && introRef.current?.active) settleRef.current(replayKeyRef.current);
  }, [skipIntro, reducedMotion]);

  const resetCamera = () => { settleRef.current(replayKeyRef.current); };
  const zoom = (amount: number) => {
    const controls = controlsRef.current;
    if (!controls || introRef.current?.active) return;
    const offset = controls.object.position.clone().sub(controls.target);
    offset.multiplyScalar(amount < 0 ? 0.82 : 1.22);
    const distance = Math.max(controls.minDistance, Math.min(controls.maxDistance, offset.length()));
    offset.setLength(distance);
    controls.object.position.copy(controls.target).add(offset);
    controls.update();
  };

  return (
    <div ref={rootRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: 'transparent', pointerEvents: 'none' }}>
      <canvas ref={canvasRef} aria-label="Interactive stylized 3D diorama of India's heritage map" role="img" style={{ display: 'block', width: '100%', height: '100%', touchAction: 'none', pointerEvents: 'auto' }} />
      <div aria-label="Featured monuments" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 4 }}>
        {FEATURED.map((featured) => (
          <div key={featured.id} ref={(node) => { calloutRefs.current[featured.id] = node; }} style={{ position: 'absolute', left: 0, top: 0, pointerEvents: 'none', transition: 'opacity 180ms ease' }}>
            <button type="button" aria-label={`Explore ${featured.label}`} onClick={() => callbacks.current.onSelectLandmark(featured.id)} style={{ minHeight: 42, maxWidth: 176, padding: '9px 13px', borderRadius: 999, border: '1px solid rgba(255,255,255,.9)', background: 'rgba(255,255,255,.93)', color: '#244052', font: '600 12px/1.15 system-ui,sans-serif', boxShadow: '0 7px 20px rgba(35,83,104,.18)', cursor: 'pointer', pointerEvents: 'auto', whiteSpace: 'nowrap' }}>{featured.label}</button>
          </div>
        ))}
      </div>
      <div aria-label="Diorama controls" style={{ position: 'absolute', left: 14, bottom: 14, display: 'flex', gap: 7, pointerEvents: 'auto', zIndex: 6 }}>
        <button type="button" aria-label="Zoom in" title="Zoom in" onClick={() => zoom(-180)} style={controlStyle}>+</button>
        <button type="button" aria-label="Zoom out" title="Zoom out" onClick={() => zoom(180)} style={controlStyle}>−</button>
        <button type="button" aria-label="Reset camera" title="Reset camera" onClick={resetCamera} style={controlStyle}>↺</button>
      </div>
    </div>
  );
}

const controlStyle: CSSProperties = {
  width: 44,
  height: 44,
  borderRadius: 14,
  border: '1px solid rgba(255,255,255,.9)',
  background: 'rgba(255,255,255,.9)',
  color: '#244052',
  font: '700 22px/1 system-ui,sans-serif',
  boxShadow: '0 6px 18px rgba(35,83,104,.16)',
  cursor: 'pointer',
};
