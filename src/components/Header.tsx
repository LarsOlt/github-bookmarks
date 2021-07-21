import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { useState, useRef } from "react";

import { RepositoryCard } from "./Cards/RepositoryCard";
import { GithubAPI } from "../utils/github-api";
import { useClickLocator } from "../hooks/useClickLocator";
import type { GithubRepository, GithubRepositorySearchResponse } from "../utils/github-api";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { assignCardToList } from "../redux/actionCreators";

const Styles = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  box-shadow: 0 0 3px gray;
  padding: 1em 3em;
  z-index: 1;
  position: relative;

  > form {
    display: flex;
    align-items: center;
    height: 100%;

    > img[alt="search"] {
      height: 80%;
    }

    > img[alt="loading"] {
      height: 120%;
    }

    > img {
      height: 100%;
    }

    > input[name="search"] {
      margin-left: 1em;
      margin-right: 1em;

      &::placeholder {
        font-style: italic;
      }

      &:focus {
        border-color: black;
      }

      border: 0;
      padding: 0.5em;
      transition: all 150ms;
      outline: 0;
      border: 1px solid transparent;
      border-radius: 3px;
    }
  }

  > .search-dropdown {
    position: absolute;
    top: 4rem;
    left: 2rem;
    width: 700px;
    background-color: white;
    box-shadow: 0 1px 5px grey;

    > .footer {
      padding: 1em;
      background-color: #eee;
      color: gray;
      font-size: 14px;

      b {
        margin: 0 0.1em;
      }
    }
  }
`;

export type onToggletToList = (payload: {
  githubData: GithubRepository;
  listId: string;
  shouldRemove: boolean;
}) => void;

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();

  const headerRef = useRef();

  const [searchResults, setSearchResults] = useState<GithubRepositorySearchResponse | null>(null);

  const [loadingSearchResults, setLoadingSearchResults] = useState(false);
  const [searchDropdownHidden, setSearchDropdownHidden] = useState(false);
  const [githubRateLimitReached, setGithubRateLimitReached] = useState(false);

  useClickLocator(headerRef, {
    onOutside: () => setSearchDropdownHidden(true),
    onInside: () => setSearchDropdownHidden(false),
  });

  const onFormSubmit = (data: { search: string }) => {
    setLoadingSearchResults(true);

    GithubAPI.searchRepositories({ query: data.search }).then((res) => {
      setLoadingSearchResults(false);

      setGithubRateLimitReached(res.rateLimitReached);

      if (res.status === 200) {
        setSearchResults(res.data);
      }
    });
  };

  const visibleSearchResults = searchResults?.items.slice(0, 5);

  const onToggleToList: onToggletToList = ({ shouldRemove, listId, githubData }) => {
    dispatch(
      assignCardToList({
        githubData,
        listId,
        shouldRemove,
      })
    );
  };

  const lists = useAppSelector((state) => {
    const ids = state.entities.lists.allIds;
    return ids.map((id) => ({
      id,
      title: state.entities.lists.byId[id].title,
    }));
  });

  return (
    <Styles ref={headerRef as any}>
      <Form onSubmit={onFormSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <img src={process.env.PUBLIC_URL + "/icons/search.svg"} alt="search" />
            <Field
              name="search"
              component="input"
              className="search"
              placeholder="Search on Github..."
              spellCheck={false}
            />

            {loadingSearchResults && (
              <img src={process.env.PUBLIC_URL + "/icons/loading-bars.svg"} alt="loading" />
            )}
          </form>
        )}
      </Form>

      {!searchDropdownHidden && (
        <div className="search-dropdown">
          {visibleSearchResults?.map((item, i) => (
            <RepositoryCard
              githubData={item}
              key={item.id}
              variant="SearchResult"
              toggleToList={onToggleToList}
              lists={lists}
            />
          ))}

          {(visibleSearchResults || githubRateLimitReached) && (
            <div className="footer">
              {githubRateLimitReached ? (
                <p>😨 Github API rate limit reached, please wait a few seconds</p>
              ) : (
                <pre>
                  Showing <b>{visibleSearchResults?.length}</b> of{" "}
                  <b>{searchResults?.total_count.toLocaleString("en-US")}</b> results
                </pre>
              )}
            </div>
          )}
        </div>
      )}

      <h3>Github Bookmarks</h3>
    </Styles>
  );
};
