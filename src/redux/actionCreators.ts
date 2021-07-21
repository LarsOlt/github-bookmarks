import { AppThunk } from "./store";
import { createCard } from "./entities/cards";
import type { GithubRepository } from "../utils/github-api";
import { assignToList, removeFromList } from "./entities/cards";

export const assignCardToList =
  (payload: { githubData: GithubRepository; listId: string; shouldRemove: boolean }): AppThunk =>
  (dispatch, getState) => {
    const { githubData, listId, shouldRemove } = payload;

    const cardId = githubData.id.toString();

    const findExistingCard = () => getState().entities.cards.byId[cardId];

    let existingCard: null | ReturnType<typeof findExistingCard> = findExistingCard();

    if (!existingCard && !shouldRemove) {
      dispatch(
        createCard({
          githubData,
        })
      );
    }

    if (shouldRemove) {
      dispatch(
        removeFromList({
          id: cardId,
          listId,
        })
      );
    } else if (!existingCard || !existingCard.listIds.includes(listId)) {
      dispatch(
        assignToList({
          id: cardId,
          listId,
        })
      );
    }
  };
