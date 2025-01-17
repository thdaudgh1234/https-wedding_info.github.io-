// Phaser 게임 구성
const config = {
  type: Phaser.AUTO, // 렌더링 방식 (WebGL 또는 Canvas를 자동 선택)
  width: 800,        // 게임 화면 너비
  height: 600,       // 게임 화면 높이
  backgroundColor: '#2d2d2d', // 배경색
  audio: {
    disableWebAudio: false, // Web Audio API를 활성화
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};

// 게임 생성
const game = new Phaser.Game(config);

// 리소스 로드
function preload() {
  this.load.image('logo', 'assets/phaser3-logo.png'); // 예제 로고 이미지 로드
}

// 초기 설정
function create() {
  const logo = this.add.image(400, 300, 'logo'); // 로고를 화면 중앙에 추가
}

// 매 프레임 업데이트
function update() {
  // 게임 로직 업데이트 (빈 상태로 시작)
}


