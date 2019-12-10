import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import Rank from "./components/Rank";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition";
import Signin from "./components/Signin";
import Register from "./components/Register";
import "./App.css";

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 200
      }
    },
    size: {
      value: 2
    }
  }
};

const app = new Clarifai.App({
  apiKey: "5250f9e2f84540448f6817a9c430c6eb"
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      imageUrl: "",
      boxes: [],
      route: "signin",
      isSignedIn: false,
      user: {
        email: "",
        id: "",
        name: "",
        entries: 0,
        joined: ""
      }
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000")
      .then(response => response.json())
      .then(data => data);
  }

  loadUser = user => {
    this.setState({ user: { ...user } }, () => {
      return this.state.user;
    });
  };

  calculateFaceLocation = data => {
    const regions = data.outputs[0].data.regions;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    if (regions) {
      regions.forEach(region => {
        const boundingBox = region.region_info.bounding_box;
        const rect = {
          id: region.id,
          leftCol: boundingBox.left_col * width,
          topRow: boundingBox.top_row * height,
          rightCol: width - boundingBox.right_col * width,
          bottomRow: height - boundingBox.bottom_row * height
        };
        this.setFaceBox(rect);
      });
    } else {
      alert("Oooops, No face found!");
    }
  };

  setFaceBox = box => {
    this.setState({ boxes: [...this.state.boxes, box] });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input, boxes: [] }, () => {
      app.models
        .predict(Clarifai.FACE_DETECT_MODEL, this.state.imageUrl)
        .then(response => {
          if (response) {
            fetch("http://localhost:3000/image", {
              method: "put",
              headers: {
                "Content-type": "application/json"
              },
              body: JSON.stringify({ id: this.state.user.id })
            })
              .then(response => response.json())
              .then(count => {
                this.setState({
                  user: { ...this.state.user, entries: count }
                });
              });
          }
          this.calculateFaceLocation(response);
        })
        // eslint-disable-next-line
        .catch(err => console.error(err));
    });
  };
  onRouteChange = route => {
    const isSignedIn = route === "home";
    this.setState({ isSignedIn, route });
  };
  getViewtoRender = () => {
    const { route, imageUrl, boxes, user } = this.state;
    if (route === "home") {
      return (
        <React.Fragment>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition imageUrl={imageUrl} boxes={boxes} />
        </React.Fragment>
      );
    }

    if (route === "signin" || route === "signout") {
      return (
        <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
      );
    }
    if (route === "register") {
      return (
        <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
      );
    }
  };
  render() {
    const { isSignedIn } = this.state;
    return (
      <div className="App">
        {<Particles className="particles" params={particlesOptions} />}
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {this.getViewtoRender()}
      </div>
    );
  }
}

export default App;
