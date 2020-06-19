import React from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import FaceRecognitionResults from './components/FaceRecognitionResults/FaceRecognitionResults'

// particles background 
const particlesOptions = {
  polygon: {
    particles: {
      line_linked: {
        shadow: {
          enable: true,
          color: "#3CA9D1",
          blur: 5
        },
      },
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800
        }
      }
      
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  imagesDatas: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state= initialState
  }

  componentDidMount() {
    fetch('https://stormy-fortress-98961.herokuapp.com/')
      .then(response => response.json())
      .then(data => console.log(data))
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  loadUser = (user) => {
    this.setState({user: {
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);
    const image = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)
    return clarifaiFaces.map(face => {
      return{
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height),
    }})
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes})
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input}, () => {
      fetch('https://stormy-fortress-98961.herokuapp.com/imageUrl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
          })
      .then(response => response.json())
      .then((response)  => {
        this.setState({imagesDatas: response.outputs[0].data.regions})
        if(response) {
          fetch('https://stormy-fortress-98961.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(entries => this.setState(Object.assign(this.state.user, {entries: entries})))
        }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
      .catch((error) => console.log(error));
    })
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  renderPage = (route) => {
    switch (route) {
      case 'home':
        return(
          <div>
           <Logo/>
           <Rank name={this.state.user.name} entries={this.state.user.entries} />
           <ImageLinkForm  onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
           <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl}/>
           {this.state.imagesDatas != '' ? <FaceRecognitionResults imagesData={this.state.imagesDatas}/> : null}
          </div>
        )
      case 'signin':
        return(
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
      case 'register':
        return(
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        )
    }
  }

  render() {
    return (
      <div className="App">
        <Particles 
                  className='particles' 
                  params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        {this.renderPage(this.state.route)}
      </div>
    );
  }
}

export default App;