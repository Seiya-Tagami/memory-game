"use strict";

{
  const cards = [];
  const cardBox = document.getElementById("js-card-box");
  let flipCount = 0,
    correctCount = 0,
    countUp = 0,
    firstCard = null,
    secondCard = null,
    countDown = 3;

  const cardpairNum = 8; //カード生成
  function init() {
    for (let i = 0; i < cardpairNum; i++) {
      const cardA = createCard(i);
      const cardB = createCard(i);
      cards.push(cardA);
      cards.push(cardB);
    }

    while (cards.length) {
      const pos = Math.floor(Math.random() * cards.length);
      cardBox.appendChild(cards.splice(pos, 1)[0]); //memo:spliceの返値は配列
    }
  }

  function createCard(num) {
    const cardInner = ["POSSE", "HTML", "CSS", "JS", "PHP", "SQL", "Python", "Laravel"];

    const inner = '<div class="p-card-back">？</div><div class="p-card-front">*</div>';
    const card = document.createElement("div");
    card.className = "p-card";
    card.innerHTML = inner.replace("*", cardInner[num]);
    card.addEventListener("click", function () {
      flipCard(this);
    });
    const container = document.createElement("div");
    container.className = "p-card-container";
    container.appendChild(card);
    return container;
  }

  function flipCard(card) {
    if (firstCard != null && secondCard != null) {
      return;
    }

    if (card.className.indexOf("is-open") === -1) {
      card.classList.add("is-open");
    } else {
      return;
    }
    flipCount++;
    if (flipCount % 2 === 1) {
      firstCard = card;
    } else {
      secondCard = card;
      setTimeout(function () {
        judge();
      }, 900); //memo:カードをめくり終わった時に実行
    }
  }

  function judge() {
    if (firstCard.children[1].textContent === secondCard.children[1].textContent) {
      correctCount++;
    } else {
      firstCard.classList.remove("is-open");
      secondCard.classList.remove("is-open");
    }
    firstCard = null;
    secondCard = null;
  }

  const start = document.querySelector(".p-start");
  const menu = document.querySelector(".p-menu");
  const replay = document.querySelector(".p-menu__item__replay");
  const clickReplay = document.getElementById("js-replay");
  document.getElementById("js-soloPlay").addEventListener("click", function () {
    start.classList.add("u-display-hidden");
    menu.classList.add("u-display-block");
    gameStart();
    clickReplay.addEventListener("click", function () {
      rePlay();
    });
  });

  const timerA = document.querySelector(".p-menu__item__count-down");

  function gameStart() {
    timerA.classList.add("u-border__bottom");
    timerA.innerHTML = countDown;
    countDown--;
    const cleartimeoutId = setTimeout(gameStart, 1000);

    if (countDown === -1) {
      clearTimeout(cleartimeoutId);
      timerA.innerHTML = "始め！";
      replay.classList.add("u-display-flex");
      init();
      countTime();
    }
  }

  function countTime() {
    if (countDown > -1) {
      return;
    }
    const timerB = document.querySelector(".p-menu__item__count-up");
    timerB.classList.add("u-border__bottom");
    timerB.innerHTML = `${countUp}<span>秒経過</span>`;
    countUp++;
    const cleartimeoutId = setTimeout(countTime, 1000);
    if (correctCount === cardpairNum) {
      clearTimeout(cleartimeoutId);
      timerA.innerHTML = "終了！";
      showResult();
    }
  }

  const result = document.querySelector(".p-menu__item__result");

  function showResult() {
    const createSpan01 = document.createElement("span");
    createSpan01.setAttribute("id", "p-menu__item__result-title");
    createSpan01.textContent = "【評価】";
    result.appendChild(createSpan01);
    const createSpan02 = document.createElement("span");
    createSpan02.setAttribute("id", "p-menu__item__result-rank");
    result.appendChild(createSpan02);

    result.classList.add("u-border__bottom");
    const rank = document.getElementById("p-menu__item__result-rank");
    const colorGold = "#efBb24";
    const colorPurple = "#533d5b";
    const colorRed = "#6d2e5b";
    const colorBlue = "#2b5f75";
    const colorGreen = "#00896c";

    if (countUp <= 35) {
      rank.innerHTML = "S+";
      rank.style.color = colorGold;
    } else if (countUp <= 40) {
      rank.innerHTML = "S";
      rank.style.color = colorPurple;
    } else if (countUp <= 45) {
      rank.innerHTML = "A";
      rank.style.color = colorRed;
    } else if (countUp <= 50) {
      rank.innerHTML = "B";
      rank.style.color = colorBlue;
    } else {
      rank.innerHTML = "C";
      rank.style.color = colorGreen;
    }
  }

  function rePlay() {
    if (countDown > -1) {
      return;
    }
    cardBox.innerHTML = "";
    const resultTitle = document.getElementById("p-menu__item__result-title");
    if (resultTitle !== null) {
      resultTitle.textContent = "【前回の評価】";
    }
    flipCount = 0;
    firstCard = null;
    secondCard = null;
    countDown = 3;
    countUp = 0;
    correctCount = 0;
    setTimeout(gameStart, 500);
  }
}
//2人プレイモードは対戦形式でポイント制 もう一つ変数を用意してあげて、剰余で条件分岐かな？
