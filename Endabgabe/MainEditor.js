"use strict";
var Endabgabe;
(function (Endabgabe) {
    (function (_graphId) {
        window.addEventListener("load", startInteractiveViewport);
        // setup and start interactive viewport
        async function startInteractiveViewport() {
            // setup the viewport
            await Endabgabe.Main.init();
            // make the camera interactive (complex method in FudgeAid)
            //FudgeAid.Viewport.expandCameraToInteractiveOrbit(viewport);
            // setup audio
            // draw viewport once for immediate feedback
            //viewport.draw();
            //canvas.dispatchEvent(new CustomEvent("interactiveViewportStarted", { bubbles: true, detail: viewport }));
        }
    })(Endabgabe.Main.rootGraphId);
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=MainEditor.js.map