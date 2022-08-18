import { createContext } from "react";

interface ContextProps {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;

  //retornamos el tipado de nuestras funciones, las cuales no reciben nada y envian un void
  openMenu: () => void;
  closeMenu: () => void;
  setIsAddingEntry: (isAdding: boolean) => void;
  startDragging: () => void;
  endDragging: () => void;

}

export const UIContext = createContext({} as ContextProps);
