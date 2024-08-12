import React from 'react';
import { List, ListItem, Typography, Button, Box } from '@mui/material';

const NotesList = ({ notes, onDelete, onDownload }) => {


 
    
  return (
    <List>
      {notes && notes.length > 0 ? (
        notes.map((note, index) => (
          <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1">
              {`${note.content.slice(0, 30)}.....`}
            </Typography>
            <Box sx={{ marginLeft: 'auto' }}>
              <Button 
                variant="outlined" 
                color="primary" 
                sx={{ marginRight: 1 }} 
                onClick={() => onDownload(note.content)}
              >
                Download PDF
              </Button>
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={() => onDelete(note?.notesId)}
              >
                Delete
              </Button>
            </Box>
          </ListItem>
        ))
      ) : (
        <ListItem>
          <Typography variant="body2">No notes available</Typography>
        </ListItem>
      )}
    </List>
  );
};

export default NotesList;
