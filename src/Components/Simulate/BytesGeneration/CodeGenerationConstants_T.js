var exports = (module.exports = {});

exports.PortsAndPortbytes = {
  A1: ["A1"],
  B1: ["B1"],
  C1: ["C1"],
  D1: ["D1"],
  E1: ["E1"],
  A2: ["A2"],
  B2: ["B2"],
  C2: ["C2"],
  D2: ["D2"],
  E2: ["E2"],
  F1: ["F1"],
  F2: ["F2"],
  G1: ["G1"],
  G2: ["G2"],
  H1: ["H1"],
  H2: ["H2"],
  I1: ["I1"],
  I2: ["I2"],
  MOTOR1: ["MOTOR1"],
  MOTOR2: ["MOTOR2"],
  MOTOR3: ["MOTOR3"],
  MOTOR4: ["MOTOR4"],
  Beeper: ["Beeper"],
  bid1: ["Bidata1"],
  usbrx: ["Bidata2"],
  usbtx: ["Bidata3"],
  bif1: ["Biflag1"],
  bif2: ["Biflag2"],
  btRx: ["Biflag3"],
  bic1: ["Bicounter1 - assign"],
  bic2: ["Bicounter2 - assign"],
  btTx: ["Bicounter3 - assign"],
  Countbic1: ["Bicounter1 - "],
  Countbic2: ["Bicounter2 - "],
  Countbic3: ["Bicounter3 - "],
  btr: ["Btremote"],
  bpr: ["Beeper"],
  IOT1: ["IOT1"],
  IOT2: ["IOT2"],
  IOT3: ["IOT3"],
  IOT4: ["IOT4"],
  IOT5: ["IOT5"],
  IOT6: ["IOT6"],
  IOT7: ["IOT7"],
  IOT8: ["IOT8"],
  IOT9: ["IOT9"],
  IOT10: ["IOT10"],

  // RGB: ["RGB"],
  // FOUR_in_ONE_Sensor: ["FOUR_in_ONE_Sensor"],
  // Buzzer: ["Buzzer"],
  // MICROPHONE: ["MICROPHONE"],

  Eye: ["Eye"], // both left and right eye
  buzzer: ["buzzer"],
  Four_in_one_sensor: ["Four_in_one_sensor"],
  Mic: ["Mic"], //microphone

  SmileOne: ["SmileOne"],
  SmileTwo: ["SmileTwo"],
  SmileThree: ["SmileThree"],
  SmileFour: ["SmileFour"],

  BuzzerFrequency: ["BuzzerFrequency"],
  BuzzerTone: ["BuzzerTone"],

  LeftEyeR: ["LeftEyeR"],
  LeftEyeG: ["LeftEyeG"],
  LeftEyeB: ["LeftEyeB"],

  RightEyeR: ["RightEyeR"],
  RightEyeG: ["RightEyeG"],
  RightEyeB: ["RightEyeB"],

  Temperature: ["Temperature"],
  TouchZero: ["TouchZero"],
  TouchOne: ["TouchOne"],
  TouchTwo: ["TouchTwo"],

  RGBLEDR: ["RGBLEDR"],
  RGBLEDG: ["RGBLEDG"],
  RGBLEDB: ["RGBLEDB"],

  // humanoid Actions
  Attention: ["Attention"],
  Forward: ["Forward"],
  Backward: ["Backward"],
  Mourn: ["Mourn"],
  Left: ["Left"],
  Right: ["Right"],
  Wave: ["Wave"],
  Bow: ["Bow"],
  Wings: ["Wings"],
  Hook_Left: ["Hook_Left"],
  Hook_Right: ["Hook_Right"],
  Right_Curved_Hook: ["Right_Curved_Hook"],
  Left_Curved_Hook: ["Left_Curved_Hook"],
  Push_up: ["Push_up"],
  Sit_up: ["Sit_up"],
  Squat: ["Squat"],
  Laugh: ["Laugh"],
  Box_Forward: ["Box_Forward"],
  Box_Squat: ["Box_Squat"],
  Box_Left: ["Box_Left"],
  Box_Right: ["Box_Right"],
  Break_Dance: ["Break_Dance"],
  Gangnam_style: ["Gangnam_style"],
};

