import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { cardsActions } from "../redux/entities/cards";
import { List } from "../components/List";
import { Header } from "../components/Header";
import { RepositoryCard } from "../components/Cards/RepositoryCard";

const Styles = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  > .main {
    overflow: auto;
    padding: 2rem;
    background-color: #eeeeee;
    height: 100%;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }
`;

const Home: React.FC = (props) => {
  console.log(props);

  return (
    <Styles>
      <Header />
      <div className="main">
        <List title="Javascript">
          <RepositoryCard variant="ListItem" />
          <RepositoryCard variant="ListItem" />
          <RepositoryCard variant="ListItem" />
        </List>
        <List title="Node JS">
          <RepositoryCard variant="ListItem" />
          <RepositoryCard variant="ListItem" />
        </List>
      </div>
    </Styles>
  );
};

const mapStateToProps = (state: any) => ({
  cards: state.entities.cards,
});

const mapDispatchToProps = (dispatch: any) => ({
  deleteCard: (payload: any) => dispatch(cardsActions.delete(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);