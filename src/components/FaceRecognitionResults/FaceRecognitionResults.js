import React from 'react'
import '../../App.css'
import './FaceRecognitionResults.css'

const FaceRecognitionResults = ({imagesData}) => {
    console.log(imagesData);
    return(
        <div className='center ma outestDiv' style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
            <h2>Analysis Result</h2>
            {imagesData.map((image, i) => {
                console.log('each image',image)
            return (
                <table >
                <tr>
                    <th>Property</th>
                    <th>Image Prediction {i+1}:</th>
                    <th>Probability</th>
                </tr>
                <tr>
                    <td>Age</td>
                    <td>{image.data.concepts[0].name}</td>
                    <td>{image.data.concepts[0].value}</td>
                </tr>
                <tr>
                    <td>Gender</td>
                    <td>{image.data.concepts[20].name}</td>
                    <td>{image.data.concepts[20].value}</td>
                </tr>
                <tr>
                    <td>Multicultural Nation</td>
                    <td>{image.data.concepts[22].name}</td>
                    <td>{image.data.concepts[22].value}</td>
                </tr>
            </table>
            );
        })}
        </div>
    );
}

export default FaceRecognitionResults;