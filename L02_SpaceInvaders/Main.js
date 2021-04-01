"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    let graph = new ƒ.Node("Graph");
    let invaders;
    let viewport = new ƒ.Viewport();
    let canvas;
    let character;
    let characterStartY = -5;
    let characterSpeed = 5;
    let barriers = [];
    let barrierAmount = 4;
    let barrierYPos = -3.5;
    let barrierGap = 5;
    let invadersInitialAmount = 40;
    let invadersPerRow = 10;
    let invaderGap = 2;
    let invaderSpawnPos = new ƒ.Vector3(0, 5, 0);
    let invaderSpeed = 1;
    let deltaTime;
    let leftKeyDown;
    let rightKeyDown;
    function init() {
        canvas = document.querySelector("canvas");
        initializeCameraAndViewport();
        initializeLight();
        createCharacter();
        createBarriers();
        spawnInvaders();
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
        cmpCamera.mtxPivot.rotateY(180);
        viewport.initialize("Viewport", graph, cmpCamera, canvas);
        ƒ.Debug.log(viewport);
    }
    function createCharacter() {
        character = createCube(new ƒ.Vector3(0, characterStartY), "Character");
        graph.appendChild(character);
    }
    function spawnInvaders() {
        invaders = new ƒ.Node("InvaderContainer");
        for (let iInvader = 0; iInvader < invadersInitialAmount; iInvader++) {
            let invaderX = (iInvader % invadersPerRow) * invaderGap;
            let invaderYUnstretched = iInvader / invadersPerRow;
            let invaderY = -("" + invaderYUnstretched)[0] * invaderGap;
            let newPos = new ƒ.Vector3(invaderX, invaderY);
            newPos.add(invaderSpawnPos);
            let newInvader = new SpaceInvaders.Invader(newPos, "Invader" + iInvader);
            invaders.appendChild(newInvader);
        }
        graph.appendChild(invaders);
    }
    function createBarriers() {
        let startPos = new ƒ.Vector3(-(barrierGap * (barrierAmount - 1) / 2), barrierYPos);
        for (let iBarrier = 0; iBarrier < barrierAmount; iBarrier++) {
            let newPos = new ƒ.Vector3(iBarrier * barrierGap);
            newPos.add(startPos);
            console.log(newPos);
            //  let newBarrier: ƒ.Node = createCube(newPos, "Barrier" + iBarrier);
            let newBarrier = new SpaceInvaders.Barrier(newPos, "Barrier" + iBarrier, 10);
            barriers.push(newBarrier);
            graph.appendChild(newBarrier);
        }
    }
    function createCube(_position, _name) {
        let newCube = new ƒ.Node(_name);
        let cubeMesh = new ƒ.ComponentMesh(new ƒ.MeshCube(_name));
        newCube.addComponent(cubeMesh);
        newCube.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("Color", ƒ.ShaderFlat)));
        newCube.addComponent(new ƒ.ComponentTransform());
        cubeMesh.mtxPivot.translate(_position);
        return newCube;
    }
    function onKeyDown(_event) {
        leftKeyDown = _event.key == "ArrowLeft";
        rightKeyDown = _event.key == "ArrowRight";
    }
    function onKeyUp(_event) {
        if (leftKeyDown && (_event.key == "ArrowLeft")) {
            leftKeyDown = false;
        }
        if (rightKeyDown && (_event.key == "ArrowRight")) {
            rightKeyDown = false;
        }
    }
    function controlCharacter() {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
            character.mtxLocal.translateX(-characterSpeed * deltaTime);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
            character.mtxLocal.translateX(characterSpeed * deltaTime);
        }
    }
    function moveInvaders() {
        invaders.getChildren().forEach(currentInvader => {
            let currentRealInvader = currentInvader;
            currentRealInvader.translate(new ƒ.Vector3(-invaderSpeed * deltaTime));
        });
    }
    function update() {
        deltaTime = ƒ.Loop.timeFrameGame / 1000;
        controlCharacter();
        moveInvaders();
        viewport.draw();
    }
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Main.js.map