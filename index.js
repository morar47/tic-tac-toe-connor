var X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

// document.onkeydown =  e => { switch(e.key){ 
//  case 'ArrowUp': handleClick() 
//  break;
//  case 'ArrowRight': /* do stuff */ break; 
//  case 'ArrowDown': /* do stuff */ break; 
//  case 'ArrowLeft': /* do stuff */ break; } }

//  placeMark() on "cursor"

// // startGame();

// // board = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "]

(function ($) {
  $.fn.formNavigation = function () {
      $(this).each(function () {
          $(this).find('input').on('keydown', function(e) {
              switch (e.which) {
                  case 39:
                      $(this).closest('td').next().find('input').focus(); break;
                  case 37:
                      $(this).closest('td').prev().find('input').focus(); break;
                  case 40:
                      $(this).closest('tr').next().children().eq($(this).closest('td').index()).find('input').focus(); break;
                  case 38:
                      $(this).closest('tr').prev().children().eq($(this).closest('td').index()).find('input').focus(); break;
              }
          });
      });
  };
})(jQuery);

startGame();

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

// I should write into the handleKey function a way to take key strokes to move and to placeMark.
// 
// function keyPushed(e) {
//   switch (e.keyCode) {
//     case 37:
//         handleClick(e);
//         break;
//     case 38:
//         alert('up');
//         break;
//     case 39:
//         alert('right');
//         break;
//     case 40:
//         alert('down');
//         break;
//     case 79:
//         alert('O');
//         break;
//     case 88:
//         alert('X');
//         break;
//   }
// }

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}
