import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height:'90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ImgModal(props) {

    console.log("======>>>",props)
function closeHandle(){
props.setOpenModal(false)
}
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.openModal}
        onClose={closeHandle}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.openModal} >
          <Box sx={{ position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height:'90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4}}>
        
            <img src={props.image} alt={`Captured ${Math.random()}`} style={{ width: '100%',height:'90%' }} />
            <div style={{width:'60%',margin:'auto',padding:20,display:'flex',justifyContent:'space-around',alignItems:'center'}}>

            <Button onClick={()=>{props.setCapturedImages((prevImages) => [...prevImages, props.image]);props.setOpenModal(!props.openModal)}} variant="contained" style={{width:200,height:60}} color="success">
  Save
</Button>
            <Button onClick={()=>props.setOpenModal(!props.openModal)}  style={{width:200,height:60}} variant="contained" color="error">
  Cancel
</Button>
            </div>
        
          </Box>
          {/* <button onClick={()=>console.log('')} >Save</button> */}
        </Fade>
      </Modal>
    </div>
  );
}
