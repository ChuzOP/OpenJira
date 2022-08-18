import React, { ChangeEvent, FC, useContext, useState } from "react";
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';

import { Layout } from "../../components/layouts";
import { Entry, EntryStatus } from "../../interfaces";

import { EntriesContext } from "../../context/entries";
import { dbEntries } from "../../database";

import { capitalize, Button, Card, CardActions, CardContent, CardHeader, FormLabel, FormControl, Grid, TextField, RadioGroup, FormControlLabel, Radio, IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { dateFunctions } from "../../utils";

const validStatus: EntryStatus[] = ['pending', "in-progress", "finished"]

interface Props {
  entry: Entry
}

export const EntryPage: FC<Props> = ( {entry} ) => {
  const router = useRouter();

  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touched, setTouched] = useState(false);

  const { updateEntry, deleteEntry  } = useContext( EntriesContext )

  const handleChange = ( event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleStatusChange = ( event: ChangeEvent<HTMLInputElement>) =>{
    setStatus(event.target.value as EntryStatus);
    console.log(event.target.value);
    
  }

  const handleSave = () => {
    if( inputValue.trim().length === 0 ) return;
    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue,
    }
    updateEntry(updatedEntry);
    router.push('/');
  }

  const handleDelete = () => {
    deleteEntry( entry );
    router.push('/');
  }

  return (
    <Layout title={ inputValue.substring(0, 20) + '...'}>
        <IconButton
            sx={{
                position:'fixed', bottom: 30, right:30, backgroundColor: 'error.dark'
            }}
            onClick={handleDelete}
        >
            <DeleteOutlineOutlinedIcon />
        </IconButton>
      <Grid container sx={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 100px)',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center' 
        }}>
        <Grid item xs={12} sm={8} md={7}>
          <Card>
            <CardHeader title={`ToDo`} subheader={`Creada ${ dateFunctions.getFormatDistanceToNow( entry.createdAt) }`} />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder="Nueva Entrada"
                autoFocus
                multiline
                label="NuevaEntrada"
                value={ inputValue }
                onChange={ handleChange }
                onBlur={ () => setTouched(true) }
                helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor' }
                error={ inputValue.length <= 0 && touched }
              />
              <FormControl>
                <FormLabel>Status:</FormLabel>
                <RadioGroup row value={ status } onChange={ handleStatusChange } >
                    {
                        validStatus.map( status => (
                            <FormControlLabel
                            key={status}
                            value={status}
                            control={ <Radio /> }
                            label={ capitalize(status)}
                            />
                        ) )
                    }
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent:'center', marginBottom: 2 }}>
                <Button
                startIcon={<SaveOutlinedIcon /> }
                variant='contained'
                color='secondary'
                onClick={ handleSave }
                disabled={ inputValue.length <= 0 }
                 >
                    Guardar Cambios
                </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({params}) => {

  const { id } = params as { id: string };
  const entry = await dbEntries.getEntryById( id );


  if ( !entry ) {
    return{
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntryPage;
