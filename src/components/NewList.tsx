import styled from "styled-components";
import { Form, Field } from "react-final-form";
import React from "react";
import { useAppDispatch } from "../hooks/redux";
import { createList } from "../redux/entities/lists";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  border-radius: 5px;
  margin-right: 2rem;
  margin-bottom: 2rem;
  flex-grow: 0;
  box-shadow: 1px 1px 5px lightgray;
  box-shadow: unset;
  border: 2px dashed lightgray;

  > form {
    position: relative;

    > input {
      margin: 0;
      padding: 1.2rem 1rem;
      font-size: 24px;
      border: 0;
      width: 100%;
      outline: 0;
      color: gray;
      background-color: transparent;
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

export const NewList: React.FC = (props) => {
  const dispatch = useAppDispatch();

  const onFormSubmit = (data: { title: string }, form: any) => {
    dispatch(
      createList({
        title: data.title,
      })
    );

    form.mutators.clearTitle();
  };

  return (
    <Styles {...props}>
      <Form
        onSubmit={onFormSubmit}
        mutators={{
          clearTitle: (args, state) => {
            state.fields.title.change("");
          },
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field name="title" component="input" placeholder="Enter Name" spellCheck={false} />

            <img alt="create new list" src={process.env.PUBLIC_URL + "/icons/plus.svg"} />
          </form>
        )}
      </Form>
    </Styles>
  );
};
