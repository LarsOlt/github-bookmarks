import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { RepositoryCard } from "./Cards/RepositoryCard";
import { removeFromList } from "../redux/entities/cards";
import React from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { XYCoord } from "dnd-core";

export type moveCardData = {
  dragIndex: number;
  hoverIndex: number;
  cardId: string;
  listId: string;
};

interface props {
  cardId: string;
  listId: string;

  /**  for react-dnd */
  index: number;
  moveCard: (data: moveCardData) => void;
}

export const ListCard: React.FC<props> = (props) => {
  const ref = React.useRef<HTMLDivElement>();

  const dispatch = useAppDispatch();
  const { githubData, id} = useAppSelector(
    (state) => state.entities.cards.byId[props.cardId]
  );

  const onRemoveFromlist = () => {
    dispatch(
      removeFromList({
        listId: props.listId,
        id: props.cardId,
      })
    );
  };

  const useDropResponse = useDrop({
    accept: `CARD-${props.listId}`,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      props.moveCard({ dragIndex, hoverIndex, cardId: props.cardId, listId: props.listId });

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const drop = useDropResponse[1];

  const useDragResponse = useDrag({
    type: `CARD-${props.listId}`,
    item: () => {
      return { id, index: props.index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const drag = useDragResponse[1]

  drag(drop(ref));

  return (
    <RepositoryCard
      ref={ref}
      variant="ListItem"
      githubData={githubData}
      removeFromList={onRemoveFromlist}
    />
  );
};
