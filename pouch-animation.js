(function() {
  const container = document.getElementById('pouch3DCanvasContainer');
  if (!container) return;

  // --- 1. SETUP THREE.JS SCENE ---
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x020202);
  scene.fog = new THREE.FogExp2(0x020202, 0.12);

  // Setup camera with robust dimensions check
  let width = container.clientWidth || 600;
  let height = container.clientHeight || 340;
  const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
  camera.position.set(0, 0, 6.2);

  // Setup renderer with shadows and high-end colors
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  container.appendChild(renderer.domElement);

  // --- 2. LIGHTING (Cinematic Studio Setup) ---
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.12);
  scene.add(ambientLight);

  // Strong golden/white key light
  const keyLight = new THREE.DirectionalLight(0xfff5e6, 1.4);
  keyLight.position.set(4, 5, 4);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 2048;
  keyLight.shadow.mapSize.height = 2048;
  keyLight.shadow.bias = -0.001;
  keyLight.shadow.camera.near = 0.5;
  keyLight.shadow.camera.far = 15;
  keyLight.shadow.camera.left = -3;
  keyLight.shadow.camera.right = 3;
  keyLight.shadow.camera.top = 3;
  keyLight.shadow.camera.bottom = -3;
  scene.add(keyLight);

  // Soft cool fill light
  const fillLight = new THREE.DirectionalLight(0xd9e5ff, 0.4);
  fillLight.position.set(-4, 2, 2);
  scene.add(fillLight);

  // Intense gold rim light from behind for highlight glow
  const rimLight = new THREE.DirectionalLight(0xffd200, 2.5);
  rimLight.position.set(-3, 3, -4);
  scene.add(rimLight);

  // Subtle overhead soft light
  const topLight = new THREE.DirectionalLight(0xffffff, 0.3);
  topLight.position.set(0, 6, 0);
  scene.add(topLight);

  // --- 3. DYNAMIC PROCEDURAL CANVAS TEXTURES ---
  // Helper to create a canvas texture with premium gold and black elements
  function createBrandedCanvas(type) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Rich matte black background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, 1024, 1024);

    // Common styling
    const goldColor = '#ffd200';
    const whiteColor = '#ffffff';

    // Draw borders & fine lines
    ctx.strokeStyle = goldColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(32, 32, 1024 - 64, 1024 - 64);
    ctx.lineWidth = 1;
    ctx.strokeRect(44, 44, 1024 - 88, 1024 - 88);

    // Decorative geometric backgrounds (subtle grids / stripes)
    ctx.strokeStyle = 'rgba(255, 210, 0, 0.08)';
    ctx.lineWidth = 2;
    for (let i = 80; i < 1024; i += 80) {
      // diagonal lines
      ctx.beginPath();
      ctx.moveTo(i, 32);
      ctx.lineTo(32, i);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(1024 - 32, i);
      ctx.lineTo(i, 1024 - 32);
      ctx.stroke();
    }

    if (type === 'pouch' || type === 'bottle' || type === 'jar') {
      // Centered layout for wrapped items
      const cx = 512;

      // Premium luxury crest/logo mark
      ctx.fillStyle = goldColor;
      ctx.strokeStyle = goldColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, 320, 60, 0, Math.PI * 2);
      ctx.stroke();

      // Outer rings
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, 320, 72, 0, Math.PI * 2);
      ctx.stroke();

      // Logo initials
      ctx.fillStyle = goldColor;
      ctx.font = 'bold 54px "Playfair Display", Georgia, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('BF', cx, 318);

      // Company name
      ctx.font = '800 52px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = whiteColor;
      ctx.letterSpacing = '10px';
      ctx.fillText('BILLION FLEX', cx, 470);

      // Sub-brand / details
      ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = goldColor;
      ctx.letterSpacing = '6px';
      ctx.fillText('PREMIUM PACKAGING SYSTEM', cx, 520);

      // Description lines
      ctx.font = '500 16px "Source Sans 3", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillText('HIGH-BARRIER FRESHNESS PROTECT', cx, 610);
      ctx.fillText('ECO-CONSCIOUS MATERIAL INITIATIVE', cx, 640);

      // Technical label box
      ctx.strokeStyle = 'rgba(255, 210, 0, 0.4)';
      ctx.strokeRect(cx - 180, 700, 360, 110);
      ctx.fillStyle = 'rgba(255, 210, 0, 0.05)';
      ctx.fillRect(cx - 180, 700, 360, 110);

      ctx.fillStyle = goldColor;
      ctx.font = '800 15px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('TYPE: STAND-UP FLEX POUCH', cx, 735);
      ctx.fillStyle = whiteColor;
      ctx.font = '500 14px "Source Sans 3", sans-serif';
      ctx.fillText('BATCH: #BF-9022-2026 // QR-OK', cx, 775);

      // Barcode at bottom
      const barcodeY = 870;
      ctx.fillStyle = whiteColor;
      for (let x = cx - 120; x < cx + 120; x += Math.random() * 8 + 3) {
        const w = Math.random() * 5 + 1;
        ctx.fillRect(x, barcodeY, w, 60);
      }
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = '12px Courier';
      ctx.fillText('* 256801937402 *', cx, barcodeY + 80);

    } else if (type === 'bag' || type === 'box') {
      // Layout optimized for flat sides
      const cx = 512;

      // Decorative golden diagonal warning strip
      ctx.fillStyle = goldColor;
      ctx.fillRect(0, 140, 1024, 25);
      
      // Giant Brand Text
      ctx.font = 'bold 74px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = whiteColor;
      ctx.fillText('B I L L I O N', cx, 360);
      ctx.fillStyle = goldColor;
      ctx.font = 'bold 84px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('F L E X', cx, 460);

      // Frame around typography
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.strokeRect(180, 260, 1024 - 360, 280);

      // Fine print details
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.font = '500 18px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('SUSTAINABLE CARRIER SOLUTIONS', cx, 600);
      ctx.fillText('DESIGNED. PRINTED. DELIVERED.', cx, 635);

      ctx.fillStyle = goldColor;
      ctx.font = 'bold 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('EST. 2026 / HALOL, GUJARAT', cx, 700);

      // Barcode
      const barcodeY = 780;
      ctx.fillStyle = whiteColor;
      for (let x = cx - 100; x < cx + 100; x += Math.random() * 7 + 3) {
        const w = Math.random() * 4 + 1;
        ctx.fillRect(x, barcodeY, w, 50);
      }

    } else if (type === 'courier') {
      // Courier bags have distinct shipping details look
      ctx.fillStyle = goldColor;
      ctx.fillRect(50, 50, 924, 15);

      ctx.fillStyle = whiteColor;
      ctx.font = 'bold 50px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('BILLION FLEX COURIER SYSTEM', 80, 130);

      // Shipping label simulation
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.strokeRect(80, 180, 864, 450);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.fillRect(80, 180, 864, 450);

      ctx.fillStyle = goldColor;
      ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('SHIP TO / RECEIVER:', 120, 240);
      ctx.fillStyle = whiteColor;
      ctx.font = '500 22px "Source Sans 3", sans-serif';
      ctx.fillText('AUTHENTIC PACKAGING SOLUTIONS LTD', 120, 290);
      ctx.fillText('YASHKAMAL INDUSTRIAL ESTATE, GUJARAT, INDIA', 120, 330);

      ctx.fillStyle = goldColor;
      ctx.fillText('TRACKING ID:', 120, 420);
      ctx.fillStyle = whiteColor;
      ctx.font = 'bold 36px Courier';
      ctx.fillText('TRK-BF-90082711-IN', 120, 475);

      // Barcode
      ctx.fillStyle = whiteColor;
      for (let x = 120; x < 800; x += Math.random() * 9 + 4) {
        const w = Math.random() * 6 + 1;
        ctx.fillRect(x, 520, w, 70);
      }

      ctx.font = '500 18px "Source Sans 3", sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillText('WARNING: DO NOT ACCEPT IF TAMPERED OR BROKEN SEAL', 80, 720);
      ctx.fillText('100% RECYCLABLE HIGH-STRENGTH BARRIER FILM', 80, 760);

    } else if (type === 'roll') {
      // Label roll: repeating logos
      ctx.fillStyle = goldColor;
      ctx.fillRect(0, 0, 1024, 1024);

      // Repeating black labels with gold details
      const labelW = 460;
      const labelH = 220;
      ctx.fillStyle = '#0a0a0a';

      for (let x = 20; x < 1024; x += 500) {
        for (let y = 20; y < 1024; y += 250) {
          ctx.fillRect(x, y, labelW, labelH);
          
          // gold borders inside labels
          ctx.strokeStyle = goldColor;
          ctx.lineWidth = 2;
          ctx.strokeRect(x + 10, y + 10, labelW - 20, labelH - 20);

          // content inside repeating labels
          ctx.fillStyle = goldColor;
          ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
          ctx.fillText('BILLION FLEX', x + labelW/2, y + 60);

          ctx.fillStyle = whiteColor;
          ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
          ctx.fillText('SECURITY SEALED SYSTEM', x + labelW/2, y + 100);

          ctx.strokeStyle = 'rgba(255,255,255,0.3)';
          ctx.beginPath();
          ctx.moveTo(x + 50, y + 140);
          ctx.lineTo(x + labelW - 50, y + 140);
          ctx.stroke();

          ctx.fillStyle = goldColor;
          ctx.font = '10px Courier';
          ctx.fillText('★ HIGH QUALITY PRINT ★', x + labelW/2, y + 175);
        }
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }

  // Generate branded textures
  const pouchBrandedTex = createBrandedCanvas('pouch');
  const bagBrandedTex = createBrandedCanvas('bag');
  const courierBrandedTex = createBrandedCanvas('courier');
  const bottleBrandedTex = createBrandedCanvas('pouch'); // reuse central design
  const boxBrandedTex = createBrandedCanvas('box');
  const jarBrandedTex = createBrandedCanvas('pouch');
  const rollBrandedTex = createBrandedCanvas('roll');

  // --- 4. PROCEDURAL GEOMETRIES ---

  // A. Stand-up Pouch: Deformed cylinder
  function createPouchGeometry() {
    const geom = new THREE.CylinderGeometry(0.8, 0.9, 3, 48, 48);
    const pos = geom.attributes.position;
    const temp = new THREE.Vector3();
    
    for (let i = 0; i < pos.count; i++) {
      temp.fromBufferAttribute(pos, i);
      const h = temp.y / 1.5; // -1 to 1 representing height ratio
      
      // Calculate thickness flattening factor
      let zScale = 1.0;
      if (h > 0) {
        // Towards the top, flatten to a sealed edge
        zScale = Math.pow(1.0 - h, 0.68);
      } else {
        // Towards bottom, form a stand-up gusset but pinch at the very bottom edge
        const bh = -h; // 0 to 1
        if (bh < 0.82) {
          zScale = 1.0 - 0.44 * bh;
        } else {
          // Pinch rapidly at bottom seal
          const t = (bh - 0.82) / 0.18;
          zScale = 0.639 * (1.0 - t);
        }
      }
      
      temp.z *= zScale;

      // Slightly widen the top and bottom seals to simulate heat sealer expansion
      let xScale = 1.0;
      if (h > 0.85) {
        const t = (h - 0.85) / 0.15;
        xScale = 1.0 + 0.06 * t;
      }
      temp.x *= xScale;

      pos.setXYZ(i, temp.x, temp.y, temp.z);
    }
    
    geom.computeVertexNormals();
    return geom;
  }

  // B. Lathe Bottle (Shrink Sleeve)
  function createBottleGeometry() {
    const points = [];
    points.push(new THREE.Vector2(0, -1.3));
    points.push(new THREE.Vector2(0.48, -1.3));
    points.push(new THREE.Vector2(0.48, -0.6));
    points.push(new THREE.Vector2(0.45, 0.1));
    points.push(new THREE.Vector2(0.46, 0.4));
    points.push(new THREE.Vector2(0.38, 0.7)); // shoulder curve
    points.push(new THREE.Vector2(0.18, 0.95)); // neck start
    points.push(new THREE.Vector2(0.18, 1.25)); // neck top
    points.push(new THREE.Vector2(0.21, 1.3)); // lid collar
    points.push(new THREE.Vector2(0.21, 1.42)); // lid top
    points.push(new THREE.Vector2(0, 1.42));
    
    return new THREE.LatheGeometry(points, 36);
  }

  // C. Paper Bag Handles
  function createBagHandleGeometry() {
    // Generate curved arc for handle representation
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.35, 0, 0),
      new THREE.Vector3(-0.25, 0.35, 0),
      new THREE.Vector3(0, 0.42, 0),
      new THREE.Vector3(0.25, 0.35, 0),
      new THREE.Vector3(0.35, 0, 0)
    ]);
    return new THREE.TubeGeometry(curve, 20, 0.035, 8, false);
  }


  // --- 5. MATERIALS & SHADERS ---

  // Global uniform controller for the sweep printing process
  const sweepUniforms = {
    uProgress: { value: 0.0 }, // 0.0 = Blank white, 1.0 = Branded Gold/Black
    uBlankColor: { value: new THREE.Color(0xf6f6f6) }
  };

  // Stand-up Pouch Sweep Transition Material
  const pouchMaterial = new THREE.MeshStandardMaterial({
    map: pouchBrandedTex,
    roughness: 0.18,
    metalness: 0.08,
    bumpScale: 0.015
  });

  pouchMaterial.onBeforeCompile = (shader) => {
    shader.uniforms.uProgress = sweepUniforms.uProgress;
    shader.uniforms.uBlankColor = sweepUniforms.uBlankColor;

    shader.fragmentShader = `
      uniform float uProgress;
      uniform vec3 uBlankColor;
    ` + shader.fragmentShader;

    // Modify map reading to implement top-to-bottom wave sweep
    const mapReplacement = `
      vec4 texelColor = texture2D( map, vUv );
      
      // Calculate animated vertical scanline (sine wave pattern)
      // vUv.y ranges from 0.0 (bottom) to 1.0 (top)
      float sweepWipe = 1.0 - vUv.y + 0.12 * sin(vUv.x * 6.28);
      
      // Map uProgress from [0.0, 1.0] to a range that fully covers the diagonal wipe [-0.15, 1.15]
      float progressThreshold = uProgress * 1.3 - 0.15;
      
      // Smooth interpolation at the boundary
      float transitionBlend = smoothstep(progressThreshold - 0.018, progressThreshold + 0.018, sweepWipe);
      
      // Blend between branded texture and blank white pouch color
      texelColor.rgb = mix(texelColor.rgb, uBlankColor, transitionBlend);
      
      // Add a bright, glowing golden laser transition border line
      float borderDist = abs(sweepWipe - progressThreshold);
      float sweepGlow = smoothstep(0.024, 0.0, borderDist);
      vec3 goldGlow = vec3(1.0, 0.82, 0.0);
      texelColor.rgb += goldGlow * sweepGlow * 1.8;
    `;

    shader.fragmentShader = shader.fragmentShader.replace(
      'vec4 texelColor = texture2D( map, vUv );',
      mapReplacement
    );
    pouchMaterial.userData.shader = shader;
  };

  // Standard Glossy Branded Materials
  const plasticGlossyMat = (map) => new THREE.MeshStandardMaterial({
    map: map,
    roughness: 0.15,
    metalness: 0.08,
    envMapIntensity: 1.0
  });

  const paperMat = (map) => new THREE.MeshStandardMaterial({
    map: map,
    roughness: 0.75,
    metalness: 0.0,
    bumpScale: 0.02
  });

  const goldMetallicMat = new THREE.MeshStandardMaterial({
    color: 0xffd200,
    roughness: 0.22,
    metalness: 0.85
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x111111,
    transparent: true,
    opacity: 0.72,
    roughness: 0.05,
    metalness: 0.1,
    transmission: 0.8,
    ior: 1.5,
    thickness: 0.12
  });

  // --- 6. INSTANTIATING THE 3D PRODUCTS ---

  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // A. CENTRAL POUCH (The hero)
  const pouchGeom = createPouchGeometry();
  const centralPouch = new THREE.Mesh(pouchGeom, pouchMaterial);
  centralPouch.castShadow = true;
  centralPouch.receiveShadow = true;
  mainGroup.add(centralPouch);

  // Parent group for peripheral packaging (sliding in later)
  const surroundingGroup = new THREE.Group();
  mainGroup.add(surroundingGroup);

  // B. PAPER SHOPPING BAG
  const bagGroup = new THREE.Group();
  const bagGeom = new THREE.BoxGeometry(1.4, 2.0, 0.8);
  // Materials: front/back/sides branded, top dark recessed to look open
  const darkRecessMat = new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.9 });
  const bagMat = paperMat(bagBrandedTex);
  const bagMatsArray = [
    bagMat, // right
    bagMat, // left
    darkRecessMat, // top
    bagMat, // bottom
    bagMat, // front
    bagMat  // back
  ];
  const bagBody = new THREE.Mesh(bagGeom, bagMatsArray);
  bagBody.castShadow = true;
  bagBody.receiveShadow = true;
  bagGroup.add(bagBody);

  // Add bag handles
  const handleGeom = createBagHandleGeometry();
  const handleFront = new THREE.Mesh(handleGeom, goldMetallicMat);
  handleFront.position.set(0, 1.0, 0.4);
  const handleBack = handleFront.clone();
  handleBack.position.z = -0.4;
  handleBack.rotation.y = Math.PI;
  bagGroup.add(handleFront);
  bagGroup.add(handleBack);
  surroundingGroup.add(bagGroup);

  // C. COURIER BAG (Thin, angled box)
  const courierGeom = new THREE.BoxGeometry(1.2, 1.8, 0.04);
  const courierBag = new THREE.Mesh(courierGeom, plasticGlossyMat(courierBrandedTex));
  courierBag.castShadow = true;
  courierBag.receiveShadow = true;
  surroundingGroup.add(courierBag);

  // D. SHRINK SLEEVE BOTTLE
  const bottleGeom = createBottleGeometry();
  const bottle = new THREE.Mesh(bottleGeom, plasticGlossyMat(bottleBrandedTex));
  bottle.castShadow = true;
  bottle.receiveShadow = true;
  surroundingGroup.add(bottle);

  // E. BOX PACKAGING
  const boxGeom = new THREE.BoxGeometry(1.0, 1.7, 1.0);
  const boxP = new THREE.Mesh(boxGeom, paperMat(boxBrandedTex));
  boxP.castShadow = true;
  boxP.receiveShadow = true;
  surroundingGroup.add(boxP);

  // F. JAR LABEL & GLASS BODY
  const jarGroup = new THREE.Group();
  const jarBody = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 1.0, 32), glassMat);
  jarBody.castShadow = true;
  jarGroup.add(jarBody);
  
  const jarLid = new THREE.Mesh(new THREE.CylinderGeometry(0.57, 0.57, 0.18, 32), goldMetallicMat);
  jarLid.position.y = 0.56;
  jarLid.castShadow = true;
  jarGroup.add(jarLid);

  const jarLabel = new THREE.Mesh(new THREE.CylinderGeometry(0.555, 0.555, 0.6, 32), paperMat(jarBrandedTex));
  jarLabel.position.y = -0.05;
  jarLabel.castShadow = true;
  jarGroup.add(jarLabel);
  surroundingGroup.add(jarGroup);

  // G. LABEL ROLL
  const rollGroup = new THREE.Group();
  const rollBody = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.5, 32), plasticGlossyMat(rollBrandedTex));
  rollBody.rotation.x = Math.PI / 2;
  rollBody.castShadow = true;
  rollGroup.add(rollBody);
  
  const rollCore = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.52, 24), darkRecessMat);
  rollCore.rotation.x = Math.PI / 2;
  rollGroup.add(rollCore);
  surroundingGroup.add(rollGroup);

  // H. STAND-UP POUCH (Second one in layout)
  const pouch2 = new THREE.Mesh(pouchGeom, plasticGlossyMat(pouchBrandedTex));
  pouch2.castShadow = true;
  pouch2.receiveShadow = true;
  surroundingGroup.add(pouch2);

  // Set initial coordinates for surrounding items
  const productLayouts = [
    { mesh: bagGroup, x: -1.7, y: 0.15, z: -0.9, rotX: 0, rotY: 0, rotZ: 0, scale: 0.95 },
    { mesh: courierBag, x: -1.3, y: -1.0, z: 0.7, rotX: 1.1, rotY: 0, rotZ: 0, scale: 1.0 },
    { mesh: bottle, x: 1.5, y: -0.15, z: -0.3, rotX: 0, rotY: Math.PI, rotZ: 0, scale: 1.0 },
    { mesh: boxP, x: 0.9, y: 0.0, z: -1.1, rotX: 0, rotY: 0, rotZ: 0, scale: 0.95 },
    { mesh: jarGroup, x: 0.75, y: -0.65, z: 0.9, rotX: 0, rotY: Math.PI, rotZ: 0, scale: 0.9 },
    { mesh: rollGroup, x: 0.0, y: -1.0, z: 1.2, rotX: 0.3, rotY: 0, rotZ: 0, scale: 0.8 },
    { mesh: pouch2, x: -0.7, y: -0.3, z: -1.0, rotX: 0, rotY: Math.PI, rotZ: 0, scale: 0.9 }
  ];

  // Configure initial states (invisible/low-positioned)
  productLayouts.forEach(p => {
    p.mesh.position.set(p.x, -5.0, p.z);
    p.mesh.rotation.set(p.rotX, p.rotY, p.rotZ);
    p.mesh.scale.set(0.001, 0.001, 0.001);
  });

  // FLOOR PLANE FOR CAST SHADOWS
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(15, 15),
    new THREE.ShadowMaterial({ opacity: 0.55 })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -1.5;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);

  // --- 7. FLOWING LIGHT PARTICLES (Gold Trails) ---
  const particleCount = 140;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  
  const particleData = [];
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 0.9 + Math.random() * 0.45;
    const speed = 1.2 + Math.random() * 1.8;
    const y = -1.8 + Math.random() * 3.6;
    particleData.push({ angle, radius, speed, y, baseRadius: radius });
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  
  const particleMaterial = new THREE.PointsMaterial({
    color: 0xffd200,
    size: 0.055,
    transparent: true,
    opacity: 0.0, // animated in timeline
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  
  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);

  // --- 8. GOLDEN WAVE BACKGROUND ---
  const waveShaderMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uOpacity: { value: 0.65 }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.999, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uOpacity;
      varying vec2 vUv;
      void main() {
        // Multi-frequency golden background waves
        float w1 = sin(vUv.x * 4.2 + uTime * 0.7) * 0.18 + 0.5;
        float w2 = cos(vUv.x * 6.5 - uTime * 1.1) * 0.12 + 0.45;
        
        float dist1 = abs(vUv.y - w1);
        float dist2 = abs(vUv.y - w2);
        
        float thickness = 0.008;
        float l1 = smoothstep(thickness * 4.0, 0.0, dist1) * 0.22;
        float l2 = smoothstep(thickness * 3.0, 0.0, dist2) * 0.15;
        
        vec3 goldColor = vec3(1.0, 0.82, 0.0);
        vec3 bgFinal = goldColor * (l1 + l2);
        
        gl_FragColor = vec4(bgFinal, (l1 + l2) * uOpacity);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const wavePlane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), waveShaderMat);
  // Put background billboard plane right before far clipping plain
  wavePlane.position.z = -1.2; 
  camera.add(wavePlane);
  scene.add(camera);

  // --- 9. ANIMATION TIMELINE CONTROLLER ---
  const clock = new THREE.Clock();
  let timeVal = 0;
  const loopDuration = 12.0; // 12 seconds total loop

  // HTML Text DOM elements
  const txtBlank = document.getElementById('pouchTitleBlank');
  const txtBranded = document.getElementById('pouchTitleBranded');
  const txtDelivered = document.getElementById('pouchSubtitle');

  function updateTimeline(delta) {
    timeVal += delta;
    if (timeVal > loopDuration) {
      timeVal = 0;
      // Reset positions to loop cleanly
      productLayouts.forEach(p => {
        p.mesh.position.y = -5.0;
        p.mesh.scale.set(0.001, 0.001, 0.001);
      });
      txtBlank.classList.remove('active');
      txtBranded.classList.remove('active');
      txtDelivered.classList.remove('active');
    }

    const t = timeVal;

    // --- PHASE 1: Blank Pouch (0.0s - 2.5s) ---
    if (t < 2.5) {
      sweepUniforms.uProgress.value = 0.0;
      particleMaterial.opacity = 0.0;
      
      // Camera dolly-in close
      camera.position.z = 6.2 - (t / 2.5) * 0.5; // 6.2 to 5.7
      
      // Text displays Blank title
      txtBlank.classList.add('active');
      txtBranded.classList.remove('active');
      txtDelivered.classList.remove('active');
      
      // Keep main pouch facing front
      centralPouch.rotation.y = Math.PI;
      centralPouch.position.x = 0;
      centralPouch.position.y = 0;

    // --- PHASE 2: Gold Trails & Print Sweep (2.5s - 5.5s) ---
    } else if (t >= 2.5 && t < 5.5) {
      const pt = (t - 2.5) / 3.0; // progress from 0 to 1
      
      // Animate Sweep Shader
      sweepUniforms.uProgress.value = pt;
      
      // Particle Trails fade in and out
      if (pt < 0.25) {
        particleMaterial.opacity = pt * 4.0 * 0.95; // fast fade in
      } else if (pt > 0.75) {
        particleMaterial.opacity = (1.0 - pt) * 4.0 * 0.95; // fast fade out
      } else {
        particleMaterial.opacity = 0.95;
      }

      // Text swap
      txtBlank.classList.remove('active');
      txtBranded.classList.add('active');

      // Keep pouch facing front and camera movement
      centralPouch.rotation.y = Math.PI;
      camera.position.z = 5.7 - ((t - 2.5) / 3.0) * 0.3; // 5.7 to 5.4

    // --- PHASE 3: Branding Complete & Pouch Moves Side (5.5s - 7.5s) ---
    } else if (t >= 5.5 && t < 7.5) {
      const mt = (t - 5.5) / 2.0; // progress 0 to 1
      sweepUniforms.uProgress.value = 1.0;
      particleMaterial.opacity = 0.0;

      // Central pouch glides to the left side to prepare studio space
      centralPouch.position.x = -0.55 * mt;
      centralPouch.position.y = -0.15 * mt;
      centralPouch.rotation.y = Math.PI;

      camera.position.z = 5.4 + mt * 0.5; // Dolly-out slightly to fit everyone (5.4 to 5.9)

    // --- PHASE 4: All Branded Packages Rise & Scale (7.5s - 10.5s) ---
    } else if (t >= 7.5 && t < 10.5) {
      const et = (t - 7.5) / 3.0; // emerge timeline
      
      txtBranded.classList.remove('active');
      txtDelivered.classList.add('active'); // Final quote text active

      // Animate other products rising and scaling with spring elastic easing
      productLayouts.forEach(p => {
        // Elastic out spring formula
        let springProgress = 1.0;
        const speedMultiplier = 1.1;
        const localT = Math.max(0, Math.min(1, et * speedMultiplier));
        
        if (localT < 1.0) {
          springProgress = Math.pow(2.0, -10.0 * localT) * Math.sin((localT - 0.075) * (2.0 * Math.PI) / 0.3) + 1.0;
          if (isNaN(springProgress)) springProgress = 1.0;
        }

        const yPos = -5.0 + (p.y - -5.0) * springProgress;
        p.mesh.position.y = yPos;
        
        const scaleVal = p.scale * springProgress;
        p.mesh.scale.set(scaleVal, scaleVal, scaleVal);
      });

      // Keep pouch facing front
      centralPouch.position.x = -0.55;
      centralPouch.position.y = -0.15;
      centralPouch.rotation.y = Math.PI;

      camera.position.z = 5.9; // hold dolly

    // --- PHASE 5: Full Premium Studio Hero Shot (10.5s - 11.5s) ---
    } else if (t >= 10.5 && t < 11.5) {
      // Hold all items, float them subtly
      const ft = t - 10.5;
      centralPouch.rotation.y = Math.PI;
      
      productLayouts.forEach(p => {
        p.mesh.position.y = p.y + Math.sin(ft * 2.0 + p.x) * 0.03; // micro float
      });

    // --- PHASE 6: Smooth Fade to Reset (11.5s - 12.0s) ---
    } else if (t >= 11.5 && t <= 12.0) {
      const ft = (t - 11.5) / 0.5; // 0 to 1
      txtDelivered.classList.remove('active');
      
      // Fade out backgrounds
      waveShaderMat.uniforms.uOpacity.value = 0.65 * (1.0 - ft);
      
      // Scale down everything for clean visual reset
      const scaleMult = 1.0 - ft;
      centralPouch.scale.set(scaleMult, scaleMult, scaleMult);
      productLayouts.forEach(p => {
        const sc = p.scale * scaleMult;
        p.mesh.scale.set(sc, sc, sc);
      });
    }

    if (t >= 1.0 && t < 11.5) {
      // Keep main scale standard
      centralPouch.scale.set(1, 1, 1);
      waveShaderMat.uniforms.uOpacity.value = 0.65;
    } else if (t < 1.0) {
      // Smooth fade-in and scale-up at start of loop
      centralPouch.scale.set(t, t, t);
      waveShaderMat.uniforms.uOpacity.value = 0.65 * t;
    }
  }

  // --- 10. ANIME PARTICLE POSITION UPDATE ---
  function updateParticles(time) {
    if (particleMaterial.opacity === 0.0) return;
    
    const posAttr = particleGeometry.attributes.position;
    for (let i = 0; i < particleCount; i++) {
      const p = particleData[i];
      
      // Spiral flow: Orbit around y-axis
      p.angle += 0.016 * p.speed;
      p.y += 0.008 * p.speed;
      
      // Keep radius slightly pulsating
      const currentRadius = p.baseRadius + Math.sin(time * 2.0 + p.y) * 0.06;

      if (p.y > 1.8) {
        p.y = -1.8;
        p.angle = Math.random() * Math.PI * 2;
      }

      const px = Math.cos(p.angle) * currentRadius;
      const pz = Math.sin(p.angle) * currentRadius;
      
      posAttr.setXYZ(i, px, p.y, pz);
    }
    posAttr.needsUpdate = true;
  }

  // --- 11. INTERACTIVE CONTROLS REMOVED (Only Front-Facing Mode) ---
  // Camera stays fixed in front of the packages

  // --- 12. RUN THE ANIMATION LOOP ---
  function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();

    // 1. Update timeline animations
    updateTimeline(delta);

    // 2. Update background shader time
    waveShaderMat.uniforms.uTime.value = elapsedTime;

    // 3. Update spiral particles
    updateParticles(elapsedTime);

    // 4. Fixed camera centering (No mouse rotation)
    camera.position.x = 0;
    camera.position.y = 0;
    
    // Look at center-ish with offset based on layout (smooth pan left)
    camera.lookAt(new THREE.Vector3(centralPouch.position.x * 0.6, centralPouch.position.y * 0.6, 0));

    // 5. Render
    renderer.render(scene, camera);
  }

  // --- 13. RESPONSIVE RENDER RESIZING ---
  function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
  window.addEventListener('resize', onWindowResize, { passive: true });

  // Start loop and trigger initial resize calculation
  setTimeout(onWindowResize, 50);
  animate();
})();
