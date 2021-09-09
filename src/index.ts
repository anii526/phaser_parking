import "core-js";
import "./style.css";
import { Game, Types } from "phaser";

import { LoadingScene } from "./scenes";

export const gameConfig: Types.Core.GameConfig = {
    title: "Phaser game tutorial",
    type: Phaser.WEBGL,
    parent: "game",
    backgroundColor: "#351f1b",
    scale: {
        mode: Phaser.Scale.ScaleModes.NONE,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    physics: {
        default: "matter",
        matter: {
            debug: true,
            gravity: {
                x: 0,
                y: 0,
            },
        },
    },
    render: {
        antialiasGL: false,
        pixelArt: true,
    },
    callbacks: {
        postBoot: () => {
            sizeChanged();
        },
    },
    canvasStyle: `display: block; width: 100%; height: 100%;`,
    autoFocus: true,
    audio: {
        disableWebAudio: false,
    },
    scene: [LoadingScene],
};
const game = new Game(gameConfig);
function sizeChanged() {
    if (game.isBooted) {
        setTimeout(() => {
            game.scale.resize(window.innerWidth, window.innerHeight);

            game.canvas.setAttribute(
                "style",
                `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
            );

            // const dpr = Math.min(window.devicePixelRatio, 2);
            // const widthDPR = Math.round(window.innerWidth * dpr);
            // const heightDPR = Math.round(window.innerHeight * dpr);

            // game.scale.parent.width = Math.round(window.innerWidth);
            // game.scale.parent.height = Math.round(window.innerHeight);

            // game.scale.canvas.width = widthDPR;
            // game.scale.canvas.height = heightDPR;

            // game.scale.canvas.style.width = Math.round(window.innerWidth) + "px";
            // game.scale.canvas.style.height = Math.round(window.innerHeight) + "px";

            // game.scale.setGameSize(widthDPR, heightDPR);
            // game.scale.setParentSize(window.innerWidth, window.innerHeight);
        }, 100);
    }
}

window.onresize = () => sizeChanged();

// alert(window.devicePixelRatio);
