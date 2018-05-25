import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({box, imageUrl}) => {
	console.log("box: " + JSON.stringify(box));
	//console.log("height: "+hei);
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputimage' alt="face" src={imageUrl} width='500px' heigh='auto'/>
				<div className='bounding-box' style={{width: box.width, height: box.height, top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>
	)
}

export default FaceRecognition

//, top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol