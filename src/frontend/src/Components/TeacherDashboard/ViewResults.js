import React, { useState } from 'react';
import { Modal, Box, Button, Typography, CircularProgress } from '@mui/material';
import { generatePDF } from '../Constants/utils';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: '80%',
  overflow: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalComponent = ({ open, handleClose,handleDelete,notesOnly, content,func ,contentSimple}) => {
    function handleDownload(){
        generatePDF(contentSimple)
    }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={modalStyle}>
        {content ? (
          <>
            <Typography id="modal-title" variant="h6" component="h2">
              Content Received
            </Typography>
            <Box
              id="modal-description"
              sx={{
                mt: 2,
                maxHeight: '60vh', // Adjust height as needed
                overflowY: 'auto', // Makes content scrollable
              }}
            >
              <Typography variant="body1">{content}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="outlined"  color="error" onClick={handleDownload} sx={{ mr: 2 }}>
                Download
              </Button>
              <Button variant="outlined" color="error" onClick={handleClose} sx={{ mr: 2 }}>
                Cancel
              </Button>
              {
                    notesOnly && (<Button variant="contained" onClick={func} color="primary">
                    Save Record
                  </Button>)
              }

            </Box>
          </>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Modal>
  );
};



export default ModalComponent