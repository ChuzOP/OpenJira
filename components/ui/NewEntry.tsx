import React, { ChangeEvent, useContext, useState } from "react";

import { Button, Box, TextField } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { EntriesContext } from "../../context/entries/EntriesContext";
import { UIContext } from "../../context/ui";

export const NewEntry = () => {

  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);

  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry ,setIsAddingEntry } = useContext(UIContext)


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    setTouched(false);
    setInputValue("");
    setIsAddingEntry(false);
  };

  return (
    <Box sx={{ marginBottom: 2, paddingX: 0.5 }}>
      {isAddingEntry ? (
        <>
          <TextField
            autoFocus
            multiline
            color="primary"
            label="Add ToDo"
            placeholder="Do something..."
            fullWidth
            sx={{ marginBottom: "6px" }}
            value={inputValue}
            onChange={handleChange}
            helperText={inputValue.length >= 0 && touched && "Ingrese un valor"}
            error={inputValue.length <= 0 && touched}
            onBlur={() => setTouched(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              color="error"
              endIcon={<CloseIcon />}
              onClick={() => setIsAddingEntry(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="success"
              endIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Agregar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddOutlinedIcon />}
          fullWidth
          variant="contained"
          sx={{ marginBottom: "5px" }}
          color="secondary"
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  );
};
