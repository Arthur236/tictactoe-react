import React from "react";
import { Button, Container, Header, Table } from "semantic-ui-react";

import "./App.css";

const App = (props) => {
  const { opponent, startHumanGame, startBasicGame, startUnbeatableGame, turnClick } = props;

  return (
    <div>
      <Container textAlign="center">
        <Header as="h2" className="app-header">Choose An Opponent</Header>

        <Button className="start-button" content="Human" size="huge" color="blue" onClick={startHumanGame}/>
        <Button className="start-button" content="Basic AI" size="huge" color="teal" onClick={startBasicGame}/>
        <Button className="start-button" content="Unbeatable AI" size="huge" color="red" onClick={startUnbeatableGame}/>

        <Header as="h3">Playing Against {opponent}</Header>

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
      </Container>
    </div>
  );
};

export default App;
