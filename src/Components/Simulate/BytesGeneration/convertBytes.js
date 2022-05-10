// import codeGeneration_T from "./CodeGeneration_T";
// const codeGeneration_T = require("./CodeGeneration_T");
import fs from "fs";
// import genCode from "./CodeGeneration_T";
var uuid = require("uuid");
var Path2 = process.env.LOCALAPPDATA;
var FOLDER2 = Path2 + "\\Bisoft";

function getBytes(req) {
  let Program = req.code;

  console.log(Program, "PROGRAM_CODE");

  try {
    generating_code_simulation(Program, function (err, data) {
      console.log("CALLBACK OF generating_code_simulation ");

      if (err) {
        console.log("If Condition");
      } else {
        console.log("DATA I AM GETTING BACK ..", data);
      }
    });
  } catch (e) {
    // noble = null;
    console.log("error" + e);
  }
}

function generating_code_simulation(Program, callback) {
  console.log("generating_code_simulation calling");

  var uuid_gen = uuid.v4();
  try {
    console.log("codeGeneration_T for tern");
    var genCodeString = require("./CodeGeneration_T.js");

    console.log("program 88", Program);

    // genCodeString["genCode"](Program);

    var stringToByteCode = genCodeString["genCode"](Program);

    console.log("code 55", stringToByteCode);

    //genCodeString["stringToByte"](stringToByteCode);
    let result = genCodeString["stringToByte"](stringToByteCode);
    // var stringToByteCodeConverted =
    //   genCodeString["stringToByte"](stringToByteCode);

    //console.log("string to byte",result);
    //console.log("type", typeof(result));
    let stringData = result.toString();
    //console.log("type", typeof(stringData));

    var buff = new Buffer(stringData);
    console.log("STRING DATA====>>>>>>>", stringData);
    let data = buff.toString();
    console.log("string from back", data.indexOf("69,78,68"));
    if (data.indexOf("82,83,84") == -1 && data.indexOf("69,78,68") == -1) {
      data = data + ",82,83,84";
    }
    // console.log(typeof data);
    sessionStorage.setItem("convert_Bytes", data);
    // fs.open(FOLDER2 + "/binary_" + uuid_gen + ".txt", "w+", function (err, fd) {
    //   if (err) {
    //     throw "error opening file: " + err;
    //   }
    //   // console.log("BUFFER", buff);
    //   // console.log("FD", fd);
    //   fs.write(fd, buff, 0, buff.length, null, function (err) {
    //     if (err) throw "error writing file: " + err;
    //     fs.close(fd, function () {
    //       console.log("file written (Line No.-797)");
    //     });
    //     // callback(null, 'success');
    //   });
    // });

    callback(null, stringData);
  } catch (err) {
    // callback(err, null);
    console.log("ERR in generating_code_simulation code : " + err);
  }
}

//Upload of byte generation to device
//  function upload (req, Peripheral) {
//     requestFor = "uploadtodevice";
//     var Program = req.code;

//     peripheralmacId = Peripheral;

//     console.log();

//     try {
//       generating_code_file(Program, function (err, data) {
//         if (err) {
//           socket.emit("_upload", { status: err });
//         } else {
//           socket.emit("_upload", { success: true });
//         }
//       });
//     } catch (e) {
//       // noble = null;
//       console.log("error" + e);
//       socket.emit("_upload", { status: e });
//     }
//   };

//   function generating_code_file(Program, callback) {
//     var uuid_gen = uuid.v4();
//     var FILE_NAME = "code_" + uuid_gen + ".txt";
//     // console.log("uuid_gen: (Line No.-2112)" + uuid_gen);
//     async.series(
//       [
//         function (cb) {
//           try {
//             console.log("codeGeneration_T for tern");
//             var genCodeString = require("./codeGeneration_T.js");

//             console.log("program", Program);
//             genCodeString["genCode"](Program);
//             stringToByteCode = genCodeString["genCode"](Program);
//             console.log("code", stringToByteCode);
//             genCodeString["stringToByte"](stringToByteCode);
//             result = genCodeString["stringToByte"](stringToByteCode);
//             stringToByteCodeConverted =
//               genCodeString["stringToByte"](stringToByteCode);

