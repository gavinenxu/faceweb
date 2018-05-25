import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js'
import Clarifai from 'clarifai'
import './App.css'

const app = new Clarifai.App({
 apiKey: 'ca92c1dc94e54d39bb34e3305a68d8d7'
});

const particleOptions = {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
}

class App extends Component {

	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			box: {}
		}
	};

	calculateFaceLocation = (data) => {

		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputimage');
		const width= Number(image.width);
		const height = Number(image.height);


		const widthLeftProp = clarifaiFace.left_col;
		const widthRightProp = clarifaiFace.right_col;
		const heightTopProp = clarifaiFace.top_row;
		const heightBottomProp = clarifaiFace.bottom_row;

		return {
			leftCol:  widthLeftProp * width,
			topRow: heightTopProp * height,
			rightCol: width * widthRightProp,
			bottomRow: height * heightBottomProp,
			width: width - width * widthLeftProp - width * ( 1 - widthRightProp),
			height: height - height * heightTopProp - height * ( 1 - heightBottomProp)
		}
	}

	displayFaceBox = (box) => {
		//console.log(box);
		this.setState({box: box});
	}

	onInputChange = (event) => {
		console.log(event.target.value);
		this.setState({input: event.target.value});
	}

	onButtonSubmit = () => {
		//console.log('click');
		
		this.setState({imageUrl: this.state.input});
		
		//this.setState((prevState) => {
			//return {imageUrl: prevState.input};
		//});
		//console.log(this.state.imageUrl);
		app.models.predict(
			Clarifai.FACE_DETECT_MODEL, 
			this.state.input)
			.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
			.catch(err => console.log(err));
	}

	render() {
		return (
			<div className="App">
				<Particles 
		          params={particleOptions}
		          className='particles'
		        />
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm 
					onInputChange={this.onInputChange} 
					onButtonSubmit={this.onButtonSubmit}
				/>
				<FaceRecognition 
					box={this.state.box}
					imageUrl={this.state.imageUrl}
				/>
			</div>
		)
	}
}

export default App