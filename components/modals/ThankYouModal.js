import React from 'react';

const ThankYouModal = (props) => {

  return(
    <div className="modal fade" id="thankYouModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title" id="exampleModalLabel">{props.modalMessage ? 'Error' : 'Message sent'}</h2>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">

          <h5>{props.modalMessage ? 'Please fill out all required fields.' : `Dear ${props.firstName} ${props.lastName},`}</h5>
           <p>{props.modalMessage ? null : "Thank you for contacting us. We'll reply promptly."}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );

}

export default ThankYouModal;