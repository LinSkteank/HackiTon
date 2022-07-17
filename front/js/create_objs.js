const sphereGeometry = new THREE.SphereBufferGeometry(1, 64, 64);
const sphereTexture = new THREE.TextureLoader().load("../img/sphere_texture.jpg");
const sphereMaterial = new THREE.MeshBasicMaterial({ map: sphereTexture });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

let points = [];

const request = new XMLHttpRequest();
const url = "https://250e-62-217-191-187.eu.ngrok.io/fires";
request.open('GET', url);
request.setRequestHeader('Content-Type', 'application/json');

request.addEventListener("readystatechange", () => {
    data = request.responseText;

    if (!data) {
        return;
    }

    points = JSON.parse(data);

    frps =points.map(p => p.frp);
    maxFrp = Math.max(...frps) - Math.min(...frps);

    for (let i = 0; i < points.length; i++) {
        const point = points[i];
        
        pointSize = 0.001 * Math.cbrt(point.count) / 2 + 0.001;
        pointLinkHeight = 1 / 30 * point.frp / 2;
        color = (130 - 100 / maxFrp * point.frp);

        const pointGeometry = new THREE.SphereGeometry(pointSize, 32, 16);
        const pointMaterial = new THREE.MeshBasicMaterial({ color: `rgb(${Math.ceil(color)}%, 0%, 0%)` });
        point.pointObj = new THREE.Mesh(pointGeometry, pointMaterial);
        point.pointObj.scale.set(3, 3, 1);

        pointLinkGeometry = new THREE.BoxGeometry(1 / 200, 1 / 200, pointLinkHeight);
        pointLinkMaterial = pointMaterial
        point.pointLinkObj = new THREE.Mesh(pointLinkGeometry, pointLinkMaterial);

        phi = point.latitude * Math.PI / 180;
        theta = (point.longitude - 180) * Math.PI / 180;

        xr = -Math.cos(phi) * Math.cos(theta);
        yr = Math.sin(phi)
        zr = Math.cos(phi) * Math.sin(theta);

        point.pointObj.position.set(xr, yr, zr);
        point.pointObj.lookAt(new THREE.Vector3(0, 0, 0));

        point.pointLinkObj.position.set(xr, yr, zr);
        point.pointLinkObj.lookAt(new THREE.Vector3(0, 0, 0));

        point.pointLinkObj.name = "point";
        point.pointObj.name = "point";

        const userData = {
            count: point.count,
            frp: point.frp,
            latitude: point.latitude,
            longitude: point.longitude,
        };

        point.pointLinkObj.userData = userData;
        point.pointObj.userData = userData;

        scene.add(point.pointLinkObj);
        scene.add(point.pointObj);
    }
})
request.send();


let mouse = new THREE.Vector3(0, 0, 0.5);

document.addEventListener('mousemove', (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    mouse.x = (x / canvas.clientWidth) *  2 - 1;
    mouse.y = (y / canvas.clientHeight) * - 2 + 1
});

document.addEventListener('click', (event) => {
    raycaster.setFromCamera(mouse.clone(), camera);
    let intersects = raycaster.intersectObjects(scene.children);
    intersects = intersects.filter(o => o.object.name === "point").sort(o => o.distance);
    if (intersects.length > 0) {
        selctItem = intersects[0].object.userData;
        renderCoolPhrase();
        console.log(1)
    }
});