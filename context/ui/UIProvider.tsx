import React, { FC, useReducer } from "react";
import { UIContext, uiReducer } from "./";

export interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

type Props = {
  children: React.ReactNode;
};

const UIInitailState: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UIInitailState);

  const openMenu = () => {
    dispatch({ type: "UI - Open SideBar" });
  };

  const closeMenu = () => {
    dispatch({ type: "UI - Close SideBar" });
  };

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: "UI - Set isAddingEntry", payload: isAdding });
  };

  const startDragging = () => {
    dispatch({ type: "UI - Start Dragging" });
  };

  const endDragging = () => {
    dispatch({ type: "UI - End Dragging" });
  };

  return (
    <UIContext.Provider
      value={{
        //retornamos el estado del menu
        sideMenuOpen: state.sideMenuOpen,
        isAddingEntry: state.isAddingEntry,
        isDragging: state.isDragging,

        // Retronamos funciones para abrir y cerrar el menu
        openMenu,
        closeMenu,
        setIsAddingEntry,

        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
