"use strict";

{
  const cards = [];
  const cardBox = document.getElementById("js-card-box");
  let flipCount = 0,
    totalcorrectCount = 0,
    player1correctCount = 0,
    player2correctCount = 0,
    turnCount = 0,
    firstCard = null,
    secondCard = null;

  const cardpairNum = 8; //カード生成
  function init() {
    for (let i = 0; i < cardpairNum; i++) {
      const cardA = createCard(i);
      const cardB = createCard(i);
      cards.push(cardA);
      cards.push(cardB); //memo:こうすると上手くいった
    }

    while (cards.length) {
      const pos = Math.floor(Math.random() * cards.length);
      cardBox.appendChild(cards.splice(pos, 1)[0]); //memo:spliceの返値は配列
    }

    function createCard(num) {
      const cardInner = ["HTML", "CSS", "JS", "PHP", "SQL", "Python", "Laravel", "React"];
      const inner = `<div class="p-card-back">？</div><div class="p-card-front">${cardInner[num]}</div>`;
      const card = document.createElement("div");
      card.className = "p-card";
      card.innerHTML = inner;
      card.addEventListener("click", function () {
        flipCard(this);
      });
      const container = document.createElement("div");
      container.className = "p-card-container";
      container.appendChild(card);
      return container;
    }
  }

  function showYourturn() {
    const player1Yourturn = document.getElementById("js-player1-your-turn");
    const player2Yourturn = document.getElementById("js-player2-your-turn");
    if (turnCount % 2 === 0) {
      //0
      player2Yourturn.classList.add("u-display-hidden");
      if (totalcorrectCount !== cardpairNum) {
        player1Yourturn.classList.remove("u-display-hidden");
      }
    }
    if (turnCount % 2 === 1) {
      player1Yourturn.classList.add("u-display-hidden");
      if (totalcorrectCount !== cardpairNum) {
        player2Yourturn.classList.remove("u-display-hidden");
      }
    }
  }

  function flipCard(card) {
    if (firstCard && secondCard) {
      //memo:こういう風にも書けるのか笑
      return;
    }

    if (card.className.indexOf("is-open") !== -1) {
      return;
    }
    card.classList.add("is-open");
    flipCount++;
    if (flipCount % 2 === 1) {
      firstCard = card;
    } else {
      secondCard = card;
      turnCount++;
      setTimeout(judge, 900); //memo:カードをめくり終わった時に実行
    }
  }

  function judge() {
    if (firstCard.children[1].textContent === secondCard.children[1].textContent) {
      if (turnCount % 2 === 1) {
        player1correctCount++;
        document.getElementById("js-player1-score").textContent = `得点 ${player1correctCount}点`;
        setTimeout(showYourturn, 400);
      }
      if (turnCount % 2 === 0) {
        player2correctCount++;
        document.getElementById("js-player2-score").textContent = `得点 ${player2correctCount}点`;
        setTimeout(showYourturn, 400);
      }
      totalcorrectCount++;
    } else {
      firstCard.classList.remove("is-open");
      secondCard.classList.remove("is-open");
      setTimeout(showYourturn, 400);
    }
    firstCard = null;
    secondCard = null;

    if (totalcorrectCount === cardpairNum) {
      setTimeout(showResult, 500);
    }
  }

  const resultPlayer1 = document.getElementById("js-player1-result");
  const resultPlayer2 = document.getElementById("js-player2-result");
  function showResult() {
    if (player1correctCount > player2correctCount) {
      resultPlayer1.innerHTML = "あなたの<br>勝利です";
      resultPlayer1.classList.add("p-triple-menu__item__content__win");
      resultPlayer2.innerHTML = "あなたの<br>負けです";
      resultPlayer2.classList.add("p-triple-menu__item__content__lose");
    }
    if (player1correctCount === player2correctCount) {
      resultPlayer1.textContent = "引き分け";
      resultPlayer1.classList.add("p-triple-menu__item__content__draw");
      resultPlayer2.textContent = "引き分け";
      resultPlayer2.classList.add("p-triple-menu__item__content__draw");
    }
    if (player1correctCount < player2correctCount) {
      resultPlayer1.innerHTML = "あなたの<br>負けです";
      resultPlayer1.classList.add("p-triple-menu__item__content__lose");
      resultPlayer2.innerHTML = "あなたの<br>勝利です";
      resultPlayer2.classList.add("p-triple-menu__item__content__win");
    }
  }

  const start = document.querySelector(".p-start");
  const startDual = document.querySelector(".p-start-dual");
  const tripleMenu = document.querySelector(".p-triple-menu");
  document.getElementById("js-dualPlay").addEventListener("click", () => {
    start.classList.add("u-display-hidden");
    startDual.classList.add("u-display-block");
  });

  const determine = document.querySelector(".p-start-dual__buttons-determine");
  determine.addEventListener("click", () => {
    if (document.getElementById("js-yourname1").value !== "" && document.getElementById("js-yourname2").value !== "") {
      startDual.classList.add("u-display-hidden");
      tripleMenu.classList.add("u-display-flex");
      reflect();
      init();
      showYourturn();
    } else if (document.getElementById("js-yourname1").value.length >= 8 && document.getElementById("js-yourname2").value.length >= 8) {
      alert("名前は７文字以内です！！！");
    } else {
      alert("名前を入力シテネ");
    }
    TODO: 条件分岐見直し;
  });

  function reflect() {
    const player1 = document.getElementById("js-yourname1").value;
    const player2 = document.getElementById("js-yourname2").value;
    const reflectedyourName1 = document.getElementById("js-reflectedName1");
    const reflectedyourName2 = document.getElementById("js-reflectedName2");
    reflectedyourName1.textContent = player1;
    reflectedyourName2.textContent = player2;
  }

  const clickReplay = document.getElementById("js-replay2");
  clickReplay.addEventListener("click", rePlay); //()を付けると即時関数になってしまう

  function rePlay() {
    changeStage();
    resetCount();
    resetStyles();
  }

  function changeStage() {
    cardBox.innerHTML = "";
    startDual.classList.remove("u-display-hidden");
    startDual.classList.add("u-display-block");
    tripleMenu.classList.remove("u-display-flex");
    tripleMenu.classList.add("u-display-hidden");
    firstCard = null;
    secondCard = null;
  }

  function resetCount() {
    flipCount = 0;
    player1correctCount = 0;
    player2correctCount = 0;
    totalcorrectCount = 0;
    turnCount = 0;
  }

  function resetStyles() {
    document.getElementById("js-player1-score").textContent = "得点 0点";
    document.getElementById("js-player2-score").textContent = "得点 0点";
    document.getElementById("js-yourname1").value = "";
    document.getElementById("js-yourname2").value = "";
    resultPlayer1.classList.remove(...resultPlayer1.classList);
    resultPlayer1.textContent = "";
    resultPlayer2.classList.remove(...resultPlayer2.classList);
    resultPlayer2.textContent = "";
  }
}
