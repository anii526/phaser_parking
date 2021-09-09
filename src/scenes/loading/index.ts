import { Scene } from "phaser";
export class LoadingScene extends Scene {
    constructor() {
        super("loading-scene");
    }
    preload(): void {
        this.load.baseURL = "src/assets/";

        this.load.image("king", "sprites/king.png");
        this.load.image("bg", "bg1.jpg");
        this.load.image("car", "c6_3.png");
    }
    create(): void {
        console.log("123");
        this.matter.world.setBounds(0, 0, 1000, 1000);

        // this.add.sprite(0, 0, "bg").setOrigin(0, 0);
        // this.add.sprite(100, 100, "king");
        // this.add.sprite(200, 200, "car");
        this.matter.add.image(200, 200, "car");
    }
}
