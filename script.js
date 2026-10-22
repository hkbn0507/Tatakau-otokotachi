/* ========================================
   CHARACTER DATA
======================================== */

const CHARACTERS = {

  kawakami: {

    id: "kawakami",

    name: "川上",

    hp: 100,

    atk: 80,

    spd: 60,

    skill: "かたいほね",

    skillDescription:
      "ガード性能が大幅に上昇。ガード時に受けるダメージを1まで軽減する。",

    gaugeMultiplier: 1,

    specialName:
      "頭突き",

    specialDescription:
      "頭を巨大化させ、前方へ豪快に振り下ろす頭突き。近距離限定だが、命中すると30ダメージを与えて大きく吹き飛ばす。"

  },


  okazaki: {

    id: "okazaki",

    name: "岡崎",

    hp: 100,

    atk: 60,

    spd: 110,

    skill: "FLOW",

    skillDescription:
      "SPECIALゲージが通常より溜まりやすい。攻撃や被弾で得られるゲージ量が1.5倍になる。",

    gaugeMultiplier: 1.5,

    specialName:
      "すね毛ビーム",

    specialDescription:
      "脛から向いている方向へステージ端までビームを照射する。18ダメージ。低い位置を通るためジャンプで回避できる。"

  },


  yamada: {

    id: "yamada",

    name: "山田",

    hp: 110,

    atk: 50,

    spd: 60,

    skill: "ヤマダノオロチ",

    skillDescription:
      "8秒ごとに最大HPの5%を回復する。最大HPを超えて回復することはない。",

    gaugeMultiplier: 1,

    specialName:
      "デストロイモード起動",

    specialDescription:
      "HPを最大HPの50%回復し、8秒間デストロイモードになる。発動中はATK150・SPD130。パンチは30ダメージになり、敵を超強力に吹き飛ばす。発動中はSPECIALゲージが増加しない。"

  }

};


/* ========================================
   SELECT
======================================== */

let selectedCharacterId =
  "kawakami";


function getSelectedCharacter() {

  return CHARACTERS[
    selectedCharacterId
  ];

}


/* ========================================
   SCREEN
======================================== */

const screens =
  document.querySelectorAll(
    ".screen"
  );


function showScreen(id) {

  screens.forEach(
    screen => {

      screen.classList.remove(
        "active"
      );

    }
  );


  const target =
    document.getElementById(id);


  if (target) {

    target.classList.add(
      "active"
    );

  }

}


/* ========================================
   HOME
======================================== */

document
  .getElementById(
    "homeFight"
  )
  .addEventListener(
    "click",
    () => {

      showScreen(
        "modeScreen"
      );

    }
  );


document
  .querySelectorAll(
    ".back-button"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          showScreen(
            button.dataset.screen
          );

        }
      );

    }
  );


document
  .getElementById(
    "cpuBattle"
  )
  .addEventListener(
    "click",
    () => {

      showScreen(
        "selectScreen"
      );

    }
  );


/* ========================================
   COMING SOON
======================================== */

const popup =
  document.getElementById(
    "popup"
  );


const popupTitle =
  document.getElementById(
    "popupTitle"
  );


const popupText =
  document.getElementById(
    "popupText"
  );


function showComingSoon(
  title,
  text
) {

  popupTitle.textContent =
    title;


  popupText.innerHTML =
    text;


  popup.classList.add(
    "show"
  );

}


document
  .getElementById(
    "playerBattle"
  )
  .addEventListener(
    "click",
    () => {

      showComingSoon(
        "PLAYER BATTLE",
        "対人戦は現在準備中！<br>もう少し待ってね。"
      );

    }
  );


document
  .getElementById(
    "homeGacha"
  )
  .addEventListener(
    "click",
    () => {

      showComingSoon(
        "GACHA",
        "ガチャは現在開発中！<br>もう少し待ってね。"
      );

    }
  );


document
  .getElementById(
    "homeFighters"
  )
  .addEventListener(
    "click",
    () => {

      showComingSoon(
        "FIGHTERS",
        "キャラクター一覧は現在開発中！<br>もう少し待ってね。"
      );

    }
  );


document
  .getElementById(
    "closePopup"
  )
  .addEventListener(
    "click",
    () => {

      popup.classList.remove(
        "show"
      );

    }
  );


/* ========================================
   CHARACTER SELECT
======================================== */

const fighterCards =
  document.querySelectorAll(
    ".fighter-card"
  );


