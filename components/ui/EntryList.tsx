
import { FC, useContext, useMemo, DragEvent } from "react";

import { EntriesContext } from "../../context/entries";
import { EntryStatus } from "../../interfaces";
import { EntryCard } from "./EntryCard";

import { List, Paper } from "@mui/material";
import { UIContext } from "../../context/ui";

interface Props {
  status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {

  const { entries, updateEntry }  = useContext( EntriesContext )
  const { isDragging, endDragging } = useContext(UIContext)
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [entries]);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');

    const entry = entries.find( e => e._id === id)!; // el "!" le dice a typeScript que siempre va a recibir una entrada
    entry.status = status;
    updateEntry( entry );
    endDragging();
    
  }
  const handleDragOver = (event: DragEvent<HTMLDivElement>) =>{
    event.preventDefault();
  }


  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver}>
      <Paper
        sx={{
          height: "calc(100vh - 200px)",
          overflowY: "scroll",
          backgroundColor: "transparent",
          padding: "3px 5px",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <List sx={{ opacity: isDragging ? 0.3 : 1, transition: 'all .5s'  }}>
          {
            entriesByStatus.map( entry => (
              <EntryCard key={ entry._id } entry={ entry } />
            ))
          }
        </List>
      </Paper>
    </div>
  );
};
