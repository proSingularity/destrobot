import { Math, Physics, Scene } from "phaser";
import { IPoint } from "../utils/IPoint";

export class Bullet extends Physics.Arcade.Sprite {
    public readonly damage: number;

    constructor(
        scene: Scene,
        private cfg: {
            pos: IPoint;
            vel: Math.Vector2;
            ttl: number;
            speed: number;
            damage: number;
        }
    ) {
        super(scene, cfg.pos.x, cfg.pos.y, "bullet");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.damage = cfg.damage;
    }

    public create() {
        this.setActive(true);
        const vel = this.cfg.vel.normalize().scale(this.cfg.speed);
        this.setVelocity(vel.x, vel.y);
        this.setRotation(vel.angle());
        this.setBounce(1);
        setTimeout(() => this.destroy(), this.cfg.ttl);
    }

    public setHit() {
        this.setActive(false);
        this.disableBody();
    }
}
