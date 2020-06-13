import React from 'react'
import '../../App.css'
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, boxes}) => {
    {console.log(boxes)}
    return(
        <div className='center ma' style={{display:'flex', justifyContent:'center'}}>
            <div className='absolute mt2'>
                <img id='inputimage' alt='Uploaded File' src={imageUrl} width='500px' height='auto'/>
                {boxes.map((box, i) => {
                    const {topRow, rightCol, leftCol, bottomRow} = box
                    return(
                        <div key={i} id='face' className='bounding-box'
                            style={{top: topRow, right:rightCol, left:leftCol, bottom: bottomRow}}>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default FaceRecognition;