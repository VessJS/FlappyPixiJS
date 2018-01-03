//Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;

//Create a Pixi Application
let app = new Application({
        width: 320,
        height: 500,
        antialias: true,
        transparent: false,
        resolution: 1
    }
);
document.body.appendChild(app.view);
// KLAWIATURA
function keyboard(keyCode) {
    let key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = event => {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}

// LOADER
loader
    .add([
        "assets/sprites/bluebird-midflap.png",
        "assets/sprites/base.png",
    ])
    .load(setup);

// SETUP
let bird, base, state;

function setup() {
    bird = new Sprite(resources["assets/sprites/bluebird-midflap.png"].texture);
    let base = new Sprite (resources["assets/sprites/base.png"].texture);

    // POSITIONING
    bird.x = 90;
    bird.y = 90;
    base.y = 390;
    app.stage.addChild(bird, base);

    let left = keyboard(37),
        up = keyboard(38),
        right = keyboard(39),
        down = keyboard(40);

    //Up
    up.press = () => {
        bird.y = 90;
        bird.x = 90;
    };
    // up.release = () => {
    //     if (!down.isDown && bird.vx === 0) {
    //         bird.y = 0;
    //     }
    // };

    state = play;

    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){

    //Update the current game state:
    state(delta);
}

function play(delta){

    bird.y += 3;
}

