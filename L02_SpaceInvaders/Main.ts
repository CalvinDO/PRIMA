namespace SpaceInvaders {
    import ƒ = FudgeCore;

    window.addEventListener("load", init);

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);

    export let graph: ƒ.Node = new ƒ.Node("Graph");

    let invaders: ƒ.Node;

    let viewport = new ƒ.Viewport();

    let canvas: HTMLCanvasElement;

    let character: Character;
    let characterStartY: number = -5;
    let characterSpeed: number = 5;

    export let projectiles: ƒ.Node;

    let barriers: Barrier[] = [];
    let barrierAmount: number = 4;
    let barrierYPos: number = -3.2;
    let barrierGap: number = 2.55;

    let invadersInitialAmount: number = 24;
    let invadersPerRow: number = 8;
    let invaderGap: number = 2.25;
    let invaderSpawnPos: ƒ.Vector3 = new ƒ.Vector3(-8, 4.4, 0);

    let invaderSpeed: number = 1;

    let deltaTime: number;

    let isShootingValid: boolean = true;
    let leftBorderX: number = -11.3;


    function init(): void {

        canvas = document.querySelector("canvas");

        initializeCameraAndViewport();

        initializeLight();

        createCharacter();

        createBarriers();

        spawnInvaders();

        //setTimeout(() => { invaderSpeed *= -1; }, 1000);
        //let timer: ƒ.Timer = new ƒ.Timer(100, 0, new ƒ.EventTimer(timer));

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

        character = new Character(new ƒ.Vector3(0, characterStartY), ƒ.Vector3.ONE());
        projectiles = new ƒ.Node("Projectile Container");
        graph.appendChild(character);
        graph.appendChild(projectiles);
    }


    function spawnInvaders(): void {

        invaders = new ƒ.Node("InvaderContainer");

        for (let iInvader: number = 0; iInvader < invadersInitialAmount; iInvader++) {


            let invaderX: number = (iInvader % invadersPerRow) * invaderGap;
            let invaderYUnstretched: number = iInvader / invadersPerRow;

            let invaderY: number = -("" + invaderYUnstretched)[0] * invaderGap;

            let newPos: ƒ.Vector3 = new ƒ.Vector3(invaderX, invaderY);
            newPos.add(invaderSpawnPos);

            let newInvader: ƒ.Node = new Invader(newPos, ƒ.Vector3.ONE(), "Invader" + iInvader);


            invaders.appendChild(newInvader);

        }

        graph.appendChild(invaders);
    }

    function createBarriers(): void {

        let startPos: ƒ.Vector3 = new ƒ.Vector3(- (barrierGap * (barrierAmount - 1) / 2), barrierYPos);

        for (let iBarrier: number = 0; iBarrier < barrierAmount; iBarrier++) {
            let newPos: ƒ.Vector3 = new ƒ.Vector3(iBarrier * barrierGap, 2);
            newPos.add(startPos);

            console.log(newPos);

            let s: string = "hello";

            console.log(s[0]);

            //  let newBarrier: ƒ.Node = createCube(newPos, "Barrier" + iBarrier);

            let barrierScale: number = 1;
            let barrierScaleVec: ƒ.Vector3 = ƒ.Vector3.ONE();
            barrierScaleVec.scale(barrierScale);

            let newBarrier: Barrier = new Barrier(newPos, barrierScaleVec, "Barrier" + iBarrier, 10);
            barriers.push(newBarrier);
            graph.appendChild(newBarrier);
        }
    }


    function controlCharacter(): void {

        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.A]) || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_LEFT])) {
            character.translateX(-characterSpeed * deltaTime);
        }

        if (ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.D]) || ƒ.Keyboard.isPressedOne([ƒ.KEYBOARD_CODE.ARROW_RIGHT])) {
            character.translateX(characterSpeed * deltaTime);
        }
    }



    function onKeyDown(_event: KeyboardEvent): void {

        if (_event.code == ƒ.KEYBOARD_CODE.SPACE) {

            if (isShootingValid) {
                character.shootProjectile();
            }

            isShootingValid = false;
        }
        
    }

    


    function onKeyUp(_event: KeyboardEvent): void {

        if (_event.code == ƒ.KEYBOARD_CODE.SPACE) {
            isShootingValid = true;
        }
    }

    function moveInvaders(): void {

        invaders.getChildren().forEach(currentInvader => {

            let currentRealInvader: Invader = <Invader>currentInvader;
            currentRealInvader.translate(new ƒ.Vector3(-invaderSpeed * deltaTime));
        });
    }


    function calculateProjectiles(): void {

        projectiles.getChildren().forEach(projectile => {

            let castedProjectile: Projectile = <Projectile>projectile;
            castedProjectile.translateY(character.projectileSpeed * deltaTime);
        });
    }

    function manageInvaderTurn(): void {

        let firstInvaderX: number = invaders.getChild(0).mtxWorld.translation.x;
        let lastInvaderX: number = invaders.getChild(invaders.nChildren - 1).mtxWorld.translation.x;


        if (firstInvaderX < leftBorderX + invaderSpeed || lastInvaderX > -leftBorderX + invaderSpeed) {
            invaderSpeed *= -1;
        }
    }


    function checkCollisions(): void {

        invaders.getChildren().forEach(invader => {

            projectiles.getChildren().forEach(projectile => {

                (<Invader>invader).checkCollision((<Projectile>projectile).rect);
            });
        });
    }


    function update(): void {
        deltaTime = ƒ.Loop.timeFrameGame / 1000;

        controlCharacter();

        moveInvaders();
        manageInvaderTurn();


        calculateProjectiles();

        checkCollisions();

        viewport.draw();
    }
}