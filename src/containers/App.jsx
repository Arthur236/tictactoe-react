import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

import AppComponent from "../components/App";

class App extends React.Component {
  state = {
    gameStarted: false,
    modalOpen: false,
    winner: ""
  };

  originalBoard;
  humanPlayer = "O";
  aiPlayer = "X";
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
    this.startGame();
  }

  startGame = () => {
    this.setState({ gameStarted: true });

    this.originalBoard = Array.from(Array(9).keys());

    this.cells.forEach(cell => {
      cell.innerText = "";
      cell.style.removeProperty("background-color");
    });
  };

  openModal = () => this.setState({ modalOpen: true });

  closeModal = () => this.setState({ modalOpen: false });

  turnClick = (e) => {
    if (this.state.gameStarted) {
      if (typeof this.originalBoard[e.target.id] === "number") {
        this.turn(e.target.id, this.humanPlayer);

        if (!this.checkTie()) {
          this.turn(this.bestSpot(), this.aiPlayer);
        }
      }
    }
  };

  turn = (squareId, player) => {
    this.originalBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;

    let gameWon = this.checkWin(this.originalBoard, player);

    if (gameWon) {
      this.gameOver(gameWon);
    }
  };

  checkWin = (board, player) => {
    // Check plays that have already been made by a player
    const plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, []);
    let gameWon = null;

    for(let [index, win] of this.winCombos.entries()) {
      if (win.every(elem => plays.indexOf(elem) > -1)) {
        gameWon = { index, player }
        break;
      }
    }

    return gameWon;
  };

  gameOver = (gameWon) => {
    for(let idx of this.winCombos[gameWon.index]) {
      document.getElementById(idx).style.backgroundColor = gameWon.player === this.humanPlayer ? "#2196f3" : "#f50057";
    }

    this.setState({ gameStarted: false });

    this.declareWinner(gameWon.player === this.humanPlayer ? "You win! 🥳" : "You lose! 😭");
  };

  bestSpot = () => {
    return this.emptySquares()[0];
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

  render() {
    const { modalOpen, winner } = this.state;

    return (
      <React.Fragment>
        <AppComponent startGame={this.startGame} turnClick={this.turnClick}/>

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
              this.startGame();
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
