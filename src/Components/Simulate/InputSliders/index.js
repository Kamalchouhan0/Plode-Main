import React, { Component } from "react";
import "./sim.css";
import SliderRange from "../../Reusable/SliderRange/SliderRange";
import Nouislider from "../../logic/panels/helpers/Nouislider";
import PopupCard from "../../../Assets/Bisoft_UI/SimulationSliders/ui/popup-card.png";
import PopupCardSm from "../../../Assets/Bisoft_UI/SimulationSliders/ui/popup-card-small.png";
import a1 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/a1.png";
import a2 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/a2.png";
import b1 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/b1.png";
import b2 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/b2.png";
import c1 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/c1.png";
import c2 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/c2.png";
import d1 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/d1.png";
import d2 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/d2.png";
import rgb1 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/rgb1.png";
import distance from "../../../Assets/Bisoft_UI/SimulationSliders/ui/distance.png";
import light from "../../../Assets/Bisoft_UI/SimulationSliders/ui/light.png";
import gesture from "../../../Assets/Bisoft_UI/SimulationSliders/ui/gesture.png";
import t0 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/t0.png";
import t1 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/t1.png";
import t2 from "../../../Assets/Bisoft_UI/SimulationSliders/ui/t2.png";
import mic from "../../../Assets/Bisoft_UI/SimulationSliders/ui/mic.png";

function InputSlider(props) {
  console.log("ip slider", props);
  if (true) {
    return (
      <div className="conatainer" id="input-slider">
        {/* <!-- popup cards 1 --> */}
        <div className="boxSim">
          <img src={PopupCard} className="popupcard" />
          <div className="details card1">
            <div className="image_detail">
              <img src={a1} className="label" />
              <input type="range" className="rng" />
              <span className="inp_val">500</span>
            </div>
            <div className="image_detail">
              <img src={a2} className="label" />
              <input type="range" className="rnga1" />
              <span className="inp_val">500</span>
            </div>
          </div>
        </div>

        {/* <!-- popup cards 2 --> */}
        <div className="boxSim">
          <img src={PopupCard} className="popupcard" />
          <div className="details card2">
            <div className="image_detail">
              <img src={c1} className="label" />
              <div className="c1_image"></div>
              <input type="range" className="rng" />
              <span className="inp_val">500</span>
            </div>

            <div className="image_detail">
              <img src={c2} className="label" />
              <div className="c2_image"></div>
              <input type="range" className="rngc2" />
              <span className="inp_val">500</span>
            </div>
          </div>
        </div>

        {/* <!-- popup cards 3 --> */}
        <div className="boxSim">
          <img src={PopupCard} className="popupcard" />
          <div className="details card3">
            <div className="image_detail">
              <img src={b1} className="label" />
              <input type="range" className="rng" />
              <span className="inp_val">500</span>
            </div>

            <div className="image_detail">
              <img src={[b2]} className="label" />
              <input type="range" className="rngb2" />
              <span className="inp_val">500</span>
            </div>
          </div>
        </div>

        {/* <!-- popup cards 4 --> */}
        <div className="boxSim">
          <img src={PopupCard} className="popupcard" />
          <div className="details card4">
            <div className="d1image_detail">
              <img src={d1} className="label" />
              <div className="d1_image"></div>
              <input type="range" className="rng" />
              <span className="inp_val">500</span>
            </div>

            <div className="d2image_detail">
              <img src={d2} className="label" />
              <div className="d2_image"></div>
              <input type="range" className="rngd2" />
              <span className="inp_val">500</span>
            </div>
          </div>
        </div>

        {/* <!-- popup cards 5 --> */}

        {/* <!-- popup cards 7 --> */}
        <div className="boxSim">
          <img src={PopupCard} id="rgb" className="popupcard" />

          <div className="details card7">
            <div>
              <img src={rgb1} className="label" />
              <div className="b_image"></div>
              <input type="range" className="rng" id="input_red" />
              <span className="inp_val">500</span>
            </div>

            <div>
              <img src={rgb1} className="label" />
              <div className="b_image"></div>
              <input type="range" className="rng" id="input_blue" />
              <span className="inp_val">500</span>
            </div>

            <div>
              <img src={rgb1} className="label" />
              <div className="b_image"></div>
              <input type="range" className="rng" id="input_green" />
              <span className="inp_val">500</span>
            </div>
          </div>
        </div>

        {/* <!-- popup cards 8 --> */}
        <div className="boxSim">
          <img src={PopupCard} className="popupcard" />
          <div className="details card8">
            <div>
              <img src={distance} className="label" />
              <div className="dlg_image"></div>
              <input type="range" className="rng" />
              <span className="inp_val">500</span>
            </div>

            <div>
              <img src={light} className="label" />
              <div className="dlg_image"></div>
              <input type="range" className="rng" />
              <span className="inp_val">500</span>
            </div>

            <div>
              <img src={gesture} className="label" />
              <div className="dlg_image"></div>
              <input type="range" className="rng" />
              <span className="inp_val">500</span>
            </div>
          </div>
        </div>

        {/* <!-- popup cards 9.5 --> */}
        <div className="boxSimSm">
          <img src={PopupCardSm} className="popupcard" id="t0popup" />
          <div className="details card9-5">
            <div>
              <img src={t0} className="label" />
              <div className="ninth_image"></div>
              <input type="range" className="rng" />
              <span className="inp_val">500</span>
            </div>
          </div>
        </div>

        {/* <!-- popup cards 9.6 --> */}
        <div className="boxSimSm">
          <img src={PopupCardSm} className="popupcard" id="t0popup" />
          <div className="details card9-5">
            <div>
              <img src={t1} className="label" />
              <div className="ninth_image"></div>
              <input type="range" className="rng" />
              <span className="inp_val">500</span>
            </div>
          </div>
        </div>

        {/* <!-- popup cards 9.7 --> */}
        <div className="boxSimSm">
          <img src={PopupCardSm} className="popupcard" id="t0popup" />
          <div className="details card9-5">
            <div>
              <img src={t2} className="label" />
              <div className="ninth_image"></div>
              <input type="range" className="rng" />
              <span className="inp_val">500</span>
            </div>
          </div>
        </div>

        {/* <!-- popup cards 10 --> */}
        <div className="boxSimSm">
          <img src={PopupCardSm} className="popupcard" />
          <div className="details card10">
            <div>
              <div
                className="imgBox"
                id="Card5_toggle_A1"
                style={{ marginTop: "5%" }}
              >
                <img src={mic} className="label" id="Card5_toggle_A1_Img" />
              </div>
              <input type="range" className="rng" />
              <span className="inp_val">500</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <Nouislider
        range={{ min: 0, max: 100 }}
        value={10}
        disabled={false}
      ></Nouislider>
    );
  }
}
export default InputSlider;
