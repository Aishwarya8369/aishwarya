import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Environment } from "@react-three/drei"

/**
 * TshirtModel Component
 *
 * Renders a 3D t-shirt model with customizable color
 *
 * @param {Object} props - Component props
 * @param {string} props.modelUrl - URL to the 3D model
 * @param {string} props.color - Color of the t-shirt
 */
function TshirtModel({ modelUrl, color = "#000000" }) {
  // Load the 3D model
  const { scene } = useGLTF(modelUrl)

  // Clone the scene to avoid modifying the cached original
  const model = scene.clone()

  // Find the mesh in the model and set its color
  model.traverse((node) => {
    if (node.isMesh && node.material) {
      node.material.color.set(color)
    }
  })

  return <primitive object={model} scale={1} position={[0, 0, 0]} rotation={[0, 0, 0]} />
}

/**
 * ModelViewer Component
 *
 * Displays a 3D model viewer with controls
 *
 * @param {Object} props - Component props
 * @param {string} props.modelUrl - URL to the 3D model
 * @param {string} props.color - Color of the model
 */
function ModelViewer({ modelUrl, color }) {
  return (
    <div className="w-full h-full">
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Suspense fallback={null}>
          <TshirtModel modelUrl={modelUrl} color={color} />
          <OrbitControls enableZoom={true} enablePan={true} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ModelViewer
