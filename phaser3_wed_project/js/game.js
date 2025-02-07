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

		this.load.spritesheet('cat_idle', 'assets/100x100_cat_idle.png', { frameWidth: 100, frameHeight: 100 });
		this.load.spritesheet('cat_wake', 'assets/100x100_cat_wake.png', { frameWidth: 100, frameHeight: 100 });

        this.load.spritesheet('bullet', 'assets/50x54_bullet.png', { frameWidth: 50, frameHeight: 54 });

		this.load.spritesheet('effect_1', 'assets/effects/Effect_1.png', { frameWidth: 32, frameHeight: 32 });

		this.load.spritesheet('effect_shatter_1', 'assets/effects/Effect_Shatter_1.png', { frameWidth: 96, frameHeight: 96 });
		this.load.spritesheet('effect_shatter_2', 'assets/effects/Effect_Shatter_2.png', { frameWidth: 96, frameHeight: 96 });
		this.load.spritesheet('effect_shatter_3', 'assets/effects/Effect_Shatter_3.png', { frameWidth: 96, frameHeight: 96 });
		this.load.spritesheet('effect_shatter_4', 'assets/effects/Effect_Shatter_4.png', { frameWidth: 96, frameHeight: 96 });
		this.load.spritesheet('effect_shatter_5', 'assets/effects/Effect_Shatter_5.png', { frameWidth: 96, frameHeight: 96 });

		this.load.image('wall', 'assets/125x40_wall.png');
		this.load.image('wall_goal', 'assets/125x40_wall_goal.png');
		this.load.spritesheet('wall_spr', 'assets/100x24_wall.png', { frameWidth: 150, frameHeight: 50 });
		this.load.spritesheet('wall_goal_spr', 'assets/100x24_wall_goal.png', { frameWidth: 150, frameHeight: 50 });
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
        this.input.on('pointerup', () => {
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

		this.anims.create({ key: 'wall', frames: this.anims.generateFrameNumbers('wall', [0]), frameRate: 30, repeat: 0 });
		this.anims.create({ key: 'wall_goal', frames: this.anims.generateFrameNumbers('wall_goal', [0]), frameRate: 30, repeat: 0 });

		this.anims.create({ key: 'wall_spr', frames: this.anims.generateFrameNumbers('wall_spr', [0,1,2,3,4,5,6,7]), frameRate: 3, repeat: -1 });
		this.anims.create({ key: 'wall_goal_spr', frames: this.anims.generateFrameNumbers('wall_goal_spr', [0,1,2]), frameRate: 3, repeat: -1 });
		
		this.anims.create({ key: 'cat_idle_1', frames: this.anims.generateFrameNumbers('cat_idle', [0]), frameRate: 30, repeat: -1 });
		this.anims.create({ key: 'cat_idle_2', frames: this.anims.generateFrameNumbers('cat_idle', [0,1,2,3]), frameRate: 10, repeat: -1 });

		this.anims.create({ key: 'cat_wake_1', frames: this.anims.generateFrameNumbers('cat_wake', [0]), frameRate: 30, repeat: -1 });
		this.anims.create({ key: 'cat_wake_2', frames: this.anims.generateFrameNumbers('cat_wake', [0,1,2,3]), frameRate: 10, repeat: -1 });
		this.anims.create({ key: 'cat_wake_3', frames: this.anims.generateFrameNumbers('cat_wake', [3]), frameRate: 30, repeat: 0 });

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

        const cannonHead = this.add.image(this.scale.width / 2 -3, this.scale.height - 150 -5, 'cannon_head').setDepth(1);
		cannonHead.setOrigin(0.5, 0.85);

        const cannon = this.add.image(this.scale.width / 2, this.scale.height - 150, 'cannon_body').setDepth(2);
		cannon.setScale(1);


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
		
		// 움직이는 벽의 애니메이션을 추가할 스프라이트 생성
		const wallSprite = this.add.sprite(
			movingWall.x, 
			movingWall.y, 
			'wall_spr' // 스프라이트 시트의 이름
		);
		
		// 고양이 생성 (x 좌표와 y 좌표 설정).
		
		const catObj = this.physics.add.staticImage(
			this.scale.width - 90,
			this.scale.height - 100,
			'cat_idle_1'
		);
		
		// 고양이 애니메이션을 추가할 스프라이트 생성
		
		const catSprite = this.add.sprite(
			catObj.x, 
			catObj.y, 
			'cat_idle_2' // 스프라이트 시트의 이름
		);

		/*
		// 애니메이션 생성 (frameRate를 조정하여 속도 조절)
		this.anims.create({
			key: 'moving_wall', // 애니메이션 이름
			frames: this.anims.generateFrameNumbers('wall_spr', { start: 0, end: 7 }), // 애니메이션에 사용할 프레임 (예: 0~4번 프레임)
			frameRate: 3, // 프레임 속도 (1초에 10프레임)
			repeat: -1 // 무한 반복
		});
*/
		// 애니메이션 시작
		wallSprite.anims.play('wall_spr', true); // 'wall_spr'은 애니메이션 이름
		
		//고양이 애니메이션 시작
		catSprite.anims.play('cat_idle_2', true);
		

		// 애니메이션 시작
		//wallSprite.anims.play('wall_spr', true); // 'wallAnimation'은 애니메이션 이름
		
		// 벽의 alpha 값을 0으로 설정하여 숨기기
		//wallSprite.setAlpha(0); // 0이면 완전히 투명해짐

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

				// wallSprite도 이동에 맞게 동기화
				wallSprite.x = movingWall.x;
				wallSprite.y = movingWall.y;
			},
		});
		
		// `walls` 그룹에 `movingWall` 추가
		walls.add(movingWall);

        
		// 임시 벽 객체 생성 후 높이 가져오기
		//const tempWall = this.add.image(0, 0, 'wall');
		//const wallHeight = tempWall.height; // 벽의 높이 가져오기
		//tempWall.destroy(); // 임시 객체 제거

		// goal의 하단에 벽 생성
		//walls.create(goal.x, goal.y + goal.height / 2 + wallHeight / 2, 'wall_goal');
		walls.create(goal.x, goal.y + goal.height / 2, 'wall_goal');
		
		// 벽의 애니메이션을 추가할 스프라이트 생성
		const wallGoalSprite = this.add.sprite(
			goal.x, 
			goal.y, 
			'wall_goal_spr' // 스프라이트 시트의 이름
		);
		// origin을 중앙 상단으로 설정
		wallGoalSprite.setOrigin(0.5, 0);

		// 애니메이션 시작
		wallGoalSprite.anims.play('wall_goal_spr', true);


        const graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });
		
		const graphics_cicle = this.add.graphics({ lineStyle: { width: 2, color: 0xffffff, alpha: 0.5 } });


		const shaftLengthStart = 150; // 시작 거리
		const shaftLengthEnd = 220; // 끝 거리
		let shaftLength = shaftLengthStart; // 초기 거리
		let angle = -Math.PI / 2; // 초기 각도 위쪽(-90도)
		
		// 궤적을 시각화할 원의 반지름과 총 길이 설정
		const pointRadius = 4; // 원의 반지름
		const trajectoryLength = 350; // 궤적 길이 (픽셀 단위)
		const timeStep = 0.03; // 시간 간격

		// 예상 궤적 그리기 함수
		const drawTrajectory = (startX, startY, velocityX, velocityY, bulletWidth, bulletHeight) => {
			graphics_cicle.clear(); // 기존 그래픽 지우기
			graphics_cicle.fillStyle(0xffffff, 0.8); // 원 색상과 투명도 설정

			const gravity = this.physics.world.gravity.y; // 중력 가속도
			const maxBounces = 5; // 최대 반사 횟수
			let bounceCount = 0; // 반사 횟수

			let x = startX; // 현재 X 좌표
			let y = startY; // 현재 Y 좌표
			let vx = velocityX; // 현재 X 속도
			let vy = velocityY; // 현재 Y 속도

			let currentLength = 0; // 현재 그려진 길이
			let currentAlpha = 1.0; // 초기 alpha 값

			// 궤적을 그리는 반복문
			while (currentLength < trajectoryLength) {
				// 중력 적용
				vy += gravity * timeStep;

				// 예상 위치 계산
				const nextX = x + vx * timeStep;
				const nextY = y + vy * timeStep;

				// 경계 충돌 처리
				if (nextX - bulletWidth / 2 <= 0 || nextX + bulletWidth / 2 >= this.scale.width) {
					vx *= -1; // X축 반사
					bounceCount++;
				}
				if (nextY - bulletHeight / 2 <= 0 || nextY + bulletHeight / 2 >= this.scale.height) {
					vy *= -1; // Y축 반사
					bounceCount++;
				}

				// walls 그룹과 충돌 처리
				walls.children.iterate((wall) => {
					wall.body.updateFromGameObject(); // 벽의 물리 데이터를 갱신

					if (
						nextX + bulletWidth / 2 >= wall.body.left &&
						nextX - bulletWidth / 2 <= wall.body.right &&
						nextY + bulletHeight / 2 >= wall.body.top &&
						nextY - bulletHeight / 2 <= wall.body.bottom
					) {
						// 충돌 방향에 따른 반사 처리
						if (nextX <= wall.body.left || nextX >= wall.body.right) {
							vx *= -1; // X축 반사
						}
						if (nextY <= wall.body.top || nextY >= wall.body.bottom) {
							vy *= -1; // Y축 반사
						}
						bounceCount++; // 반사 횟수 증가
					}
				});

				// 충돌 횟수가 최대치를 넘으면 중단
				if (bounceCount > maxBounces) break;

				// 화면을 벗어나면 중단
				if (nextY > this.scale.height) break;

				// 현재 점을 그리기
				graphics_cicle.fillStyle(0xffffff, currentAlpha); // 현재 alpha 값
				graphics_cicle.fillCircle(nextX, nextY, pointRadius);

				// 현재 길이 갱신
				const dx = nextX - x;
				const dy = nextY - y;
				currentLength += Math.sqrt(dx * dx + dy * dy);

				// alpha 값 점진적으로 감소
				currentAlpha = Math.max(0, 1 - currentLength / trajectoryLength);

				// 위치 갱신
				x = nextX;
				y = nextY;
			}
		};


		// 대포 조준선 애니메이션 이벤트
		this.time.addEvent({
			delay: 15, // 15ms 간격으로 업데이트
			loop: true, // 반복 실행
			callback: () => {
				// 길이 증가
				shaftLength += 2;

				// 최대 길이에 도달하면 리셋
				if (shaftLength > shaftLengthEnd) {
					shaftLength = shaftLengthStart;
				}

				// 삼각형 위치 및 크기 계산
				const startX = cannonHead.x;
				const startY = cannonHead.y;

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
				graphics.fillStyle(0xFF5733, 1); // 밝은 붉은색, 불투명
				graphics.fillTriangleShape(arrowHead);
			},
		});

		// 포인터 이동 시 각도 업데이트
		this.input.on('pointermove', (pointer) => {
			// 대포와 포인터 사이의 각도를 계산
			let angle_temp = Phaser.Math.Angle.BetweenPoints(cannonHead, pointer);

			// 포인터와 대포 머리 사이의 각도를 도 단위로 변환
			let newAngle = Phaser.Math.RadToDeg(angle_temp);

			// 기준 각도 +90도를 적용 (대포 기본 방향 설정)
			newAngle += 90;

			// 포인터 위치에 따라 3사분면인지 확인
			if (pointer.x < cannonHead.x && pointer.y > cannonHead.y) {
				// 포인터가 3사분면에 있을 경우 각도를 -90도로 고정
				newAngle = -90;
			} else {
				// 각도 제한 (대포가 -90도에서 90도 사이에서만 회전)
				if (newAngle < -90) {
					newAngle = -90;
				} else if (newAngle > 90) {
					newAngle = 90;
				}
			}
			
			 // `newAngle` 값을 라디안으로 변환하여 `angle` 업데이트
			angle = Phaser.Math.DegToRad(newAngle - 90);
			
			// 대포 머리 회전 적용
			cannonHead.angle = newAngle;

			// 대포의 head 앞쪽으로 궤적 시작점 계산
			const offsetDistance = 90; // 대포 head 앞쪽 거리 (픽셀)
			const radianAngle = Phaser.Math.DegToRad(newAngle - 90); // 궤적 계산에 사용할 라디안 각도
			const startX = cannonHead.x + Math.cos(radianAngle) * offsetDistance;
			const startY = cannonHead.y + Math.sin(radianAngle) * offsetDistance;

			// 초기 속도 계산 (1200은 속도 크기)
			const velocity = 1200;
			const velocityX = Math.cos(radianAngle) * velocity;
			const velocityY = Math.sin(radianAngle) * velocity;

			// 발사체의 크기 가져오기
			const bulletWidth = 50; // 기본 값: 50
			const bulletHeight = 54; // 기본 값: 54

			// 궤적 업데이트
			drawTrajectory(startX, startY, velocityX, velocityY, bulletWidth, bulletHeight);
		});

		
        // 포인터 클릭 시 발사
        this.input.on('pointerup', () => {

			if (!isWakingUp) {
				isWakingUp = true;
				catSprite.setTexture('cat_wake_2');
				catSprite.anims.play('cat_wake_2', true);
				
				// 애니메이션이 끝나면 마지막 프레임을 고정하도록 설정
				catSprite.on('animationcomplete', (anim) => {
					if (anim.key === 'cat_wake_2') {
						// 애니메이션이 끝난 후, 마지막 프레임으로 고정
						catSprite.setTexture('cat_wake_3');  // 여기에 마지막 프레임의 텍스처를 설정
						catSprite.anims.play('cat_wake_3', true);
					}
				});
				// wake 애니메이션의 마지막 프레임이 끝난 후
				wakeTimer = this.time.delayedCall(3000, () => { // 1초 후 (wake 애니메이션 마지막 프레임)
					// idle 상태로 되돌리기
					catSprite.setTexture('cat_idle_2');
					catSprite.anims.play('cat_idle_2', true);
					isWakingUp = false;
				});
			}

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
				
				// 궤적 지우기
				graphics_cicle.clear();
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
			
			// 배경 음영 추가
			const overlay = this.add.rectangle(
				this.scale.width / 2,
				this.scale.height / 2,
				this.scale.width,
				this.scale.height,
				0x000000,
				0.6 // 투명도 설정
			).setDepth(10);

            // Clear 메시지 표시
            this.add.text(this.scale.width / 2, this.scale.height / 2, 'Clear!', {
                fontSize: '48px',
                color: '#ffffff',
            }).setOrigin(0.5).setDepth(12);
			
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
                .setInteractive() // 버튼 클릭 가능하도록 설정
				.setDepth(12);
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
				effect.setDepth(11);

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

let isWakingUp = false; // 상태를 추적하는 변수
let wakeTimer; // 타이머 변수


const game = new Phaser.Game(config);
