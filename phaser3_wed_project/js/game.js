class Example extends Phaser.Scene
{
    preload ()
    {
        this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('backdrop', 'assets/pics/platformer-backdrop.png');
        this.load.image('cannon_head', 'assets/tests/timer/cannon_head.png');
        this.load.image('cannon_body', 'assets/tests/timer/cannon_body.png');
        this.load.spritesheet('chick', 'assets/sprites/chick.png', { frameWidth: 16, frameHeight: 18 });
    }

    create ()
    {
        this.anims.create({ key: 'fly', frames: this.anims.generateFrameNumbers('chick', [ 0, 1, 2, 3 ]), frameRate: 5, repeat: -1 });

        this.add.image(320, 256, 'backdrop').setScale(2);

        const cannonHead = this.add.image(130, 416, 'cannon_head').setDepth(1);
        const cannon = this.add.image(130, 464, 'cannon_body').setDepth(1);
        const chick = this.physics.add.sprite(cannon.x, cannon.y - 50, 'chick').setScale(2);
        const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });
        const line = new Phaser.Geom.Line();

        chick.disableBody(true, true);

        let angle = 0;

        this.input.on('pointermove', (pointer) =>
        {
            angle = Phaser.Math.Angle.BetweenPoints(cannon, pointer);
            cannonHead.rotation = angle;
            Phaser.Geom.Line.SetToAngle(line, cannon.x, cannon.y - 50, angle, 128);
            graphics.clear().strokeLineShape(line);
        });

        this.input.on('pointerup', () =>
        {
            chick.enableBody(true, cannon.x, cannon.y - 50, true, true);
            chick.play('fly');
            this.physics.velocityFromRotation(angle, 600, chick.body.velocity);
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 540,
    height: 960,
    parent: 'phaser-example',
    pixelArt: true,
	scale: {
    mode: Phaser.Scale.FIT,       // 화면 비율 유지 (Fit 방식)
    autoCenter: Phaser.Scale.CENTER_BOTH, // 화면 중앙 정렬
    min: {
      width: 540, // 최소 너비
      height: 960 // 최소 높이
    },
    max: {
      width: 1080, // 최대 너비
      height: 1920 // 최대 높이
    }
	},
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 }
        }
    },
    scene: Example
};

const game = new Phaser.Game(config);