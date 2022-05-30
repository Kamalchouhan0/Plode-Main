var Device = sessionStorage.getItem("connectedDevice");

var Ports_A = JSON.parse(sessionStorage.getItem("assembly")).PortConnections.A;

var PortConnections_B = JSON.parse(sessionStorage.getItem("assembly"))
  .PortConnections.B;

// if(PortConnections_A != null && PortConnections_A.type =="pc_motor_driver"){}

if (Device == "Ace") {
  module.exports = {
    led: [
      "A",
      "B",
      "C",
      "D",
      "A1",
      "A2",
      "B1",
      "B2",
      "D1",
      "D2",
      "C1",
      "C2",
      "F",
      "F1",
      "F2",
    ],
    led_1c: [
      "A",
      "B",
      "C",
      "D",
      "A1",
      "C1",
      "B1",
      "D1",
      "A2",
      "C2",
      "B2",
      "D2",
      "F",
      "F1",
      "F2",
    ],
    laser: ["A", "B", "C", "D", "A1", "B1", "D1", "C1"],
    beeper: ["A", "B", "D", "A1", "A2", "B1", "B2", "D1", "D2"],
    replay_1_ch: [
      "A",
      "B",
      "C",
      "D",
      "A1",
      "A2",
      "B1",
      "B2",
      "C2",
      "C1",
      "D1",
      "D2",
    ],

    dual_splitter: ["A", "B", "D", "C", "F"],

    pc_motor_driver: ["D", "B", "A", "C"],

    octa_splitter: ["C"], //HI
    humidity_sensor: ["A", "B", "C", "A1", "A2", "B1", "B2", "C2", "C1"],
    distance_sensor: ["A", "B", "C", "A1", "A2", "B1", "B2", "C2", "C1"],

    // NEW sensor COMPONENTS
    rotatory: [
      "A",
      "B",
      "C",
      "A1",
      //  "A2",
      "B1",
      // "B2",
      // "C2",
      "C1",
    ],
    rain_sensor: [
      "A",
      "B",
      "C",
      "A1",
      //  "A2",
      "B1",
      // "B2",
      // "C2",
      "C1",
    ],
    pot: [
      "A",
      "B",
      "C",
      "A1",
      //  "A2",
      "B1",
      // "B2",
      // "C2",
      "C1",
    ],
    temp_dew: ["A", "B", "C", "A1", "A2", "B1", "B2", "C2", "C1"],
    temp_gas: ["A", "B", "C", "A1", "A2", "B1", "B2", "C2", "C1"],
    joystick: ["A", "B", "C", "A1", "A2", "B1", "B2", "C2", "C1"],
    RGB: ["B"],
    mp3: ["B"],
    OLED: ["D"],
    // OLD ONEs
    temperature_sensor: [
      "A",
      "B",
      "C",
      "A1",
      // "A2",
      "B1",
      // "B2",
      // "C2",
      "C1",
    ],
    sound_sensor: ["A", "B", "C", "A1", "A2", "B1", "B2", "C2", "C1"],
    gas_sensor: ["A", "B", "C", "A1", "A2", "B1", "B2", "C2", "C1"],
    bend_sensor: ["A", "B", "C", "A1", "A2", "B1", "B2", "C2", "C1"],
    hall_sensor: ["A", "B", "C", "A1", "A2", "B1", "B2", "C2", "C1"],
    light_sensor: ["A", "B", "C", "A1", "B1", "C1"],
    // rain_sensor: ["A", "B", "C", "A1", "A2", "B1", "B2", "C2", "C1"],
    // metal_detector: ["A", "B", "C", "A1", "A2", "B1", "B2", "C2", "C1"],
    heartbeat_sensor: ["A", "B", "C", "A1", "A2", "B1", "B2", "C2", "C1"],
    tact_switch: ["A", "B", "C", "A1", "B1", "C1"],
    // tact_switch_2c: ["A", "B", "C", "A1", "A2", "B1", "B2", "C2", "C1"],
    dip_switch: ["A", "B", "C", "A1", "A2", "B1", "B2", "C2", "C1"],
    metal_detector: ["A", "B", "C", "A1", "B1", "C1"],
    extender: ["A", "B", "C", "A1", "A2", "B1", "B2", "C2", "C1"],
    humidity: [
      "A",
      "B",
      "C",
      "A1",
      //  "A2",
      "B1",
      // "B2",
      // "C2",
      "C1",
    ],
    linear_pot: [
      "A",
      "B",
      "C",
      "A1",
      //  "A2",
      "B1",
      // "B2",
      // "C2",
      "C1",
    ],
    // temp: [
    //   "A",
    //   "B",
    //   "C",
    //   "A1",
    //   //  "A2",
    //   "B1",
    //   // "B2",
    //   // "C2",
    //   "C1",
    // ],
    gas: [
      "A",
      "B",
      "C",
      "A1",
      //  "A2",
      "B1",
      // "B2",
      // "C2",
      "C1",
    ],

    dual_switch: ["A", "B", "C", "A1", "A2", "B1", "B2", "C2", "C1"],
    touch_sensor: ["A", "B", "C", "A1", "B1", "C1"],
    pir_sensor: [
      "A",
      "B",
      "D",
      "C",
      "A1",
      "A2",
      "B1",
      "B2",
      "C2",
      "C1",
      "D1",
      "D2",
    ],
    ultrasonic_sensor: ["A", "C"],
    // '4_in_1_sensor': ['G'],
    // 'relay': ['MOTOR'],
    // 'dc_motor': ['MOTOR'],
    // 'electromagnet': ['MOTOR'],
    // 'geared_motor': ['MOTOR'],
    // 'mini_geared_motor': ['MOTOR'],

    servo_extender: ["B"],

    //PC MOTOR DRIVER
    geared_motor: ["A1", "C1", "B1", "D1"],
    mini_geared_motor: ["A1", "C1", "B1", "D1"],
    dc_motor: ["A1", "C1", "B1", "D1", "M1", "M3"],
    servo_motor: ["A1", "A2", "C1", "C2", "B2", "B1", "D2", "D1"],

    servo_motor_360: ["A1", "A2", "C1", "C2", "B2", "B1", "D2", "D1"],
    stepper_motor: ["STPM"],
  };
} else if (Device == "Humanoid") {
  module.exports = {
    led: ["A", "B", "C", "D", "A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"],
    laser: ["A", "B", "C", "D", "A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"],
    beeper: [
      "A",
      "B",
      "C",
      "D",
      "A1",
      "A2",
      "B1",
      "B2",
      "C1",
      "C2",
      "D1",
      "D2",
    ],
    replay_1_ch: [
      "A",
      "B",
      "C",
      "D",
      "A1",
      "A2",
      "B1",
      "B2",
      "C2",
      "C1",
      "D1",
      "D2",
    ],
    dual_splitter: ["A", "B", "D", "C"],
    octa_splitter: ["C"], //HI

    humidity_sensor: [
      "A",
      "B",
      "D",
      "C",
      "A1",
      "A2",
      "B1",
      "B2",
      "C1",
      "C2",
      "D1",
      "D2",
    ],
    distance_sensor: [
      "A",
      "B",
      "D",
      "C",
      "A1",
      "A2",
      "B1",
      "B2",
      "C1",
      "C2",
      "D1",
      "D2",
    ],
    temperature_sensor: [
      "A",
      "B",
      "D",
      "C",
      "A1",
      "A2",
      "B1",
      "B2",
      "C1",
      "C2",
      "D1",
      "D2",
    ],
    sound_sensor: [
      "A",
      "B",
      "D",
      "C",
      "A1",
      "A2",
      "B1",
      "B2",
      "C1",
      "C2",
      "D1",
      "D2",
    ],
    gas_sensor: [
      "A",
      "B",
      "D",
      "C",
      "A1",
      "A2",
      "B1",
      "B2",
      "C1",
      "C2",
      "D1",
      "D2",
    ],
    bend_sensor: [
      "A",
      "B",
      "D",
      "C",
      "A1",
      "A2",
      "B1",
      "B2",
      "C1",
      "C2",
      "D1",
      "D2",
    ],
    hall_sensor: [
      "A",
      "B",
      "D",
      "C",
      "A1",
      "A2",
      "B1",
      "B2",
      "C1",
      "C2",
      "D1",
      "D2",
    ],
    light_sensor: [
      "A",
      "B",
      "D",
      "C",
      "A1",
      "A2",
      "B1",
      "B2",
      "C1",
      "C2",
      "D1",
      "D2",
    ],
    rain_sensor: [
      "A",
      "B",
      "D",
      "C",
      "A1",
      "A2",
      "B1",
      "B2",
      "C1",
      "C2",
      "D1",
      "D2",
    ],

    metal_detector: [
      "A",
      "B",
      "D",
      "C",
      "A1",
      "A2",
      "B1",
      "B2",
      "C1",
      "C2",
      "D1",
      "D2",
    ],
    heartbeat_sensor: [
      "A",
      "B",
      "D",
      "C",
      "A1",
      "A2",
      "B1",
      "B2",
      "C1",
      "C2",
      "D1",
      "D2",
    ],
    tact_switch: [
      "A",
      "B",
      "D",
      "C",
      "A1",
      "A2",
      "B1",
      "B2",
      "C1",
      "C2",
      "D1",
      "D2",
    ],
    dual_switch: [
      "A",
      "B",
      "D",
      "C",
      "A1",
      "A2",
      "B1",
      "B2",
      "C1",
      "C2",
      "D1",
      "D2",
    ],
    touch_sensor: [
      "A",
      "B",
      "D",
      "C",
      "A1",
      "A2",
      "B1",
      "B2",
      "C1",
      "C2",
      "D1",
      "D2",
    ],
    pir_sensor: [
      "A",
      "B",
      "D",
      "C",
      "A1",
      "A2",
      "B1",
      "B2",
      "C1",
      "C2",
      "D1",
      "D2",
    ],
    ultrasonic_sensor: ["A", "D"],
    // '4_in_1_sensor': ['G'],
    // 'relay': ['MOTOR'],
    // 'dc_motor': ['MOTOR'],
    // 'electromagnet': ['MOTOR'],
    // 'geared_motor': ['MOTOR'],
    // 'mini_geared_motor': ['MOTOR'],
    servo_motor: ["B1"],
    servo_extender: ["B"],
  };
} else {
  module.exports = {
    led: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "A1",
      "A2",
      "B1",
      "B2",
      "C2",
      "C1",
      "D1",
      "D2",
      "E1",
      "E2",
      "F1",
      "F2",
      "G1",
      "G2",
      "H1",
      "H2",
      "I1",
      "I2",
    ],
    laser: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "A1",
      "A2",
      "B1",
      "B2",
      "C2",
      "C1",
      "D1",
      "D2",
      "E1",
      "E2",
      "F1",
      "F2",
      "G1",
      "G2",
      "H1",
      "H2",
      "I1",
      "I2",
    ],
    beeper: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "A1",
      "A2",
      "B1",
      "B2",
      "C2",
      "C1",
      "D1",
      "D2",
      "E1",
      "E2",
      "F1",
      "F2",
      "G1",
      "G2",
      "H1",
      "H2",
      "I1",
      "I2",
    ],
    replay_1_ch: [
      "A",
      "B",
      "D",
      "C",
      "E",
      "F",
      "G",
      "A1",
      "A2",
      "B1",
      "B2",
      "C2",
      "C1",
      "D1",
      "D2",
      "E1",
      "E2",
      "F1",
      "F2",
      "G1",
      "G2",
      "H1",
      "H2",
      "I1",
      "I2",
    ],
    dual_splitter: ["A", "B", "D", "C", "E", "F", "G"],
    octa_splitter: ["C", "E", "H", "I"], //HI
    humidity_sensor: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "B1",
      "A1",
      "A2",
      "C2",
      "C1",
      "D1",
      "E1",
      "E2",
      "F1",
    ],
    distance_sensor: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "B1",
      "A1",
      "A2",
      "C2",
      "C1",
      "D1",
      "E1",
      "E2",
      "F1",
    ],
    temperature_sensor: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "A1",
      "A2",
      "B1",
      "C2",
      "C1",
      "D1",
      "E1",
      "E2",
      "F1",
    ],
    sound_sensor: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "B1",
      "A1",
      "A2",
      "C2",
      "C1",
      "D1",
      "E1",
      "E2",
      "F1",
    ],
    gas_sensor: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "B1",
      "A1",
      "A2",
      "C2",
      "C1",
      "D1",
      "E1",
      "E2",
      "F1",
    ],
    bend_sensor: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "B1",
      "A1",
      "A2",
      "C2",
      "C1",
      "D1",
      "E1",
      "E2",
      "F1",
    ],
    hall_sensor: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "B1",
      "A1",
      "A2",
      "C2",
      "C1",
      "D1",
      "E1",
      "E2",
      "F1",
    ],
    light_sensor: [
      "A",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "B1",
      "A1",
      "A2",
      "C2",
      "C1",
      "D1",
      "E1",
      "E2",
      "F1",
    ],
    rain_sensor: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "B1",
      "A1",
      "A2",
      "C2",
      "C1",
      "D1",
      "E1",
      "E2",
      "F1",
    ],

    metal_detector: [
      "A",
      "B",
      "D",
      "C",
      "E",
      "F",
      "G",
      ,
      "A1",
      "A2",
      "B1",
      "B2",
      "C2",
      "C1",
      "D1",
      "D2",
      "E1",
      "E2",
      "F1",
      "F2",
      "G1",
      "G2",
      "H1",
      "H2",
      "I1",
      "I2",
    ],
    heartbeat_sensor: [
      "A",
      "B",
      "D",
      "C",
      "E",
      "F",
      "G",
      "A1",
      "A2",
      "B1",
      "B2",
      "C2",
      "C1",
      "D1",
      "D2",
      "E1",
      "E2",
      "F1",
      "F2",
      "G1",
      "G2",
      "H1",
      "H2",
      "I1",
      "I2",
    ],
    tact_switch: [
      "A",
      "B",
      "D",
      "C",
      "E",
      "F",
      "G",
      "A1",
      "A2",
      "B1",
      "B2",
      "C2",
      "C1",
      "D1",
      "D2",
      "E1",
      "E2",
      "F1",
      "F2",
      "G1",
      "G2",
      "H1",
      "H2",
      "I1",
      "I2",
    ],
    dual_switch: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "A1",
      "A2",
      "B1",
      "B2",
      "C2",
      "C1",
      "D1",
      "D2",
      "E1",
      "E2",
      "F1",
      "F2",
      "G1",
      "G2",
      "H1",
      "H2",
      "I1",
      "I2",
    ],
    touch_sensor: [
      "A",
      "B",
      "D",
      "C",
      "E",
      "F",
      "G",
      "A1",
      "A2",
      "B1",
      "B2",
      "C2",
      "C1",
      "D1",
      "D2",
      "E1",
      "E2",
      "F1",
      "F2",
      "G1",
      "G2",
      "H1",
      "H2",
      "I1",
      "I2",
    ],
    pir_sensor: [
      "A",
      "B",
      "D",
      "C",
      "E",
      "F",
      "G",
      "A1",
      "A2",
      "B1",
      "B2",
      "C2",
      "C1",
      "D1",
      "D2",
      "E1",
      "E2",
      "F1",
      "F2",
      "G1",
      "G2",
      "H1",
      "H2",
      "I1",
      "I2",
    ],

    ultrasonic_sensor: ["A", "G"],
    "4_in_1_sensor": ["G"],

    relay: ["MOTOR"],
    dc_motor: ["MOTOR"],
    electromagnet: ["MOTOR"],
    geared_motor: ["MOTOR"],
    mini_geared_motor: ["MOTOR"],
    servo_motor: ["B1", "F1"],
    servo_extender: ["B", "F"],
    // '7segment_display': ['E',],
    // 'led': ['A', 'A23', 'F1', 'F2', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4', 'G1', 'G2'],
    // 'geared_motor': ['MOTOR'],
    // 'mini_geared_motor': ['MOTOR'],
    // 'stepper_motor': ['B12', 'C12'],
    // 'servo_motor': ['A22', 'A33'],
    // 'servo_extender': ['A23'],
    // 'beeper': ['A', 'A23', 'F1', 'F2', 'G1', 'G2', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4', 'G1', 'G2'],
    // 'laser': ['A', 'A23', 'F1', 'F2', 'G1', 'G2', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4', 'G1', 'G2'],
    // 'dot_matrix': ['B12'],
    // 'mp3': ['F'],
    // 'dual_splitter': ['F', 'G', 'B12','B34' ,'C12','C34'],
    // 'octa_splitter': ['B'],
    // 'humidity_sensor': ['A', 'A23', 'B2', 'B3', 'B4'],
    // 'metal_detector': ['A', 'A23', 'F1', 'F2', 'G1', 'G2', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4',],
    // 'color_sensor': ['F'],
    // 'heartbeat_sensor': ['A', 'A23', 'F1', 'F2', 'G1', 'G2', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4',],
    // 'ultrasonic_sensor': ['F', 'G'],
    // 'hall_sensor': ['A', 'A23', 'B2', 'B3', 'B4'],
    // 'rfid': ['B34'],
    // 'dc_motor': ['MOTOR'],
    // '7segment_display': ['BC'],
    // 'relay': ['MOTOR'],
    // '4_CH_relay': ['B12', 'C12'],
    // 'electromagnet': ['MOTOR'],
    // 'led_strip': ['BC'],
    // 'light_sensor': ['A', 'A23', 'B2', 'B3', 'B4'],
    // 'bend_sensor': ['A', 'A23', 'B2', 'B3', 'B4'],
    // 'gas_sensor': ['A', 'A23', 'B2', 'B3', 'B4'],
    // 'distance_sensor': ['A', 'A23', 'B2', 'B3', 'B4'],
    // 'sound_sensor': ['A', 'A23', 'B2', 'B3', 'B4'],
    // 'temperature_sensor': ['A', 'A23', 'B2', 'B3', 'B4'],
    // 'rain_sensor': ['A', 'A23', 'B2', 'B3', 'B4'],
    // 'tact_switch': ['A', 'A23', 'F1', 'F2', 'G1', 'G2', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4',],
    // 'dual_switch': ['F', 'G', 'B12','B34' ,'C12','C34'],
    // 'touch_sensor': ['A', 'A23', 'F1', 'F2', 'G1', 'G2', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4',],
    // 'pir_sensor': ['A', 'A23', 'F1', 'F2', 'G1', 'G2', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4',],
    // 'joystick': ['B34'],
    // '4_in_1_sensor': ['G'],
    // 'gyro_sensor': ['G'],
    // 'compass': ['G'],
    // 'rotational_sensor': ['A', 'A23', 'B2', 'B3', 'B4'],
    // 'accelerometer': ['G'],
    // 'solar_panel': ['A', 'A23'],
    // 'battery': ['BATTERY'],
    // 'gesture_sensor': ['G'],
  };
}
