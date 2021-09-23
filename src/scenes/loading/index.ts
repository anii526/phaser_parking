import { Scene } from "phaser";
export class LoadingScene extends Scene {
    private car: Phaser.GameObjects.Container | undefined;
    private physicsContainer: Phaser.Physics.Matter.Image | undefined;
    // private physicsContainer: Phaser.Physics.Matter.Image | undefined;
    private carSpeed = 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private wasd: any;
    private king: any;
    private shapes = {
        triangle: [
            [
                { x: 99, y: 79 },
                { x: 77, y: 118 },
                { x: 124, y: 118 },
            ],
        ],
    };

    private flag = 0;
    constructor() {
        super("loading-scene");
    }
    preload(): void {
        this.load.baseURL = "src/assets/";

        this.load.image("bg", "bg1.jpg");
        this.load.image("car", "c6_3.png");
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

        const body = this.add.sprite(0, 0, "car");

        this.car = this.add.container(200, 200);
        this.car.setSize(body.width, body.height);

        this.car.add(body);

        const whellR = this.add.sprite(0, 0, "car_wheel");
        this.car.add(whellR);
        const whellL = this.add.sprite(0, 0, "car_wheel");
        this.car.add(whellL);

        this.physicsContainer = this.matter.add.image(300, 300, "car");

        // this.physicsContainer = this.matter.add.gameObject(this.car) as Phaser.Physics.Matter.Image;
        // this.physicsContainer.setAngularVelocity(0.01);
        // physicsContainer.applyForceFrom()
        // this.physicsContainer.rotation = Math.PI / 2;
        this.physicsContainer.body.mass = 300;

        this.king = this.add.sprite(200, 200, "king");

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
            //   this.car.wheel_r.angle = this.car.wheel_l.angle;
            // if (this.wasd.left.isDown && this.wheel_left) {
            //     this.car.wheel_l.angle > -40 && (this.car.wheel_l.angle = this.car.wheel_r.angle -= 2);
            // }
            // //     : (this.cursors.right.isDown && !this.missionMessage) ||
            // if (this.wasd.right.isDown && this.wheel_right) {
            //     this.car.wheel_l.angle < 40 && (this.car.wheel_l.angle = this.car.wheel_r.angle += 2);
            // }
            // this.car.wheel_l.angle *= 0.92,
            //       this.car.wheel_l.angle <= 3 && this.car.wheel_l.angle >= -3 && (this.car.wheel_l.angle = 0),
            //       (this.car.wheel_r.angle = this.car.wheel_l.angle)),

            if (this.wasd.up.isDown) {
                console.log(this.wasd.up.isDown);
                this.carSpeed += this.carSpeed < 0.01 ? 0.001 : 0;
                // this.carSpeed = 0.001;
            }
            if (this.wasd.down.isDown) {
                console.log(this.wasd.up.isDown);
                this.carSpeed += this.carSpeed > -0.01 ? -0.001 : 0;
                // this.carSpeed = 0.001;
            }
            // if(this.wasd.down.isDown){
            //     this.carSpeed += this.carSpeed > -2.8 ? (this.carSpeed > 0.3 ? -0.3 : -0.1) : 0;
            // }
            // if (this.carSpeed <= -0.1) this.carSpeed += 0.1;
            // if (this.carSpeed >= 0.1) this.carSpeed -= 0.1;
            // if (this.carSpeed > -0.1 && this.carSpeed < 0.1) this.carSpeed = 0;
            //     this.car.body.rotation +=
            //         ((this.car.wheel_l.angle * this.carSpeed) / this.car.wheel_l.x) * 0.017453292519;
            let g = 0;
            // g = this.car.body.rotation + this.car.wheel_l.rotation;
            g = this.physicsContainer.rotation + Math.PI / 2;
            const h = this.carSpeed * Math.cos(g);
            const i = this.carSpeed * Math.sin(g);
            const j = new Phaser.Math.Vector2(h, i);
            let k = new Phaser.Math.Vector2();
            k.x = 1;
            k.y = 0;
            const l = Math.cos(g);
            const m = Math.sin(g);
            k = new Phaser.Math.Vector2(l * k.x - m * k.y, m * k.x + l * k.y);
            const n = k.dot(j);
            j.x = k.x * n;
            j.y = k.y * n;

            // j.x = 0.01;
            // j.y = 0.01;

            this.physicsContainer.applyForceFrom(
                new Phaser.Math.Vector2(this.physicsContainer.x, this.physicsContainer.y),
                new Phaser.Math.Vector2(j.x, j.y)
            );

            this.king.x += Math.cos(this.king.rotation) * this.carSpeed;
            this.king.y += Math.sin(this.king.rotation) * this.carSpeed;
        }
    }
}
