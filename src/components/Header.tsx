import styled from "styled-components";
import { Form, Field } from "react-final-form";
import { useState } from "react";
import { RepositoryCard } from "./Cards/RepositoryCard";
import { GithubAPI } from "../utils/github-api";

const Styles = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
  box-shadow: 0 0 3px gray;
  padding: 2em;
  z-index: 1;
  position: relative;

  > form {
    > input[name="search"] {
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
    box-shadow: 0 0 5px lightgray;

    > .footer {
      padding: 1em 0.75em;
      background-color: #eee;
      color: gray;
      font-size: 14px;

      b {
        margin: 0 0.1em;
      }
    }
  }
`;

export function Header() {
  const [searchResults, setSearchResults] = useState<{
    total_count: number;
    incomplete_results: boolean;
    items: { [key: string]: any }[];
  } | null>(null);

  const onFormSubmit = (data: { search: string }) => {
    GithubAPI.searchRepositories({ query: data.search }).then((res) => {
      if (res.status === 200) {
        console.log(res.data);

        setSearchResults(res.data);
      }
    });
  };

  return (
    <Styles>
      <Form onSubmit={onFormSubmit}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="search"
              component="input"
              className="search"
              placeholder="Search Github..."
            />
          </form>
        )}
      </Form>

      {searchResults?.items.length && (
        <div className="search-dropdown">
          {searchResults.items.slice(0, 5).map((item, i) => (
            <RepositoryCard key={item.id} variant="SearchResult" />
          ))}

          <div className="footer">
            <pre>
              Showing <b>5</b> of <b>{searchResults?.total_count.toLocaleString("en-US")}</b>{" "}
              results
            </pre>
          </div>
        </div>
      )}

      <h3>Github Bookmarks</h3>
    </Styles>
  );
}
