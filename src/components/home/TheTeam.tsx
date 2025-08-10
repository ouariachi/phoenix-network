"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const ROLES = {
  Founder: { color: "#a14fcd", label: "Founder" },
  Owner: { color: "#f24e1e", label: "Owner" },
  Admin: { color: "#3b1ef2", label: "Admin" },
  Developer: { color: "#1e9af2", label: "Programador" },
  Designer: { color: "#29c78d", label: "Designer" },
  Moderator: { color: "#d8426e", label: "Moderator" },
  Manager: { color: "#f2c12e", label: "Manager" },
};

const TEAM_MEMBERS = [
  {
    name: "TheepicGAB96",
    roles: [ROLES.Owner, ROLES.Developer],
    model: "/TheepicGAB96.gltf",
    colorA: "#a14fcd",
    quote: "No limites tus desafíos, desafía tus límites.",
    index: 0,
  },
  {
    name: "SusurroYT",
    roles: [ROLES.Founder, ROLES.Owner],
    model: "/susurroyt.gltf",
    colorA: "#f24e1e",
    index: 1,
  },
  {
    name: "Member 3",
    roles: [ROLES.Founder, ROLES.Owner],
    model: "/model-3.gltf",
    colorA: "#29c78d",
    index: 2,
  },
  {
    name: "Member 4",
    roles: [ROLES.Founder, ROLES.Owner],
    model: "/model-4.gltf",
    colorA: "#f2c12e",
    index: 3,
  },
  {
    name: "Member 5",
    roles: [ROLES.Founder, ROLES.Owner],
    model: "/model-5.gltf",
    colorA: "#5e3fc1",
    index: 4,
  },
];

export const TheTeam = () => {
  const sceneContainer = useRef<HTMLDivElement>(null);
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0);
  const sceneRef = useRef<THREE.Scene | undefined>(undefined);
  const cameraRef = useRef<THREE.PerspectiveCamera | undefined>(undefined);
  const rendererRef = useRef<THREE.WebGLRenderer | undefined>(undefined);
  const modelsRef = useRef<{ model: THREE.Object3D; index: number }[]>([]);

  // Initialize scene, camera, and renderer
  useEffect(() => {
    if (!sceneContainer.current) return;

    const container = sceneContainer.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 2, 7);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    return () => {
      renderer.dispose();
      scene.clear();
      if (renderer.domElement && container) container.removeChild(renderer.domElement);
    };
  }, []);

  // Animation loop and model scaling
  useEffect(() => {
    if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
    function animate() {
      if (!cameraRef.current || !rendererRef.current || !sceneRef.current) return;

      const targetX = currentMemberIndex * 5;
      const cam = cameraRef.current;
      cam.position.x += (targetX - cam.position.x) * 0.1;
      cam.lookAt(new THREE.Vector3(cam.position.x, 0, 0));

      modelsRef.current.forEach(({ model, index }) => {
        const isSelected = index === currentMemberIndex;

        const targetScale = isSelected ? 3 : 1.5;
        const targetY = isSelected ? -3.5 : -1.5;

        model.scale.x += (targetScale - model.scale.x) * 0.1;
        model.scale.y += (targetScale - model.scale.y) * 0.1;
        model.scale.z += (targetScale - model.scale.z) * 0.1;

        model.position.y += (targetY - model.position.y) * 0.1;
      });

      rendererRef.current.render(sceneRef.current, cam);
    }
    rendererRef.current.setAnimationLoop(animate);
  }, [currentMemberIndex, sceneRef, cameraRef, rendererRef]);

  // Load models
  useEffect(() => {
    if (!sceneRef.current) return;
    const scene = sceneRef.current;

    modelsRef.current.forEach(({ model }) => {
      scene.remove(model);
      model.traverse((child) => {
        if ((child as THREE.Mesh).geometry) (child as THREE.Mesh).geometry.dispose();
        if ((child as THREE.Mesh).material) {
          const mat = (child as THREE.Mesh).material;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
          else mat.dispose();
        }
      });
    });
    modelsRef.current = [];

    const loader = new GLTFLoader();

    TEAM_MEMBERS.forEach((member, index) => {
      loader.load(member.model, (gltf) => {
        const model = gltf.scene;
        model.rotateY(Math.PI);

        const box = new THREE.Box3().setFromObject(model);
        const center = new THREE.Vector3();
        box.getCenter(center);
        model.position.sub(center);

        model.position.x = index * 5;
        model.position.y = -1.5;

        if (index === 0) {
          model.scale.set(3, 3, 3);
          model.position.y = -3.5;
        } else {
          model.scale.set(1.5, 1.5, 1.5);
        }

        scene.add(model);
        modelsRef.current.push({
          model,
          index,
        });
      });
    });
  }, []);

  const prevMember = () => {
    setCurrentMemberIndex((i) => (i === 0 ? TEAM_MEMBERS.length - 1 : i - 1));
  };

  const nextMember = () => {
    setCurrentMemberIndex((i) => (i === TEAM_MEMBERS.length - 1 ? 0 : i + 1));
  };

  return (

    <section className="relative min-h-[100dvh] pt-5 flex flex-col items-center" id="the-team">
      <div
        ref={sceneContainer}
        className="w-full flex-grow z-0"
        style={{ height: "500px", overflow: "hidden" }}
      />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-50"
        style={{
          width: "600px",
          height: "600px",
          filter: "blur(80px)",
          transition: "background 0.5s ease",
          zIndex: -1,
          background: `radial-gradient(circle, ${TEAM_MEMBERS[currentMemberIndex].colorA} 0%, transparent 70%)`,
        }}
      />

      <div className="absolute top-0 left-0 w-full h-full z-10">
        <h1 className="text-4xl font-bold text-center my-5">NUESTRO EQUIPO</h1>

        <div
          className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full p-2 bg-white/10 hover:bg-white/40 cursor-pointer"
          onClick={prevMember}
        >
          <ChevronLeft className="w-12 h-12 stroke-2 -translate-x-1" />
        </div>

        <div
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-2 bg-white/10 hover:bg-white/40 cursor-pointer"
          onClick={nextMember}
        >
          <ChevronRight className="w-12 h-12 stroke-2 translate-x-1" />
        </div>
      </div>

      <div className="absolute bottom-10 w-full text-center">
        <h2 className="text-3xl font-bold">
          {TEAM_MEMBERS[currentMemberIndex].name}
        </h2>
        <p className="text-lg mt-2 italic font-semibold">
          &quot;{TEAM_MEMBERS[currentMemberIndex].quote}&quot;
        </p>
        <div className="flex justify-center gap-2 mt-2">
          {TEAM_MEMBERS[currentMemberIndex].roles.map((role, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full text-white text-lg font-medium"
              style={{ backgroundColor: role.color }}
            >
              {role.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