const selectedCharacterText =
  document.getElementById(
    "selectedCharacterText"
  );


fighterCards.forEach(
  card => {

    card.addEventListener(
      "click",
      event => {

        if (
          event.target.classList.contains(
            "detail-button"
          )
        ) {

          return;

        }


        selectedCharacterId =
          card.dataset.fighter;


        fighterCards.forEach(
          otherCard => {

            otherCard.classList.remove(
              "selected"
            );

          }
        );


        card.classList.add(
          "selected"
        );


        selectedCharacterText
          .textContent =
            "SELECTED：" +
            getSelectedCharacter().name;

      }
    );

  }
);


/* ========================================
   CHARACTER DETAIL
======================================== */

const characterDetailPopup =
  document.getElementById(
    "characterDetailPopup"
  );


const detailScroll =
  document.querySelector(
    ".detail-scroll"
  );


const detailName =
  document.getElementById(
    "detailName"
  );


const detailHP =
  document.getElementById(
    "detailHP"
  );


const detailATK =
  document.getElementById(
    "detailATK"
  );


const detailSPD =
  document.getElementById(
    "detailSPD"
  );


const detailSkill =
  document.getElementById(
    "detailSkill"
  );


const detailSkillDescription =
  document.getElementById(
    "detailSkillDescription"
  );


const detailSpecial =
  document.getElementById(
    "detailSpecial"
  );


const detailSpecialDescription =
  document.getElementById(
    "detailSpecialDescription"
  );


document
  .querySelectorAll(
    ".detail-button"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        event => {

          event.stopPropagation();


          const character =
            CHARACTERS[
              button.dataset.detail
            ];


          if (!character) {
            return;
          }


          detailName.textContent =
            character.name;


          detailHP.textContent =
            character.hp;


          detailATK.textContent =
            character.atk;


          detailSPD.textContent =
            character.spd;


          detailSkill.textContent =
            character.skill;


          detailSkillDescription
            .textContent =
              character.skillDescription;


          detailSpecial.textContent =
            character.specialName;


          detailSpecialDescription
            .textContent =
              character.specialDescription;


          detailScroll.scrollTop =
            0;


          characterDetailPopup
            .classList
            .add(
              "show"
            );

        }
      );

    }
  );


document
  .getElementById(
    "closeCharacterDetail"
  )
  .addEventListener(
    "click",
    () => {

      characterDetailPopup
        .classList
        .remove(
          "show"
        );

    }
  );


/* ========================================
   BATTLE DOM
======================================== */

const player =
  document.getElementById(
    "player"
  );


const enemy =
  document.getElementById(
    "enemy"
  );


const arena =
  document.getElementById(
    "arena"
  );


const playerHPBar =
  document.getElementById(
    "playerHP"
  );


const enemyHPBar =
  document.getElementById(
    "enemyHP"
  );


const playerGaugeBar =
  document.getElementById(
    "playerGauge"
  );


const enemyGaugeBar =
  document.getElementById(
    "enemyGauge"
  );


const specialButton =
  document.getElementById(
    "special"
  );


const message =
  document.getElementById(
    "message"
  );


const hitText =
  document.getElementById(
    "hitText"
  );


const resultPopup =
  document.getElementById(
    "resultPopup"
  );


const resultText =
  document.getElementById(
    "resultText"
  );


const battlePlayerName =
  document.getElementById(
    "battlePlayerName"
  );


/* ========================================
   BEAM
======================================== */

const shinBeam =
  document.createElement(
    "div"
  );


shinBeam.style.position =
  "absolute";


shinBeam.style.height =
  "20px";


shinBeam.style.display =
  "none";


shinBeam.style.zIndex =
  "8";


shinBeam.style.pointerEvents =
  "none";


shinBeam.style.background =
  "linear-gradient(to bottom, #ffffff, #67e8ff, #168cff)";


shinBeam.style.boxShadow =
  "0 0 8px #ffffff, 0 0 18px #50dcff, 0 0 30px #168cff";


shinBeam.style.borderRadius =
  "10px";


arena.appendChild(
  shinBeam
);


/* ========================================
   BATTLE DATA
======================================== */

let playerX = 120;

let enemyX = 600;


let playerY = 0;

let velocityY = 0;


let playerHP = 100;

let enemyHP = 100;


let playerGauge = 0;

let enemyGauge = 0;


let moveLeft = false;

let moveRight = false;


