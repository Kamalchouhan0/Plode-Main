import React, { Component } from "react";
import "./concept.css";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

class ConceptHelp extends Component {
  constructor(props) {
    super(props);
    var imagesArray = sessionStorage.getItem("conceptHelp").split(",");
    this.state = {
      isShowing: false,
      Next: "Next",
      imagesArray: imagesArray,
    };
  }
  render() {
    var tutorialName = "Final";
    return (
      <div>
        Slideshow for Concept:
        <CarouselProvider
          naturalSlideWidth={100}
          naturalSlideHeight={45}
          totalSlides={this.state.imagesArray.length}
        >
          <Slider>
            {this.state.imagesArray.map((value, i) => {
              return (
                <Slide index={i}>
                  <img
                    style={{ width: "100vw", height: "100%" }}
                    id="myImg"
                    src={`https://downloads.bibox.in/${tutorialName}/concept_help/${value}`}
                    alt="your image"
                  />
                </Slide>
              );
            })}
          </Slider>
          <div style={{ position: "absolute", top: "95vh", left: "43vw" }}>
            <ButtonBack>Pervious</ButtonBack>
            <ButtonNext>Next</ButtonNext>
          </div>
        </CarouselProvider>
      </div>
    );
  }
}

export default ConceptHelp;
