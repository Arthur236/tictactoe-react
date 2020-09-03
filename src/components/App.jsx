import React from "react";
import { Button, Container, Table } from "semantic-ui-react";

import "./App.css";

const App = (props) => {
  const { startGame, turnClick } = props;

  return (
    <div>
      <Container textAlign="center">
        <Table basic="very" className="board" celled collapsing>
          <Table.Body>
            <Table.Row>
              <Table.Cell id={0} className="cell" onClick={turnClick}/>
              <Table.Cell id={1} className="cell" onClick={turnClick}/>
              <Table.Cell id={2} className="cell" onClick={turnClick}/>
            </Table.Row>

            <Table.Row>
              <Table.Cell id={3} className="cell" onClick={turnClick}/>
              <Table.Cell id={4} className="cell" onClick={turnClick}/>
              <Table.Cell id={5} className="cell" onClick={turnClick}/>
            </Table.Row>

            <Table.Row>
              <Table.Cell id={6} className="cell" onClick={turnClick}/>
              <Table.Cell id={7} className="cell" onClick={turnClick}/>
              <Table.Cell id={8} className="cell" onClick={turnClick}/>
            </Table.Row>
          </Table.Body>
        </Table>

        <Button className="start-button" content="Start Game" size="huge" primary onClick={startGame}/>
      </Container>
    </div>
  );
};

export default App;
