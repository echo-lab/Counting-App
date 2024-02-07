import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Row, Col, CloseButton } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';
import { useAppData } from "../context/Context.js";
import seseme from '../assests/seseme.gif';
import CloseIcon from '@mui/icons-material/Close';
import "../styles/dialogbox.css";

function DialogBox(props) {
  const { selectedOption } = useAppData();

  return (
    <Modal
    {...props}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header>
        <div style={{ marginLeft: 'auto' }}>
            <CloseButton onClick={props.onHide}><CloseIcon /></CloseButton>
      </div>
    </Modal.Header>
    <Modal.Body>
    <Row>
          <Col sm={4}> 
            <img
              src={seseme}
              alt="image3"
              className="img-fluid"
              style={{ width: 'auto', height: '90%' }}
            />
          </Col>
          <Col sm={8}> 
            <h4>Great job!</h4>
            <p>
              You were so helpful! Are you ready for the next part?
            </p>
          </Col>
        </Row>
    </Modal.Body>
    <Modal.Footer>
        <button className='dialogbutton' onClick={props.onHide}><Link to={`/game/home/${selectedOption}`}>Home</Link></button>
        {/* <button className='dialogbutton' onClick={props.onHide}><Link to={`/game/${props.page}/0`}>Next Section</Link></button> */}
    </Modal.Footer>
  </Modal>
  );
}


export default DialogBox;
