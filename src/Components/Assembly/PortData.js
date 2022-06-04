function Ports(port) {
  var Device = sessionStorage.getItem("connectedDevice");
  var shield = sessionStorage.getItem("shield");
  var data;

  if (Device == "Ace" && shield == "true") {
    data = {
      A1: [110, 260],
      A2: [110, 295],
      B1: [288, 263],
      B2: [288, 298],
      C1: [148, 327],
      C2: [182, 327],
      D1: [217, 327],
      D2: [250, 327],
      E1: [19, 80],
      E2: [85, 80],
      F1: [19, 80],
      F2: [85, 80],
      M1: [140, 400],
      M3: [258, 400],
      // 'G1': [19, 80],
      // 'G2': [85, 80],
      // 'H1': [19, 80],
      // 'H2': [85, 80],
      // 'I1': [19, 80],
      // 'I2': [85, 80],
      B: [110, 157],
      A: [110, 117],
      C: [288, 117],
      D: [288, 157],
      E: [110, 362],
      F: [288, 362],
      // G: [110, 190],
      // H: [190, 43],
      // I: [190, 43],
      // STPM: [50, 10],
      // MOTOR1: [142, 393],
      // MOTOR2: [250, 393],
    };
    switch (port) {
      case "A":
        return data.A;
      case "A1":
        return data.A1;
      case "A2":
        return data.A2;
      case "B":
        return data.B;
      case "B1":
        return data.B1;
      case "B2":
        return data.B2;
      case "C":
        return data.C;
      case "C1":
        return data.C1;
      case "C2":
        return data.C2;
      case "D":
        return data.D;
      case "D1":
        return data.D1;
      case "D2":
        return data.D2;
      case "E":
        return data.E;
      case "E1":
        return data.E1;
      case "E2":
        return data.E2;
      case "F":
        return data.F;
      case "F1":
        return data.F1;
      case "F2":
        return data.F2;
      case "M1":
        return data.M1;
      case "M3":
        return data.M3;
    }
  } else if (Device == "Ace") {
    data = {
      A1: [22, 7],
      A2: [75, 12],
      B1: [22, 7],
      B2: [75, 12],
      C1: [22, 7],
      C2: [75, 12],
      D1: [22, 7],
      D2: [75, 12],
      E1: [0, 0],
      E2: [0, 0],
      F1: [0, 0],
      F2: [0, 0],
      M1: [157, 165],
      M3: [242, 167],
      // 'G1': [19, 80],
      // 'G2': [85, 80],
      // 'H1': [19, 80],
      // 'H2': [85, 80],
      // 'I1': [19, 80],
      // 'I2': [85, 80],
      B: [13, 208],
      A: [13, 150],
      C: [278, 150],
      D: [278, 208],
      E: [-10000, -100000],
      F: [-10000, -10000],
      // G: [110, 190],
      // H: [190, 43],
      // I: [190, 43],
      // STPM: [50, 10],
      // MOTOR1: [142, 393],
      // MOTOR2: [250, 393],
    };
    switch (port) {
      case "A":
        return data.A;
      case "A1":
        return data.A1;
      case "A2":
        return data.A2;
      case "B":
        return data.B;
      case "B1":
        return data.B1;
      case "B2":
        return data.B2;
      case "C":
        return data.C;
      case "C1":
        return data.C1;
      case "C2":
        return data.C2;
      case "D":
        return data.D;
      case "D1":
        return data.D1;
      case "D2":
        return data.D2;
      case "E":
        return data.E;
      case "E1":
        return data.E1;
      case "E2":
        return data.E2;
      case "F":
        return data.F;
      case "F1":
        return data.F1;
      case "F2":
        return data.F2;
      case "M1":
        return data.M1;
      case "M3":
        return data.M3;
    }
  }
}
export default Ports;
