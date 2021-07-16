import styled from "styled-components";

import React from "react";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  width: 27rem;
  box-shadow: 1px 1px 5px lightgray;
  background-color: white;
  border-radius: 5px;
  margin-right: 2rem;
  margin-bottom: 2rem;
  flex-grow: 0;

  h1 {
    margin: 0;
    padding: 1.2rem 1rem;
    font-size: 24px;
  }
`;

interface props {
  title: string
}

export const List: React.FC<props> = (props) => {
  return (
    <Styles>
      <h1>{props.title}</h1>
      {props.children}
    </Styles>
  );
};
