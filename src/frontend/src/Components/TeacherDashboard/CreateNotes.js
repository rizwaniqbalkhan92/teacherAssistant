import Axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import {
  Container, Typography, Button, Modal, Box, Grid, Divider, Alert,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ImageIcon from '@mui/icons-material/Image';
import {Camera} from 'react-camera-pro';
import { generateNotes, saveNotesApi } from '../Constants/NotesApisCalling';
import ModalComponent from './ViewResults';
import { useAuth } from '../ContextApi/AuthContext';
import { generatePDF, getUserId } from '../Constants/utils';
import NotesList from './ListNotes';

const CreateNotes = () => {

    
  const [notes, setNotes] = useState([]); 
  const [openModal, setOpenModal] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImages, setCapturedImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [openResultModal,setOpenResultModal]=useState(false);
  const {state}=useAuth()
  const [resut,setResults]=useState('');
const [userId,setUserId]=useState('');

  const cameraRef = useRef(null);


  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setIsCameraOpen(false);
  };

  const handleOpenCamera = () => setIsCameraOpen(true);

  const handleCaptureImage = () => {
    const photo = cameraRef.current.takePhoto();
    setCapturedImages([...capturedImages, photo]);
  };

  const handleUploadFiles = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handleGenerateResults =async () => {
    try {
        const userId = localStorage.getItem('userId')
        setUserId(userId)
        console.log("userId====>>",userId)
        const response = await (capturedImages.length > 0 
          ? generateNotes(capturedImages, true) 
          : generateNotes(uploadedFiles, false));
        console.log("response====>>>>", response);
        
        setResults(response);
        setOpenResultModal(true);
      } catch (error) {
        console.error("Error generating results:", error);
        // Handle error appropriately here
      }
  };

  const handleSaveResults = async() => {
    try{

        const notesId= `${Date.now()}`
        // const response = await saveNotesApi(resut,userId,notesId)
        let data = JSON.stringify({
            "content": resut,
            "userId": userId,
            "notesId": notesId
          });
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://testbackend-rho.vercel.app/api/saveNotes',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
        //   
         const response =await Axios.request(config)
         setOpenResultModal(false)
         console.log(response)
         alert("Result Save Successfully!!!")

        }
        catch(err){
     
        alert("Something Went Wrong")

        return err
    }
   


  };


const cleanLine = (line) => {
    return line.replace(/\*\*/g, '').trim();
  };
  
  const processSubSuperScripts = (line) => {
    // Replace _{text} with <sub>text</sub> and ^{text} with <sup>text</sup>
    return line.replace(/_(\w+)/g, '<sub>$1</sub>').replace(/\^(\w+)/g, '<sup>$1</sup>');
  };
//   const formatContent = (content) => {
//     if (typeof content !== 'string') {
//       console.error("Invalid content type:", content);
//       return []; // Return an empty array or handle it as needed
//     }
  
//     const lines = content.split('\n');
//     const elements = [];
  
//     lines.forEach((line, index) => {
//       line = cleanLine(line);
//       line = processSubSuperScripts(line); // Process sub and sup scripts
  
//       if (line.startsWith('## ')) {
//         elements.push(<h2 key={index} dangerouslySetInnerHTML={{ __html: line.slice(3) }} />);
//       } else if (line.startsWith('### ')) {
//         elements.push(<h3 key={index} dangerouslySetInnerHTML={{ __html: line.slice(4) }} />);
//       } else if (line.startsWith('* ') || line.startsWith('• ')) {
//         elements.push(
//           <p key={index} style={{ margin: '0 0 10px 0' }} dangerouslySetInnerHTML={{ __html: `• ${line.slice(2)}` }} />
//         );
//       } else if (line !== '') {
//         elements.push(
//           <div key={index}>
//             <p dangerouslySetInnerHTML={{ __html: line }} />
//           </div>
//         );
//       }
//     });
  
//     return elements;
//   };
  
  const formatContent = (content) => {
    const lines = content?.split('\n');
    const elements = [];
    lines.forEach((line, index) => {
      line = cleanLine(line);
      line = processSubSuperScripts(line); // Process sub and sup scripts
      if (line.startsWith('## ')) {
        elements.push(<h2 key={index} dangerouslySetInnerHTML={{ __html: line.slice(3) }} />);
      } else if (line.startsWith('### ')) {
        elements.push(<h3 key={index} dangerouslySetInnerHTML={{ __html: line.slice(4) }} />);
      } else if (line.startsWith('* ') || line.startsWith('• ')) {
        elements.push(
          <p key={index} style={{ margin: '0 0 10px 0' }} dangerouslySetInnerHTML={{ __html: `• ${line.slice(2)}` }} />
        );
      } else if (line !== '') {
        elements.push(
          <div key={index}>
            <p dangerouslySetInnerHTML={{ __html: line }} />
          </div>
        );
      }
    });
  
    return elements;
  };
  const handleDownload = (content) => {
    generatePDF(content)
    // alert('file downloaded successfully')
  
  };

  const handleDelete = (notesId) => {
    console.log(notesId)
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `https://testbackend-rho.vercel.app/api/deleteNotes/${notesId}`,
        headers: { }
      };
      
      Axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert("Note deleted Successfully")
      })
      .catch((error) => {
        console.log(error);
      });
      
  };