let jumping = false;

let jumpCount = 0;


let playerAttacking = false;

let enemyAttacking = false;


let playerStunned = false;

let enemyStunned = false;


let playerGuarding = false;


let gameOver = true;

let battleRunning = false;

let startingBattle = false;


/* 山田 */

let destroyMode =
  false;


let destroyModeTimer =
  null;


let yamadaHealTimer =
  null;


/* ========================================
   SETTINGS
======================================== */

const fighterWidth =
  72;


const bodyDistance =
  65;


const gravity =
  0.8;


const passOverHeight =
  38;


/* ========================================
   CURRENT STATS
======================================== */

function getCurrentATK() {

  const character =
    getSelectedCharacter();


  if (
    character.id ===
      "yamada" &&
    destroyMode
  ) {

    return 150;

  }


  return character.atk;

}


function getCurrentSPD() {

  const character =
    getSelectedCharacter();


  if (
    character.id ===
      "yamada" &&
    destroyMode
  ) {

    return 130;

  }


  return character.spd;

}


function getPlayerMoveSpeed() {

  return (
    1.8 +
    getCurrentSPD() *
    0.03
  );

}


/* ========================================
   DAMAGE
======================================== */

function getPunchDamage() {

  /*
    山田のデストロイパンチは
    専用で30ダメージ
  */

  if (
    selectedCharacterId ===
      "yamada" &&
    destroyMode
  ) {

    return 30;

  }


  return Math.max(
    1,
    Math.round(
      6 *
      getCurrentATK() /
      80
    )
  );

}


function getKickDamage() {

  return Math.max(
    1,
    Math.round(
      10 *
      getCurrentATK() /
      80
    )
  );

}


/* ========================================
   PLAYER GAUGE

   デストロイモード中は
   絶対に増えない
======================================== */

function addPlayerGauge(
  amount
) {

  if (
    selectedCharacterId ===
      "yamada" &&
    destroyMode
  ) {

    return;

  }


  const character =
    getSelectedCharacter();


  playerGauge +=
    amount *
    character.gaugeMultiplier;


  playerGauge =
    Math.min(
      100,
      playerGauge
    );

}


/* ========================================
   START BUTTON
======================================== */

document
  .getElementById(
    "startFight"
  )
  .addEventListener(
    "click",
    () => {

      if (
        startingBattle
      ) {

        return;

      }


      startingBattle =
        true;


      showScreen(
        "battleScreen"
      );


      requestAnimationFrame(
        () => {

          requestAnimationFrame(
            () => {

              startBattle();


              startingBattle =
                false;

            }
          );

        }
      );

    }
  );


/* ========================================
   START BATTLE
======================================== */

function startBattle() {

  const character =
    getSelectedCharacter();


  clearInterval(
    yamadaHealTimer
  );


  clearTimeout(
    destroyModeTimer
  );


  yamadaHealTimer =
    null;


  destroyModeTimer =
    null;


  destroyMode =
    false;


  player.classList.remove(
    "kawakami",
    "okazaki",
    "yamada",
    "destroy-mode",
    "headbutt-windup",
    "headbutt-strike"
  );


  player.classList.add(
    character.id
  );


  battlePlayerName.textContent =
    character.name;


  const arenaWidth =
    arena
      .getBoundingClientRect()
      .width;


  const safeWidth =
    arenaWidth > 100
      ? arenaWidth
      : window.innerWidth;


  playerX =
    Math.max(
      60,
      safeWidth * 0.18
    );


  enemyX =
    Math.min(
      safeWidth - 110,
      safeWidth * 0.72
    );


  playerY = 0;

  velocityY = 0;


  jumping = false;

  jumpCount = 0;


  playerHP =
    character.hp;


  enemyHP = 100;


  playerGauge = 0;

  enemyGauge = 0;


  moveLeft = false;

  moveRight = false;


  playerAttacking =
    false;


  enemyAttacking =
    false;


  playerStunned =
    false;


  enemyStunned =
    false;


  playerGuarding =
    false;


  gameOver = false;

  battleRunning = true;


  shinBeam.style.display =
    "none";


  player.classList.remove(
    "hurt",
    "guarding"
  );


  enemy.classList.remove(
    "hurt"
  );


  resetPlayerPose();


  enemy
    .querySelector(
      ".arm-right"
    )
    .style.transform =
      "rotate(-15deg)";


  resultPopup
    .classList
    .remove(
      "show"
    );


  updatePositions();

  updateHUD();


  message.textContent =
    "FIGHT!";


  message.style.display =
    "block";


  hitText.textContent =
    "";


  setTimeout(
    () => {

      if (!gameOver) {

        message.style.display =
          "none";

      }

    },
    850
  );


  if (
    character.id ===
    "yamada"
  ) {

    startYamadaHealing();

  }

}


