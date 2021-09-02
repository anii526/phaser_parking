import { Scene } from "phaser";
export class LoadingScene extends Scene {
    constructor() {
        super("loading-scene");
    }
    preload(): void {
        this.load.baseURL = "src/assets/";

        this.load.image("king", "sprites/king.png");
    }
    create(): void {
        this.add.sprite(100, 100, "king");
    }
}
