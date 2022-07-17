function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();
    animate();
}
render();
