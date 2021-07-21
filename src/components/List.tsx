import styled from "styled-components";
import { Form, Field } from "react-final-form";
import React from "react";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { renameList, deleteList } from "../redux/entities/lists";
import { ListCard } from "./ListCard";

const Styles = styled.div<props>`
  display: flex;
  flex-direction: column;
  width: 500px;
  border-radius: 5px;
  margin-right: 2rem;
  margin-bottom: 2rem;
  flex-grow: 0;
  box-shadow: 1px 1px 5px lightgray;

  > form {
    position: relative;

    > .controls {
      position: absolute;
      top: .5em;
      right: .5em;
      width: 1.5rem;
      

      > img {
        width: 100%;
        cursor:pointer;
        margin-right: 1em;
      }
    }

    > input {
      margin: 0;
      padding: .75rem;
      font-size: 24px;
      border: 0;
      width: 100%;
      outline: 0;
    }

    > img {
      height: 2em;
      width: 2em;
      object-fit: contain;
      position: absolute;
      top: 50%;
      right: 1em;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
`;

interface props {
  /** Redux store id */
  id: string;
}

export const List: React.FC<props> = (props) => {
  const dispatch = useAppDispatch();

  const { title, id, cardIds } = useAppSelector((state) => state.entities.lists.byId[props.id]);

  const onFormSubmit = (data: { title: string }) => {
    dispatch(
      renameList({
        id,
        title: data.title,
      })
    );
  };

  const onListDelete = () => {
    dispatch(
      deleteList({
        id,
      })
    );
  };

  return (
    <Styles {...props}>
      <Form onSubmit={onFormSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="title"
              component="input"
              defaultValue={title}
              placeholder="Enter Name"
              spellCheck={false}
            />

            <div className="controls" onClick={onListDelete}>
              <img src={process.env.PUBLIC_URL + "/icons/close.svg"} alt="delete list"/>
            </div>
          </form>
        )}
      </Form>
      {cardIds.map((id) => (
        <ListCard id={id} key={id} />
      ))}
    </Styles>
  );
};
