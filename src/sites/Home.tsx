import React from "react";
import styled from "styled-components";

import { List } from "../components/List";
import { NewList } from "../components/NewList";
import { Header } from "../components/Header";

import { useAppSelector } from "../hooks/redux";

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
    align-content: flex-start;
    flex-wrap: wrap;
  }
`;

export const Home: React.FC = () => {
  const listIds = useAppSelector((state) => state.entities.lists.allIds);

  return (
    <Styles>
      <Header />
      <div className="main">
        {listIds.map((id) => (
          <List key={id} id={id} />
        ))}

        <NewList />
      </div>
    </Styles>
  );
};