/* ========================================
   ヤマダノオロチ
======================================== */

function startYamadaHealing() {

  clearInterval(
    yamadaHealTimer
  );


  yamadaHealTimer =
    setInterval(
      () => {

        if (
          gameOver ||
          !battleRunning ||
          selectedCharacterId !==
            "yamada"
        ) {

          return;

        }


        const maxHP =
          CHARACTERS.yamada.hp;


        if (
          playerHP >=
          maxHP
        ) {

          return;

        }


        const healAmount =
          maxHP * 0.05;


        playerHP =
          Math.min(
            maxHP,
            playerHP +
            healAmount
          );


        showHit(
          "HP +5%"
        );


        updateHUD();

      },
      8000
    );

}


/* ========================================
   RESET POSE
======================================== */

function resetPlayerPose() {

  player.classList.remove(
    "headbutt-windup",
    "headbutt-strike"
  );


  const head =
    player.querySelector(
      ".head"
    );


  head.style.width = "";
  head.style.height = "";
  head.style.left = "";
  head.style.top = "";
  head.style.transform = "";


  player
    .querySelector(
      ".body"
    )
    .style.transform =
      "";


  player
    .querySelector(
      ".arm-left"
    )
    .style.transform =
      "rotate(12deg)";


  player
    .querySelector(
      ".arm-right"
    )
    .style.transform =
      "rotate(-15deg)";


  player
    .querySelector(
      ".leg-right"
    )
    .style.transform =
      "rotate(-5deg)";

}


/* ========================================
   FACING
======================================== */

function playerFacingRight() {

  return (
    playerX <
    enemyX
  );

}


function updateFacing() {

  if (
    playerFacingRight()
  ) {

    player.style.transform =
      "scaleX(1)";


    enemy.style.transform =
      "scaleX(-1)";

  } else {

    player.style.transform =
      "scaleX(-1)";


    enemy.style.transform =
      "scaleX(1)";

  }

}


/* ========================================
   POSITION
======================================== */

function updatePositions() {

  let width =
    arena
      .getBoundingClientRect()
      .width;


  if (
    width < 100
  ) {

    width =
      window.innerWidth;

  }


  const maxX =
    Math.max(
      0,
      width -
      fighterWidth
    );


  playerX =
    Math.max(
      0,
      Math.min(
        playerX,
        maxX
      )
    );


  enemyX =
    Math.max(
      0,
      Math.min(
        enemyX,
        maxX
      )
    );


  player.style.left =
    playerX +
    "px";


  enemy.style.left =
    enemyX +
    "px";


  player.style.bottom =
    (
      14 +
      playerY
    ) +
    "px";


  updateFacing();

}


/* ========================================
   COLLISION
======================================== */

function canPlayerMove(
  newX
) {

  if (
    playerY >=
    passOverHeight
  ) {

    return true;

  }


  if (
    playerX <
    enemyX
  ) {

    return (
      newX +
      bodyDistance <=
      enemyX
    );

  }


  return (
    newX -
    bodyDistance >=
    enemyX
  );

}


/* ========================================
   GAME LOOP
======================================== */

function gameLoop() {

  if (
    battleRunning &&
    !gameOver
  ) {


    if (
      !playerStunned &&
      !playerAttacking &&
      !playerGuarding
    ) {

      const moveSpeed =
        getPlayerMoveSpeed();


      if (
        moveLeft
      ) {

        const newX =
          playerX -
          moveSpeed;


        if (
          canPlayerMove(
            newX
          )
        ) {

          playerX =
            newX;

        }

      }


      if (
        moveRight
      ) {

        const newX =
          playerX +
          moveSpeed;


        if (
          canPlayerMove(
            newX
          )
        ) {

          playerX =
            newX;

        }

      }

    }


    if (
      jumping
    ) {

      playerY +=
        velocityY;


      velocityY -=
        gravity;


      if (
        playerY <= 0
      ) {

        playerY = 0;

        velocityY = 0;

        jumping = false;

        jumpCount = 0;

      }

    }


    updatePositions();

  }


  requestAnimationFrame(
    gameLoop
  );

}


