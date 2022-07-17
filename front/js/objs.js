let mouseDown = 0;

document.body.onmousedown = function() { 
  ++mouseDown;
}

document.body.onmouseup = function() {
  --mouseDown;
}

function rotateObj(obj) {
    obj.rotation.y += 1 / 500;
    obj.rotation.x += 1 / 1000;
}

function animate() {
    if (!mouseDown) {
        // rotateObj(sphere);

        for (let i = 0; i < points.length; i++) {
            const point = points[i];
            
            // rotateObj(point);
        }
    }
}
