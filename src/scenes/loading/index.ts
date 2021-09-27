import { Scene } from "phaser";
export class LoadingScene extends Scene {
    private car: Phaser.GameObjects.Container | undefined;
    private physicsContainer: Phaser.Physics.Matter.Image | undefined;
    // private physicsContainer: Phaser.Physics.Matter.Image | undefined;
    private carSpeed = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private wasd: any;
    // private king: any;
    private whellR!: Phaser.GameObjects.Sprite;
    private whellL!: Phaser.GameObjects.Sprite;
    constructor() {
        super("loading-scene");
    }
    preload(): void {
        this.load.baseURL = "src/assets/";

        this.load.image("bg", "bg1.jpg");
        this.load.image("car", "car_red.png");
        this.load.image("king", "sprites/king.png");
        this.load.image("bkg_pattern", "bkg_pattern.png");
        this.load.image("car_wheel", "car_wheel.png");
    }
    create(): void {
        this.carSpeed = 0;
        console.log("123");
        this.matter.world.setBounds(0, 0, 1000, 1000);

        // this.add.sprite(0, 0, "bg").setOrigin(0, 0);
        // this.add.sprite(100, 100, "king");
        // this.add.sprite(200, 200, "car");
        // this.add.tileSprite(500, 500, 1000, 1000, "bkg_pattern");

        const body = this.add.sprite(50, 0, "car");

        this.car = this.add.container(200, 200);
        this.car.setSize(body.width * 0.45, body.height * 0.8);

        this.car.add(body);

        this.whellR = this.add.sprite(0, 0, "car_wheel");
        this.car.add(this.whellR);

        this.whellL = this.add.sprite(0, 0, "car_wheel");
        this.car.add(this.whellL);

        // this.physicsContainer = this.matter.add.image(-47, -47, "car");

        this.physicsContainer = this.matter.add.gameObject(this.car) as Phaser.Physics.Matter.Image;
        // this.physicsContainer.setAngularVelocity(0.01);
        // physicsContainer.applyForceFrom()
        // this.physicsContainer.rotation = Math.PI / 2;
        this.physicsContainer.body.mass = 300;
        // this.physicsContainer.;
        // this.physicsContainer.set;

        // this.king = this.add.sprite(200, 200, "king");

        this.wasd = {
            up: this.input.keyboard.addKey("W"),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        };
    }
    update(): void {
        // console.log(Math.random());
        if (this.physicsContainer) {
            this.physicsContainer.setAngularVelocity(0);
            this.physicsContainer.setVelocity(0);
            this.whellR.angle = this.whellL.angle;
            if (this.wasd.left.isDown && this.whellL) {
                this.whellL.angle > -38 && (this.whellL.angle = this.whellL.angle -= 3);
            }
            // //     : (this.cursors.right.isDown && !this.missionMessage) ||
            if (this.wasd.right.isDown && this.whellR) {
                this.whellL.angle < 38 && (this.whellL.angle = this.whellR.angle += 3);
            }
            this.whellL.angle *= 0.92;
            if (this.whellL.angle <= 2 && this.whellL.angle >= -2) {
                this.whellL.angle = 0;
            }
            this.whellR.angle = this.whellL.angle;

            if (this.wasd.up.isDown) {
                console.log(this.wasd.up.isDown);
                this.carSpeed += this.carSpeed < 20 ? 0.08 : 0;
                // this.carSpeed = 0.001;
            }
            if (this.wasd.down.isDown) {
                console.log(this.wasd.up.isDown);
                this.carSpeed += this.carSpeed > -20 ? -0.08 : 0;
                // this.carSpeed = 0.001;
            }
            this.physicsContainer.rotation += ((this.whellL.angle * this.carSpeed) / 90) * 0.017453292519;
            let g = 0;
            g = this.physicsContainer.rotation + this.whellL.rotation;
            // g = this.physicsContainer.rotation;
            const h = this.carSpeed * Math.cos(g);
            const i = this.carSpeed * Math.sin(g);
            const j = new Phaser.Math.Vector2(h, i);
            let k = new Phaser.Math.Vector2();
            k.x = 1;
            k.y = 0;
            const l = Math.cos(this.physicsContainer.rotation);
            const m = Math.sin(this.physicsContainer.rotation);
            k = new Phaser.Math.Vector2(l * k.x - m * k.y, m * k.x + l * k.y);
            const n = k.dot(j);
            j.x = k.x * n;
            j.y = k.y * n;

            this.physicsContainer.applyForceFrom(
                new Phaser.Math.Vector2(this.physicsContainer.x, this.physicsContainer.y),
                new Phaser.Math.Vector2(j.x, j.y)
            );
            this.carSpeed *= 0.9;

            // this.king.x += Math.cos(this.king.rotation) * this.carSpeed;
            // this.king.y += Math.sin(this.king.rotation) * this.carSpeed;
        }
    }
}
