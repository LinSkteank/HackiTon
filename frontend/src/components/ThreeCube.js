import React, {useEffect, useRef, useState} from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import Dot from "./Dot";
const ThreeCube = () => {
    const cubeRef = useRef(null);

    const [xScroll, setXScroll] = useState(0)
    const [yScroll, setYScroll] = useState(0)
    const [scale, setScale  ] = useState(0)

    function setCookie(name,value) {
        var expires = "";
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    let camera__ = null;
    let dots = [
        {
            startX: 10,
            startY: 10,
            color: "#ff0000",
            data: {
                name: "name",
                jopa: "jopa",
                age: 15
            }
        },
        {
            startX: 15,
            startY: 12,
            color: "#00ff00",
            data: {
                name: "name",
                jopa: "jopa",
                age: 15
            }
        }
    ]
    let initialX = 0;
    let initialY = 0;

    let callback = (test)=>{
        let scale = JSON.parse(test)?.object?.matrix[14];
        setCookie("scale", scale)
    }
    document.addEventListener("mousedown", (e)=>{
        initialX = e.clientX;
        initialY = e.clientY
    })

    document.addEventListener("mouseup", (e)=>{
        let shiftX = (e.clientX-initialX)/window.innerWidth
        let shiftY = (e.clientY-initialY)/window.innerHeight
        setXScroll(xScroll + shiftX)
        setYScroll(yScroll + shiftY)
    })



    useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    const radius = 1;
    const widthSegments = 64;
    const heightSegments = 64;
    const geometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);

    const texture = new THREE.TextureLoader().load('https://img5.goodfon.ru/original/1920x1200/9/27/materik-karta-mira-metall-chernyi-fon.jpg');

    const material = new THREE.MeshBasicMaterial( { map: texture } );

    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)


    const controls = new OrbitControls( camera, renderer.domElement );
    controls.minDistance = 1.4;
    controls.maxDistance = 8;
    window.addEventListener('resize', onWindowResize, false)

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );

    }

    window.addEventListener('resize', onWindowResize, false);

    const animate = function () {
     let cam = JSON.stringify(camera);
     if (cam!==camera__){
         camera__=cam;
         callback(cam)
     }
    requestAnimationFrame(animate);
    controls.update()
    renderer.render(scene, camera);
    };

    animate();
    }, []);

    return (
      <>
      <div className="dots_wrapper">
        <div ref={cubeRef}></div>
          {dots.map((value)=>{
              return <Dot scrollY={yScroll} scrollX={xScroll} startX={value.startX} startY={value.startY} color={value.color} data={value.data} />
          })}
      </div>
      </>
    );
};

export default ThreeCube;
