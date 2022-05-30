import Pot from "../Assets/Bisoft_UI/Accessories/newComponents/component_pot.png";
import distanceSensor from "../Assets/Bisoft_UI/Accessories/newComponents/component_distance_sensor.png";

import joystick from "../Assets/Bisoft_UI/Accessories/newComponents/component_joystick.png";
import dualswitch from "../Assets/Bisoft_UI/Accessories/newComponents/component_dual_switch.png";
import laser from "../Assets/Bisoft_UI/Accessories/newComponents/component_laser.png";
import lightsensor from "../Assets/Bisoft_UI/Accessories/newComponents/component_light_sensor.png";

import servomotor from "../Assets/Bisoft_UI/Accessories/newComponents/component_servo_motor.png";
import servomotor_360 from "../Assets/Bisoft_UI/Accessories/newComponents/component_servo_motor_360.png";
import led from "../Assets/Bisoft_UI/Accessories/newComponents/component_led.png";
import tactswitch from "../Assets/Bisoft_UI/Accessories/newComponents/component_tact_switch.png";

// import tempdew from "../Assets/Bisoft_UI/Accessories/newComponents/component_temp_dew.png";
// import tempgas from "../Assets/Bisoft_UI/Accessories/newComponents/component_temp_gas.png";
import touchsensor from "../Assets/Bisoft_UI/Accessories/newComponents/component_touch_sensor.png";

import led_1c from "../Assets/Bisoft_UI/Accessories/newComponents/component_led_1c.png";
import tactswitch_2c from "../Assets/Bisoft_UI/Accessories/newComponents/component_tact_switch_2c.png";
import ultrasonicsensor from "../Assets/Bisoft_UI/Accessories/newComponents/component_ultrasonic_sensor.png";

import RGB from "../Assets/Bisoft_UI/Accessories/newComponents/component_RGB.png";
import OLED from "../Assets/Bisoft_UI/Accessories/newComponents/component_OLED.png";
import mp3 from "../Assets/Bisoft_UI/Accessories/newComponents/component_mp3.png";

import dipswitch from "../Assets/Bisoft_UI/Accessories/newComponents/component_dip_switch.png";

import rainsensor from "../Assets/Bisoft_UI/Accessories/newComponents/component_rain_sensor.png";
import linearpot from "../Assets/Bisoft_UI/Accessories/newComponents/component_linear_pot.png";
import humidity from "../Assets/Bisoft_UI/Accessories/newComponents/component_humidity.png";
import metaldetector from "../Assets/Bisoft_UI/Accessories/newComponents/component_metal_detector.png";
import extender from "../Assets/Bisoft_UI/Accessories/newComponents/component_extender.png";

import temp from "../Assets/Bisoft_UI/Accessories/newComponents/component_temperature_sensor.png";
import gas from "../Assets/Bisoft_UI/Accessories/newComponents/component_gas.png";

function renderCompImg(name) {
  switch (name) {
    case "pot":
      var type = Pot;
      return type;

    case "distance_sensor":
      var type = distanceSensor;
      return type;

    case "dual_switch":
      var type = dualswitch;
      return type;

    // case "temp_dew":
    //   var type = tempdew;
    //   return type;

    // case "temp_gas":
    //   var type = tempgas;
    //   return type;

    case "joystick":
      var type = joystick;
      return type;

    case "laser":
      var type = laser;
      return type;

    case "led":
      var type = led;
      return type;

    case "servo_motor":
      var type = servomotor;
      return type;

    case "servo_motor_360":
      var type = servomotor_360;
      return type;

    case "light_sensor":
      var type = lightsensor;
      return type;

    case "tact_switch":
      var type = tactswitch;
      return type;

    case "touch_sensor":
      var type = touchsensor;
      return type;

    case "ultrasonic_sensor":
      var type = ultrasonicsensor;
      return type;

    case "led_1c":
      var type = led_1c;
      return type;

    case "tact_switch_2c":
      var type = tactswitch_2c;
      return type;

    case "RGB":
      var type = RGB;
      return type;

    case "OLED":
      var type = OLED;
      return type;

    case "mp3":
      var type = mp3;
      return type;

    case "dip_switch":
      var type = dipswitch;
      return type;

    case "linear_pot":
      var type = linearpot;
      return type;

    case "humidity":
      var type = humidity;
      return type;

    case "metal_detector":
      var type = metaldetector;
      return type;

    case "extender":
      var type = extender;
      return type;

    case "temperature_sensor":
      var type = temp;
      return type;

    case "gas":
      var type = gas;
      return type;

    case "rain_sensor":
      var type = rainsensor;
      return type;
  }
}
export default renderCompImg;
