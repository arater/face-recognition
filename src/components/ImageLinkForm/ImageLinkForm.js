import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return(
        <div className='f3'>
            <p>{'Smart Brain App will detect faces that you upload.'}</p>
            <div className='center'>
                <div className='center pa4 br3 shadow-5 form'>
                    <input className='pa2 w-70 f4' type='text' onChange={onInputChange} />
                    <button className='grow w-30 link f4 ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;