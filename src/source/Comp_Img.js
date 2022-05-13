import Type from "../Assets/Bisoft_UI/Accessories/newComponents/component_rotatory.png";
import distanceSensor from "../Assets/Bisoft_UI/Accessories/newComponents/component_distance_sensor.png";

import joystick from "../Assets/Bisoft_UI/Accessories/newComponents/component_joystick.png";
import dualswitch from "../Assets/Bisoft_UI/Accessories/newComponents/component_dual_switch.png";
import laser from "../Assets/Bisoft_UI/Accessories/newComponents/component_laser.png";
import lightsensor from "../Assets/Bisoft_UI/Accessories/newComponents/component_light_sensor.png";

import servomotor from "../Assets/Bisoft_UI/Accessories/newComponents/component_servo_motor.png";
import servomotor_360 from "../Assets/Bisoft_UI/Accessories/newComponents/component_servo_motor_360.png";
import led from "../Assets/Bisoft_UI/Accessories/newComponents/component_led.png";
import tactswitch from "../Assets/Bisoft_UI/Accessories/newComponents/component_tact_switch.png";

import tempdew from "../Assets/Bisoft_UI/Accessories/newComponents/component_temp_dew.png";
import tempgas from "../Assets/Bisoft_UI/Accessories/newComponents/component_temp_gas.png";
import touchsensor from "../Assets/Bisoft_UI/Accessories/newComponents/component_touch_sensor.png";

import led_1c from "../Assets/Bisoft_UI/Accessories/newComponents/component_led_1c.png";
import tactswitch_2c from "../Assets/Bisoft_UI/Accessories/newComponents/component_tact_switch_2c.png";
import ultrasonicsensor from "../Assets/Bisoft_UI/Accessories/newComponents/component_ultrasonic_sensor.png";

var type;

function renderCompImg(name) {
  switch (name) {
    case "rotatory":
      var type = Type;
      return type;

    case "distance_sensor":
      var type = distanceSensor;
      return type;

    case "dual_switch":
      var type = dualswitch;
      return type;

    case "temp_dew":
      var type = tempdew;
      return type;

    case "temp_gas":
      var type = tempgas;
      return type;

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
  }
}
export default renderCompImg;
