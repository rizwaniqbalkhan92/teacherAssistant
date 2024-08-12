
import React, { useState, useRef } from 'react';
import { Camera } from 'react-camera-pro';
import { Button, Container, Grid, Typography, Box, Modal } from '@mui/material';
import ImgModal from './ImgModal';

const CheckExam = () => {
  const camera = useRef(null);
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState('');
  const [capturedImages, setCapturedImages] = useState([]);
  const [pgRender, setPgRender] = useState('btns');

  const handleCapture = async () => {
    if (camera.current) {
      const photo = await camera.current.takePhoto();
      if (photo) {
        setImage(photo);
        setOpenModal(!openModal);
      }
    }
  };

  const handleBtns = (val) => {
    setPgRender(val);
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', marginTop: '20px' }}>
     <Typography
            style={{
                fontSize: '34px',       
                color: '#F36D42',        
                marginTop: '20px',       
                marginBottom: '20px'     
            }}
        >
            Exam Paper Checker
        </Typography>

      {pgRender === 'btns' ? (
        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 2 }}>
          <Button
            variant="contained"
            color="success"
            sx={{ width: { xs: '100%', sm: '45%' }, height: 70, fontSize: 20 }}
            onClick={() => handleBtns('camera')}
          >
            Camera
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: { xs: '100%', sm: '45%' }, height: 70, fontSize: 20 }}
            onClick={() => handleBtns('photos')}
          >
            Photos
          </Button>
        </Box>
      ) : pgRender === 'camera' ? (
        <>
          <Camera aspectRatio={9 / 14} ref={camera} numberOfCamerasCallback={setNumberOfCameras} />
          <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 2 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: { xs: '100%', sm: '45%' }, height: 70, fontSize: 20 }}
              onClick={handleCapture}
            >
              Capture
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ width: { xs: '100%', sm: '45%' }, height: 70, fontSize: 20 }}
              onClick={() => setPgRender('photos')}
            >
              Photos
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Grid container spacing={2} sx={{ marginTop: 4 }}>
            {capturedImages.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <img src={image} alt={`Captured ${index}`} style={{ width: '100%' }} />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: 2 }}>
            <Button
              variant="contained"
              color="error"
              sx={{ width: { xs: '100%', sm: '45%' }, height: 70, fontSize: 20 }}
              onClick={() => setPgRender('btns')}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ width: { xs: '100%', sm: '45%' }, height: 70, fontSize: 20 }}
              onClick={() => setPgRender('btns')}
            >
              Generate Results
            </Button>
          </Box>
        </>
      )}
      <ImgModal image={image} setCapturedImages={setCapturedImages} openModal={openModal} setOpenModal={setOpenModal} />
    </Container>
  );
};

export default CheckExam;