/* ========================================
   HOLD BUTTON
======================================== */

function holdButton(
  button,
  start,
  end
) {

  button.addEventListener(
    "pointerdown",
    event => {

      event.preventDefault();


      button.classList.add(
        "pressed"
      );


      start();

    }
  );


  const release =
    () => {

      button.classList.remove(
        "pressed"
      );


      end();

    };


  button.addEventListener(
    "pointerup",
    release
  );


  button.addEventListener(
    "pointercancel",
    release
  );


  button.addEventListener(
    "pointerleave",
    release
  );

}


/* LEFT */

holdButton(

  document.getElementById(
    "left"
  ),

  () => {

    moveLeft = true;

  },

  () => {

    moveLeft = false;

  }

);


/* RIGHT */

holdButton(

  document.getElementById(
    "right"
  ),

  () => {

    moveRight = true;

  },

  () => {

    moveRight = false;

  }

);


/* ========================================
   JUMP
======================================== */

document
  .getElementById(
    "jump"
  )
  .addEventListener(
    "pointerdown",
    event => {

      event.preventDefault();


      if (
        gameOver ||
        playerStunned ||
        playerAttacking ||
        playerGuarding
      ) {

        return;

      }


      if (
        jumpCount >= 2
      ) {

        return;

      }


      jumpCount++;


      jumping = true;


      velocityY = 14;

    }
  );


/* ========================================
   GUARD
======================================== */

holdButton(

  document.getElementById(
    "guard"
  ),


  () => {

    if (
      gameOver ||
      playerStunned ||
      playerAttacking
    ) {

      return;

    }


    playerGuarding =
      true;


    player.classList.add(
      "guarding"
    );

  },


  () => {

    playerGuarding =
      false;


    player.classList.remove(
      "guarding"
    );

  }

);


/* ========================================
   DISTANCE
======================================== */

function distance() {

  return Math.abs(
    playerX -
    enemyX
  );

}


/* ========================================
   TEXT
======================================== */

let hitTextTimer =
  null;


function showHit(text) {

  hitText.textContent =
    text;


  clearTimeout(
    hitTextTimer
  );


  hitTextTimer =
    setTimeout(
      () => {

        hitText.textContent =
          "";

      },
      500
    );

}


/* ========================================
   HUD
======================================== */

function updateHUD() {

  const character =
    getSelectedCharacter();


  playerHP =
    Math.max(
      0,
      Math.min(
        character.hp,
        playerHP
      )
    );


  enemyHP =
    Math.max(
      0,
      Math.min(
        100,
        enemyHP
      )
    );


  playerGauge =
    Math.max(
      0,
      Math.min(
        100,
        playerGauge
      )
    );


  enemyGauge =
    Math.max(
      0,
      Math.min(
        100,
        enemyGauge
      )
    );


  playerHPBar.style.width =
    (
      playerHP /
      character.hp *
      100
    ) +
    "%";


  enemyHPBar.style.width =
    enemyHP +
    "%";


  playerGaugeBar.style.width =
    playerGauge +
    "%";


  enemyGaugeBar.style.width =
    enemyGauge +
    "%";


  /*
    山田デストロイ中は
    SPECIALボタンも
    使用不可表示
  */

  if (
    character.id ===
      "yamada" &&
    destroyMode
  ) {

    specialButton
      .classList
      .remove(
        "ready"
      );


    specialButton.textContent =
      "DESTROY";

  }

  else if (
    playerGauge >= 100
  ) {

    specialButton
      .classList
      .add(
        "ready"
      );


    specialButton.textContent =
      character.specialName;

  }

  else {

    specialButton
      .classList
      .remove(
        "ready"
      );


    specialButton.textContent =
      "SPECIAL";

  }


  if (
    enemyHP <= 0
  ) {

    finishGame(
      "YOU WIN!"
    );

  }

  else if (
    playerHP <= 0
  ) {

    finishGame(
      "YOU LOSE"
    );

  }

}


/* ========================================
   ENEMY STUN / KNOCKBACK
======================================== */

function stunEnemy(
  duration,
  knockback
) {

  enemyStunned =
    true;


  enemy.classList.remove(
    "hurt"
  );


  void enemy.offsetWidth;


  enemy.classList.add(
    "hurt"
  );


  if (
    enemyX >
    playerX
  ) {

    enemyX +=
      knockback;

  } else {

    enemyX -=
      knockback;

  }


  updatePositions();


  setTimeout(
    () => {

      enemy.classList.remove(
        "hurt"
      );


      enemyStunned =
        false;

    },
    duration
  );

}


/* ========================================
   PLAYER STUN
======================================== */

function stunPlayer(
  duration,
  knockback
) {

  playerStunned =
    true;


  moveLeft = false;

  moveRight = false;


  playerGuarding =
    false;


  player.classList.remove(
    "guarding"
  );


  player.classList.remove(
    "hurt"
  );


  void player.offsetWidth;


  player.classList.add(
    "hurt"
  );


  if (
    playerX <
    enemyX
  ) {

    playerX -=
      knockback;

  } else {

    playerX +=
      knockback;

  }


  updatePositions();


  setTimeout(
    () => {

      player.classList.remove(
        "hurt"
      );


      playerStunned =
        false;

    },
    duration
  );

}


/* ========================================
   PUNCH
======================================== */

document
  .getElementById(
    "punch"
  )
  .addEventListener(
    "pointerdown",
    event => {

      event.preventDefault();


      if (
        gameOver ||
        playerAttacking ||
        playerStunned ||
        playerGuarding
      ) {

        return;

      }


      playerAttacking =
        true;


      const arm =
        player.querySelector(
          ".arm-right"
        );


      arm.style.transform =
        "rotate(-90deg)";


      setTimeout(
        () => {

          if (
            distance() <
              108 &&
            !gameOver
          ) {

            const isDestroyPunch =
              selectedCharacterId ===
                "yamada" &&
              destroyMode;


            enemyHP -=
              getPunchDamage();


            /*
              デストロイ中は
              addPlayerGaugeが
              何もしないので
              ゲージは増えない
            */

            addPlayerGauge(
              12
            );


            enemyGauge +=
              5;


            if (
              isDestroyPunch
            ) {

              showHit(
                "DESTROY PUNCH!!"
              );


              /*
                以前 80
                ↓
                3倍の 240
              */

              stunEnemy(
                650,
                240
              );

            } else {

              showHit(
                "HIT!"
              );


              stunEnemy(
                260,
                18
              );

            }


            updateHUD();

          }

        },
        70
      );


      setTimeout(
        () => {

          arm.style.transform =
            "rotate(-15deg)";


          playerAttacking =
            false;

        },
        240
      );

    }
  );


/* ========================================
   KICK
======================================== */

document
  .getElementById(
    "kick"
  )
  .addEventListener(
    "pointerdown",
    event => {

      event.preventDefault();


      if (
        gameOver ||
        playerAttacking ||
        playerStunned ||
        playerGuarding
      ) {

        return;

      }


      playerAttacking =
        true;


      const leg =
        player.querySelector(
          ".leg-right"
        );


      leg.style.transform =
        "rotate(-75deg)";


      setTimeout(
        () => {

          if (
            distance() <
              125 &&
            !gameOver
          ) {

            enemyHP -=
              getKickDamage();


            addPlayerGauge(
              18
            );


            enemyGauge +=
              8;


            showHit(
              "HEAVY!"
            );


            stunEnemy(
              420,
              35
            );


            updateHUD();

          }

        },
        120
      );


      setTimeout(
        () => {

          leg.style.transform =
            "rotate(-5deg)";


          playerAttacking =
            false;

        },
        390
      );

    }
  );


/* ========================================
   SPECIAL
======================================== */

specialButton
  .addEventListener(
    "pointerdown",
    event => {

      event.preventDefault();


      /*
        デストロイ中は
        SPECIAL自体も押せない
      */

      if (
        selectedCharacterId ===
          "yamada" &&
        destroyMode
      ) {

        return;

      }


      if (
        gameOver ||
        playerGauge < 100 ||
        playerAttacking ||
        playerStunned ||
        playerGuarding
      ) {

        return;

      }


      const character =
        getSelectedCharacter();


      playerGauge =
        0;


      updateHUD();


      if (
        character.id ===
        "kawakami"
      ) {

        kawakamiHeadbutt();

      }

      else if (
        character.id ===
        "okazaki"
      ) {

        okazakiShinBeam();

      }

      else if (
        character.id ===
        "yamada"
      ) {

        yamadaDestroyMode();

      }

    }
  );


/* ========================================
   川上
======================================== */

function kawakamiHeadbutt() {

  playerAttacking =
    true;


  moveLeft = false;

  moveRight = false;


  const facingRight =
    playerFacingRight();


  message.textContent =
    "頭突き！";


  message.style.display =
    "block";


  player.classList.add(
    "headbutt-windup"
  );


  setTimeout(
    () => {

      if (
        gameOver
      ) {

        return;

      }


      player.classList.remove(
        "headbutt-windup"
      );


      player.classList.add(
        "headbutt-strike"
      );


      message.style.display =
        "none";


      if (
        facingRight
      ) {

        playerX +=
          24;

      } else {

        playerX -=
          24;

      }


      updatePositions();


      const headbuttRange =
        145;


      let enemyInFront =
        false;


      if (
        facingRight
      ) {

        enemyInFront =
          enemyX >
          playerX -
          20;

      } else {

        enemyInFront =
          enemyX <
          playerX +
          20;

      }


      if (
        distance() <=
          headbuttRange &&
        enemyInFront &&
        playerY <
          65 &&
        !gameOver
      ) {

        enemyHP -=
          30;


        showHit(
          "HEADBUTT!!"
        );


        stunEnemy(
          900,
          105
        );


        updateHUD();

      } else {

        showHit(
          "MISS!"
        );

      }

    },
    280
  );


  setTimeout(
    () => {

      player.classList.remove(
        "headbutt-windup",
        "headbutt-strike"
      );


      resetPlayerPose();


      playerAttacking =
        false;

    },
    780
  );

}


/* ========================================
   岡崎
======================================== */

function okazakiShinBeam() {

  playerAttacking =
    true;


  moveLeft = false;

  moveRight = false;


  message.textContent =
    "すね毛ビーム！";


  message.style.display =
    "block";


  const arenaWidth =
    arena
      .getBoundingClientRect()
      .width;


  const facingRight =
    playerFacingRight();


  const beamBottom =
    38 +
    playerY;


  shinBeam.style.bottom =
    beamBottom +
    "px";


  if (
    facingRight
  ) {

    const beamStart =
      playerX +
      45;


    shinBeam.style.left =
      beamStart +
      "px";


    shinBeam.style.width =
      Math.max(
        0,
        arenaWidth -
        beamStart
      ) +
      "px";

  } else {

    const beamEnd =
      playerX +
      25;


    shinBeam.style.left =
      "0px";


    shinBeam.style.width =
      Math.max(
        0,
        beamEnd
      ) +
      "px";

  }


  setTimeout(
    () => {

      if (
        gameOver
      ) {

        playerAttacking =
          false;

        return;

      }


      message.style.display =
        "none";


      shinBeam.style.display =
        "block";


      let enemyInFront =
        false;


      if (
        facingRight
      ) {

        enemyInFront =
          enemyX >
          playerX;

      } else {

        enemyInFront =
          enemyX <
          playerX;

      }


      if (
        enemyInFront &&
        !gameOver
      ) {

        enemyHP -=
          18;


        showHit(
          "BEAM HIT!"
        );


        stunEnemy(
          520,
          40
        );


        updateHUD();

      }

    },
    350
  );


  setTimeout(
    () => {

      shinBeam.style.display =
        "none";


      playerAttacking =
        false;

    },
    750
  );

}


/* ========================================
   山田 DESTROY MODE
======================================== */

function yamadaDestroyMode() {

  clearTimeout(
    destroyModeTimer
  );


  const maxHP =
    CHARACTERS.yamada.hp;


  /*
    HP +50%
  */

  playerHP =
    Math.min(
      maxHP,
      playerHP +
      maxHP * 0.5
    );


  /*
    SPECIAL発動したので
    ゲージは0のまま固定
  */

  playerGauge =
    0;


  destroyMode =
    true;


  player.classList.add(
    "destroy-mode"
  );


  message.textContent =
    "DESTROY MODE";


  message.style.display =
    "block";


  showHit(
    "HP +50%"
  );


  updateHUD();


  setTimeout(
    () => {

      if (
        !gameOver
      ) {

        message.style.display =
          "none";

      }

    },
    900
  );


  /*
    8秒後
  */

  destroyModeTimer =
    setTimeout(
      () => {

        destroyMode =
          false;


        player.classList.remove(
          "destroy-mode"
        );


        /*
          解除時もゲージ0
        */

        playerGauge =
          0;


        updateHUD();


        if (
          !gameOver
        ) {

          message.textContent =
            "DESTROY MODE END";


          message.style.display =
            "block";


          setTimeout(
            () => {

              if (
                !gameOver
              ) {

                message.style.display =
                  "none";

              }

            },
            650
          );

        }

      },
      8000
    );

}