exports.CorrespondingPortCode = {
  // setting the program bytes
  // RGB: "L",
  // Buzzer: "B",
  // FOUR_in_ONE_Sensor: "G",
  // MICROPHONE: "M",

  Eye: "L", // both eye left n right
  buzzer: "B",
  Four_in_one_sensor: "G",
  Mic: "M", //microphone

  SmileOne: "O",
  SmileTwo: "O",
  SmileThree: "O",
  SmileFour: "O",

  Temperature: "T",
  TouchZero: "T",
  TouchOne: "T",
  TouchTwo: "T",

  led: "P",
  laser: "O",
  dual_splitter: "O",
  beeper: "O",
  geared_motor: "P",
  mini_geared_motor: "P",
  servo_motor: "S",
  servo_motor_360: "R",
  motor_driver: "O",
  dc_motor: "P",
  "7segment_display": "O",
  "4_CH_relay": "O",
  relay: "O",
  electromagnet: "P",
  mp3: "M",
  led_strip: "O",
  dot_matrix: "D",
  metal_detector: "I",
  ultrasonic_sensor: "U",
  heartbeat_sensor: "I",
  rfid: "R",
  color_sensor: "C",
  tact_switch: "I",
  dual_switch: "I",
  touch_sensor: "I",
  pir_sensor: "I",
  gesture_sensor: "G",
  "4_in_1_sensor": "G",
  battery: "O",
  gyro_sensor: "G",
  compass: "P",
  G1: "O",
  G2: "O",
  light_sensor: "A",
  bend_sensor: "A",
  gas_sensor: "A",
  distance_sensor: "A",
  sound_sensor: "A",
  temperature_sensor: "A",
  rain_sensor: "A",
  humidity_sensor: "A",
  hall_sensor: "A",
  rotational_sensor: "A",

  temp_gas: "A",
  rotatory: "A",
  temp_dew: "A",

  accelerometer: "A",
  solar_panel: "A",
  joystick: "A",
};

exports.PortByteValuesIf = {
  A1: "1",
  A2: "2",
  B1: "3",
  B2: "4",
  C1: "5",
  C2: "6",
  D1: "7",
  D2: "8",
  E1: "9",
  E2: "10",
  F1: "11",
  F2: "12",
  G1: "13",
  G2: "14",
  H1: "15",
  H2: "16",
  I1: "17",
  I2: "18",
  M1: "19",
  M2: "20",
  bid1: "Bidata1",
  usbrx: "Bidata2",
  usbtx: "Bidata3",
  bif1: "Biflag1",
  bif2: "Biflag2",
  btRx: "Biflag3",
  bic1: "Bicounter1",
  bic2: "Bicounter2",
  btTx: "Bicounter3",
  remote: "Btremote",
  slider: "Btslider",
  IOT1: ["IOT1"],
  IOT2: ["IOT2"],
  IOT3: ["IOT3"],
  IOT4: ["IOT4"],
  IOT5: ["IOT5"],
  IOT6: ["IOT6"],
  IOT7: ["IOT7"],
  IOT8: ["IOT8"],
  IOT9: ["IOT9"],
  IOT10: ["IOT10"],
};

