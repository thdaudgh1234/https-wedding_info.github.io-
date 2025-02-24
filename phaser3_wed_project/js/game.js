let cannonHead2;
let bulletHead2;

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
        this.load.image('goal', 'assets/90x106_goal.png');

		this.load.image('replay_icon', 'assets/replay_icon.png');
		this.load.image('next_icon', 'assets/next_icon.png');

		//this.load.image('ending', 'assets/ending.png');
		this.load.spritesheet('ending', 'assets/ending.png', { frameWidth: 200, frameHeight: 116 });
		
		this.load.spritesheet('bubble', 'assets/bubble.png', { frameWidth: 100, frameHeight: 60 });
		
		this.load.image('bullet_head', 'assets/bullet_head.png');
		
		this.load.spritesheet('cat_idle', 'assets/100x100_cat_idle.png', { frameWidth: 100, frameHeight: 100 });
		this.load.spritesheet('cat_wake', 'assets/100x100_cat_wake.png', { frameWidth: 100, frameHeight: 100 });

        this.load.spritesheet('bullet', 'assets/50x54_bullet.png', { frameWidth: 100, frameHeight: 116 });
		this.load.spritesheet('goal_idle', 'assets/50x54_goal.png', { frameWidth: 100, frameHeight: 116 });

		this.load.spritesheet('effect_1', 'assets/effects/Effect_1.png', { frameWidth: 32, frameHeight: 32 });

		this.load.spritesheet('effect_shatter_1', 'assets/effects/Effect_Shatter_1.png', { frameWidth: 48, frameHeight: 48 });
		this.load.spritesheet('effect_shatter_2', 'assets/effects/Effect_Shatter_2.png', { frameWidth: 48, frameHeight: 48 });
		this.load.spritesheet('effect_shatter_3', 'assets/effects/Effect_Shatter_3.png', { frameWidth: 48, frameHeight: 48 });
		this.load.spritesheet('effect_shatter_4', 'assets/effects/Effect_Shatter_4.png', { frameWidth: 48, frameHeight: 48 });
		this.load.spritesheet('effect_shatter_5', 'assets/effects/Effect_Shatter_5.png', { frameWidth: 48, frameHeight: 48 });

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
			'신랑과 신부를 만나게 해주세요~!',
			{
				fontSize: '36px',
				color: '#ffffff',
				fontFamily: 'Arial',
			}
		).setOrigin(0.5);

		// "터치해서 시작하기" 문구
		const touchToStart = this.add.text(
			this.scale.width / 2,
			this.scale.height - 250,
			'터치해서 시작하기',
			{
				fontSize: '30px',
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

		this.anims.create({ key: 'goal_idle', frames: this.anims.generateFrameNumbers('goal_idle', [0,1]), frameRate: 1, repeat: -1 });
		
		this.anims.create({ key: 'ending', frames: this.anims.generateFrameNumbers('ending', [0,1]), frameRate: 1, repeat: -1 });

		this.anims.create({ key: 'bubble', frames: this.anims.generateFrameNumbers('bubble', [0,1,2,3,4,5,6,7,8]), frameRate: 5, repeat: -1 });
		
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
		/*
		// 바닥 생성
		const floor = this.physics.add.staticImage(this.scale.width / 2, this.scale.height, 'wall_fail') // wall_fail 이미지를 바닥으로 사용
			.setOrigin(0.5, 1.0) // 하단 중심 기준으로 설정
			.setDisplaySize(this.scale.width, 10) // 바닥의 너비를 화면 크기로 설정
			.refreshBody(); // 물리 엔진에 업데이트
		*/
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
		goal.body.setOffset(0, -20);


		

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
		

		// cannonHead는 이미 생성된 대포 머리 스프라이트라고 가정
		cannonHead2 = this.add.sprite(-1000, -1000, 'bullet_head').setOrigin(0.5, 0.5);

		// 대포 머리와 함께 움직일 bullet_head 생성
		bulletHead2 = this.add.sprite(cannonHead2.x, cannonHead2.y, 'bullet_head').setOrigin(0.5, 0.65);

		// 목표의 애니메이션을 추가할 스프라이트 생성
		const goalSprite = this.add.sprite(
			goal.x+6, 
			goal.y, 
			'goal_idle' // 스프라이트 시트의 이름
		).setOrigin(0.5, 0.68);


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

		// 말풍선 애니메이션을 추가할 스프라이트 생성
		const bubbleSprite = this.add.sprite(
			goalSprite.x-10, 
			goalSprite.y-100, 
			'bubble' // 스프라이트 시트의 이름
		).setScale(2);

		/*
		// 애니메이션 생성 (frameRate를 조정하여 속도 조절)
		this.anims.create({
			key: 'moving_wall', // 애니메이션 이름
			frames: this.anims.generateFrameNumbers('wall_spr', { start: 0, end: 7 }), // 애니메이션에 사용할 프레임 (예: 0~4번 프레임)
			frameRate: 3, // 프레임 속도 (1초에 10프레임)
			repeat: -1 // 무한 반복
		});
*/		
		bubbleSprite.anims.play('bubble', true); // 'bubble'은 애니메이션 이름

		// 목표 애니메이션 시작
		goalSprite.anims.play('goal_idle', true); // 'goal_idle'은 애니메이션 이름

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
		walls.create(goal.x, goal.y + goal.height / 2 -20, 'wall_goal');
		
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
			
			// 포인터 이동에 따라 대포 포문 쪽의 bullet_head 위치와 회전 업데이트
			bulletHead2.setPosition(startX, startY);
			bulletHead2.angle = newAngle;


			// 궤적 업데이트
			drawTrajectory(startX, startY, velocityX, velocityY, bulletWidth, bulletHeight);
		});

		
        // 포인터 클릭 시 발사
        this.input.on('pointerup', () => {

            //const bullet = bullets.get(cannon.x, cannon.y - 120); // 그룹에서 발사체 가져오기
			const bullet = bullets.get(cannonHead.x, cannonHead.y);
			bulletHead2.setVisible(false);

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
				
				// bullet의 충돌 범위를 원래 크기의 80%로 줄임
				bullet.body.setSize(bullet.width * 0.8, bullet.height * 0.8);
				
				// 궤적 지우기
				graphics_cicle.clear();
				
				//고양이 애니메이션
				if (!isWakingUp) {
					isWakingUp = true;
					catSprite.setTexture('cat_wake_3');
					catSprite.anims.play('cat_wake_3', { repeat: 0 }); // 애니메이션을 한 번만 재생
					//console.log('Animation Complete:', anim.key); // 이벤트가 호출되는지 확인
					
					// 애니메이션이 끝났을 때의 동작 정의
					catSprite.once('animationcomplete', (anim) => {
						console.log('Animation Complete:', anim.key); // 이벤트가 정상적으로 호출되는지 확인
						if (anim.key === 'cat_wake_3') {
							// 애니메이션이 끝난 후 마지막 프레임으로 고정
							catSprite.setFrame(3);  // 마지막 프레임으로 설정
							catSprite.anims.stop(); // 애니메이션을 멈추고 더 이상 반복되지 않게 함
						}
					});

					// wake 애니메이션의 마지막 프레임이 끝난 후
					wakeTimer = this.time.delayedCall(3000, () => { // 3초 후 (wake 애니메이션 마지막 프레임)
						// idle 상태로 되돌리기
						catSprite.setTexture('cat_idle_2');
						catSprite.anims.play('cat_idle_2', true);
						isWakingUp = false;
					});
				}
            }
        });
		
		
		// 발사체와 벽의 충돌 처리
        this.physics.add.collider(bullets, walls, (bullet, wall) => {

			// 충돌 위치에 효과 표시
			const effect = this.add.sprite(bullet.x, bullet.y, 'effect_1');
			effect.play('effect_1'); // 애니메이션 재생
			effect.angle = 0; // 충돌 각도에 따라 회전
			effect.setScale(3);

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
				0.7 // 투명도 설정
			).setDepth(10);

            // Clear 메시지 표시
            this.add.text(this.scale.width / 2, this.scale.height / 2-190, '신랑신부가 만났어요!', {
                fontSize: '40px',
                color: '#ffffff',
				padding: { top: 10, bottom: 10, left: 10, right: 10 }
            }).setOrigin(0.5, 0).setDepth(12);
			

			
			// ending 이미지 생성 (클리어 위에 배치)
			const endingSprite = this.add.sprite(
				this.scale.width / 2, this.scale.height / 2 - 50, 
				'ending' // 스프라이트 시트의 이름
			).setOrigin(0.5).setDepth(11);

			// 목표 애니메이션 시작
			endingSprite.anims.play('ending', true); //

			// ending 이미지 생성 (클리어 위에 배치)
			//const endingImage = this.add.image(this.scale.width / 2, this.scale.height / 2 - 50, 'ending');
			//endingImage.setOrigin(0.5);
			//endingImage.setDepth(11); // 클리어보다 높은 depth로 설정하면 위에 표시됨

			// 폭죽 애니메이션 실행
			this.startFireworks();
			
			// Replay 버튼 추가
            // Replay 버튼 컨테이너 생성 (중앙 위치)
			const replayButtonContainer = this.add.container(this.scale.width / 2, this.scale.height / 2 + 100);
			replayButtonContainer.setDepth(11); // depth 설정

			// 아이콘 추가 (예: 'replay_icon' 키의 이미지)
			// 아이콘은 버튼 텍스트보다 위쪽에 위치하도록 y값을 음수로 조정 (예: -30)
			const replayIcon = this.add.image(0, -30, 'replay_icon').setOrigin(0.5,0.22).setDepth(11).setScale(3);

			// 버튼 텍스트 추가
			const replayText = this.add.text(0, 0, '다시하기', {
				fontSize: '32px',
				color: '#6be2fa',
				backgroundColor: 'transparent', // 60% 투명한 검은색
				padding: { x: 10, y: 10 },
				stroke: '#000000',            // 흰색 테두리
				strokeThickness: 5            // 테두리 두께
			}).setDepth(11).setOrigin(0.5,0.5);

			// 컨테이너에 아이콘과 텍스트를 추가
			replayButtonContainer.add([replayIcon, replayText]);
			
			// 컨테이너를 인터랙티브하게 만듦 (컨테이너 내부의 모든 오브젝트가 함께 클릭 처리됨)
			replayButtonContainer.setSize(replayText.width, replayText.height + 30);
			replayButtonContainer.setInteractive();
			
			/*
			// 컨테이너의 중앙을 기준으로 테두리를 그림
			const border2 = this.add.graphics();
			border2.lineStyle(2, 0xffffff, 1);
			border2.strokeRect(-replayButtonContainer.width/2, -replayButtonContainer.height/2, replayButtonContainer.width, replayButtonContainer.height);
			replayButtonContainer.add(border2);
			*/
			// 클릭 이벤트 예시
			replayButtonContainer.on('pointerup', () => {
				window.location.reload();
			});
			

            // Next 버튼 추가
			// Next 버튼 컨테이너 생성 (중앙 위치)
			const nextButtonContainer = this.add.container(this.scale.width / 2, this.scale.height / 2 + 100);
			nextButtonContainer.setDepth(11); // depth 설정

			// 아이콘 추가 (예: 'next_icon' 키의 이미지)
			// 아이콘은 버튼 텍스트보다 위쪽에 위치하도록 y값을 음수로 조정 (예: -30)
			const nextIcon = this.add.image(0, -30, 'next_icon').setOrigin(0.5,0.2).setDepth(11).setScale(3);

            // 버튼 텍스트 추가
			const nextText = this.add.text(0, 0, '다음으로', {
				fontSize: '32px',
				color: '#00ff00',
				backgroundColor: 'transparent', // 60% 투명한 검은색
				padding: { x: 10, y: 10 },
				stroke: '#000000',            // 흰색 테두리
				strokeThickness: 5            // 테두리 두께
			}).setDepth(11).setOrigin(0.5,0.5);
			
			// 컨테이너에 아이콘과 텍스트 추가
			nextButtonContainer.add([nextIcon, nextText]);

			// 컨테이너 크기 설정 (텍스트와 아이콘 영역을 포함하도록)
			nextButtonContainer.setSize(nextText.width, nextText.height + 30);
			// 컨테이너를 인터랙티브하게 만듦 (컨테이너 내부의 모든 오브젝트가 함께 클릭 처리됨)
			nextButtonContainer.setInteractive();
			
			/*
			// 컨테이너의 중앙을 기준으로 테두리를 그림
			const border = this.add.graphics();
			border.lineStyle(2, 0xffffff, 1);
			border.strokeRect(-nextButtonContainer.width/2, -nextButtonContainer.height/2, nextButtonContainer.width, nextButtonContainer.height);
			nextButtonContainer.add(border);
			*/

			// --- 버튼 위치 조정 ---
			// 두 컨테이너를 중앙 기준으로 좌우에 배치하기 위해 전체 너비와 간격을 계산
			const gap = 30; // 두 버튼 사이의 간격 (픽셀 단위)
			const totalWidth = replayButtonContainer.width + gap + nextButtonContainer.width;

			// 중앙을 기준으로 좌우 컨테이너의 x좌표 재설정
			replayButtonContainer.x = this.scale.width / 2 - totalWidth / 2 + replayButtonContainer.width / 2;
			nextButtonContainer.x = this.scale.width / 2 + totalWidth / 2 - nextButtonContainer.width / 2;

			// Replay 버튼 클릭 이벤트
            replayButtonContainer.on('pointerup', () => {
                window.location.reload();
            });

            // Next 버튼 클릭 이벤트
            nextButtonContainer.on('pointerup', () => {
                window.location.href = 'https://thdaudgh1234.github.io/https-wedding_info.github.io-/wedding_site/wedding_site4.html';
            });



        });
		

        this.bullets = bullets; // 업데이트 메서드에서 사용하기 위해 저장
    }

	//폭죽 애니메이션
	startFireworks() {
		// 폭죽 애니메이션 타이머 시작
		this.fireworkTimer = this.time.addEvent({
			delay: Phaser.Math.Between(300, 800), // 랜덤 시간 간격 (300ms ~ 1000ms)
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
				effect.setScale(5); // 크기를 2배로 설정
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

				// bullet의 현재 속도 (vx, vy) 가져오기
				//현재 속도와 방향에 맞춰 회전
				const vx = bullet.body.velocity.x;
				const vy = bullet.body.velocity.y;

				// 속도가 0이 아니라면 목표 각도를 계산
				if (vx !== 0 || vy !== 0) {
					// Math.atan2(y, x)는 이동 방향의 각도를 라디안 단위로 반환합니다.
					let targetAngle = Math.atan2(vy, vx);
					
					// 만약 bullet의 기본 스프라이트가 예를 들어 "위쪽"을 바라본다면,
					// sprite와 물리 속도의 기준이 다를 수 있으므로 보정각을 더할 수 있습니다.
					// 예시: bullet 스프라이트가 기본적으로 위쪽을 바라본다면, 
					 targetAngle += Phaser.Math.DegToRad(90); 
					// 필요 시 주석을 해제하여 사용하세요.

					// 현재 회전값(bullet.rotation)에서 목표 각도로 부드럽게 회전시킵니다.
					// 0.05는 회전 스텝(라디안 단위)로, 값이 작을수록 더 부드럽게 회전합니다.
					bullet.rotation = Phaser.Math.Angle.RotateTo(bullet.rotation, targetAngle, 0.2);
				}

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
									bulletHead2.setVisible(true);
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
