"use client"

import { useRef, useEffect, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"

export function TshirtModel({
  color = "#000000",
  design = "default",
  universe = "Marvel",
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) {
  const tshirtRef = useRef()
  const [modelLoaded, setModelLoaded] = useState(false)
  const [textError, setTextError] = useState(false)

  // Load the model unconditionally
  const gltf = useGLTF("/assets/3d/duck.glb")
  const nodes = gltf ? gltf.nodes : null
  const materials = gltf ? gltf.materials : null

  // Only set color when the model and ref are available
  useEffect(() => {
    if (tshirtRef.current) {
      tshirtRef.current.material.color.set(color)
      setModelLoaded(true)
    }
  }, [color, tshirtRef.current])

  // Only animate if the model is loaded
  useFrame((state) => {
    if (typeof window !== "undefined" && tshirtRef.current && modelLoaded) {
      tshirtRef.current.rotation.y += 0.005
    }
  })

  // Design patterns based on universe
  const getDesignColor = () => {
    switch (universe) {
      case "Marvel Universe":
        return "#ff0000" // Red for Marvel
      case "DC Comics":
        return "#0000ff" // Blue for DC
      case "Anime Superheroes":
        return "#ffa500" // Orange for Anime
      case "Video Game Characters":
        return "#00ff00" // Green for Video Games
      case "Sci-Fi & Fantasy":
        return "#9900ff" // Purple for Sci-Fi
      case "Classic Comics":
        return "#ffff00" // Yellow for Classic
      case "Custom Fan Art":
        return "#ff00ff" // Pink for Custom
      default:
        return "#ffffff" // White default
    }
  }

  // If model failed to load, render a fallback
  if (!nodes) {
    return (
      <mesh scale={scale} position={position} rotation={rotation}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} />
        {/* Use a mesh with a custom material instead of Text */}
        <mesh position={[0, 0, 0.6]}>
          <planeGeometry args={[1, 0.3]} />
          <meshBasicMaterial color={getDesignColor()} />
        </mesh>
      </mesh>
    )
  }

  return (
    <group scale={scale} position={position} rotation={rotation}>
      {/* This is a placeholder using the duck model */}
      <mesh ref={tshirtRef} geometry={nodes.LOD3spShape.geometry} scale={[0.01, 0.01, 0.01]} rotation={[1.5, 0, 0]}>
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Replace Text with a simple mesh for the design */}
      <mesh position={[0, 0, 0.6]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.8, 0.3]} />
        <meshBasicMaterial color={getDesignColor()} />
      </mesh>
    </group>
  )
}