exports.PortByteNumericalValuesIf = {
  A1: "1",
  A2: "2",
  B1: "3",
  B2: "4",
  C1: "5",
  C2: "6",
  D1: "7",
  D2: "8",
  E1: "9",
  E2: "10",
  F1: "11",
  F2: "12",
  G1: "13",
  G2: "14",
  H1: "15",
  H2: "16",
  I1: "17",
  I2: "18",
  M1: "19",
  M2: "20",
  Bicounter1: "31",
  Bicounter2: "32",
  Bicounter3: "33",
  "reserved for future": "34",
  Biflag1: "35",
  Biflag2: "36",
  Biflag3: "37",
  Btremote: "38",
  Btslider: "39",
  Bidata1: "42",
  Bidata2: "43",
  Bidata3: "44",
  U1: "45",
  U2: "46",
  _R: "47",
  G: "70",
  B: "71",
  D: "73",
  M: "74",
  L: "72",
  _G: "48",
  _B: "49",
  rfid: "50",
  timeElapsed: "51",
  battery: "52",
  time: "63",
  // 'IOT1': '52',
  IOT1: "52",
  IOT2: "53",
  IOT3: "54",
  IOT4: "55",
  IOT5: "56",
  IOT6: "57",
  IOT7: "58",
  IOT8: "59",
  IOT9: "60",
  IOT10: "61",

  FOUR_in_ONE_Sensor_MOTION: "30",

  FOUR_in_ONE_Sensor_DIST: "26",
  FOUR_in_ONE_Sensor_GESTURE: "28",
  FOUR_in_ONE_Sensor_LIGHT: "27",
  FOUR_in_ONE_Sensor_RED: "23",
  FOUR_in_ONE_Sensor_GREEN: "24",
  FOUR_in_ONE_Sensor_BLUE: "25",

  MICROPHONE: "29",
  TEMPERATURE: "34",
  TouchZero: "30",
  TouchOne: "31",
  TouchTwo: "32",
};

exports.PortByteNumericalValuesOutput = {
  A1: "1",
  A2: "2",
  B1: "3",
  B2: "4",
  C1: "5",
  C2: "6",
  D1: "7",
  D2: "8",
  E1: "9",
  E2: "10",
  F1: "11",
  F2: "12",
  G1: "13",
  G2: "14",
  H1: "15",
  H2: "16",
  I1: "17",
  I2: "18",
  MOTOR1: "19",
  MOTOR2: "20",
  MOTOR3: "21",
  MOTOR4: "22",

  R: "69",
  G: "46",
  B: "71",
  D: "73",
  M: "74",
  L: "72",

  // portNumber of buzzer
  Buzzer: "21",
  RGBLEDR: "22",
  RGBLEDG: "23",
  RGBLEDB: "24",

  // PortNumber
  LeftEyeR: "24",
  LeftEyeG: "25",
  LeftEyeB: "26",
  RightEyeR: "27",
  RightEyeG: "28",
  RightEyeB: "29",

  SmileOne: "19",
  SmileTwo: "20",
  SmileThree: "21",
  SmileFour: "22",

  BuzzerFrequency: "23",
  BuzzerTone: "30",

  TouchZero: "31",
  TouchOne: "32",
  TouchTwo: "33",

  Attention: "100",
  Forward: "100",
  Backward: "100",
  Mourn: "100",
  Left: "100",
  Right: "100",
  Wave: "100",
  Bow: "100",
  Wings: "100",
  Hook_Left: "100",
  Hook_Right: "100",
  Right_Curved_Hook: "100",
  Left_Curved_Hook: "100",
  Push_up: "100",
  Sit_up: "100",
  Squat: "100",
  Laugh: "100",
  Box_Forward: "100",
  Box_Squat: "100",
  Box_Left: "100",
  Box_Right: "100",
  Break_Dance: "100",
  Gangnam_style: "100",
};
exports.BiDataValuesOutput = {
  A1: "1",
  A2: "2",
  B1: "3",
  B2: "4",
  C1: "5",
  C2: "6",
  D1: "7",
  D2: "8",
  E1: "9",
  E2: "10",
  F1: "11",
  F2: "12",
  G1: "13",
  G2: "14",
  H1: "15",
  H2: "16",
  I1: "17",
  I2: "18",
  MOTOR1: "19",
  MOTOR2: "20",
  MOTOR3: "21",
  MOTOR4: "22",
  R: "69",
  G: "46",
  B: "71",
  D: "73",
  M: "74",
  L: "72",
};

exports.nodeDefaultCodes = {
  //main changes is here.
  wait: "w",
  if: "d",
  if: "d",

  sensor: "d",
  variable: "d",

  endcondition: "ED",

  else: "d",
  endsensor: "0ED",
  endvariable: "0ED",

  endif: "ED",

  endelse: "0ED",
  loop: "l00",
  endloop: "0EL",
  output: "o{",
  hardware: "o{",
  variable_output: "o{",

  repeat: "RST",
  end: "END",
};
