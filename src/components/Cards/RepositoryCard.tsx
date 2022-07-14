import styled from "styled-components";
import ClampLines from "react-clamp-lines";
import moment from "moment";
import React from "react";
import type { GithubRepository } from "../../utils/github-api";

import { onToggletToList } from "../Header";

interface base {
  githubData: GithubRepository;
  variant: "SearchResult" | "ListItem";
}

interface SearchResult extends base {
  variant: "SearchResult";
  toggleToList?: onToggletToList;
  lists: {
    title: string;
    id: string;
    cardIds: string[];
  }[];
}

interface ListItem extends base {
  variant: "ListItem";
  removeFromList?: () => void;
  ref: any;
}

type props = SearchResult | ListItem;

const Styles = styled.div`
  display: flex;
  border-top: 1px solid lightgray;
  padding: 0.75rem;
  background-color: white;

  > .col-logo {
    margin-right: 1.2em;

    > a {
      img.logo {
        height: 3em;
        width: 3em;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }

  > .col-main {
    margin-right: 1em;

    > .title {
      font-size: 20px;
      color: #0366d6;
      margin-bottom: 0.5em;
    }

    > .description {
      margin-bottom: 1em;

      // <ClampLines />
      > div {
        color: hsl(0, 0%, 65%);
        font-weight: 300;
        line-height: 1.3em;
      }
    }

    > .stats {
      justify-self: flex-end;
      height: 1em;
      display: flex;
      overflow: hidden;
      padding: 0;

      > li {
        height: 100%;
        display: flex;
        align-items: center;
        margin-right: 1.5em;
        font-size: 14px;
        color: hsl(0, 0%, 50%);
        white-space: nowrap;

        > img {
          height: 80%;
          margin-right: 0.5em;
        }
      }
    }
  }
  > .col-controls {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    width: 1.5rem;
    flex-shrink: 0;
    position: relative;

    > .listsCount {
      white-space: nowrap;
      padding: 0.2em 0.5em;
      background-color: #277cdd;
      box-shadow: 1px 1px 5px grey;
      border-radius: 5px;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
      position: absolute;
      top: 0;
      right: 5em;
    }

    > img {
      width: 100%;
      cursor: pointer;
      position: relative;
    }

    > .popup {
      --bg-color: hsl(0, 0%, 90%);
      position: absolute;
      left: 50px;
      top: 50%;
      transform: translateY(-50%) scale(0);
      background-color: var(--bg-color);
      border-radius: 0.5em;
      transition: transform 150ms ease;
      box-shadow: 1px 1px 5px hsl(0, 0%, 70%);
      padding: 0.75em 1em;

      > p {
        white-space: nowrap;
        margin-bottom: 0.5em;
        color: hsl(0, 0%, 40%);
      }

      > .checkboxes {
        white-space: nowrap;
        > div {
          margin: 0.2em 0;
          display: flex;
          align-items: center;

          > input {
            margin-right: 0.5em;
          }
          > label {
            /* color: gray; */
          }
        }
      }

      &.show {
        transform: translateY(-50%) scale(1);
      }

      &::after {
        --size: 1em;
        content: "";
        position: absolute;
        top: 50%;
        left: calc(-1 * var(--size));
        transform: translateY(-50%);
        border-style: solid;
        border-width: var(--size) var(--size) var(--size) 0;
        border-color: transparent var(--bg-color) transparent transparent;
      }
    }

    ${(p: props) =>
      p.variant === "SearchResult" &&
      `
      justify-content: center;
      margin-right: 1em;
    `}
  }
`;

export const RepositoryCard = React.forwardRef<HTMLDivElement, props>((props, ref) => {
  const [popupOpen, setPopupOpen] = React.useState(false);

  const cardId = props.githubData.id.toString();

  let amountOfListsAssignedTo = 0;

  if (props.variant === "SearchResult") {
    const filtered = props.lists.filter(({ cardIds }) => cardIds.includes(cardId));

    amountOfListsAssignedTo = filtered.length;
  }

  const dividedRepoName = (() => {
    const [owner, repo] = props.githubData.full_name.split("/");

    return {
      owner,
      repo,
    };
  })();

  return (
    <Styles {...props} ref={ref}>
      {/* logo */}
      <div className="col-logo">
        <a href={props.githubData.owner.html_url} rel="noreferrer" target="_blank">
          <img className="logo" src={props.githubData.owner.avatar_url} alt="" />
        </a>
      </div>

      {/* main */}
      <div className="col-main">
        <h2 className="title">
          <a href={props.githubData.html_url} rel="noreferrer" target="_blank">
            {dividedRepoName.owner}/<b>{dividedRepoName.repo}</b>
          </a>
        </h2>
        {props.githubData.description && (
          <ClampLines
            id=""
            text={props.githubData.description}
            lines={props.variant === "ListItem" ? 4 : 2}
            buttons={false}
            className="description"
          />
        )}

        <ul className="stats">
          <li>
            <img src={process.env.PUBLIC_URL + "/icons/star.svg"} alt="star icon" />
            {props.githubData.stargazers_count}
          </li>
          <li>{props.githubData.open_issues} issues</li>
          <li>updated {moment(props.githubData.updated_at).fromNow()}</li>
        </ul>
      </div>

      {/* controls */}
      <div className="col-controls">
        {props.variant === "ListItem" && (
          <img
            src={process.env.PUBLIC_URL + "/icons/close.svg"}
            alt="remove from list"
            className="removeFromList-btn"
            onClick={() => props.removeFromList?.()}
          />
        )}
        {props.variant === "SearchResult" && (
          <>
            <img
              src={process.env.PUBLIC_URL + "/icons/plus.svg"}
              alt="add to list"
              className="addToList-btn-btn"
              onClick={() => {
                setPopupOpen(!popupOpen);
              }}
            ></img>
            {!!amountOfListsAssignedTo && (
              <span className="listsCount">In {amountOfListsAssignedTo} {amountOfListsAssignedTo === 1 ? "list" : "lists"}</span>
            )}
          </>
        )}

        <div className={`popup ${popupOpen ? "show" : ""}`}>
          {props.variant === "SearchResult" && (
            <>
              {!!props.lists?.length && <p>Add to</p>}
              <div className="checkboxes">
                {props.lists?.map(({ id, title, cardIds }) => {
                  const isAlreadyInList = cardIds.includes(cardId);

                  return (
                    <div key={id}>
                      <input
                        defaultChecked={isAlreadyInList}
                        type="checkbox"
                        name={title}
                        onChange={(e) => {
                          props.toggleToList?.({
                            githubData: props.githubData,
                            listId: id,
                            shouldRemove: !e.target.checked,
                          });
                        }}
                      ></input>
                      <label>{title}</label>
                    </div>
                  );
                })}

                {!props.lists?.length && <p>Please create a list first</p>}
              </div>
            </>
          )}
        </div>
      </div>
    </Styles>
  );
});
