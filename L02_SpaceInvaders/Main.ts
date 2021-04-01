namespace SpaceInvaders {
    import ƒ = FudgeCore;

    window.addEventListener("load", init);

    let graph: ƒ.Node = new ƒ.Node("Graph");
    let invaders: ƒ.Node;

    let viewport = new ƒ.Viewport();

    let canvas: HTMLCanvasElement;

    let character: ƒ.Node;
    let characterStartY: number = -5;
    let characterSpeed: number = 5;

    let barriers: ƒ.Node[] = [];
    let barrierAmount: number = 4;
    let barrierYPos: number = -3.5;
    let barrierGap: number = 5;

    let invadersInitialAmount: number = 40;
    let invadersPerRow: number = 10;
    let invaderGap: number = 2;
    let invaderSpawnPos: ƒ.Vector3 = new ƒ.Vector3(0, 5, 0);

    let invaderSpeed: number = 1;

    let deltaTime: number;

    let leftKeyDown: boolean;
    let rightKeyDown: boolean;


    function init(): void {

        canvas = document.querySelector("canvas");

        initializeCameraAndViewport();

        initializeLight();

        createCharacter();

        createBarriers();

        spawnInvaders();


        ƒ.Loop.start(ƒ.LOOP_MODE.FRAME_REQUEST);
        ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
        update();
    }

    function initializeLight(): void {

        let light: ƒ.LightAmbient = new ƒ.LightAmbient();
        let lightNode: ƒ.Node = new ƒ.Node("light");
        lightNode.addComponent(new ƒ.ComponentLight(light));

        graph.appendChild(lightNode);
    }

    function initializeCameraAndViewport(): void {

        let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
        cmpCamera.mtxPivot.translateZ(20);
        cmpCamera.mtxPivot.rotateY(180);

        viewport.initialize("Viewport", graph, cmpCamera, canvas);
        ƒ.Debug.log(viewport);
    }

    function createCharacter(): void {
        character = createCube(new ƒ.Vector3(0, characterStartY), "Character");
        graph.appendChild(character);
    }


    function spawnInvaders(): void {

        invaders = new ƒ.Node("InvaderContainer");

        for (let iInvader: number = 0; iInvader < invadersInitialAmount; iInvader++) {


            let invaderX: number = (iInvader % invadersPerRow) * invaderGap;
            let invaderYUnstretched: number = iInvader / invadersPerRow;

            let invaderY: number = -("" + invaderYUnstretched)[0] * invaderGap;

            let newPos: ƒ.Vector3 = new ƒ.Vector3(invaderX, invaderY);
            newPos.add(invaderSpawnPos);

            let newInvader: ƒ.Node = new Invader(newPos, "Invader" + iInvader);


            invaders.appendChild(newInvader);

        }

        graph.appendChild(invaders);
    }

    function createBarriers(): void {
        let startPos: ƒ.Vector3 = new ƒ.Vector3(- (barrierGap * (barrierAmount - 1) / 2), barrierYPos);

        for (let iBarrier: number = 0; iBarrier < barrierAmount; iBarrier++) {
            let newPos: ƒ.Vector3 = new ƒ.Vector3(iBarrier * barrierGap);
            newPos.add(startPos);

            console.log(newPos);

            //  let newBarrier: ƒ.Node = createCube(newPos, "Barrier" + iBarrier);

            let newBarrier: ƒ.Node = new Barrier(newPos, "Barrier" + iBarrier, 10);
            barriers.push(newBarrier);
            graph.appendChild(newBarrier);
        }
    }


    function createCube(_position: ƒ.Vector3, _name: string): ƒ.Node {

        let newCube: ƒ.Node = new ƒ.Node(_name);
        let cubeMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(new ƒ.MeshCube(_name));
        newCube.addComponent(cubeMesh);
        newCube.addComponent(new ƒ.ComponentMaterial(new ƒ.Material("Color", ƒ.ShaderFlat)));
        newCube.addComponent(new ƒ.ComponentTransform());
        cubeMesh.mtxPivot.translate(_position);

        return newCube;
    }


    function onKeyDown(_event: KeyboardEvent): void {
        leftKeyDown = _event.key == "ArrowLeft";
        rightKeyDown = _event.key == "ArrowRight";

    }


    function onKeyUp(_event: KeyboardEvent): void {
        if (leftKeyDown && (_event.key == "ArrowLeft")) {
            leftKeyDown = false;
        }
        if (rightKeyDown && (_event.key == "ArrowRight")) {
            rightKeyDown = false;
        }
    }


    function controlCharacter(): void {
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
            character.mtxLocal.translateX(-characterSpeed * deltaTime);
        }
        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
            character.mtxLocal.translateX(characterSpeed * deltaTime);
        }
    }

    function moveInvaders(): void {
        invaders.getChildren().forEach(currentInvader => {
            let currentRealInvader: Invader = <Invader>currentInvader;
            currentRealInvader.translate(new ƒ.Vector3(-invaderSpeed * deltaTime));
        });
    }
    function update(): void {
        deltaTime = ƒ.Loop.timeFrameGame / 1000;

        controlCharacter();

        moveInvaders();


        viewport.draw();
    }
}