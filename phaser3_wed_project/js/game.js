class Example extends Phaser.Scene
{
    preload ()
    {
        this.load.setBaseURL('https://thdaudgh1234.github.io/https-wedding_info.github.io-/phaser3_wed_project/');
        this.load.image('backdrop', 'assets/540x960_bg.png');
        this.load.image('cannon_head', 'assets/100x100_head.png');
        this.load.image('cannon_body', 'assets/100x100_body.png');
        this.load.spritesheet('chick', 'assets/100x100_bullet.png', { frameWidth: 100, frameHeight: 100 });
    }

    create ()
    {
        this.anims.create({ key: 'fly', frames: this.anims.generateFrameNumbers('chick', [ 0 ]), frameRate: 1, repeat: -1 });
		//this.anims.create({ key: 'fly', frames: this.anims.generateFrameNumbers('chick', [ 0, 1, 2, 3 ]), frameRate: 5, repeat: -1 });

        //this.add.image(0, 0, 'backdrop').setScale(1);
		this.add.image(0, 0, 'backdrop').setOrigin(0, 0);

        const cannonHead = this.add.image(this.scale.width / 2, this.scale.height / 3 - 80, 'cannon_head').setDepth(1);
        const cannon = this.add.image(this.scale.width / 2, this.scale.height / 3, 'cannon_body').setDepth(0);
        const chick = this.physics.add.sprite(cannon.x, cannon.y - 50, 'chick').setScale(1);
        const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });
        const line = new Phaser.Geom.Line();

        chick.disableBody(true, true);

        let angle = 0;
		
		// 발사체 그룹 생성
		const chicks = this.physics.add.group({
			defaultKey: 'chick', // 기본 이미지 키
			maxSize: 10000,         // 최대 발사체 수
		});

		/*
        this.input.on('pointermove', (pointer) =>
        {
            angle = Phaser.Math.Angle.BetweenPoints(cannon, pointer);
            cannonHead.rotation = angle;
            Phaser.Geom.Line.SetToAngle(line, cannon.x, cannon.y - 50, angle, 128);
            graphics.clear().strokeLineShape(line);
        });
*/
		this.input.on('pointermove', (pointer) => {
			angle = Phaser.Math.Angle.BetweenPoints(cannon, pointer);
			cannonHead.rotation = angle;

			const shaftLength = 128; // 화살표 몸통 길이
			const arrowHeight = 30;  // 화살표 머리 높이
			const arrowWidth = 30;   // 화살표 머리 밑변 너비

			const endX = cannon.x + Math.cos(angle) * shaftLength;
			const endY = cannon.y + Math.sin(angle) * shaftLength;

			const arrowHead = new Phaser.Geom.Triangle(
				endX, endY,
				endX - Math.cos(angle - Math.PI / 2) * arrowWidth / 2 - Math.cos(angle) * arrowHeight,
				endY - Math.sin(angle - Math.PI / 2) * arrowWidth / 2 - Math.sin(angle) * arrowHeight,
				endX - Math.cos(angle + Math.PI / 2) * arrowWidth / 2 - Math.cos(angle) * arrowHeight,
				endY - Math.sin(angle + Math.PI / 2) * arrowWidth / 2 - Math.sin(angle) * arrowHeight
			);

			graphics.clear();
			graphics.lineStyle(2, 0xffffff);
			graphics.beginPath();
			graphics.moveTo(cannon.x, cannon.y);
			graphics.lineTo(endX, endY);
			graphics.strokePath();
			graphics.fillStyle(0xffffff);
			graphics.fillTriangleShape(arrowHead);
		});

		// 포인터 클릭 시 발사
		this.input.on('pointerup', () => {
			const chick = chicks.get(cannon.x, cannon.y - 150); // 그룹에서 발사체 가져오기
			if (chick) {
				chick.setActive(true);
				chick.setVisible(true);
				chick.setScale(1);
				chick.body.setVelocity(0, 0); // 초기 속도 리셋
				chick.body.enable = true; // 물리 활성화
				chick.play('fly'); // 애니메이션 재생

				// 발사 방향 속도 설정
				this.physics.velocityFromRotation(angle, 600, chick.body.velocity);
			}
		});
		/*
        this.input.on('pointerup', () =>
        {
            chick.enableBody(true, cannon.x, cannon.y - 150, true, true);
            chick.play('fly');
            this.physics.velocityFromRotation(angle, 600, chick.body.velocity);
        });
		*/
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
            gravity: { y: 500 }
        }
    },
    scene: Example
};

const game = new Phaser.Game(config);