import React from "react";
import { Button, Container, Header, Menu, Table } from "semantic-ui-react";

import "./App.css";

const App = (props) => {
  const { opponent, startHumanGame, startBasicGame, startUnbeatableGame, textColor, turnClick } = props;

  return (
    <div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>Tic Tac Toe</Menu.Item>
        </Container>
      </Menu>

      <Container textAlign="center">
        <Header as="h2" className="app-header">Choose An Opponent</Header>

        <Button className="start-button" content="Human" size="large" color="blue" onClick={startHumanGame}/>
        <Button className="start-button" content="Basic AI" size="large" color="teal" onClick={startBasicGame}/>
        <Button className="start-button" content="Unbeatable AI" size="large" color="red" onClick={startUnbeatableGame}/>

        <Header as="h3">You are playing against: <span style={{ color: `${textColor}` }}>{opponent}</span></Header>

        <Table basic="very" className="board" celled collapsing fixed unstackable>
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

      <p className="copyright">A project by ©Arthur Thungu, 2020</p>
    </div>
  );
};

export default App;
