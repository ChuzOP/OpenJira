import { createContext } from 'react';
import { Entry } from '../../interfaces';

interface ContextProps {
  entries: Entry[];

  //functions - methods
  addNewEntry: (description: string) => void;
  updateEntry: (entry: Entry) => void;
  deleteEntry: (entry: Entry) => Promise<void>;
}

export const EntriesContext = createContext({} as ContextProps);
