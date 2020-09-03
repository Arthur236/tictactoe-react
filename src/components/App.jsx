import React from "react";
import { Button, Container, Message, Table } from "semantic-ui-react";

import "./App.css";

function App() {
  return (
    <div>
      <Container textAlign="center">
        <Table basic="very" className="board" celled collapsing>
          <Table.Body>
            <Table.Row>
              <Table.Cell id={0}></Table.Cell>
              <Table.Cell id={1}></Table.Cell>
              <Table.Cell id={2}></Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell id={3}></Table.Cell>
              <Table.Cell id={4}></Table.Cell>
              <Table.Cell id={5}></Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.Cell id={6}></Table.Cell>
              <Table.Cell id={7}></Table.Cell>
              <Table.Cell id={8}></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>

        <div className="endgame">
          <Message>
            <Message.Header>Game Over</Message.Header>
            <p/>
          </Message>
        </div>

        <Button className="start-button" content="Start Game" size="huge" primary/>
      </Container>
    </div>
  );
}

export default App;
