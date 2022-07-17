// Create and setting default objs
let renderer = new THREE.WebGLRenderer();

let width = window.innerWidth;

if (width > 1920) {
    width = 1920;
}

blockWidth = width - 40;
blockHeight = window.innerHeight * 0.4;

renderer.setSize(blockWidth, blockHeight);
const canvas = renderer.domElement;

const container = document.getElementById('earth');
container.appendChild(renderer.domElement);

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(75, blockWidth / blockHeight);
camera.position.z = 1.5;

// Add resize scene
function onWindowResize() {
    width = window.innerWidth - 40;

    if (width > 1920) {
        width = 1920;
    }

    blockWidth = width;
    
    renderer.setSize(blockWidth, blockHeight);
    camera.aspect = blockWidth / (blockHeight);
    camera.updateProjectionMatrix();
}

window.addEventListener('resize', onWindowResize, false);


// Add rotation
let controls = new THREE.TrackballControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);

// Intersections
raycaster = new THREE.Raycaster();

// Globals
let selctItem;