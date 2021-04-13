"use strict";
var SpaceInvaders;
(function (SpaceInvaders) {
    var ƒ = FudgeCore;
    window.addEventListener("load", init);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);
    SpaceInvaders.graph = new ƒ.Node("Graph");
    let invaders;
    let viewport = new ƒ.Viewport();
    let canvas;
    let character;
    let characterStartY = -5;
    let characterSpeed = 5;
    let barriers = [];
    let barrierAmount = 4;
    let barrierYPos = -3.2;
    let barrierGap = 2.55;
    let invadersInitialAmount = 24;
    let invadersPerRow = 8;
    let invaderGap = 2.25;
    let invaderSpawnPos = new ƒ.Vector3(-8, 4.4, 0);
    let invaderSpeed = 1;
    let deltaTime;
    let isShootingValid = true;
    let leftBorderX = -11.3;
    function init() {
        canvas = document.querySelector("canvas");
        initializeCameraAndViewport();
        initializeLight();
        createCharacter();
        createBarriers();
        spawnInvaders();
        //setTimeout(() => { invaderSpeed *= -1; }, 1000);
        //let timer: ƒ.Timer = new ƒ.Timer(100, 0, new ƒ.EventTimer(timer));
        ƒ.Loop.start(ƒ.LOOP_MODE.FRAME_REQUEST);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        update();
    }
    function initializeLight() {
        let light = new ƒ.LightAmbient();
        let lightNode = new ƒ.Node("light");
        lightNode.addComponent(new ƒ.ComponentLight(light));
        SpaceInvaders.graph.appendChild(lightNode);
    }
    function initializeCameraAndViewport() {
        let cmpCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(20);
        cmpCamera.mtxPivot.rotateY(180);
        viewport.initialize("Viewport", SpaceInvaders.graph, cmpCamera, canvas);
        ƒ.Debug.log(viewport);
    }
    function createCharacter() {
        character = new SpaceInvaders.Character(new ƒ.Vector3(0, characterStartY), ƒ.Vector3.ONE());
        SpaceInvaders.projectiles = new ƒ.Node("Projectile Container");
        SpaceInvaders.graph.appendChild(character);
        SpaceInvaders.graph.appendChild(SpaceInvaders.projectiles);
    }
    function spawnInvaders() {
        invaders = new ƒ.Node("InvaderContainer");
        for (let iInvader = 0; iInvader < invadersInitialAmount; iInvader++) {
            let invaderX = (iInvader % invadersPerRow) * invaderGap;
            let invaderYUnstretched = iInvader / invadersPerRow;
            let invaderY = -("" + invaderYUnstretched)[0] * invaderGap;
            let newPos = new ƒ.Vector3(invaderX, invaderY);
            newPos.add(invaderSpawnPos);
            let newInvader = new SpaceInvaders.Invader(newPos, ƒ.Vector3.ONE(), "Invader" + iInvader);
            invaders.appendChild(newInvader);
        }
        SpaceInvaders.graph.appendChild(invaders);
    }
    function createBarriers() {
        let startPos = new ƒ.Vector3(-(barrierGap * (barrierAmount - 1) / 2), barrierYPos);
        for (let iBarrier = 0; iBarrier < barrierAmount; iBarrier++) {
            let newPos = new ƒ.Vector3(iBarrier * barrierGap, 2);
            newPos.add(startPos);
            console.log(newPos);
            //  let newBarrier: ƒ.Node = createCube(newPos, "Barrier" + iBarrier);
            let barrierScale = 1;
            let barrierScaleVec = ƒ.Vector3.ONE();
            barrierScaleVec.scale(barrierScale);
            let newBarrier = new SpaceInvaders.Barrier(newPos, barrierScaleVec, "Barrier" + iBarrier, 10);
            barriers.push(newBarrier);
            SpaceInvaders.graph.appendChild(newBarrier);
        }
    }
    function controlCharacter() {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A]) || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
            character.translateX(-characterSpeed * deltaTime);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D]) || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
            character.translateX(characterSpeed * deltaTime);
        }
    }
    function onKeyDown(_event) {
        if (_event.code == ƒ.KEYBOARD_CODE.SPACE) {
            if (isShootingValid) {
                character.shootProjectile();
            }
            isShootingValid = false;
        }
    }
    function onKeyUp(_event) {
        if (_event.code == ƒ.KEYBOARD_CODE.SPACE) {
            isShootingValid = true;
        }
    }
    function moveInvaders() {
        invaders.getChildren().forEach(currentInvader => {
            let currentRealInvader = currentInvader;
            currentRealInvader.translate(new ƒ.Vector3(-invaderSpeed * deltaTime));
        });
    }
    function calculateProjectiles() {
        SpaceInvaders.projectiles.getChildren().forEach(projectile => {
            let castedProjectile = projectile;
            castedProjectile.translateY(character.projectileSpeed * deltaTime);
        });
    }
    function manageInvaderTurn() {
        let firstInvaderX = invaders.getChild(0).mtxWorld.translation.x;
        let lastInvaderX = invaders.getChild(invaders.nChildren - 1).mtxWorld.translation.x;
        if (firstInvaderX < leftBorderX + invaderSpeed || lastInvaderX > -leftBorderX + invaderSpeed) {
            invaderSpeed *= -1;
        }
        /*
        if (invaders.getChild(invaders.nChildren - 1).mtxWorld.translation.x > -leftBorderX - invaderSpeed) {
           
            invaderSpeed *= -1;
        
        }
        */
    }
    function update() {
        deltaTime = ƒ.Loop.timeFrameGame / 1000;
        controlCharacter();
        moveInvaders();
        manageInvaderTurn();
        calculateProjectiles();
        viewport.draw();
    }
})(SpaceInvaders || (SpaceInvaders = {}));
//# sourceMappingURL=Main.js.map