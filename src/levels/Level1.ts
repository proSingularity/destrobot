export const Level1 = {
    map: {
        key: "map",
        tilesetName: "scifi-tileset",
        tilesetKey: "tiles",
        layers: [
            {
                layerID: "ground",
                collidePlayer: false,
                collideEnemies: false,
                collideBullets: false,
            },
            {
                layerID: "walls",
                collidePlayer: true,
                collideEnemies: true,
                collideBullets: true,
                collisionProperty: "blocking", // set as custom property in tiled
            },
        ],
    },
    weapons: [
        {
            name: "Pistol",
            damage: 3,
            bulletSpeed: 500,
            ttl: 300,
            cooldown: 300,
            texture: "pistol",
            scale: 1,
            pickUpScale: 0.5,
            bulletTexture: "bullet2",
            magazine: 8,
            reloadTime: 500,
            fireSoundKey: "sniper-rifle-shot",
        },
        {
            name: "Machine Gun",
            damage: 1,
            bulletSpeed: 500,
            ttl: 200,
            cooldown: 100,
            texture: "machine-gun",
            scale: 1,
            pickUpScale: 0.25,
            bulletTexture: "bullet",
            magazine: 20,
            reloadTime: 800,
            fireSoundKey: "sniper-rifle-shot",
        },
        {
            name: "Sniper Rifle",
            damage: 10,
            bulletSpeed: 1000,
            ttl: 1000,
            cooldown: 500,
            texture: "sniper-rifle",
            scale: 1,
            pickUpScale: 0.25,
            bulletTexture: "bullet",
            magazine: 5,
            reloadTime: 1000,
            fireSoundKey: "sniper-rifle-shot",
        },
    ],
    player: {
        x: 250,
        y: 500,
        health: 4,
        maxHealth: 4,
        hitInvicibilityTimeout: 800,
        hitFreezeTimeout: 100,
        texture: "player",
        scale: 2,
        speed: 200,
    },
    enemies: [
        {
            name: "Robot",
            damage: 1,
            texture: "robot",
            dropFrequency: 10, // on average, one in dropFrequency kills will drop something
            health: 5,
            speed: 125,
            scale: 1,
            score: 10,
        },
        {
            name: "FastBot2k",
            damage: 1,
            texture: "robot",
            dropFrequency: 10, // on average, one in dropFrequency kills will drop something
            health: 1,
            speed: 220,
            scale: 1,
            score: 10,
            tint: "#0000FF", // blue
        },
        {
            name: "Megabot",
            damage: 2,
            texture: "robot",
            dropFrequency: 2,
            health: 20,
            speed: 50,
            scale: 3,
            score: 30,
        },
    ],
    spawners: [
        {
            type: "Robot",
            x: 250,
            y: 1275,
            enemiesPerWave: 5,
            waveTimeout: 3000,
            maxConcurrentEnemies: 10,
        },
        {
            type: "Robot",
            x: 1250,
            y: 600,
            enemiesPerWave: 2,
            waveTimeout: 3000,
            maxConcurrentEnemies: 4,
        },
        {
            type: "FastBot2k",
            x: 1250,
            y: 600,
            enemiesPerWave: 3,
            waveTimeout: 3000,
            maxConcurrentEnemies: 9,
        },
        {
            type: "Megabot",
            x: 1370,
            y: 1300,
            enemiesPerWave: 1,
            waveTimeout: 3000,
            maxConcurrentEnemies: 3,
        },
    ],
};
