import fs from "fs";
import CodeGenerationRangeValues from "./CodeGenerationRangeValues_T.js";
import {
  PortsAndPortbytes,
  CorrespondingPortCode,
  PortByteValuesIf,
  PortByteNumericalValuesIf,
  PortByteNumericalValuesOutput,
  BiDataValuesOutput,
  nodeDefaultCodes,
} from "./CodeGenerationConstants_T.js";
import process from "process";
var MAX_OUTPUT_PORT_CODE = 0;
var uuid_gen;

var pathToSave;
var pathToBisoft;

var countIf = 0;

pathToBisoft = process.env.LOCALAPPDATA;
pathToSave = pathToBisoft + "//Bisoft";
// ////console.log("pathToSave", pathToSave);
var FOLDER1 = pathToSave + "\\code",
  FOLDER2 = pathToSave + "\\binary";

if (process.argv[2] && process.argv[2] != "") {
  uuid_gen = process.argv[2];
  // ////console.log("uuid_gen:: " + uuid_gen);
  var FILE_NAME = "code_" + uuid_gen + ".txt";
}
var uploadProgram, Program;
// fs.readFile(FOLDER1 + "/" + FILE_NAME, function (err, data) {
//   FILE_NAME = "code_" + uuid_gen + ".txt";
//   uuid_gen = process.argv[2];
//   if (err) {
//     // ////console.log("reading file from readfile: " + err);
//   } else {
//     data = JSON.parse(data);
//     if (data) Program = genCodeString(data);
//     if (Program) uploadProgram = stringToByteStream(Program);
//     //// ////console.log("uploadProgram", uploadProgram);
//     saving_to_file(
//       uploadProgram,
//       FOLDER2 + "/binary_" + uuid_gen + ".txt",
//       function (err, data) {
//         if (err) {
//           // ////console.log(err);
//         } else {
//           // ////console.log("binary_" + uuid_gen + ".txt")
//         }
//       }
//     );
//   }
// });

function saving_to_file(data, FILE_NAME, callback) {
  try {
    data = data.toString();
    //// ////console.log("datatupe" , typeof(data));
    let buffer = new Buffer(data);

    fs.open(FILE_NAME, "w+", function (err, fd) {
      if (err) {
        throw "error opening file: " + err;
      }

      fs.write(fd, buffer, 0, buffer.length, null, function (err) {
        if (err) throw "error writing file: " + err;
        fs.close(fd, function () {
          // ////console.log('file written');
        });
        callback(null, "success");
      });
    });
  } catch (e) {
    // ////console.log("saving_to_file error handler " + e);
  }
}

function setBufView(value, arrayIndexToInsert, bufView) {
  // ////console.log( "setBufVioew---->",bufView[arrayIndexToInsert],value)
  bufView[arrayIndexToInsert] = value;
  return ++arrayIndexToInsert;
}

function evaluateNodeCode(codeTypeArray, arrayIndexToInsert, bufView) {
  for (
    var eachStringValue = 0;
    eachStringValue < codeTypeArray.length;
    eachStringValue++
  ) {
    if (isNaN(codeTypeArray[eachStringValue])) {
      for (var i = 0; i < codeTypeArray[eachStringValue].length; i++) {
        if (isNaN(codeTypeArray[eachStringValue][i])) {
          arrayIndexToInsert = setBufView(
            codeTypeArray[eachStringValue][i].charCodeAt(0),
            arrayIndexToInsert,
            bufView
          );
        } else {
          arrayIndexToInsert = setBufView(
            parseInt(codeTypeArray[eachStringValue][i]),
            arrayIndexToInsert,
            bufView
          );
        }
      }
    } else {
      arrayIndexToInsert = setBufView(
        codeTypeArray[eachStringValue],
        arrayIndexToInsert,
        bufView
      );
    }
  }
  console.log("arrayIndexToInsert", arrayIndexToInsert, bufView);
  return arrayIndexToInsert;
}

// code string to byte by inserting time
function stringToByteStream(str) {
  // // ////console.log("STRING",str);
  //RT$5$11SETAPOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO0000000000000000000000000000o{:2;:18;:f1;}d00:1;:00;:26;>o{:2;:a;:19;}w:00;:00;:f2;:59;l00:1;o{:2;:5;:a4;}w:00;:38;:c7;:41;o{:2;:8;:82;}0ELo{:2;:3;:85;}0EDRST
  var buf = new ArrayBuffer(str.length); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  bufView[0] = 82; //R
  bufView[1] = 84; //T
  bufView[2] = 53; //5
  bufView[3] = 49; //1
  bufView[4] = 49; //1

  // setting time
  var arrayIndexToInsert = 5;
  var codeLen = 0;
  // ////console.log("string=", "RT5" + str);
  //RT511SETAPOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO0000000000000000000000000000;
  //o{:2:39:104:};d:0:0:1:4:0:62;l00:1;o{:2:21:30:};0EL;w:0:226:62:139;0ED;RST
  console.log("some:DATA", stringArray);
  var stringArray = str.split(";");
  for (var eachCode = 0; eachCode < stringArray.length; eachCode++) {
    var codeTypeArray = stringArray[eachCode].split(":");
    // console.log("codeTypeArray------------------------->", codeTypeArray);

    arrayIndexToInsert = evaluateNodeCode(
      codeTypeArray,
      arrayIndexToInsert,
      bufView
    );
  }
  var currentTime = new Date();
  bufView[64] = 116;
  bufView[65] = currentTime.getHours();
  bufView[66] = currentTime.getMinutes();
  codeLen = arrayIndexToInsert; //78
  var codeView = new Uint8Array(codeLen);
  ////console.log("Bufview--->", currentTime.getHours(), currentTime.getMinutes(), bufView[64], bufView[65], bufView[67], bufView[68], bufView[69])
  for (var i = 0; i < codeLen; i++) {
    codeView[i] = bufView[i];
  }
  var sendString = codeView.join();
  //  ////console.log("byteStream=",sendString);
  // // ////console.log(codeView);
  return codeView;
}

