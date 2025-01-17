const defaults = {
  speed: 10,
  maxSize: 15,
  minSize: 10,
  newOn: 400
};

// 踰싰퐙  곸뿭  ш린瑜     ν븷 蹂   
var $wrap = $('.flower_wrap');
let wrapH = $wrap.height();
let wrapW = $wrap.width();

// 踰싰퐙     앹꽦
const $petal = $('<span class="petal"></span>');

//  쒕뜡  뚯쟾 媛믪쓣  앹꽦 섎뒗  ⑥닔
const getRandomRotate = () => {  
  const rotateX = 360;
  const rotateY = Math.random() * 60 - 30;
  const rotateZ = Math.random() * 120 - 30;
  const translateX = Math.random() * 10 - 5;
  const translateY = Math.random() * 10 - 10;
  const translateZ = Math.random() * 15;
  
  
  return `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px)`;
};

// 臾댁옉    붾뱾由   좊땲硫붿씠   諛곗뿴  앹꽦
const randomSwayAnims = [...Array(10)].map(getRandomRotate);

//  뱀젙  붿냼    붾뱾由   좊땲硫붿씠    곸슜
const applySwayAnim = (element) => {
  const randomSway = randomSwayAnims[Math.floor(Math.random() * randomSwayAnims.length)];
  element.css('transform', randomSway);
  setTimeout(() => {
    applySwayAnim(element);
  }, 1000);
};

// 踰싰퐙     앹꽦  ⑥닔
const petalGen = () => {
  setTimeout(requestAnimationFrame, defaults.newOn, petalGen);

  const petal = $petal.clone();
  const size = Math.floor(Math.random() * (defaults.maxSize - defaults.minSize + 1)) + defaults.minSize;
  const startPosLeft = Math.random() * wrapW;
  const fallTime = (wrapH * 0.1 + Math.random() * 5) / defaults.speed;
  const horizontalOffset = Math.random() * 2 - 1;

  //  좊땲硫붿씠    앸굹硫   쒓굅
  petal.on('animationend', () => {
    petal.remove();
  }).css({
    width: size,
    height: size,
    left: startPosLeft,
    position: 'absolute',
    animation: `fall ${fallTime}s linear`
  }).appendTo($wrap);

  //  꾩튂  낅뜲 댄듃  ⑥닔
  const updatePos = () => {
    petal.css('left', `+=${horizontalOffset}`);
    requestAnimationFrame(updatePos);
  };

  updatePos();
  applySwayAnim(petal);
};

// 李   ш린媛  蹂 寃쎈맆     곸뿭  ш린  낅뜲 댄듃
$(window).resize(() => {
  wrapH = $wrap.height();
  wrapW = $wrap.width();
});

// 濡쒕뵫  꾨즺    踰싰퐙     앹꽦  쒖옉
$(window).on('load', () => {
  requestAnimationFrame(petalGen);
  
});