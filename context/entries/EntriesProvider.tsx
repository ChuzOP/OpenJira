import React, { FC, useEffect, useReducer } from "react";

import { Entry } from "../../interfaces";
import entriesAPI from "../../apis/entriesAPI";
import { EntriesContext, entriesReducer } from "./index";

import { useSnackbar } from "notistack";

export interface EntriesState {
  entries: Entry[];
}

interface Props {
  children: React.ReactNode;
}

const EntriesInitailState: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const { enqueueSnackbar  } = useSnackbar();

  const [state, dispatch] = useReducer(entriesReducer, EntriesInitailState);

  const addNewEntry = async (description: string) => {
    const { data } = await entriesAPI.post<Entry>("/entries", { description });

    dispatch({ type: "[Entry] Add-Entry", payload: data });
  };

  const updateEntry = async ({ _id, description, status }: Entry) => {
    try {
      const { data } = await entriesAPI.put<Entry>(`/entries/${_id} `, {
        description,
        status,
      });
      dispatch({ type: "[Entry] Entry-Updated", payload: data });
      enqueueSnackbar("Entrada actualizada", {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const refreshEntries = async () => {
    const { data } = await entriesAPI.get<Entry[]>("/entries");
    dispatch({ type: "[Entry] Refrsh-Data", payload: data });
  };

  const deleteEntry = async (entry: Entry) => {
    try {
      const { data } = await entriesAPI.delete<Entry>(`/entries/${entry._id}`);

      dispatch({
        type: "[Entry] Delete-Data",
        payload: data,
      });

      enqueueSnackbar("Entrada Eliminada", { 
        variant: "error",
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
       });


    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
        deleteEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