// genearte code in string
function genCodeString(logicComponents) {
  //For generating program_code.

  console.log("WLECOME TO genCodeString");

  console.log("logicComponents", logicComponents);

  var NUMOFBITS = 16;
  var NUMOFBYTES = 2;

  function getDecimalValue(Hexa, numOfBytes) {
    console.log("welcome to getDecimalValue");

    console.log("Hexa", Hexa, "\n", "numOfBytes", numOfBytes);

    var len = Hexa.length;
    numOfBytes = numOfBytes * 2;
    var loopLimit = numOfBytes - len;
    // loop for adding extra zeros to hexa value.
    for (var counter = 1; counter <= loopLimit; counter++) {
      Hexa = "0" + Hexa;
    }
    var tempHexa = "";
    var startingIndex = 0;
    Hexa += "";
    //loop for seperating bytes with ':'.
    for (
      var currentIndex = 0;
      currentIndex < numOfBytes;
      currentIndex = currentIndex + 2
    ) {
      tempHexa += parseInt(Hexa.substring(startingIndex, currentIndex + 2), 16);
      if (currentIndex != numOfBytes - 2) tempHexa += ":";
      startingIndex = currentIndex + 2;
    }
    var decimalValue = tempHexa;

    return decimalValue;
  }

  function CreateNodeList(node, out) {
    console.log("WELCOME TO CreateNodeList");

    // try here

    console.log("node", node, "\n", "out", out);

    var nodeType, nodeDetails;

    nodeType = node.type; // start // hardware

    nodeDetails = node.state; //assign & Value

    /*
     CHANGING VALUE geared_motor,mini_geared_motor,dc_motor 
     RANGE VALUE For these motor are Frontend : -20 - +20
     in Backend value: 0-40  i.e( -20=0,-19=1,-18=2.............,20=40)   
    */

    var nodeToInsert = {};

    nodeToInsert[nodeType] = nodeDetails;

    console.log("nodeToInsert", nodeToInsert);

    out.push(nodeToInsert);

    if (node.subprogram) {
      console.log("SUB_PROGRAM");
      for (var sp = 0; sp < node.subprogram.length; sp++) {
        console.log(node.subprogram[sp], "node.subprogram[sp]");

        CreateNodeList(node.subprogram[sp], out);
      }
      var endNode = {};
      endNode["end" + nodeType] = nodeDetails;
      out.push(endNode);
    }
    return out;
  }

  // Flow code cards object evaluation functions
  function hassubProgram(node) {
    console.log("welcome to hassubProgram");
    if (
      node == "if" ||
      node == "loop" ||
      node.type == "sensor" ||
      node.type == "variable"
    ) {
      return true;
    } else {
      return false;
    }
  }

  function getSubnode(node, nodeNumber) {
    console.log("WELCOME TO getSubnode");

    var subnodeIndex;
    if (
      node.type == "if" ||
      node.type == "sensor" ||
      node.type == "variable" ||
      node.type == "loop"
    ) {
      if (nodeNumber == 2) {
        //for else condition
        subnodeIndex = node.connections[2].to;
      } else {
        subnodeIndex = node.connections[1].to;
      }
      if (subnodeIndex == node.cardId) {
        return null;
      } else {
        return cardConnections[subnodeIndex];
      }
    } else {
      return null;
    }
  }

  function getNextnode(node) {
    console.log("WELCOME TO getNextnode");

    var nextnodeIndex;
    if (node.type == "if" || node.type == "sensor" || node.type == "variable") {
      nextnodeIndex = node.connections[3].to;
    } else if (node.type == "loop") {
      nextnodeIndex = node.connections[2].to;
    } else if (node.type == "start") {
      nextnodeIndex = node.connections[0].to;
    } else {
      nextnodeIndex = node.connections[1].to;
    }
    if (nextnodeIndex == node.cardId) {
      return null;
    } else {
      return cardConnections[nextnodeIndex];
    }
  }

  function clone(o) {
    console.log("WELCOME TO clone");

    var ret = {};
    Object.keys(o).forEach(function (val) {
      ret[val] = o[val];
    });
    return ret;
  }

  function makeProgram(prog, node) {
    console.log("WLECOME TO makeProgram");

    if (!node || node.type == "end" || node.length <= 0) return prog;
    else {
      if (hassubProgram(node.type)) {
        var subProgramIndex = node.connections[0].to;
        if (
          node.type == "if" ||
          node.type == "sensor" ||
          node.type == "variable"
        ) {
          var nodeElse = clone(node);

          var subprogram = makeProgram([], getSubnode(node));
          node["subprogram"] = subprogram;

          var subprogramElse = makeProgram([], getSubnode(nodeElse, 2)); //for else,one more node is created
          nodeElse["subprogram"] = subprogramElse;
          nodeElse.type = "else";

          prog.push(node);
          prog.push(nodeElse);
        } else {
          var subprogram = makeProgram([], getSubnode(node));
          node["subprogram"] = subprogram;
          prog.push(node);
        }
      } else {
        prog.push(node);
      }
      return makeProgram(prog, getNextnode(node));
    }
  }

  function getStartCard(cardConnections) {
    console.log("WELCOME TO getStartCard");

    var startCard = cardConnections[0];
    for (var card in cardConnections) {
      if (
        !cardConnections[card].invalid &&
        cardConnections[card].type == "start"
      ) {
        startCard = cardConnections[card];
      }
    }

    return startCard;
  }

  //Assembly program
  var logicData = logicComponents["logic"];

  var componentsConnected = logicComponents["components"];

  var assemblyCheckboxData = logicComponents["internalaccessories"];

  console.log("assemblyCheckboxData", assemblyCheckboxData);
  console.log("componentsConnected", componentsConnected);
  console.log("logicData", logicData);

  var connectionsList = {};
  var portsConnectedArray = [];

  for (var eachConnection in componentsConnected) {
    if (componentsConnected[eachConnection]) {
      portsConnectedArray.push(eachConnection);
    }
  }

  console.log("portsConnectedArray", portsConnectedArray);

  if (portsConnectedArray) {
    for (var n = 0; n < portsConnectedArray.length; n++) {
      //console.log((portsConnectedArray[n], componentsConnected[portsConnectedArray[n]].type))

      if (
        portsConnectedArray[n].length == 1 &&
        componentsConnected[portsConnectedArray[n]].type !== "dual_splitter" &&
        componentsConnected[portsConnectedArray[n]].type !== "servo_extender" &&
        componentsConnected[portsConnectedArray[n]].type !== "pc_motor_driver"
      ) {
        //Check here  and indexes
        connectionsList[portsConnectedArray[n] + "1"] =
          componentsConnected[portsConnectedArray[n]].type;
      } else {
        connectionsList[portsConnectedArray[n]] =
          componentsConnected[portsConnectedArray[n]].type;
      }
    }
  }

  console.log("componentsConnected", componentsConnected);

  console.log("connectionsList 55", connectionsList);

  var logicProgramData;

  var NewlogicCards, cardConnections;
  if (logicComponents.screen == "flow") {
    var prog = [];
    NewlogicCards = logicData.cards;
    cardConnections = logicData.cards;
    var startCard = getStartCard(cardConnections);
    logicProgramData = makeProgram(prog, startCard);
  }
  if (logicComponents.screen == "hexa" || logicComponents.screen == undefined) {
    logicProgramData = logicData.program;
  }

  if (logicComponents.screen == "python") {
    logicProgramData = logicData.program;
  }

  console.log("logicProgramData", logicProgramData);

  //logic program
  var out = [];

  for (var p = 0; p < logicProgramData.length; p++) {
    if (!logicProgramData[p].invalid) {
      CreateNodeList(logicProgramData[p], out);
    } else if (logicProgramData[p].invalid == undefined)
      CreateNodeList(logicProgramData[p], out);
  }

  var endNode = {};
  endNode[logicData.end.type] = logicData.end.state; // getting end type  end OR loop

  out.push(endNode);

  console.log("OUT", out);

  var uploadData = {};
  uploadData["connections"] = connectionsList;
  uploadData["logic"] = out;

  uploadData = JSON.stringify(uploadData);

  uploadData = JSON.parse(uploadData);

  console.log(
    uploadData,
    "AFTER STRINGIFY - PARSE ****************************>"
  );

  var connectionsList = {}; // connectionsList have object of connections , logic

  connectionsList = uploadData.connections;

  connectionsList = { ...connectionsList, ...assemblyCheckboxData };

  console.log("Connections list ::", connectionsList);

  var Uploadprogram = "SET";

  // var PortsAndPortbytes = CodeGenerationConstants.PortsAndPortbytes;

  // var CorrespondingPortCode = CodeGenerationConstants.CorrespondingPortCode;

  // var PortByteValuesIf = CodeGenerationConstants.PortByteValuesIf;

  // var PortByteNumericalValuesIf =
  //   CodeGenerationConstants.PortByteNumericalValuesIf;

  // var PortByteNumericalValuesOutput =
  //   CodeGenerationConstants.PortByteNumericalValuesOutput;

  // var BiDataValuesOutput = CodeGenerationConstants.BiDataValuesOutput;
  // var nodeDefaultCodes = CodeGenerationConstants.nodeDefaultCodes;

  for (var key in PortByteNumericalValuesOutput) {
    if (MAX_OUTPUT_PORT_CODE < Number(PortByteNumericalValuesOutput[key])) {
      MAX_OUTPUT_PORT_CODE = Number(PortByteNumericalValuesOutput[key]);
    }
  }

  console.log(MAX_OUTPUT_PORT_CODE, "MAX_OUTPUT_PORT_CODE");

  var PortBytesToComponentcode = {};
  PortBytesToComponentcode["RGB"] = "O";
  console.log("::MSG", connectionsList);
  for (var portname in PortsAndPortbytes) {
    // A1: ["A1"], B1: ["B1"],
    var comp, j;
    if (
      connectionsList[`is${portname}Left`] === true ||
      connectionsList[`is${portname}Right`] === true
    ) {
      comp = portname;
    } else if (connectionsList[`is${portname}`] === true) {
      comp = portname; // for AssemblyCheckbox  to get portName  RBG, Buzzer, 4-in-1-Sensorr
    } else if (connectionsList[`is${portname}Output`] === true) {
      comp = portname; // for AssemblyCheckbox  to get portName  RBG, Buzzer, 4-in-1-Sensorr
    } else if (portname !== "Four_in_one_sensor") {
      comp = connectionsList[portname]; // Connections list :: { A1: 'led', B1: 'led' , RBG:'true', "Buzzer":false}  // A1
    }

    console.log(comp, "comp2.0");

    for (j = 0; j < PortsAndPortbytes[portname].length; j++) {
      // A1 type LED = 0-100  {P}

      if (comp) {
        if (comp == "mp3") {
          PortBytesToComponentcode["Mp3"] = "M";
          console.log(
            PortBytesToComponentcode,
            PortsAndPortbytes[portname][j],
            portname,
            j,
            "PortBytesToComponentcode42"
          );
          PortBytesToComponentcode["Mp3"] = "M";
          PortBytesToComponentcode[PortsAndPortbytes[portname][j]] = "O";
        } else if (comp == "OLED") {
          PortBytesToComponentcode["OLED"] = "D";
          PortBytesToComponentcode[PortsAndPortbytes[portname][j]] = "O";
        } else if (comp == "RGB") {
          PortBytesToComponentcode["RGB"] = "R";
          PortBytesToComponentcode[PortsAndPortbytes[portname][j]] = "O";
        } else {
          PortBytesToComponentcode[PortsAndPortbytes[portname][j]] =
            CorrespondingPortCode[comp];
        }
      } else {
        if (
          (PortBytesToComponentcode[PortsAndPortbytes[portname][j]] == "M" &&
            PortsAndPortbytes[portname][j] == "Mp3") ||
          (PortBytesToComponentcode[PortsAndPortbytes[portname][j]] == "D" &&
            PortsAndPortbytes[portname][j] == "OLED")
        ) {
          console.log(
            PortsAndPortbytes[portname][j],
            "PortBytesToComponentcode43"
          );
        } else {
          PortBytesToComponentcode[PortsAndPortbytes[portname][j]] = "O";
        }
      }
    }
  }

  console.log(PortBytesToComponentcode, "PortBytesToComponentcode44");

  // LED -> A1 & A2 are PWM

  if (connectionsList["A1"] == "led") {
    PortBytesToComponentcode["A1"] = "P";
  }
  if (connectionsList["A1"] == "led_1c") {
    PortBytesToComponentcode["A1"] = "P";
  }
  if (connectionsList["C1"] == "led") {
    PortBytesToComponentcode["C1"] = "P";
  }
  if (connectionsList["C1"] == "led_1c") {
    PortBytesToComponentcode["C1"] = "P";
  }

  // if (connectionsList["B2"] == "laser" || connectionsList["B2"] == "beeper") {
  //   PortBytesToComponentcode["B2"] = "P";
  // }

  if (
    connectionsList["F1"] == "led" ||
    connectionsList["F1"] == "laser" ||
    connectionsList["F1"] == "beeper"
  ) {
    PortBytesToComponentcode["F1"] = "P";
  }

  console.log(PortBytesToComponentcode, "PortBytesToComponentcode33");

  // SETTING BYTES LAYOUT
  var FinalCode = "";

  var codeTemplate =
    "A1A2B1B2C1C2D1D2E1E2F1F2G1G2H1H2I1I2SmileOneSmileTwoSmileThreeSmileFourbuzzerEyeFour_in_one_sensorMicTouchZeroTouchOneTouchTwoTemperatureIOT1IOT2IOT3IOT4Mp3OLEDRGB";
  //copy from hornbill or snipe

  for (var portBytes in PortBytesToComponentcode) {
    //console.log("pwoli", portBytes, PortBytesToComponentcode);
    codeTemplate = codeTemplate.replace(
      portBytes,
      PortBytesToComponentcode[portBytes]
    );
  }

  console.log(codeTemplate, "codeTemplate454");

  FinalCode = codeTemplate;
  Uploadprogram += FinalCode;
  var codeLen = codeTemplate.length;

  console.log(codeTemplate, "codeTemplate");

  for (var i = codeLen; i <= 58; i++) {
    Uploadprogram += "O";
  }
  Uploadprogram += ";";

  console.log(Uploadprogram, "Uploadprogram");

  console.log(Uploadprogram, "Uploadprogram2.0");

  // PROGRAM Bytes
  function codeForNodes(type, nodeDetails) {
    console.log("WELCOME TO codeForNodes WHERE WE CREATE PROGRAM BYETS");

    console.log("type", type);
    console.log("nodeDetails", nodeDetails);

    if (type == "sensor") {
      console.log("counting countIf", countIf);

      countIf++;
    }

    // console.log("nodeDefaultCodes", nodeDefaultCodes);

    if (type == "endsensor") {
      type = "endif";
    }

    if (type == "condition") {
      type = "if";

      countIf++;
    }

    if (type == "endcondition") {
      type = "endif";
    }

    // console.log("nodeDetails", nodeDetails);

    var codeForCurrentNode;

    if (type == "wait") {
      var minutes = 0,
        hours = 0,
        milliseconds = 0,
        seconds = 0;
      if (nodeDetails.h) {
        hours = nodeDetails.h;
      }
      if (nodeDetails.m) {
        minutes = nodeDetails.m;
      }
      if (nodeDetails.s) {
        seconds = nodeDetails.s;
      }
      if (nodeDetails.ms) {
        milliseconds = nodeDetails.ms;
      }
      var timeToWait =
        parseInt(hours * 60 * 60 * 1000) +
        parseInt(minutes * 60 * 1000) +
        parseInt(seconds * 1000) +
        parseInt(milliseconds);
      // ////console.log("timeToWait*************************************",timeToWait)
      timeToWait = parseInt(timeToWait).toString(16);
      timeToWait += "";
      var len = timeToWait.length;
      for (var i = 1; i <= 8 - len; i++) {
        timeToWait = "0" + timeToWait;
      }
      var tempTimeToWait = ":";
      var w = 0;
      timeToWait += "";
      for (var j = 0; j < 8; j = j + 2) {
        tempTimeToWait += parseInt(timeToWait.substring(w, j + 2), 16);
        if (j != 6) tempTimeToWait += ":";
        w = j + 2;
      }
      timeToWait = tempTimeToWait + ";";
      codeForCurrentNode = nodeDefaultCodes[type] + timeToWait;
    } else if (
      type == "if" ||
      type == "else" ||
      type == "sensor" ||
      type == "variable"
    ) {
      var nodePort;
      var value;
      var decimalValue = "";

      console.log("|||||||||||||||||||||||||||||||||");
      console.log("nodeDetails", nodeDetails);

      if (nodeDetails.source) {
        nodePort = nodeDetails.source;

        console.log("nodePort:", nodePort);
        console.log("compName: ", compName);

        console.log("HAHAHAs", PortByteNumericalValuesIf[nodePort]);

        if (
          nodePort == "4-IN-1 SENSOR  →  RED" ||
          nodePort == "4-IN-1 SENSOR  →  GREEN" ||
          nodePort == "4-IN-1 SENSOR  →  BLUE" ||
          nodePort == "4-IN-1 SENSOR  →  DIST" ||
          nodePort == "4-IN-1 SENSOR  →  GESTURE" ||
          nodePort == "4-IN-1 SENSOR  →  LIGHT" ||
          nodePort == "4-IN-1 SENSOR  →  MOTION"
        ) {
          console.log("YESSSSSSSSSSS");

          let words = nodePort.split(" ");
          console.log(words);

          nodePort = `FOUR_in_ONE_Sensor_${words[words.length - 1]}`;
        }

        console.log(nodePort, "nodePort");

        if (PortByteNumericalValuesIf[nodePort] == undefined) {
          console.log("nodePort = undefined" + nodePort);
          if (PortByteValuesIf[nodePort]) {
            nodePort = PortByteValuesIf[nodePort];
          }
        }

        var portCode = PortByteNumericalValuesIf[nodePort]; //B1 = 3

        console.log(portCode, "portCode");

        value = nodeDetails.value; // 255
        if (!value) {
          value = 0;
        }
        if (
          CodeGenerationRangeValues &&
          CodeGenerationRangeValues[nodePort] &&
          CodeGenerationRangeValues[nodePort][compName] &&
          nodePort != "Btremote"
        ) {
          console.log(
            "CodeGenerationRangeValues[nodePort][compName]",
            CodeGenerationRangeValues[nodePort][compName]
          );
          value = CodeGenerationRangeValues[nodePort][compName](value);
        }
        if (nodePort == "_R" || nodePort == "_G" || nodePort == "_B") {
          nodePort = "F";
        } else if (nodePort == "B2" || nodePort == "B3" || nodePort == "B4")
          nodePort = "B";
        else if (nodePort == "timeElapsed") {
          NUMOFBYTES = 4;
          value *= 1000; // converting to mili secs
        }

        console.log(connectionsList, "connectionsList");
        var compName = connectionsList[nodePort];

        console.log(compName, "compName 58258"); // distance_sensor

        if (compName == "rfid") {
          portCode = PortByteNumericalValuesIf[compName];
        }
        if (nodeDetails.condition && type == "else") {
          if (nodeDetails.condition == "ne") {
            ifCondition = "61"; // '='
          } else if (nodeDetails.condition == "lt") {
            ifCondition = "62";
            --value; // '>'
          } else if (nodeDetails.condition == "eq") {
            ifCondition = "33"; // '!'
          } else if (nodeDetails.condition == "gt") {
            ifCondition = "60";
            ++value; // '<'
          } else if (nodeDetails.condition == "bw") {
            ifCondition = "64"; // '@'
          } else if (nodeDetails.condition == "nbw") {
            ifCondition = "63"; // '?'
          }
        } else if (type == "else") {
          ifCondition = "60";
          ++value; // '<'
        }
        var Hexa = "";

        // GENERATING LSM MSB value
        if (nodePort != "time") {
          Hexa = "" + value.toString(NUMOFBITS);

          console.log(value, "value VALUE");
          console.log(Hexa, "HEXA VALUE");

          decimalValue += getDecimalValue(Hexa, NUMOFBYTES);

          if (nodeDetails.condition == "bw" || nodeDetails.condition == "nbw") {
            Hexa = "" + nodeDetails.value2.toString(NUMOFBITS);
            decimalValue += ":" + getDecimalValue(Hexa, NUMOFBYTES);
          }
        } else {
          Hexa =
            "" +
            (parseInt(nodeDetails.hour) + ":" + parseInt(nodeDetails.minute));
          decimalValue += Hexa;
          if (nodeDetails.condition == "bw" || nodeDetails.condition == "nbw") {
            Hexa =
              "" +
              (parseInt(nodeDetails.hour2) +
                ":" +
                parseInt(nodeDetails.minute2));
            decimalValue += ":" + Hexa;
          }
        }
      } else {
        portCode = "39";
        // decimalValue=':00;:00;';
        // ifCondition='<';
      }
      var ifCondition;

      //  CONDITION GENERATION gt,lt,eq
      if (
        (nodeDetails.condition && type == "if") ||
        (nodeDetails.condition && type == "variable") ||
        (nodeDetails.condition && type == "sensor")
      ) {
        if (nodeDetails.condition == "ne") {
          ifCondition = "33"; // '!'
        } else if (nodeDetails.condition == "lt") {
          ifCondition = "60"; // '<'
        } else if (nodeDetails.condition == "eq") {
          ifCondition = "61"; // '='
        } else if (nodeDetails.condition == "gt") {
          ifCondition = "62"; // '>'
        } else if (nodeDetails.condition == "bw") {
          ifCondition = "63"; // '?'
        } else if (nodeDetails.condition == "nbw") {
          ifCondition = "64"; // '@'
        }
      } else if (type == "if" || type == "variable" || type == "sensor") {
        ifCondition = "62"; // '>'
      }
      // if(nodePort == 'F'){
      // portCode = '2D';
      // }

      // we are generating Bytes d:0:0:portName:LSB:MSB:operator

      console.log(decimalValue, "decimalValue 88");
      if (decimalValue.split(":").length < 4) {
        codeForCurrentNode =
          nodeDefaultCodes[type] +
          ":0:0:" +
          portCode +
          ":" +
          decimalValue +
          ":" +
          ifCondition +
          ";";
      } else if (decimalValue.split(":").length >= 4) {
        let decimalValueArray = decimalValue.split(":");
        codeForCurrentNode =
          nodeDefaultCodes[type] +
          ":" +
          decimalValueArray[0] +
          ":" +
          decimalValueArray[1] +
          ":" +
          portCode +
          ":" +
          decimalValueArray[2] +
          ":" +
          decimalValueArray[3] +
          ":" +
          ifCondition +
          ";";
      }
    } else if (type == "endif" || type == "endelse") {
      console.log("ENDIF________", nodeDefaultCodes[type]);

      countIf--;
      console.log("COUNT_IF", countIf);

      codeForCurrentNode = countIf + nodeDefaultCodes[type] + ";";
      console.log(
        "codeForCurrentNode endif ------------end----------------->",
        codeForCurrentNode
      );
    } else if (type == "loop") {
      if (nodeDetails.times) {
        var nodeValue = nodeDetails.times;
      } else {
        var nodeValue = 1;
      }
      codeForCurrentNode = nodeDefaultCodes[type] + ":" + nodeValue + ";";
    } else if (type == "endloop") {
      codeForCurrentNode = nodeDefaultCodes[type] + ";";
    } else if (type == "end") {
      if (nodeDetails) {
        codeForCurrentNode = nodeDefaultCodes[nodeDetails];
      } else {
        codeForCurrentNode = nodeDefaultCodes["end"];
      }
      // }else if(type=="repeat"){
      // codeForCurrentNode=nodeDefaultCodes[type];
    } else if (
      type == "output" ||
      type == "hardware" ||
      type == "variable_output"
    ) {
      var completePortCode = "";
      var output_object = {};

      // Traversing the object
      /*nodeDetails {
  assignA1: true,
  valueA1: 100,
  assignB1: false,
  assignBuzzer: true,
  valueBuzzer: 53
}*/
      for (var eachItemInDetails in nodeDetails) {
        console.log("eachItemInDetails", eachItemInDetails);

        console.log("eachItemDetails0..2", eachItemInDetails.indexOf("assign"));

        if (
          eachItemInDetails.indexOf("assign") >= 0 &&
          eachItemInDetails.replace("assign", "") !== "LeftEye" &&
          eachItemInDetails.replace("assign", "") !== "RightEye"
        ) {
          // checking assgin value  true
          if (nodeDetails[eachItemInDetails]) {
            var CurrentPort = eachItemInDetails.replace("assign", "");

            console.log(CurrentPort, "CurrentPort"); //A1, A2, Buzzer TouchZeroOutput
            console.log(connectionsList, "connectionsList");
            var compName;
            // TouchZeroOutput
            if (
              CurrentPort == "SmileOne" ||
              CurrentPort == "SmileTwo" ||
              CurrentPort == "SmileThree" ||
              CurrentPort == "SmileFour" ||
              CurrentPort == "BuzzerFrequency" ||
              CurrentPort == "BuzzerTone" ||
              CurrentPort == "TouchZeroOutput" ||
              CurrentPort == "TouchOneOutput" ||
              CurrentPort == "TouchTwoOutput"
            ) {
              compName = connectionsList[`is${CurrentPort}`];
            }
            if (
              CurrentPort == "LeftEyeR" ||
              CurrentPort == "LeftEyeG" ||
              CurrentPort == "LeftEyeB" ||
              CurrentPort == "RightEyeR" ||
              CurrentPort == "RightEyeG" ||
              CurrentPort == "RightEyeB"
            ) {
              let port = CurrentPort.slice(0, -1);
              compName = connectionsList[`is${port}`];
            } else {
              compName = connectionsList[CurrentPort];
            }

            console.log(compName, CurrentPort);

            var currentPortBytes;

            if (
              CurrentPort == "B12" ||
              CurrentPort == "C12" ||
              CurrentPort == "B34" ||
              CurrentPort == "BC"
            ) {
              if (compName == "dot_matrix")
                currentPortBytes = PortsAndPortbytes["dot_matrix"];
              else currentPortBytes = PortsAndPortbytes[CurrentPort];
              console.log(
                "currentPortBytes*************************************",
                currentPortBytes
              );
              var i;
              if (currentPortBytes) {
                for (i = 0; i < currentPortBytes.length; i++) {
                  var portByteSelected = currentPortBytes[i];
                  var currentPortCode =
                    PortByteNumericalValuesOutput[portByteSelected];
                  var portValue;

                  //console.log("portValue*************************************", portValue, portByteSelected, compName)
                  if (compName == "dot_matrix") {
                    if (nodeDetails[portByteSelected]) {
                      portValue = nodeDetails[portByteSelected].charCodeAt(0);
                    } else {
                      portValue = " ".charCodeAt(0);
                    }
                  } else if (compName == "mp3") {
                    portValue = nodeDetails["valueF"];
                    console.log("mp3", portValue);
                    portValue =
                      CodeGenerationRangeValues[CurrentPort][compName](
                        portValue
                      );
                  } else if (compName == "dual_splitter") {
                    portValue = nodeDetails["valueF1"];
                    portValue =
                      CodeGenerationRangeValues[CurrentPort][compName](
                        portValue
                      );
                  } else if (compName == "dual_splitter") {
                    portValue = nodeDetails["valueF2"];
                    portValue =
                      CodeGenerationRangeValues[CurrentPort][compName](
                        portValue
                      );
                  } else if (compName == "dual_splitter") {
                    portValue = nodeDetails["valueG1"];
                    portValue =
                      CodeGenerationRangeValues[CurrentPort][compName](
                        portValue
                      );
                  } else if (compName == "dual_splitter") {
                    portValue = nodeDetails["valueG2"];
                    portValue =
                      CodeGenerationRangeValues[CurrentPort][compName](
                        portValue
                      );
                  } else if (compName == "octa_splitter") {
                    portValue = nodeDetails["valueB1"];
                    portValue =
                      CodeGenerationRangeValues[CurrentPort][compName](
                        portValue
                      );
                  } else if (compName == "octa_splitter") {
                    portValue = nodeDetails["valueB2"];
                    portValue =
                      CodeGenerationRangeValues[CurrentPort][compName](
                        portValue
                      );
                  } else if (compName == "octa_splitter") {
                    portValue = nodeDetails["valueB3"];
                    portValue =
                      CodeGenerationRangeValues[CurrentPort][compName](
                        portValue
                      );
                  } else if (compName == "octa_splitter") {
                    portValue = nodeDetails["valueB4"];
                    portValue =
                      CodeGenerationRangeValues[CurrentPort][compName](
                        portValue
                      );
                  } else if (compName == "octa_splitter") {
                    portValue = nodeDetails["valueC1"];
                    portValue =
                      CodeGenerationRangeValues[CurrentPort][compName](
                        portValue
                      );
                  } else if (compName == "octa_splitter") {
                    portValue = nodeDetails["valueC2"];
                    portValue =
                      CodeGenerationRangeValues[CurrentPort][compName](
                        portValue
                      );
                  } else if (compName == "octa_splitter") {
                    portValue = nodeDetails["valueC3"];
                    portValue =
                      CodeGenerationRangeValues[CurrentPort][compName](
                        portValue
                      );
                  } else if (compName == "octa_splitter") {
                    portValue = nodeDetails["valueC4"];
                    portValue =
                      CodeGenerationRangeValues[CurrentPort][compName](
                        portValue
                      );
                  } else {
                    // ////console.log("portByteSelected********************",portByteSelected);

                    portValue = nodeDetails["value" + portByteSelected];
                    portValue =
                      CodeGenerationRangeValues[CurrentPort][compName](
                        portValue
                      );
                    // ////console.log("portValue********************",portValue);
                  }
                  if (portValue == true) {
                    portValue = 1;
                  }
                  if (portValue == false) {
                    portValue = 0;
                  }
                  if (!portValue) {
                    portValue = 0;
                  }
                  var binary = portValue.toString(2);
                  var lb = binary.slice(-8);
                  if (!lb) {
                    lb = 0;
                  }
                  var hb = binary.slice(0, binary.lastIndexOf(lb));
                  if (!hb) {
                    hb = 0;
                  }
                  var hbDec = parseInt(hb, 2).toString(16);
                  var lbDec = parseInt(lb, 2).toString(16);
                  var decimalValue = "";
                  decimalValue += "" + parseInt(hbDec, 16);
                  decimalValue += ":" + parseInt(lbDec, 16);
                  // completePortCode+=':'+currentPortCode+':'+decimalValue;
                  output_object[currentPortCode] =
                    ":" + currentPortCode + ":" + decimalValue;
                }
              }
            } else if (
              CurrentPort.includes("bi") ||
              CurrentPort.includes("btr") ||
              CurrentPort.includes("IOT")
            ) {
              currentPortBytes = PortsAndPortbytes[CurrentPort];
              var i;
              var decimalValue = "";
              var currentPortCode;
              if (currentPortBytes) {
                for (i = 0; i < currentPortBytes.length; i++) {
                  var portByteSelected = currentPortBytes[i];
                  if (
                    CurrentPort.includes("Countbic") &&
                    !portByteSelected.includes("assign")
                  ) {
                    if (nodeDetails["value" + CurrentPort]) {
                      currentPortCode =
                        PortByteNumericalValuesOutput[
                          portByteSelected + "increment"
                        ];
                    } else {
                      currentPortCode =
                        PortByteNumericalValuesOutput[
                          portByteSelected + "decrement"
                        ];
                    }
                  } else {
                    currentPortCode =
                      PortByteNumericalValuesOutput[portByteSelected];
                  }
                  var portValue = 0;
                  if (CurrentPort.includes("Countbic")) {
                    portValue = nodeDetails["valueNum" + CurrentPort];
                  } else if (CurrentPort.includes("bic")) {
                    portValue = nodeDetails["valuenum" + CurrentPort];
                  } else if (CurrentPort.includes("bif")) {
                    portValue = nodeDetails["value" + CurrentPort];
                  } else {
                    if (Number(nodeDetails["valuenum" + CurrentPort])) {
                      portValue = nodeDetails["valuenum" + CurrentPort];
                    }
                  }
                  if (portValue == true) {
                    portValue = 1;
                  }
                  if (portValue == false) {
                    portValue = 0;
                  }
                  if (!portValue) {
                    portValue = 0;
                  }
                  portValue = Number(portValue);
                  var binary = portValue.toString(2);
                  var lb = binary.slice(-8);
                  if (!lb) {
                    lb = 0;
                  }
                  var hb = binary.slice(0, binary.lastIndexOf(lb));
                  if (!hb) {
                    hb = 0;
                  }
                  var hbDec = parseInt(hb, 2).toString(16);
                  var lbDec = parseInt(lb, 2).toString(16);

                  decimalValue += "" + parseInt(hbDec, 16);
                  decimalValue += ":" + parseInt(lbDec, 16);
                }
              }
              // completePortCode+=':'+currentPortCode+':'+decimalValue;
              output_object[currentPortCode] =
                ":" + currentPortCode + ":" + decimalValue;
              if (CurrentPort.includes("bid") || CurrentPort.includes("IOT")) {
                if (nodeDetails["value" + CurrentPort]) {
                  // completePortCode+=':'+BiDataValuesOutput[nodeDetails["value"+CurrentPort]];
                  output_object[currentPortCode] +=
                    ":" +
                    BiDataValuesOutput[nodeDetails["value" + CurrentPort]];
                } else {
                  // completePortCode+=':0';
                  output_object[currentPortCode] += ":0";
                }
              }
            } else {
              var currentPortBytes;

              // if (compName == "mp3" && CurrentPort == "F") {
              //     currentPortBytes = ["mp3"];

              // }
              // else if (compName == "dual_splitter" && CurrentPort == "F") {
              //     currentPortBytes = ["dual_splitter"];

              // }
              // else if (compName == "dual_splitter" && CurrentPort == "G") {
              //     currentPortBytes = ["dual_splitter"];

              // }
              // else if (compName == "octa_splitter" && CurrentPort == "B") {
              //     currentPortBytes = ["octa_splitter"];
              // }

              // else {
              // }
              if (compName == "mp3") {
                CurrentPort = "Mp3";
                currentPortBytes = PortsAndPortbytes[CurrentPort];
              }

              if (
                CurrentPort == "TouchZeroOutput" ||
                CurrentPort == "TouchOneOutput" ||
                CurrentPort == "TouchTwoOutput"
              ) {
                currentPortBytes =
                  PortsAndPortbytes[CurrentPort.replace("Output", "")];
              } else {
                currentPortBytes = PortsAndPortbytes[CurrentPort];
              }

              var i;

              var decimalValue = "";

              console.log(
                "decimalValue 3*******************decimalValue",
                decimalValue,
                currentPortBytes
              );

              // here getting access of port assignA1 and create LSB and MSB AND creating outPut partten {:port:LSB:MSB}

              if (currentPortBytes) {
                for (i = 0; i < currentPortBytes.length; i++) {
                  var portByteSelected = currentPortBytes[i];

                  //  getting the index value
                  /* A1 = 1  A2 = 2  B1 = 3  B2 = 4 ..........  Buzzer = 21 */
                  var currentPortCode =
                    PortByteNumericalValuesOutput[portByteSelected];

                  console.log(
                    "currentPortCode*******************currentPortCode",
                    currentPortCode,
                    portByteSelected
                  );

                  var portValue;

                  // if (portByteSelected == "mp3") {
                  //     portValue = nodeDetails["valueF"] || 0;
                  // }
                  // else if (portByteSelected == "dual_splitter") {
                  //     portValue = nodeDetails["valueF1"] || 0;
                  // }
                  // else if (portByteSelected == "dual_splitter") {
                  //     portValue = nodeDetails["valueF2"] || 0;
                  // }
                  // else if (portByteSelected == "dual_splitter") {
                  //     portValue = nodeDetails["valueG1"] || 0;
                  // }
                  // else if (portByteSelected == "dual_splitter") {
                  //     portValue = nodeDetails["valueG2"] || 0;
                  // }
                  // else if (portByteSelected == "octa_splitter") {
                  //     portValue = nodeDetails["valueB1"] || 0;
                  // }
                  // else if (portByteSelected == "octa_splitter") {
                  //     portValue = nodeDetails["valueB2"] || 0;
                  // }
                  // else if (portByteSelected == "octa_splitter") {
                  //     portValue = nodeDetails["valueB3"] || 0;
                  // }
                  // else if (portByteSelected == "octa_splitter") {
                  //     portValue = nodeDetails["valueB4"] || 0;
                  // }
                  // else if (portByteSelected == "octa_splitter") {
                  //     portValue = nodeDetails["valueC1"] || 0;
                  // }
                  // else if (portByteSelected == "octa_splitter") {
                  //     portValue = nodeDetails["valueC2"] || 0;
                  // }
                  // else if (portByteSelected == "octa_splitter") {
                  //     portValue = nodeDetails["valueC3"] || 0;
                  // }
                  // else if (portByteSelected == "octa_splitter") {
                  //     portValue = nodeDetails["valueC4"] || 0;
                  // }
                  // else {

                  console.log("portByteSelected", portByteSelected);

                  portValue = nodeDetails["value" + portByteSelected] || 0;

                  if (
                    portByteSelected == "TouchZero" ||
                    portByteSelected == "TouchOne" ||
                    portByteSelected == "TouchTwo"
                  ) {
                    portValue =
                      nodeDetails["value" + `${portByteSelected}Output`];
                  }

                  if (portByteSelected == "Mp3") {
                    portValue = nodeDetails["valueB1"];
                  }
                  console.log(portValue, "portValue");
                  if (portByteSelected.includes("RGBComp")) {
                    portValue = [];
                    portValue.push(nodeDetails[`value${portByteSelected}R`]);
                    portValue.push(nodeDetails[`value${portByteSelected}G`]);
                    portValue.push(nodeDetails[`value${portByteSelected}B`]);
                  }
                  //console.log("nodeDetai", nodeDetails["value" + portByteSelected], portByteSelected, portValue)
                  // }
                  if (portValue == true) {
                    portValue = 1;
                  }
                  if (portValue == false) {
                    portValue = 0;
                  }
                  if (!portValue) {
                    portValue = 0;
                  }

                  console.log(portValue, "portValue2.0");

                  if (
                    portByteSelected == "Buzzer" ||
                    portByteSelected == "RGBLEDR" ||
                    portByteSelected == "RGBLEDG" ||
                    portByteSelected == "RGBLEDB" ||
                    //
                    portByteSelected == "LeftEyeR" ||
                    portByteSelected == "LeftEyeG" ||
                    portByteSelected == "LeftEyeB" ||
                    portByteSelected == "RightEyeR" ||
                    portByteSelected == "RightEyeG" ||
                    portByteSelected == "RightEyeB" ||
                    portByteSelected == "BuzzerFrequency" ||
                    portByteSelected == "BuzzerTone" ||
                    portByteSelected == "SmileOne" ||
                    portByteSelected == "SmileTwo" ||
                    portByteSelected == "SmileThree" ||
                    portByteSelected == "SmileFour" ||
                    portByteSelected == "TouchZero" ||
                    portByteSelected == "TouchOne" ||
                    portByteSelected == "TouchTwo" ||
                    portByteSelected == "Mp3" ||
                    portByteSelected == "M1" ||
                    portByteSelected == "M2" ||
                    portByteSelected == "M3" ||
                    portByteSelected == "M4" ||
                    // humanoid
                    portByteSelected == "Attention" ||
                    portByteSelected == "Forward" ||
                    portByteSelected == "Backward" ||
                    portByteSelected == "Mourn" ||
                    portByteSelected == "Left" ||
                    portByteSelected == "Right" ||
                    portByteSelected == "Wave" ||
                    portByteSelected == "Bow" ||
                    portByteSelected == "Wings" ||
                    portByteSelected == "Hook_Left" ||
                    portByteSelected == "Hook_Right" ||
                    portByteSelected == "Right_Curved_Hook" ||
                    portByteSelected == "Left_Curved_Hook" ||
                    portByteSelected == "Push_up" ||
                    portByteSelected == "Sit_up" ||
                    portByteSelected == "Squat" ||
                    portByteSelected == "Laugh" ||
                    portByteSelected == "Box_Forward" ||
                    portByteSelected == "Box_Squat" ||
                    portByteSelected == "Box_Left" ||
                    portByteSelected == "Box_Right" ||
                    portByteSelected == "Break_Dance" ||
                    portByteSelected == "Gangnam_style"
                  ) {
                    var binary = portValue.toString(2);
                    var lb = binary.slice(-8);

                    if (!lb) {
                      lb = 0;
                    }

                    var hb = binary.slice(0, binary.lastIndexOf(lb));
                    if (!hb) {
                      hb = 0;
                    }
                    var hbDec = parseInt(hb, 2).toString(16);
                    var lbDec = parseInt(lb, 2).toString(16);

                    console.log("hbDec", hbDec, "lbDec", lbDec);

                    // decimalValue is final calculation of LSB and MSB
                    decimalValue += "" + parseInt(hbDec, 16);
                    decimalValue += ":" + parseInt(lbDec, 16);

                    console.log(
                      "decimalValue 1 ----------------------------->",
                      decimalValue
                    );
                  } else if (
                    portByteSelected == "OLEDOne" ||
                    portByteSelected == "OLEDTwo" ||
                    portByteSelected == "OLEDThree"
                  ) {
                    var charCodeArr = [];
                    for (let i = 0; i < portValue.length; i++) {
                      let code = portValue.charCodeAt(i);
                      charCodeArr.push(code);
                    }
                    for (let i = charCodeArr.length; i < 16; i++) {
                      charCodeArr.push(32);
                    }
                    decimalValue = charCodeArr.toString().replaceAll(",", ":");
                  } else if (portByteSelected.includes("RGBComp")) {
                    var charCodeArr = [];
                    for (let i = 0; i < portValue.length; i++) {
                      let code = portValue[i];
                      charCodeArr.push(code);
                    }

                    decimalValue = charCodeArr.toString().replaceAll(",", ":");
                  } else {
                    var compName = connectionsList[portByteSelected];

                    console.log(compName, "compName3.0");

                    /*
     CHANGING VALUE geared_motor,mini_geared_motor,dc_motor 
     RANGE VALUE For these motor are Frontend : -20 - +20
     in Backend value: 0-40  i.e( -20=0,-19=1,-18=2.............,20=40)   
    */
                    if (
                      compName == "geared_motor" ||
                      compName == "mini_geared_motor" ||
                      compName == "dc_motor"
                    ) {
                      if (Math.sign(portValue) == -1) {
                        portValue = 20 - Math.abs(portValue);

                        //-ve value
                      } else {
                        // +ve value
                        portValue = 20 + portValue;
                      }
                    }

                    // GENERATING LSB MSB ok
                    if (
                      CodeGenerationRangeValues &&
                      CodeGenerationRangeValues[portByteSelected] &&
                      CodeGenerationRangeValues[portByteSelected][compName]
                    ) {
                      portValue =
                        CodeGenerationRangeValues[portByteSelected][compName](
                          portValue
                        );

                      console.log(
                        "portValue----------------------------->",
                        portValue
                      );

                      // calculating LSB  MSB

                      var binary = portValue.toString(2);
                      var lb = binary.slice(-8);

                      if (!lb) {
                        lb = 0;
                      }

                      var hb = binary.slice(0, binary.lastIndexOf(lb));
                      if (!hb) {
                        hb = 0;
                      }
                      var hbDec = parseInt(hb, 2).toString(16);
                      var lbDec = parseInt(lb, 2).toString(16);

                      console.log("hbDec", hbDec, "lbDec", lbDec);

                      // decimalValue is final calculation of LSB and MSB
                      decimalValue += "" + parseInt(hbDec, 16);
                      decimalValue += ":" + parseInt(lbDec, 16);

                      console.log(
                        "decimalValue 1 ----------------------------->",
                        decimalValue
                      );
                    }
                  }

                  //ycode deleted for tern+
                }
              }
              // completePortCode += ':' + currentPortCode + ':' + decimalValue;

              console.log(
                "decimalValue 2----------------------------->",
                currentPortCode,
                decimalValue
              );
              output_object[currentPortCode] =
                ":" + currentPortCode + ":" + decimalValue;

              console.log(output_object, "output_object");
            }
          }
        }
      }

      console.log(
        "MAX_OUTPUT_PORT_CODE",
        MAX_OUTPUT_PORT_CODE,
        output_object[currentPortCode]
      );

      for (var index = 0; index <= MAX_OUTPUT_PORT_CODE; index++) {
        if (output_object["" + index]) {
          completePortCode += output_object["" + index];
        }
      }

      console.log("completePortCode", completePortCode);

      if (completePortCode) {
        completePortCode = completePortCode.replace(
          new RegExp("true", "g"),
          "1"
        );
        completePortCode = completePortCode.replace(
          new RegExp("false", "g"),
          "0"
        );
      }

      console.log("TYPE ::", type);
      codeForCurrentNode = nodeDefaultCodes[type] + completePortCode + ":};";
      console.log(
        "codeForCurrentNode 1 ----------------------------->",
        codeForCurrentNode
      );
    } else {
      return "";
    }

    console.log(
      "codeForCurrentNode 2 ----------------------------->",
      codeForCurrentNode
    );

    return codeForCurrentNode;
  }

  var UserProgram = uploadData.logic;

  console.log("UserProgram", UserProgram);

  //   UserProgram.map((val, index) => {
  //     console.log("val----", val);
  //     console.log("val2----", Object.keys(val)[0]);
  //     let type = Object.keys(val)[0];
  //     if (type == "sensor") {
  //       countIf++;
  //     }
  //   });

  //   console.log("COUNT_IF", countIf);

  var k;
  var completeLogicProgram = "";

  // PROGRAM BYTES
  for (k = 0; k < UserProgram.length; k++) {
    for (var eachNode in UserProgram[k]) {
      console.log("UserProgram[k]", UserProgram[k]);

      completeLogicProgram += codeForNodes(eachNode, UserProgram[k][eachNode]);
    }
  }

  console.log("completeLogicProgram", completeLogicProgram);
  // var a = completeLogicProgram;
  console.log(
    "completeLogicProgram KI Length",
    completeLogicProgram.replace(/ENDRST/g, "END")
  );

  if (
    completeLogicProgram.slice(completeLogicProgram.length - 6) === "ENDRST"
  ) {
    Uploadprogram += completeLogicProgram.replace(/ENDRST/g, "END");
  } else {
    Uploadprogram += completeLogicProgram;
  }
  // Uploadprogram += completeLogicProgram;
  uploadProgram = Uploadprogram;

  console.log(uploadProgram, "uploadProgram");

  return Uploadprogram;
}

if (require.main === module) {
} else {
  console.log("100");
}
export { genCodeString as genCode, stringToByteStream as stringToByte };