//             //console.log("string to byte",result);
//             //console.log("type", typeof(result));
//             stringData = result.toString();
//             //console.log("type", typeof(stringData));

//             //console.log("STRING DATA====>>>>>>>",stringData);
//             buff = new Buffer(stringData);

//             fs.open(
//               FOLDER2 + "/binary_" + uuid_gen + ".txt",
//               "w+",
//               function (err, fd) {
//                 if (err) {
//                   throw "error opening file: " + err;
//                 }
//                 // console.log("BUFFER", buff);
//                 // console.log("FD", fd);
//                 fs.write(fd, buff, 0, buff.length, null, function (err) {
//                   if (err) throw "error writing file: " + err;
//                   fs.close(fd, function () {
//                     console.log("file written (Line No.-2166)");
//                   });
//                   callback(null, "success");
//                 });
//               }
//             );

//             cb(null, "");
//           } catch (e) {
//             cb(e, null);
//             console.log("ERR: " + e);
//           }
//         },

//         function (cb) {
//           try {
//             fs.open(
//               FOLDER2 + "/binary_" + uuid_gen + ".txt",
//               "w+",
//               function (err, fd) {
//                 if (!err) {
//                   fs.readFile(
//                     FOLDER2 + "/binary_" + uuid_gen + ".txt",
//                     function (err, data) {
//                       console.log(
//                         "PATH for reading binary file(2193)",
//                         FOLDER2 + "/binary_" + uuid_gen + ".txt"
//                       );
//                       if (err) {
//                         console.log("reading file1: " + err);
//                         cb(err, null);
//                       } else {
//                         data = "" + data;

//                         // var bufLen = data.substring(0,data.indexOf(',');
//                         // var array = data.split(',');
//                         console.log("code 2", stringToByteCode);
//                         var array = stringData.split(",");

//                         // console.log("length Of Array--->", array);
//                         var buf = new ArrayBuffer(array.length); // 2 bytes for each char
//                         bufView = new Uint8Array(buf);
//                         console.log("........>>", array);
//                         for (var i = 0; i < array.length; i++) {
//                           // console.log(array[i])
//                           bufView[i] = array[i];
//                         }
//                         console.log("bufView", bufView);
//                         cb(null, "");
//                       }
//                     }
//                   );
//                 } else {
//                   console.log("Error while opening the Binary fire(2213)", err);
//                 }
//               }
//             );
//           } catch (e) {
//             cb(e, null);
//             console.log("ERR: " + e);
//           }
//         },
//         function (callback) {
//           if (typeSelection == "USB") {
//             var serialPort = new SerialPort(COMPORT, {
//               baudRate: 250000,
//             });

//             serialPort.on("open", function (err) {
//               serialPort.write(bufView, function (err) {
//                 console.log("Writing data to the device++++3");
//                 console.log("writing data", bufView);
//                 if (err) {
//                   serialPort.open(function (err) {
//                     if (err) {
//                       Socket.emit("writtenByte", { success: false });
//                       console.log("Error opening port: ", err);
//                     }
//                     serialPort.write(bufView, () => {
//                       console.log("Writing data to the device++++4");
//                       serialPort.close();
//                       serialPort = false;
//                     });
//                     console.log("Writing data to the device++++5");
//                   });
//                 } else {
//                   // Socket.emit('writtenByte', { success: true });

//                   console.log("message written 8");
//                   serialPort.close();
//                 }
//               });
//             });

//             var usbData;

//             console.log("Task 3");
//             callback(null, 3);
//           } else if (typeSelection == "BLE") {
//             console.log("init Called");
//             // if (noble == null)
//             init();

//             // noble.state = 'poweredOn';
//             // noble.emit('stateChange');
//           }
//         },
//       ],
//       function (err, results) {
//         if (err) {
//           callback(err, null);
//         } else {
//           callback(null, results);
//         }
//       }
//     );
//   }

export default getBytes;
