import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { RepositoryCard } from "./Cards/RepositoryCard";
import {deleteCard} from "../redux/entities/cards"

interface props {
  /** Redux store id */
  id: string;
}

export const ListCard: React.FC<props> = (props) => {
  const dispatch = useAppDispatch()
  const { githubData, id, listIds } = useAppSelector((state) => state.entities.cards.byId[props.id]);

  const onRemoveFromlist = () => {
    dispatch(deleteCard({
      id,
      listIds
    }))
  };

  return (
    <RepositoryCard variant="ListItem" githubData={githubData} removeFromList={onRemoveFromlist}  />
  );
};
