import { Physics, Scene } from "phaser";
import { EventType } from "../../events/EventType";
import { Bullet } from "../Bullet";
import { IWeapon } from "../IWeapon";

interface IWeaponConfig {
    name: string;
    texture: string;
    cooldown: number;
    magazine: number;
    reloadTime: number;
    fireSoundKey: string;
}

const RELOAD_SOUND_LENGTH = 350;

export class Weapon implements IWeapon {
    public readonly name: string;
    public readonly texture: string;
    private onCooldown = false;
    private reloading = false;
    private cooldown: number;
    private bulletSpeed: number;
    private ttl: number;
    private damage: number;
    private bulletTexture: string;
    private magazine: number;
    private bulletsLeftInMagazine: number;
    private reloadTime: number;
    private fireSoundKey: string;

    constructor(
        private scene: Scene,
        private bullets: Physics.Arcade.Group,
        cfg: IWeaponConfig & {
            bulletSpeed: number;
            damage: number;
            ttl: number;
            bulletTexture: string;
        }
    ) {
        this.texture = cfg.texture;
        this.cooldown = cfg.cooldown;
        this.bulletSpeed = cfg.bulletSpeed;
        this.ttl = cfg.ttl;
        this.damage = cfg.damage;
        this.name = cfg.name;
        this.bulletTexture = cfg.bulletTexture;
        this.magazine = cfg.magazine;
        this.reloadTime = cfg.reloadTime;
        this.bulletsLeftInMagazine = cfg.magazine;
        this.fireSoundKey = cfg.fireSoundKey;
    }

    public reload() {
        this.reloading = true;
        setTimeout(
            () => this.scene.sound.play("weapon-loaded"),
            this.reloadTime - RELOAD_SOUND_LENGTH
        );
        setTimeout(() => {
            this.reloading = false;
            this.bulletsLeftInMagazine = this.magazine;
            this.scene.events.emit(EventType.WeaponReloaded);
        }, this.reloadTime);
    }

    public fire(pos: Phaser.Math.Vector2, dir: Phaser.Math.Vector2) {
        if (this.onCooldown || this.reloading) {
            return;
        }
        if (this.bulletsLeftInMagazine <= 0) {
            this.scene.sound.play("empty-magazine");
            this.setCooldown();
            return;
        }
        this.scene.sound.play(this.fireSoundKey);
        const bullet = new Bullet(this.scene, {
            pos,
            vel: dir,
            speed: this.bulletSpeed,
            ttl: this.ttl,
            damage: this.damage,
            texture: this.bulletTexture,
        });
        this.bullets.add(bullet);
        bullet.create();

        this.bulletsLeftInMagazine--;
        this.scene.events.emit(EventType.WeaponFired);
        this.setCooldown();
    }

    private setCooldown() {
        this.onCooldown = true;
        setTimeout(() => {
            this.onCooldown = false;
        }, this.cooldown);
    }
}
