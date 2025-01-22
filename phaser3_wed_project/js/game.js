class Example extends Phaser.Scene {

	constructor() {
        super();
        this.isGameStarted = false; // 게임 시작 상태 플래그
    }

    preload() {
        this.load.setBaseURL('https://thdaudgh1234.github.io/https-wedding_info.github.io-/phaser3_wed_project/');
        this.load.image('backdrop', 'assets/540x960_bg.png');
        this.load.image('cannon_head', 'assets/100x100_head.png');
        this.load.image('cannon_body', 'assets/100x100_body.png');
        this.load.image('goal', 'assets/50x54_goal.png');
        this.load.spritesheet('bullet', 'assets/50x54_bullet.png', { frameWidth: 50, frameHeight: 54 });

		this.load.spritesheet('effect_1', 'assets/effects/Effect_1.png', { frameWidth: 32, frameHeight: 32 });

		this.load.spritesheet('effect_shatter_1', 'assets/effects/Effect_Shatter_1.png', { frameWidth: 96, frameHeight: 96 });
		this.load.spritesheet('effect_shatter_2', 'assets/effects/Effect_Shatter_2.png', { frameWidth: 96, frameHeight: 96 });
		this.load.spritesheet('effect_shatter_3', 'assets/effects/Effect_Shatter_3.png', { frameWidth: 96, frameHeight: 96 });
		this.load.spritesheet('effect_shatter_4', 'assets/effects/Effect_Shatter_4.png', { frameWidth: 96, frameHeight: 96 });
		this.load.spritesheet('effect_shatter_5', 'assets/effects/Effect_Shatter_5.png', { frameWidth: 96, frameHeight: 96 });

		this.load.image('wall', 'assets/100x24_wall.png');
		this.load.image('wall_fail', 'assets/100x24_wall.png');
		this.load.image('particle', 'assets/effects/10x10_effect.png'); // 파티클 이미지

    }


	create() {
		// 뒷배경 설정
		const backdrop = this.add.image(0, 0, 'backdrop').setOrigin(0.5, 0.5);
		backdrop.setPosition(this.scale.width / 2, this.scale.height / 2);
		backdrop.setDisplaySize(this.scale.width, this.scale.height);

		// 검은 음영 추가
		const overlay = this.add.rectangle(
			this.scale.width / 2,
			this.scale.height / 2,
			this.scale.width,
			this.scale.height,
			0x000000,
			0.5 // 투명도 설정
		);

		// "신랑을 신부와 만나게 해주세요" 문구
		const message = this.add.text(
			this.scale.width / 2,
			this.scale.height / 2 - 100,
			'신랑을 신부와 만나게 해주세요',
			{
				fontSize: '32px',
				color: '#ffffff',
				fontFamily: 'Arial',
			}
		).setOrigin(0.5);

		// "터치해서 시작하기" 문구
		const touchToStart = this.add.text(
			this.scale.width / 2,
			this.scale.height - 150,
			'터치해서 시작하기',
			{
				fontSize: '24px',
				color: '#ffffff',
				fontFamily: 'Arial',
			}
		).setOrigin(0.5);

		// 글자 애니메이션 (커졌다 작아지는 효과)
		this.tweens.add({
			targets: touchToStart,
			scaleX: 1.2,
			scaleY: 1.2,
			duration: 1000,
			yoyo: true,
			repeat: -1, // 무한 반복
			ease: 'Sine.easeInOut',
		});

		// 화면 터치 이벤트
        this.input.on('pointerdown', () => {
            if (this.isGameStarted) {
                return; // 게임이 이미 시작된 경우 터치 이벤트 무시
            }

            this.isGameStarted = true; // 게임 시작 플래그 설정

            // 검은 음영 및 텍스트 제거
            overlay.destroy();
            message.destroy();
            touchToStart.destroy();

            // 게임 시작 로직 호출
            this.startGame();
        });

	}




    startGame() {
		
		
		this.scale.lockOrientation('portrait');

        this.anims.create({ key: 'fly', frames: this.anims.generateFrameNumbers('bullet', [0]), frameRate: 1, repeat: -1 });

		this.anims.create({ key: 'effect_1', frames: this.anims.generateFrameNumbers('effect_1'), frameRate: 30, repeat: 0 });

		this.anims.create({ key: 'effect_shatter_1', frames: this.anims.generateFrameNumbers('effect_shatter_1'), frameRate: 60, repeat: 0 });
		this.anims.create({ key: 'effect_shatter_2', frames: this.anims.generateFrameNumbers('effect_shatter_2'), frameRate: 60, repeat: 0 });
		this.anims.create({ key: 'effect_shatter_3', frames: this.anims.generateFrameNumbers('effect_shatter_3'), frameRate: 60, repeat: 0 });
		this.anims.create({ key: 'effect_shatter_4', frames: this.anims.generateFrameNumbers('effect_shatter_4'), frameRate: 60, repeat: 0 });
		this.anims.create({ key: 'effect_shatter_5', frames: this.anims.generateFrameNumbers('effect_shatter_5'), frameRate: 60, repeat: 0 });

        //this.add.image(0, 0, 'backdrop').setOrigin(0, 0);
		const backdrop = this.add.image(0, 0, 'backdrop');
		backdrop.setOrigin(0.5, 0.5); // 중심점을 이미지의 중앙으로 설정
		backdrop.setPosition(this.scale.width / 2, this.scale.height / 2); // 화면 중앙으로 이동
		backdrop.setDisplaySize(this.scale.width, this.scale.height);
		
		// 바닥 생성
		const floor = this.physics.add.staticImage(this.scale.width / 2, this.scale.height, 'wall_fail') // wall_fail 이미지를 바닥으로 사용
			.setOrigin(0.5, 1.0) // 하단 중심 기준으로 설정
			.setDisplaySize(this.scale.width, 10) // 바닥의 너비를 화면 크기로 설정
			.refreshBody(); // 물리 엔진에 업데이트

		// 비율 유지하며 화면 크기에 맞춤
		const scaleX = this.scale.width / backdrop.width;
		const scaleY = this.scale.height / backdrop.height;
		const scale = Math.max(scaleX, scaleY); // 비율 유지
		backdrop.setScale(scale);

		// 목표지점 랜덤위치 생성
        const goal = this.physics.add.staticImage(
			Phaser.Math.Between(100, this.scale.width - 100), // x 좌표 범위: 100 ~ this.scale.width - 100
			Phaser.Math.Between(this.scale.height / 3 - 150, this.scale.height / 3 - 50), // y 좌표 범위: this.scale.height / 3 - 150 ~ this.scale.height / 3 - 50
			'goal'
		).setDepth(1);

        const cannonHead = this.add.image(this.scale.width / 2, this.scale.height - 30, 'cannon_head').setDepth(1);
		cannonHead.setOrigin(0.5, 1);

        const cannon = this.add.image(this.scale.width / 2, this.scale.height, 'cannon_body').setDepth(0);
		cannon.setScale(2);

        //const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });

        let angle = 0;

        // 물리 세계 경계 설정 (화면 크기)
        this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height);

        // 발사체 그룹 생성
        const bullets = this.physics.add.group({
            defaultKey: 'bullet',
            maxSize: 1, // 한 번에 한 발만 활성화
        });
		
		// 벽 그룹 생성
        const walls = this.physics.add.staticGroup();
		
		/*
        // 랜덤 위치에 벽 생성 (cannon_head.y - 100 ~ 천장까지)
        for (let i = 0; i < 5; i++) {
            const x = Phaser.Math.Between(100, this.scale.width - 100);
            const y = Phaser.Math.Between(cannonHead.y - 100, 100);
            walls.create(x, y, 'wall');
        }
		*/

		// 좌우 움직이는 벽 생성 (x 좌표와 y 좌표 설정).
		const movingWall = this.physics.add.staticImage(
			Phaser.Math.Between(100, this.scale.width - 100),
			this.scale.height - this.scale.height / 3 - 100,
			'wall'
		);

		// 움직이는 벽 Tween 설정
		this.tweens.add({
			targets: movingWall,
			x: { from: 100, to: this.scale.width - 100 }, // 좌우 움직임 범위
			ease: 'Sine.easeInOut', // 부드러운 움직임을 위한 이징 함수
			duration: 2000, // 한 번 이동하는 데 걸리는 시간 (밀리초)
			yoyo: true, // 왕복 움직임 활성화
			repeat: -1, // 무한 반복
			onUpdate: () => {
				// 위치 변경 시 충돌 데이터를 갱신
				movingWall.body.updateFromGameObject();
			},
		});
		
		// `walls` 그룹에 `movingWall` 추가
		walls.add(movingWall);

        
		// 임시 벽 객체 생성 후 높이 가져오기
		const tempWall = this.add.image(0, 0, 'wall');
		const wallHeight = tempWall.height; // 벽의 높이 가져오기
		tempWall.destroy(); // 임시 객체 제거

		// goal의 하단에 벽 생성
		walls.create(goal.x, goal.y + goal.height / 2 + wallHeight / 2, 'wall');
		


		const graphics = this.add.graphics({ lineStyle: { width: 2, color: 0xffffff } });

		const shaftLengthStart = 150; // 시작 거리
		const shaftLengthEnd = 200; // 끝 거리
		let shaftLength = shaftLengthStart; // 초기 거리
		let growing = true; // 길이 증가 여부

		const arrowHeight = 30; // 삼각형 높이
		const arrowWidth = 30; // 삼각형 밑변 너비

		// 포인터 각도를 저장
		let angle = 0;

		// 삼각형 애니메이션 (shaftLength 업데이트)
		this.time.addEvent({
			delay: 20, // 20ms 간격으로 업데이트
			loop: true, // 반복 실행
			callback: () => {
				// 길이 증가/감소 로직
				if (growing) {
					shaftLength += 2;
					if (shaftLength >= shaftLengthEnd) growing = false;
				} else {
					shaftLength -= 2;
					if (shaftLength <= shaftLengthStart) growing = true;
				}
			},
		});

		// 포인터 이동 시 각도 업데이트
		this.input.on('pointermove', (pointer) => {
			angle = Phaser.Math.Angle.BetweenPoints(
				{ x: this.scale.width / 2, y: this.scale.height - 70 }, // 대포의 중심점
				{ x: pointer.x, y: pointer.y } // 포인터 위치
			);
		});

		// 매 프레임마다 그래픽 업데이트
		this.events.on('update', () => {
			graphics.clear();
			graphics.lineStyle(2, 0xffffff);

			// 대포 중심점
			const startX = this.scale.width / 2;
			const startY = this.scale.height - 70;

			// 삼각형 위치 계산
			const triangleX = startX + Math.cos(angle) * shaftLength;
			const triangleY = startY + Math.sin(angle) * shaftLength;

			// 삼각형 크기 비율
			const scale = 1 - ((shaftLength - shaftLengthStart) / (shaftLengthEnd - shaftLengthStart));
			const scaledArrowHeight = arrowHeight * scale;
			const scaledArrowWidth = arrowWidth * scale;

			const arrowHead = new Phaser.Geom.Triangle(
				triangleX, triangleY,
				triangleX - Math.cos(angle - Math.PI / 2) * scaledArrowWidth / 2 - Math.cos(angle) * scaledArrowHeight,
				triangleY - Math.sin(angle - Math.PI / 2) * scaledArrowWidth / 2 - Math.sin(angle) * scaledArrowHeight,
				triangleX - Math.cos(angle + Math.PI / 2) * scaledArrowWidth / 2 - Math.cos(angle) * scaledArrowHeight,
				triangleY - Math.sin(angle + Math.PI / 2) * scaledArrowWidth / 2 - Math.sin(angle) * scaledArrowHeight
			);

			// 선 및 삼각형 그리기
			graphics.beginPath();
			graphics.moveTo(startX, startY);
			graphics.lineTo(triangleX, triangleY);
			graphics.strokePath();
			graphics.fillStyle(0xffffff);
			graphics.fillTriangleShape(arrowHead);
		});

	/*
		// 포인터 이동 시 대포와 조준선 업데이트
		this.input.on('pointermove', (pointer) => {
			angle = Phaser.Math.Angle.BetweenPoints(cannonHead, pointer);
			cannonHead.rotation = angle + Math.PI / 2;

			const shaftLengthStart = 150; // 시작 거리
			const shaftLengthEnd = 200; // 끝 거리

			let shaftLength = shaftLengthStart; // 초기 거리
			let growing = true; // 길이 증가 여부

			graphics.clear();
			graphics.lineStyle(2, 0xffffff);

			// 조준선 시작점
			const startX = cannonHead.x;
			const startY = cannonHead.y;

			// 삼각형을 움직이는 이벤트 생성
			this.time.addEvent({
				delay: 20, // 20ms 간격으로 업데이트
				loop: true, // 반복 실행
				callback: () => {
					// 길이 증가 또는 감소
					if (growing) {
						shaftLength += 2; // 길이 증가
						if (shaftLength >= shaftLengthEnd) growing = false; // 최대 길이에 도달하면 감소
					} else {
						shaftLength -= 2; // 길이 감소
						if (shaftLength <= shaftLengthStart) growing = true; // 최소 길이에 도달하면 증가
					}

					// 삼각형 위치 및 크기 계산
					const triangleX = startX + Math.cos(angle) * shaftLength;
					const triangleY = startY + Math.sin(angle) * shaftLength;

					const scale = 1 - ((shaftLength - shaftLengthStart) / (shaftLengthEnd - shaftLengthStart)); // 크기 계산
					const arrowHeight = 30 * scale; // 삼각형 높이
					const arrowWidth = 30 * scale; // 삼각형 밑변 너비

					const arrowHead = new Phaser.Geom.Triangle(
						triangleX, triangleY,
						triangleX - Math.cos(angle - Math.PI / 2) * arrowWidth / 2 - Math.cos(angle) * arrowHeight,
						triangleY - Math.sin(angle - Math.PI / 2) * arrowWidth / 2 - Math.sin(angle) * arrowHeight,
						triangleX - Math.cos(angle + Math.PI / 2) * arrowWidth / 2 - Math.cos(angle) * arrowHeight,
						triangleY - Math.sin(angle + Math.PI / 2) * arrowWidth / 2 - Math.sin(angle) * arrowHeight
					);

					// 그래픽 업데이트
					graphics.clear();
					graphics.lineStyle(2, 0xffffff);
					graphics.beginPath();
					graphics.moveTo(startX, startY);
					graphics.lineTo(triangleX, triangleY);
					graphics.strokePath();
					graphics.fillStyle(0xffffff);
					graphics.fillTriangleShape(arrowHead);
				},
			});
		});

		*/
/*
		// 포인터 이동 시 대포와 조준선 업데이트
		this.input.on('pointermove', (pointer) => {
			angle = Phaser.Math.Angle.BetweenPoints(cannonHead, pointer);
			cannonHead.rotation = angle + Math.PI / 2;

			const shaftLengthStart = 150; // 시작 거리
			const shaftLengthEnd = 200; // 끝 거리
			const triangleCount = 3; // 생성할 삼각형 개수

			graphics.clear();
			graphics.lineStyle(2, 0xffffff);

			// 조준선 시작점
			const startX = cannonHead.x;
			const startY = cannonHead.y;

			// 조준선 끝점 계산
			const endX = startX + Math.cos(angle) * shaftLengthEnd;
			const endY = startY + Math.sin(angle) * shaftLengthEnd;

			// 조준선 그리기
			graphics.beginPath();
			graphics.moveTo(startX, startY);
			graphics.lineTo(endX, endY);
			graphics.strokePath();

			// 삼각형 생성
			for (let i = 1; i <= triangleCount; i++) {
				const positionFactor = i / (triangleCount + 1); // 삼각형 위치 비율
				const distance = Phaser.Math.Interpolation.Linear([shaftLengthStart, shaftLengthEnd], positionFactor); // 거리 계산

				const triangleX = startX + Math.cos(angle) * distance;
				const triangleY = startY + Math.sin(angle) * distance;

				// 삼각형 크기: 거리가 멀수록 작아짐
				const scale = 1 - positionFactor * 0.5; // 1.0에서 시작해 멀어질수록 작아짐
				const arrowHeight = 30 * scale; // 삼각형 높이
				const arrowWidth = 30 * scale; // 삼각형 밑변 너비

				const arrowHead = new Phaser.Geom.Triangle(
					triangleX, triangleY,
					triangleX - Math.cos(angle - Math.PI / 2) * arrowWidth / 2 - Math.cos(angle) * arrowHeight,
					triangleY - Math.sin(angle - Math.PI / 2) * arrowWidth / 2 - Math.sin(angle) * arrowHeight,
					triangleX - Math.cos(angle + Math.PI / 2) * arrowWidth / 2 - Math.cos(angle) * arrowHeight,
					triangleY - Math.sin(angle + Math.PI / 2) * arrowWidth / 2 - Math.sin(angle) * arrowHeight
				);

				graphics.fillStyle(0xffffff);
				graphics.fillTriangleShape(arrowHead);
			}
		});
*/
/*
        // 포인터 이동 시 대포와 조준선 업데이트
        this.input.on('pointermove', (pointer) => {
            angle = Phaser.Math.Angle.BetweenPoints(cannonHead, pointer);
            cannonHead.rotation = angle + Math.PI / 2;

            const shaftLength = 160;
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
		*/
		
        // 포인터 클릭 시 발사
        this.input.on('pointerup', () => {
            //const bullet = bullets.get(cannon.x, cannon.y - 120); // 그룹에서 발사체 가져오기
			const bullet = bullets.get(cannonHead.x, cannonHead.y);

            if (bullet) {

				// 대포 헤드 확대 애니메이션
				this.tweens.add({
					targets: cannonHead,
					scaleX: 1.2, // X축으로 20% 확대
					scaleY: 1.2, // Y축으로 20% 확대
					duration: 100, // 0.1초 동안 확대
					yoyo: true, // 확대 후 원래 크기로 복원
					ease: 'Power2', // 부드러운 애니메이션 효과
				});
				
			
                bullet.setActive(true);
                bullet.setVisible(true);
                bullet.setScale(1);
                bullet.body.setVelocity(0, 0); // 초기 속도 리셋
                bullet.body.enable = true; // 물리 활성화
                bullet.body.collideWorldBounds = true; // 화면 경계 충돌 활성화
                bullet.body.bounce.set(1, 0); // X축 반사 활성화, Y축 반사 비활성화
                bullet.play('fly'); // 애니메이션 재생

                // 발사 방향 속도 설정
                this.physics.velocityFromRotation(angle, 1200, bullet.body.velocity);
            }
        });
		
		
		// 발사체와 벽의 충돌 처리
        this.physics.add.collider(bullets, walls, (bullet, wall) => {

			// 충돌 위치에 효과 표시
			const effect = this.add.sprite(bullet.x, bullet.y, 'effect_1');
			effect.play('effect_1'); // 애니메이션 재생
			effect.angle = 0; // 충돌 각도에 따라 회전
			effect.setScale(2);

			// 애니메이션 완료 후 효과 제거
			effect.on('animationcomplete', () => {
				effect.destroy(); // 애니메이션이 끝나면 스프라이트 제거
			});
			
			// 발사체 반사 처리
			const velocity = bullet.body.velocity.clone();
			velocity.y *= -1; // Y축 반사
			bullet.body.setVelocity(velocity.x, velocity.y);

		});
		

        // 충돌 감지 설정
        this.physics.add.collider(bullets, goal, (bullet, goal) => {
            // 물리 동작 멈춤 (게임 정지)
            this.physics.pause();

            // Clear 메시지 표시
            this.add.text(this.scale.width / 2, this.scale.height / 2, 'Clear!', {
                fontSize: '48px',
                color: '#ffffff',
            }).setOrigin(0.5);
			
			// 폭죽 애니메이션 실행
			this.startFireworks();

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
		

        this.bullets = bullets; // 업데이트 메서드에서 사용하기 위해 저장
    }

	//폭죽 애니메이션
	startFireworks() {
		// 폭죽 애니메이션 타이머 시작
		this.fireworkTimer = this.time.addEvent({
			delay: Phaser.Math.Between(100, 500), // 랜덤 시간 간격 (300ms ~ 1000ms)
			loop: true, // 반복 실행
			callback: () => {
				// 랜덤 위치
				const x = Phaser.Math.Between(50, this.scale.width - 50);
				const y = Phaser.Math.Between(50, this.scale.height - 50);

				// 랜덤 애니메이션 선택
				const randomEffect = Phaser.Math.Between(1, 5); // 1부터 5까지 랜덤
				const effectKey = `effect_shatter_${randomEffect}`;


				// 폭죽 애니메이션 생성
				const effect = this.add.sprite(x, y, effectKey);
				effect.setScale(2); // 크기를 2배로 설정
				effect.play(effectKey); // 랜덤 애니메이션 재생

				// 애니메이션 완료 후 제거
				effect.once('animationcomplete', () => {
					effect.destroy(); // 애니메이션이 끝나면 제거
				});
			},
		});
	}

	stopFireworks() {
		if (this.fireworkTimer) {
			this.fireworkTimer.remove(); // 타이머 이벤트 중단
		}
	}
	
	
	update() {

		if (!this.isGameStarted) {
            return; // 게임 시작 전에는 update 로직 실행 안 함
        }

		// 발사체가 하단 경계에 도달했는지 확인
		this.bullets.children.iterate((bullet) => {
			if (bullet.active && !bullet.isFalling) {
				// 발사체가 하단 경계에 닿았는지 확인
				if (bullet.body.bottom >= this.scale.height) {
					bullet.isFalling = true; // 상태 플래그 설정

					// 크기 증가 애니메이션
					this.tweens.add({
						targets: bullet,
						scaleX: 1.5,
						scaleY: 1.5,
						yoyo: true,
						duration: 200,
						ease: 'Power2',
						onComplete: () => {
							// 크기 감소 애니메이션
							this.tweens.add({
								targets: bullet,
								scaleX: 0,
								scaleY: 0,
								duration: 100,
								ease: 'Linear',
								onComplete: () => {
									// 발사체 제거
									bullet.setActive(false); // 그룹에서 비활성화
									bullet.setVisible(false); // 화면에서 제거
									bullet.body.stop(); // 속도 멈춤
									bullet.body.enable = false; // 물리 비활성화
									bullet.isFalling = false; // 상태 플래그 초기화
								},
							});
						},
					});
				}
			}
		});
	}

/*
    update() {
	

		// 발사체가 하단 경계에 도달했는지 확인
		this.bullets.children.iterate((bullet) => {
			if (bullet.active && !bullet.isFalling) {
				if (bullet.y >= this.scale.height - 30) {
					// 충돌 후 크기 변화 애니메이션 시작
					bullet.isFalling = true; // 상태 플래그 설정

					// 크기 증가 애니메이션
					this.tweens.add({
						targets: bullet,
						scaleX: 1.5,
						scaleY: 1.5,
						yoyo: true,
						duration: 300,
						ease: 'Power2',
						onComplete: () => {
							// 크기 감소 애니메이션
							this.tweens.add({
								targets: bullet,
								scaleX: 0,
								scaleY: 0,
								duration: 500,
								ease: 'Linear',
								onUpdate: () => {
									// 크기가 일정 이하로 작아지면 객체 제거
									if (bullet.scaleX <= 0.1 && bullet.scaleY <= 0.1) {
										bullet.setActive(false); // 그룹에서 비활성화
										bullet.setVisible(false); // 화면에서 제거
										bullet.body.stop(); // 속도 멈춤
										bullet.body.enable = false; // 물리 비활성화
										bullet.isFalling = false; // 상태 플래그 초기화
									}
								},
							});
						},
					});
				}
			}
		});
	}

	*/

}

const config = {
    type: Phaser.AUTO,
    width: 540, // 기본 너비
    height: 960, // 기본 높이
    parent: 'phaser-example',
    pixelArt: true, // 픽셀 아트 최적화
    resolution: window.devicePixelRatio, // 고해상도 지원
    scale: {
        mode: Phaser.Scale.FIT, // 화면 크기에 맞게 조정
        autoCenter: Phaser.Scale.CENTER_BOTH, // 화면 중앙 정렬
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false,
        },
    },
    scene: Example, // 사용하는 씬
};

const game = new Phaser.Game(config);
