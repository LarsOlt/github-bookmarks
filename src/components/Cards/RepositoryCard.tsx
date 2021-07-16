import styled from "styled-components";
import ClampLines from "react-clamp-lines";


interface props {
  variant: "SearchResult" | "ListItem";
}

const Styles = styled.div`
  display: flex;
  border-top: 1px solid lightgray;
  padding: 0.75rem;

  > .col-logo {
    margin-right: 0.75rem;

    > img.logo {
      height: 3.5rem;
      width: 3.5rem;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  > .col-main {
    /* max-width: 400px; */

    > .title {
      font-size: 20px;
      color: #0366d6;
      margin: 0.5em 0;
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
      height: 1.5rem;
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
          height: 100%;
          margin-right: 0.5em;
          padding: 0.2em 0;
        }
      }
    }
  }
  > .col-controls {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    width: 1.7rem;
    flex-shrink: 0;
    /* justify-content: ${(p: props) =>
      p.variant === "SearchResult" ? "center" : "flex-start"}; */

    > * {
      width: 100%;
      cursor: pointer;
    }

    ${(p: props) =>
      p.variant === "SearchResult" &&
      `
      justify-content: center;
      margin-left: 20%;
      margin-right: 1em;
    `}

    /* > .removeFromList-btn {
    }

    > .addToList-btn {
    } */
  }
`;

export const RepositoryCard: React.FC<props> = (props) => {
  const descriptionText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, id repudiandae et neque obcaecati voluptatibus unde deserunt possimus corporis tempore? Quam fugit alias repudiandae, tempore beatae eos atque praesentium ut eligendi at itaque, aliquid vero. Iusto illo odit, laborum similique nobis repudiandae accusamus, ex explicabo sit fugiat tempora quae, odio cupiditate dolores optio aperiam soluta! Fugiat deserunt sunt obcaecati, quasi eos accusantium molestias, suscipit blanditiis aut ab maxime. Error quod enim pariatur eum quae repellendus voluptatem illum itaque repudiandae aperiam! Natus ut cum, ipsam asperiores dolore accusamus aut, officiis voluptates alias repellat perspiciatis! Maxime nostrum animi deserunt earum voluptatibus eveniet.";

  return (
    <Styles {...props}>
      {/* logo */}
      <div className="col-logo">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          alt=""
        />
      </div>

      {/* main */}
      <div className="col-main">
        <h2 className="title">
          facebook/<b>react</b>
        </h2>
        <ClampLines
          id=""
          text={descriptionText}
          lines={props.variant === "ListItem" ? 4 : 2}
          buttons={false}
          className="description"
        />
        <ul className="stats">
          <li>
            <img src={process.env.PUBLIC_URL + "/icons/star.svg"} alt="star icon" />
            {500}
          </li>
          <li>{1} issue</li>
          <li>updated {16} days ago</li>
        </ul>
      </div>

      {/* controls */}
      <div className="col-controls">
        {props.variant === "ListItem" && (
          <img
            src={process.env.PUBLIC_URL + "/icons/close.svg"}
            alt="remove from list"
            className="removeFromList-btn"
          />
        )}
        {props.variant === "SearchResult" && (
          <img
            src={process.env.PUBLIC_URL + "/icons/plus.svg"}
            alt="add to list"
            className="addToList-btn-btn"
          />
        )}
      </div>
    </Styles>
  );
};
