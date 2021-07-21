import React from "react";
/**
 * @param callback - Called when the user clicks outside the specified element
 */
export const useClickLocator = (ref: React.MutableRefObject<any>, callbacks: {
  onOutside?: Function,
  onInside?: Function
}) => {
  const handleClick = (e: MouseEvent) => {
    if (ref.current.contains(e.target)) {
      // clicked inside
      callbacks.onInside?.()
    } else {
      // clicked outside
      callbacks.onOutside?.();
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};
