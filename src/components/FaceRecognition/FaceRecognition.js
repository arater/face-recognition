import React from 'react'
import '../../App.css'
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, boxes}) => {
    return(
        <div className='center ma' style={{display:'flex', justifyContent:'center'}}>
            <div className='absolute mt2'>
                <img id='inputimage' alt='Uploaded File' src={imageUrl} width='auto' height='500px'/>
                {boxes.map((box, i) => {
                    const {topRow, rightCol, leftCol, bottomRow} = box
                    return(
                        <div key={i} id='face' className='bounding-box'
                            style={{top: topRow, right:rightCol, left:leftCol, bottom: bottomRow}}>
                                <p className="imagesNumber">{i+1}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default FaceRecognition;