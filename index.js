const KNIGHT_MOVES = [
  [1, 2],
  [1, -2],
  [2, 1],
  [2, -1],
  [-1, 2],
  [-1, -2],
  [-2, 1],
  [-2, -1],
];

//square is a wrapper for each position to store the predecessor to retrace once the target is found
class Square {
  constructor(position, pred) {
    this.position = position;
    this.pred = pred;
  }
}

//start - finish in format [0,0] -> [1,2] etc
function knightMoves(start, finish) {
  const queue = [];
  const arr = [];

  let startSquare = new Square(start, null);

  queue.push(startSquare);

  
  //while the target is not in the frontier pop the first node and expand it 
  while (!found(queue, finish)) {
    const currentSquare = queue.shift();

    //expand the first in queue
    calculatePositions(currentSquare).forEach((square) => {
      queue.push(square);
    });
  }
  
  //locate the goal square in the queue
  let goal = null;
  for (let i = 0; i < queue.length; i++) {
    if (
      queue[i].position[0] == finish[0] &&
      queue[i].position[1] == finish[1]
    ) {
      goal = queue[i];
    }
  }

  //retrace the moves taken to find the goal node and put onto new array
  let temp = goal;
  while (temp.pred) {
    arr.unshift(temp.position);
    temp = temp.pred;
  }
  arr.unshift(temp.position);

  //print out the path to the goal node
  console.log("You made it in ", arr.length - 1, " moves. Path:");
  arr.forEach(element=>{
    console.log(""+element);
  })
}

//checks each square in queue and compares to given target
function found(squares, target) {
  for (let i = 0; i < squares.length; i++) {
    if (
      squares[i].position[0] == target[0] &&
      squares[i].position[1] == target[1]
    ) {
      return true;
    }
  }
  return false;
}

function makeMove(start, move) {
  return [start.position[0] + move[0], start.position[1] + move[1]];
}

//expands a given node and ensures that moves stay on the game board
function calculatePositions(start) {
  let positions = [];
  KNIGHT_MOVES.forEach((move) => {
    let newPos = makeMove(start, move);
    if (newPos[0] >= 0 && newPos[0] < 8 && newPos[1] >= 0 && newPos[1] < 8) {
      let square = new Square(newPos, start);
      positions.push(square);
    }
  });
  return positions;
}


knightMoves([0, 0], [3, 6]);
knightMoves([6, 2], [2, 2]);
knightMoves([0, 7], [0, 0]);
knightMoves([1, 4], [6, 2]);
