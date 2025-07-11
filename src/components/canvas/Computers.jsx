import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useEffect, useRef } from "react"
import { OrbitControls, Preload,useGLTF } from "@react-three/drei"
import CanvasLoader from '../Loader'
import { useFrame } from '@react-three/fiber'; // Import useFrame
import { motion } from 'framer-motion';
const Computers = ({isMobile}) => {

  const computer = useGLTF('./desktop_pc/scene.gltf') 
 
  // Create a ref to access the primitive object
  // const computerRef = useRef();

  // // Use useFrame to animate the position
  // useFrame(({ clock }) => {
  //   const elapsedTime = clock.getElapsedTime(); // Get elapsed time
  //   // Modify the Y-position for a floating effect
  //   computerRef.current.position.x = Math.sin(elapsedTime) * 1 + (isMobile ? -3 : -3.25); 
  // });

  return (

    <mesh>
      <hemisphereLight intensity={0.5} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        decay = {0}
        castShadow = {true}
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        // ref={computerRef} // Attach the ref here
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
       {/* <motion.div
        animate={{
          y: [0, 24, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className='w-3 h-3 rounded-full bg-secondary mb-1'
      /> */}
      
    </mesh>
  )
}

const ComputerCanvas = () =>{
 
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() =>{
    
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width:50px)")
 
    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) =>{
      setIsMobile(event.matches);
    }

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    }
  },[])

  return (
   
      <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      // gl={{ preserveDrawingBuffer: true }}
    > 
    
      <Suspense fallback={<CanvasLoader/>}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        /> 
        <Computers isMobile={isMobile}/>
       </Suspense> 

      <Preload all />
    </Canvas>
    
  )
}
export default ComputerCanvas
