"use strict";
var L01_FirstFudge;
(function (L01_FirstFudge) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let graph = new ƒ.Node("Graph");
    let cube = new ƒ.Node("Cube");
    let cmpMesh;
    let viewport = new ƒ.Viewport();
    let gravity = -2;
    let velocity = new ƒ.Vector3(0.5, 0, 0);
    let position = new ƒ.Vector3(0, 5, 0);
    let bounceBoundaryBoxWidth = 10;
    let canvas;
    function init() {
        canvas = document.querySelector("canvas");
        createBouncingBall();
        initializeCameraAndViewport();
        //generateVisualBounceBoundingBox();
        initializeLight();
        ƒ.Loop.start(ƒ.LOOP_MODE.FRAME_REQUEST);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        update();
    }
    function initializeLight() {
        let light = new ƒ.LightAmbient();
        let lightNode = new ƒ.Node("light");
        lightNode.addComponent(new ƒ.ComponentLight(light));
        graph.appendChild(lightNode);
    }
    function initializeCameraAndViewport() {
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(20);
        cmpCamera.mtxPivot.translateY(2);
        cmpCamera.mtxPivot.rotateY(180);
        viewport.initialize("Viewport", graph, cmpCamera, canvas);
        ƒ.Debug.log(viewport);
    }
    function generateVisualBounceBoundingBox() {
        let bounceBox = new ƒ.Node("BounceBox");
        bounceBox.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("MyOwnColor2", ƒ.ShaderFlat, new ƒ.CoatColored(ƒ.Color.CSS("grey")))));
        let bounceBoxMesh = new ƒ.ComponentMesh(new ƒ.MeshCube());
        bounceBoxMesh.mesh.flipNormals();
        bounceBox.addComponent(bounceBoxMesh);
        bounceBoxMesh.mtxPivot.scale(new ƒ.Vector3(10, 10, 10));
        graph.appendChild(bounceBox);
    }
    function createBouncingBall() {
        cube.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("MyOwnColor", ƒ.ShaderFlat)));
        cmpMesh = new ƒ.ComponentMesh(new ƒ.MeshCube());
        cube.addComponent(cmpMesh);
        graph.appendChild(cube);
    }
    function update() {
        velocity.y += gravity * ƒ.Loop.timeFrameReal / 1000;
        position.add(ƒ.Vector3.SCALE(velocity, ƒ.Loop.timeFrameReal / 1000));
        //graph.mtxWorld.translateZ(10);
        cmpMesh.mtxPivot.translation = position;
        viewport.draw();
        calculate();
    }
    function calculate() {
        if (cmpMesh.mtxPivot.translation.y < 0) {
            velocity.y *= -1;
            position.y = 0.01;
        }
        if (cmpMesh.mtxPivot.translation.x > bounceBoundaryBoxWidth / 2) {
            velocity.x *= -1;
            position.x = bounceBoundaryBoxWidth / 2 - 0.01;
        }
        if (cmpMesh.mtxPivot.translation.x < -bounceBoundaryBoxWidth / 2) {
            velocity.x *= -1;
            position.x = -bounceBoundaryBoxWidth / 2 + 0.01;
        }
    }
})(L01_FirstFudge || (L01_FirstFudge = {}));
//# sourceMappingURL=Test.js.map