useEffect(()=>{
(()=>{


let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://testbackend-rho.vercel.app/api/getAllNotes',
  headers: { }
};

Axios.request(config)
.then((response) => {

  setNotes(Object.values(Object.values(response.data)[0]))
})
.catch((error) => {
  return error
});

})()


},[])

  return (
    <Container maxWidth="sm" sx={{ padding: '16px', height: '100vh' }}>
     <ModalComponent
        open={openResultModal}
        handleClose={() => setOpenResultModal(false)}
        // content={resut}
        content={formatContent(resut)}
        contentSimple={resut}
        notesOnly={true}
        func={handleSaveResults}
        
      
        
      />
 
    <Typography variant="h4" gutterBottom>
      Create Notes
    </Typography>

    <Button variant="contained" color="primary" fullWidth onClick={handleOpenModal}>
      Create Notes
    </Button>

    <Divider sx={{ marginY: 3 }} />

    <Typography variant="h6" gutterBottom>
      All Notes
    </Typography>

    {notes ? (
      notes.map((note, index) => (
        
    
          <NotesList notes={notes} onDownload={handleDownload} onDelete={handleDelete} />
      ))
    ) : (
      <Typography variant="body2">No notes available</Typography>
    )}

    <Modal open={openModal} onClose={handleCloseModal}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '400px', bgcolor: 'background.paper', p: 3, boxShadow: 24, borderRadius: 2,
      }}>
        <Typography variant="h6" gutterBottom>
          Create Notes
        </Typography>

        <Grid container spacing={2}>
          {!isCameraOpen && (
            <>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<PhotoCameraIcon />}
                  onClick={handleOpenCamera}
                >
                  Open Camera
                </Button>
              </Grid>
              <Grid item xs={12}>
                <input
                  accept="image/*,application/pdf"
                  style={{ display: 'none' }}
                  id="upload-files"
                  multiple
                  type="file"
                  onChange={handleUploadFiles}
                />
                <label htmlFor="upload-files">
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    component="span"
                    startIcon={<ImageIcon />}
                  >
                    Upload Files from Gallery
                  </Button>
                </label>
              </Grid>
            </>
          )}

          {isCameraOpen && (
            <>
              <Grid item xs={12}>
                <Camera ref={cameraRef} aspectRatio={16 / 9} />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<PhotoCameraIcon />}
                  onClick={handleCaptureImage}
                >
                  Capture
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Modal>

    {(capturedImages.length > 0 || uploadedFiles.length > 0) && (
      <Box sx={{ marginTop: 3 }}>
           <Button
          variant="outlined"
          color="primary"
          
          sx={{ marginTop: 2 }}
          onClick={()=>{  setCapturedImages([]) }}
        >
          Refresh
        </Button>
        <Typography variant="h6" gutterBottom>
          Generated Results
        </Typography>

        <Grid container spacing={2}>
          {capturedImages.map((image, index) => (
            <Grid item xs={6} key={index}>
              <img src={image} alt={`Captured ${index}`} style={{ width: '100%' }} />
            </Grid>
          ))}

          {uploadedFiles.map((file, index) => (
            <Grid item xs={12} key={index}>
              <Typography variant="body2">{file.name}</Typography>
            </Grid>
          ))}
        </Grid>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleGenerateResults}
        >
          Generate Results
        </Button>

        {/* <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleSaveResults}
        >
          Save Results
        </Button> */}
      </Box>
    )}
   
  </Container>
  );
};

export default CreateNotes;
