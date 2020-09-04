import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { SemanticToastContainer, toast } from "react-semantic-toasts";

import AppComponent from "../components/App";

import "react-semantic-toasts/styles/react-semantic-alert.css";

class App extends React.Component {
  state = {
    gameStarted: false,
    modalOpen: false,
    opponent: "",
    winner: "",
    xIsNext: true
  };

  originalBoard;
  humanPlayer = "X";
  aiPlayer = "O";
  cells;

  winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
  ];

  componentDidMount() {
    this.cells = document.querySelectorAll(".cell");
  }

  startGame = (opponent) => {
    this.setState({ gameStarted: true, opponent });

    this.originalBoard = Array.from(Array(9).keys());

    this.cells.forEach(cell => {
      cell.innerText = "";
      cell.style.removeProperty("background-color");
    });
  };

  startHumanGame = () => {
    this.startGame("Human");
  };

  startBasicGame = () => {
    this.startGame("Basic AI");
  };

  startUnbeatableGame = () => {
    this.startGame("Unbeatable AI");
  };

  isHuman = () => this.state.opponent === "Human";
  isBasicAI = () => this.state.opponent === "Basic AI";
  isUnbeatableAI = () => this.state.opponent === "Unbeatable AI";

  openModal = () => this.setState({ modalOpen: true });

  closeModal = () => this.setState({ modalOpen: false });

  turnClick = (e) => {
    if (this.state.gameStarted && typeof this.originalBoard[e.target.id] === "number") {
      if (this.isHuman()) {
        if (this.state.xIsNext) {
          this.turn(e.target.id, this.humanPlayer);
          this.setState({ xIsNext: false });
        } else {
          this.turn(e.target.id, this.aiPlayer);
          this.setState({ xIsNext: true });
        }
      } else {
        this.turn(e.target.id, this.humanPlayer);

        if (!this.checkTie() && !this.checkWin(this.originalBoard, this.humanPlayer)) {
          this.turn(this.bestSpot(), this.aiPlayer);
        }
      }
    } else {
      toast({
        type: "info",
        icon: "envelope",
        title: "Info",
        description: "Choose an opponent...",
        animation: "jiggle",
        time: 5000
      });
    }
  };

  turn = (squareId, player) => {
    if (this.state.gameStarted) {
      this.originalBoard[squareId] = player;
      document.getElementById(squareId).innerText = player;

      let gameWon = this.checkWin(this.originalBoard, player);

      if (gameWon) {
        this.gameOver(gameWon);
      }
    }
  };

  checkWin = (board, player) => {
    // Check plays that have already been made by a player
    const plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
    let gameWon = null;

    for (let [index, win] of this.winCombos.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWon = { index, player };
        break;
      }
    }

    return gameWon;
  };

  gameOver = (gameWon) => {
    this.setState({ gameStarted: false });

    for (let idx of this.winCombos[gameWon.index]) {
      document.getElementById(idx).style.backgroundColor = gameWon.player === this.humanPlayer ? "#2196f3" : "#f50057";
    }

    if (!this.isHuman()) {
      this.declareWinner(gameWon.player === this.humanPlayer ? "You win! 🥳" : "You lose! 😭");
    } else {
      this.declareWinner(gameWon.player === this.humanPlayer ? "Player 1 Wins! 🥳" : "Player 2 Wins! 🥳");
    }
  };

  bestSpot = () => {
    if (this.isBasicAI()) {
      const emptySpaces = this.emptySquares();
      return emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
    }

    return this.minimax(this.originalBoard, this.aiPlayer).index;
  };

  emptySquares = () => {
    return this.originalBoard.filter(s => typeof s === "number");
  };

  checkTie = () => {
    if (this.emptySquares().length === 0) {
      this.cells.forEach(cell => {
        cell.style.backgroundColor = "#4caf50";
      });

      this.setState({ gameStarted: false });
      this.declareWinner("Game Tied!");

      return true;
    }

    return false;
  };

  declareWinner = (winner) => {
    this.setState({ gameStarted: false, winner });
    this.openModal();
  };

  minimax = (newBoard, player) => {
    const availableSpots = this.emptySquares();

    // Check terminal states, ie win states
    if (this.checkWin(newBoard, this.humanPlayer)) {
      return { score: -10 };
    } else if (this.checkWin(newBoard, this.aiPlayer)) {
      return { score: 10 };
    } else if (availableSpots.length === 0) {
      return { score: 0 };
    }

    const moves = [];
    availableSpots.forEach((spot, idx) => {
      const move = {};
      move.index = newBoard[availableSpots[idx]];
      newBoard[availableSpots[idx]] = player;

      if (player === this.aiPlayer) {
        const result = this.minimax(newBoard, this.humanPlayer);
        move.score = result.score;
      } else {
        const result = this.minimax(newBoard, this.aiPlayer);
        move.score = result.score;
      }

      newBoard[availableSpots[idx]] = move.index;
      moves.push(move);
    });

    let bestMove;

    if (player === this.aiPlayer) {
      let bestScore = -10000;

      moves.forEach((move, i) => {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      });
    } else {
      let bestScore = 10000;

      moves.forEach((move, i) => {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      });
    }

    return moves[bestMove];
  };

  render() {
    const { modalOpen, opponent, winner } = this.state;
    let textColor = "#000000";

    if (this.isHuman()) {
      textColor = "#2185d0";
    } else if (this.isBasicAI()) {
      textColor = "#00b5ad";
    } else if (this.isUnbeatableAI()) {
      textColor = "#db2828";
    }

    return (
      <React.Fragment>
        <SemanticToastContainer/>

        <AppComponent
          opponent={opponent}
          startHumanGame={this.startHumanGame}
          startBasicGame={this.startBasicGame}
          startUnbeatableGame={this.startUnbeatableGame}
          textColor={textColor}
          turnClick={this.turnClick}
        />

        <Modal
          basic
          onClose={this.closeModal}
          onOpen={this.openModal}
          open={modalOpen}
        >
          <Header icon>
            <Icon name="chess queen"/>
            {winner}
          </Header>

          <Modal.Content>
            <p>Start a new game?</p>
          </Modal.Content>

          <Modal.Actions>
            <Button basic color="red" inverted onClick={this.closeModal}>
              <Icon name="remove"/> No
            </Button>
            <Button color="green" inverted onClick={() => {
              this.closeModal();

              if (opponent === "Human") {
                this.startHumanGame();
              } else if (opponent === "Basic AI") {
                this.startBasicGame();
              } else if (opponent === "Unbeatable AI") {
                this.startUnbeatableGame();
              }
            }}>
              <Icon name="checkmark"/> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default App;
