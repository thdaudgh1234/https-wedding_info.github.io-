class Example extends Phaser.Scene {
    preload() {
        this.load.setBaseURL('https://thdaudgh1234.github.io/https-wedding_info.github.io-/phaser3_wed_project/');
        this.load.image('backdrop', 'assets/540x960_bg.png');
        this.load.image('cannon_head', 'assets/100x100_head.png');
        this.load.image('cannon_body', 'assets/100x100_body.png');
        this.load.image('goal', 'assets/100x100_goal.png');
        this.load.spritesheet('chick', 'assets/100x100_bullet.png', { frameWidth: 100, frameHeight: 100 });
    }

    create() {
        this.anims.create({ key: 'fly', frames: this.anims.generateFrameNumbers('chick', [0]), frameRate: 1, repeat: -1 });

        this.add.image(0, 0, 'backdrop').setOrigin(0, 0);

        const goal = this.physics.add.staticImage(this.scale.width / 2 + 50, this.scale.height / 3 - 80, 'goal').setDepth(1);

        const cannonHead = this.add.image(this.scale.width / 2, this.scale.height - 50, 'cannon_head').setDepth(1);
        const cannon = this.add.image(this.scale.width / 2, this.scale.height, 'cannon_body').setDepth(0);

        const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });

        let angle = 0;

        // 물리 세계 경계 설정 (화면 크기)
        this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height);

        // 발사체 그룹 생성
        const chicks = this.physics.add.group({
            defaultKey: 'chick',
            maxSize: 1, // 한 번에 한 발만 활성화
        });

        // 포인터 이동 시 대포와 조준선 업데이트
        this.input.on('pointermove', (pointer) => {
            angle = Phaser.Math.Angle.BetweenPoints(cannonHead, pointer);
            cannonHead.rotation = angle;

            const shaftLength = 128;
            const endX = cannonHead.x + Math.cos(angle) * shaftLength;
            const endY = cannonHead.y + Math.sin(angle) * shaftLength;

            const arrowHead = new Phaser.Geom.Triangle(
                endX, endY,
                endX - Math.cos(angle - Math.PI / 2) * 15 - Math.cos(angle) * 30,
                endY - Math.sin(angle - Math.PI / 2) * 15 - Math.sin(angle) * 30,
                endX - Math.cos(angle + Math.PI / 2) * 15 - Math.cos(angle) * 30,
                endY - Math.sin(angle + Math.PI / 2) * 15 - Math.sin(angle) * 30
            );

            graphics.clear();
            graphics.lineStyle(2, 0xffffff);
            graphics.beginPath();
            graphics.moveTo(cannonHead.x, cannonHead.y);
            graphics.lineTo(endX, endY);
            graphics.strokePath();
            graphics.fillStyle(0xffffff);
            graphics.fillTriangleShape(arrowHead);
        });

        // 포인터 클릭 시 발사
        this.input.on('pointerup', () => {
            const chick = chicks.get(cannon.x, cannon.y - 100); // 그룹에서 발사체 가져오기
            if (chick) {
                chick.setActive(true);
                chick.setVisible(true);
                chick.setScale(1);
                chick.body.setVelocity(0, 0); // 초기 속도 리셋
                chick.body.enable = true; // 물리 활성화
                chick.body.collideWorldBounds = true; // 화면 경계 충돌 활성화
                chick.body.bounce.set(1, 0); // X축 반사 활성화, Y축 반사 비활성화
                chick.play('fly'); // 애니메이션 재생

                // 발사 방향 속도 설정
                this.physics.velocityFromRotation(angle, 1200, chick.body.velocity);
            }
        });

        // 충돌 감지 설정
        this.physics.add.collider(chicks, goal, (chick, goal) => {
            // 물리 동작 멈춤 (게임 정지)
            this.physics.pause();

            // Clear 메시지 표시
            this.add.text(this.scale.width / 2, this.scale.height / 2, 'Clear!', {
                fontSize: '48px',
                color: '#ffffff',
            }).setOrigin(0.5);

            // Next 버튼 추가
            const nextButton = this.add.text(this.scale.width / 2, this.scale.height / 2 + 100, 'Next', {
                fontSize: '32px',
                color: '#00ff00',
                backgroundColor: '#000000',
                padding: { x: 10, y: 10 },
            })
                .setOrigin(0.5)
                .setInteractive(); // 버튼 클릭 가능하도록 설정

            // Next 버튼 클릭 이벤트
            nextButton.on('pointerup', () => {
                window.location.href = 'https://thdaudgh1234.github.io/https-wedding_info.github.io-/wedding_site/wedding_site4.html';
            });
        });

        this.chicks = chicks; // 업데이트 메서드에서 사용하기 위해 저장
    }

    update() {
        // 발사체가 하단 경계를 넘었는지 확인
        this.chicks.children.iterate((chick) => {
            if (chick.active && chick.y >= this.scale.height - 50) {
                // 엉덩방아 애니메이션
                this.tweens.add({
                    targets: chick,
                    scaleX: 1.5,
                    scaleY: 1.5,
                    yoyo: true,
                    duration: 300,
                    onComplete: () => {
                        chick.body.setGravityY(500); // 중력을 다시 설정
                    },
                });
                // 객체가 하단 화면 밖으로 나가면 제거
                if (chick.y > this.scale.height + 100) {
                    chick.setActive(false); // 그룹에서 비활성화
                    chick.setVisible(false); // 화면에서 제거
                    chick.body.stop(); // 속도 멈춤
                    chick.body.enable = false; // 물리 비활성화
                }
            }
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
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: { width: 540, height: 960 },
        max: { width: 1080, height: 1920 },
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false,
        },
    },
    scene: Example,
};

const game = new Phaser.Game(config);
