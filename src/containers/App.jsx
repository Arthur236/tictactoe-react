import React from "react";
import { Button, Header, Icon, Modal } from "semantic-ui-react";

import AppComponent from "../components/App";

class App extends React.Component {
  state = {
    gameStarted: false,
    modalOpen: false
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
    this.setState({
      gameStarted: true
    });

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
      this.turn(e.target.id, this.humanPlayer);
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
        gameWon = {
          index,
          player
        }
        break;
      }
    }

    return gameWon;
  };

  gameOver = (gameWon) => {
    for(let index of this.winCombos[gameWon.index]) {
      document.getElementById(index.toString()).style.backgroundColor = gameWon.player === this.humanPlayer ?
        "#2196f3" : "#f50057";
    }

    this.setState({
      gameStarted: false
    });
  };

  render() {
    const { modalOpen } = this.state;

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
            A Game has not yet started
          </Header>

          <Modal.Content>
            <p>Would you like to start one now?</p>
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
