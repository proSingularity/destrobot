import { Types } from "phaser";
import { DEV } from "./dev-config";
import { LoadingScene } from "./scenes/LoadingScene";

interface IPlugin {
    key: string;
    plugin: any;
}
const isPlugin = (x: false | IPlugin): x is IPlugin => !!x;
const DebugPlugins = [
    !!DEV.enableSceneWatcher && {
        key: "SceneWatcher",
        plugin: require("phaser-plugin-scene-watcher"),
    },
].filter(isPlugin);

export const gameConfig: Types.Core.GameConfig = {
    scene: LoadingScene,
    type: Phaser.AUTO,
    dom: {
        createContainer: true,
    },
    scale: {
        parent: "game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1600,
        height: 900,
        fullscreenTarget: "game",
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
    render: {
        pixelArt: true,
    },
    plugins: {
        global: [...DebugPlugins],
    },
    callbacks: {
        postBoot: game => {
            if (DEV.enableSceneWatcher) {
                (game.plugins.get("SceneWatcher") as any).watchAll();
            }
        },
    },
};