/* ========================================
   CPU
======================================== */

function cpuAI() {

  if (
    !battleRunning ||
    gameOver ||
    enemyStunned ||
    enemyAttacking
  ) {

    return;

  }


  const d =
    distance();


  if (
    d > 92
  ) {

    let newX =
      enemyX;


    if (
      enemyX >
      playerX
    ) {

      newX -=
        2.1;


      if (
        playerY >=
          passOverHeight ||
        newX -
          bodyDistance >=
          playerX
      ) {

        enemyX =
          newX;

      }

    } else {

      newX +=
        2.1;


      if (
        playerY >=
          passOverHeight ||
        newX +
          bodyDistance <=
          playerX
      ) {

        enemyX =
          newX;

      }

    }


    updatePositions();

  } else {

    enemyAttack();

  }

}


/* ========================================
   CPU ATTACK
======================================== */

function enemyAttack() {

  if (
    enemyAttacking ||
    enemyStunned ||
    gameOver
  ) {

    return;

  }


  if (
    playerY >= 75
  ) {

    return;

  }


  enemyAttacking =
    true;


  const arm =
    enemy.querySelector(
      ".arm-right"
    );


  arm.style.transform =
    "rotate(-90deg)";


  setTimeout(
    () => {

      if (
        distance() <
          112 &&
        playerY <
          75 &&
        !gameOver
      ) {

        const character =
          getSelectedCharacter();


        if (
          playerGuarding
        ) {

          if (
            character.id ===
            "kawakami"
          ) {

            playerHP -=
              1;

          } else {

            playerHP -=
              3;

          }


          enemyGauge +=
            4;


          addPlayerGauge(
            4
          );


          showHit(
            "BLOCK!"
          );

        } else {

          playerHP -=
            7;


          enemyGauge +=
            12;


          addPlayerGauge(
            7
          );


          showHit(
            "HIT!"
          );


          stunPlayer(
            380,
            28
          );

        }


        updateHUD();

      }


      arm.style.transform =
        "rotate(-15deg)";


      setTimeout(
        () => {

          enemyAttacking =
            false;

        },
        450
      );

    },
    180
  );

}


/* ========================================
   END
======================================== */

function finishGame(text) {

  if (
    gameOver
  ) {

    return;

  }


  gameOver =
    true;


  battleRunning =
    false;


  moveLeft =
    false;


  moveRight =
    false;


  playerGuarding =
    false;


  clearInterval(
    yamadaHealTimer
  );


  clearTimeout(
    destroyModeTimer
  );


  yamadaHealTimer =
    null;


  destroyModeTimer =
    null;


  destroyMode =
    false;


  player.classList.remove(
    "destroy-mode"
  );


  shinBeam.style.display =
    "none";


  resultText.textContent =
    text;


  setTimeout(
    () => {

      resultPopup
        .classList
        .add(
          "show"
        );

    },
    450
  );

}


/* ========================================
   REMATCH
======================================== */

document
  .getElementById(
    "rematch"
  )
  .addEventListener(
    "click",
    () => {

      resultPopup
        .classList
        .remove(
          "show"
        );


      requestAnimationFrame(
        () => {

          requestAnimationFrame(
            () => {

              startBattle();

            }
          );

        }
      );

    }
  );


/* ========================================
   HOME
======================================== */

document
  .getElementById(
    "returnHome"
  )
  .addEventListener(
    "click",
    () => {

      resultPopup
        .classList
        .remove(
          "show"
        );


      clearInterval(
        yamadaHealTimer
      );


      clearTimeout(
        destroyModeTimer
      );


      yamadaHealTimer =
        null;


      destroyModeTimer =
        null;


      destroyMode =
        false;


      player.classList.remove(
        "destroy-mode"
      );


      shinBeam.style.display =
        "none";


      battleRunning =
        false;


      gameOver =
        true;


      showScreen(
        "homeScreen"
      );

    }
  );


/* ========================================
   RESIZE
======================================== */

window.addEventListener(
  "resize",
  () => {

    if (
      battleRunning &&
      !gameOver
    ) {

      updatePositions();

    }

  }
);


/* ========================================
   START
======================================== */

setInterval(
  cpuAI,
  35
);


gameLoop();
