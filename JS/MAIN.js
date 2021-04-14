//const fetch = require("node-fetch");
const Site = "MZP";
const Base_Currency = "USD";
const Currencies = ["AED", "GBP", "PKR", "SGD", "INR"].sort();
const Metals = ["GOLD", "SILVER", "PLATINUM", "PALLADIUM"].sort();
var CTickers = [];
var MTickers = [];

// Currency Rates
for (var i = 0; i < Currencies.length; i++) {
  CTickers.push(`FX_IDC:${Base_Currency}${Currencies[i]}`);
}
for (var i = 0; i < Metals.length; i++) {
  MTickers.push(`TVC:${Metals[i]}`);
}
function CAPI_Manipulate(R, BC, C) {
  if (document.cookie.indexOf(`${Site}`) == -1) {
    document.cookie = `${Site}=${JSON.stringify(R)}`;
    console.log("New Data");
    var DOM = "";
    for (var i = 0; i < C.length; i++) {
      var EQ = `${BC}/${C[i]}`;
      const ARR = ["CURR", "CP", "PC", "CG", "BP", "AP", "HP", "LP"];
      const TRC = (ARR, EQ, SD) => {
        var D = "";
        for (var i = 0; i < ARR.length; i++) {
          if (ARR[i] == "CURR") {
            D += `<td id="${Site}-${ARR[i]}"><div>${SD[EQ][ARR[i]]}</div></td>`;
          } else if (ARR[i] == "PC") {
            D += `<td id="${Site}-${ARR[i]}"><div>${
              SD[EQ][ARR[i]]
            }%</div></td>`;
          } else {
            D += `<td id="${Site}-${ARR[i]}"><div>${SD[EQ][ARR[i]]}/${
              SD[EQ][ARR[i]]
            }</div></td>`;
          }
        }
        var R = `<tr id="Currency-${i}">${D}</tr>`;
        return R;
      };
      DOM += TRC(ARR, EQ, R);
    }
    document.querySelector("tbody").innerHTML = DOM;
  } else if (
    Object.keys(JSON.parse(document.cookie.substring(Site.length + 1)))
      .length != C.length
  ) {
    document.cookie = `${Site}=${JSON.stringify(R)}`;
    console.log("New Data");
    var DOM = "";
    for (var i = 0; i < C.length; i++) {
      var EQ = `${BC}/${C[i]}`;
      const ARR = ["CURR", "CP", "PC", "CG", "BP", "AP", "HP", "LP"];
      const TRC = (ARR, EQ, SD) => {
        var D = "";
        for (var i = 0; i < ARR.length; i++) {
          if (ARR[i] == "CURR") {
            D += `<td id="${Site}-${ARR[i]}"><div>${SD[EQ][ARR[i]]}</div></td>`;
          } else if (ARR[i] == "PC") {
            D += `<td id="${Site}-${ARR[i]}"><div>${
              SD[EQ][ARR[i]]
            }%</div></td>`;
          } else {
            D += `<td id="${Site}-${ARR[i]}"><div>${SD[EQ][ARR[i]]}/${
              SD[EQ][ARR[i]]
            }</div></td>`;
          }
        }
        var R = `<tr id="Currency-${i}">${D}</tr>`;
        return R;
      };
      DOM += TRC(ARR, EQ, R);
    }
    document.querySelector("tbody").innerHTML = DOM;
  } else {
    if (document.cookie != `${Site}=${JSON.stringify(R)}`) {
      var TD = JSON.parse(document.cookie.substring(Site.length + 1));
      var DOM = "";
      for (var j = 0; j < C.length; j++) {
        var EQ = `${BC}/${C[j]}`;
        const ARR = ["CURR", "CS", "CP", "PC", "CG", "BP", "AP", "HP", "LP"];
        const TRC = (ARR, EQ, SD) => {
          var D = "";
          for (var i = 0; i < ARR.length; i++) {
            if (ARR[i] == "CURR") {
              D += `<td id=${Site}-${ARR[i]}><div>${SD[EQ][ARR[i]]}</div></td>`;
            } else if (ARR[i] == "PC") {
              if (SD[EQ][ARR[i]] > TD[EQ][ARR[i]]) {
                D += `<td id="${Site}-${
                  ARR[i]
                }"><div style="font-weight:600;color: #26a69a;"><p>${
                  SD[EQ][ARR[i]]
                }%</p><img src="SORT_UP.svg"/></div></td>`;
              } else if (SD[EQ][ARR[i]] < TD[EQ][ARR[i]]) {
                D += `<td id="${Site}-${
                  ARR[i]
                }"><div><p style="font-weight:600;color: #ef5350;">${
                  SD[EQ][ARR[i]]
                }%</p><img src="SORT_DOWN.svg" /></div></td>`;
              } else {
                D += `<td id="${Site}-${ARR[i]}"><div><p>${
                  SD[EQ][ARR[i]]
                }%</p></div></td>`;
              }
            } else if (ARR[i] == "CS") {
              D += "";
            } else {
              if (SD[EQ][ARR[i]] > TD[EQ][ARR[i]]) {
                D += `<td id="${Site}-${
                  ARR[i]
                }"><div style="font-weight:600;color: #26a69a;"><p><b class="Curr">${
                  SD[EQ][ARR[1]]
                }</b>${SD[EQ][ARR[i]]}</p><img src="SORT_UP.svg"/></div></td>`;
              } else if (SD[EQ][ARR[i]] < TD[EQ][ARR[i]]) {
                D += `<td id="${Site}-${
                  ARR[i]
                }" ><div><p style="font-weight:600;color: #ef5350;"><b class="Curr">${
                  SD[EQ][ARR[1]]
                }</b>${
                  SD[EQ][ARR[i]]
                }</p><img src="SORT_DOWN.svg" /></div></td>`;
              } else {
                D += `<td id="${Site}-${ARR[i]}"><div><p><b class="Curr">${
                  SD[EQ][ARR[1]]
                }</b>${SD[EQ][ARR[i]]}</p></div></td>`;
              }
            }
          }
          var R = `<tr id="Currency-${j}">${D}</tr>`;
          return R;
        };
        DOM += TRC(ARR, EQ, R);
      }
      document.querySelector("tbody").innerHTML = DOM;
    } else {
      var TD = JSON.parse(document.cookie.substring(Site.length + 1));
      var DOM = "";
      for (var j = 0; j < C.length; j++) {
        var EQ = `${BC}/${C[j]}`;
        const ARR = ["CURR", "CS", "CP", "PC", "CG", "BP", "AP", "HP", "LP"];
        const TRC = (ARR, EQ, SD) => {
          var D = "";
          for (var i = 0; i < ARR.length; i++) {
            if (ARR[i] == "CURR") {
              D += `<td id=${Site}-${ARR[i]}>
                      <div>
                        <p>${TD[EQ][ARR[i]]}</p>
                      </div>
                    </td>`;
            } else if (ARR[i] == "PC") {
              D += `<td id="${Site}-${ARR[i]}">
                      <div>
                        <p>${TD[EQ][ARR[i]]}%</p>
                      </div>
                    </td>`;
            } else if (ARR[i] == "CS") {
              D += "";
            } else {
              D += `<td id="${Site}-${ARR[i]}">
                      <div>
                        <p><b class="Curr">${TD[EQ][ARR[1]]}</b>${
                TD[EQ][ARR[i]]
              }</p>
                      </div>
                    </td>`;
            }
          }
          var R = `<tr id="Currency-${j}">${D}</tr>`;
          return R;
        };
        DOM += TRC(ARR, EQ, R);
      }
      document.querySelector("tbody").innerHTML = DOM;
      document.cookie = `${Site}=${JSON.stringify(R)}`;
    }
  }
  setTimeout(() => {
    Fetch_API();
  }, 1000);
}
// function MAPI_Manipulate(R, BC, M) {
// if (document.cookie.indexOf(`${Site}`) == -1) {
//   document.cookie = `${Site}=${JSON.stringify(R)}`;
//   console.log("New Data");
//   var DOM = "";
//   for (var i = 0; i < M.length; i++) {
//     var EQ = `${BC}/${C[i]}`;
//     const ARR = ["CURR", "CP", "PC", "CG", "BP", "AP", "HP", "LP"];
//     const TRC = (ARR, EQ, SD) => {
//       var D = "";
//       for (var i = 0; i < ARR.length; i++) {
//         if (ARR[i] == "CURR") {
//           D += `<td id="${Site}-${ARR[i]}"><div>${SD[EQ][ARR[i]]}</div></td>`;
//         } else if (ARR[i] == "PC") {
//           D += `<td id="${Site}-${ARR[i]}"><div>${SD[EQ][ARR[i]].toFixed(
//             3
//           )}%</div></td>`;
//         } else {
//           D += `<td id="${Site}-${ARR[i]}"><div>${SD[EQ][ARR[1]]} ${SD[EQ][
//             ARR[i]
//           ].toFixed(4)}</div></td>`;
//         }
//       }
//       var R = `<tr id="Currency-${i}">${D}</tr>`;
//       return R;
//     };
//     DOM += TRC(ARR, EQ, R);
//   }
//   document.querySelector("tbody").innerHTML = DOM;
// } else {
//   if (document.cookie != `${Site}=${JSON.stringify(R)}`) {
//     var DOM = "";
//     for (var i = 0; i < C.length; i++) {
//       var EQ = `${BC}/${C[i]}`;
//       const ARR = ["CURR", "CS", "CP", "PC", "CG", "BP", "AP", "HP", "LP"];
//       const TRC = (ARR, EQ, SD) => {
//         var D = "";
//         for (var i = 0; i < ARR.length; i++) {
//           if (ARR[i] == "CURR") {
//             D += `<td id="${Site}-${ARR[i]}"><div>${SD[EQ][ARR[i]]}</div></td>`;
//           } else if (ARR[i] == "PC") {
//             D += `<td id="${Site}-${ARR[i]}"><div>${SD[EQ][ARR[i]].toFixed(
//               3
//             )}%</div></td>`;
//           } else if (ARR[i] == "CS") {
//             D += "";
//           } else {
//             D += `<td id="${Site}-${ARR[i]}"><div>${SD[EQ][ARR[1]]} ${SD[EQ][
//               ARR[i]
//             ].toFixed(4)}</div></td>`;
//           }
//         }
//         var R = `<tr id="Currency-${i}">${D}</tr>`;
//         return R;
//       };
//       DOM += TRC(ARR, EQ, R);
//     }
//     document.querySelector("tbody").innerHTML = DOM;
//   } else {
//   }
// }
// }
function CProcess(CRES, BC, C, CS) {
  const JD = CRES["data"];
  var FD = {};
  for (var i = 0; i < C.length; i++) {
    if (JD[i]["s"].substring(10) == C[i]) {
      const TC = JD[i]["d"];
      FD[`${BC}/${C[i]}`] = {
        CURR: `${BC}/${C[i]}`,
        CS: CS[C[i]],
        CP: TC[3].toFixed(5),
        PC: TC[4].toFixed(2),
        CG: TC[5].toFixed(2),
        BP: TC[6].toFixed(5),
        AP: TC[7].toFixed(5),
        HP: TC[8].toFixed(5),
        LP: TC[9].toFixed(5),
      };
    } else {
      FD[`${BC}/${C[i]}`] = {};
    }
  }
  CAPI_Manipulate(FD, BC, C);
}

// function MProcess(MRES, BC, M, MS, CS) {
//   const JD = MRES["data"];
//   var FD = {};
//   for (var i = 0; i < M.length; i++) {
//     if (JD[i]["s"].substring(4) == M[i]) {
//       const TC = JD[i]["d"];
//       FD[`${BC}/${MS[i]}`] = {
//         CURR: `${BC}/${MS[i]}`,
//         MS: MS[i],
//         CS: CS[C[i]],
//         CP: TC[3],
//         PC: TC[4],
//         CG: TC[5],
//         BP: TC[6],
//         AP: TC[7],
//         HP: TC[8],
//         LP: TC[9],
//       };
//     } else {
//       FD[`${BC}/${MS[i]}`] = {};
//     }
//   }
//   MAPI_Manipulate(FD, BC, M);
// }

const Fetch_API = async () => {
  const CS = {
    symbols: {
      tickers: CTickers,
      query: { types: ["forex"] },
    },
    columns: [
      "base_currency_logoid",
      "currency_logoid",
      "name",
      "close",
      "change",
      "change_abs",
      "bid",
      "ask",
      "high",
      "low",
      "Recommend.All",
      "description",
      "name",
      "type",
      "subtype",
      "update_mode",
      "pricescale",
      "minmov",
      "fractional",
      "minmove2",
    ],
    sort: { sortBy: "name", sortOrder: "asc" },
  };
  const MS = {
    symbols: {
      tickers: MTickers,
      query: { types: ["cfd"] },
    },
    columns: [
      "base_currency_logoid",
      "currency_logoid",
      "name",
      "close",
      "change",
      "change_abs",
      "bid",
      "ask",
      "high",
      "low",
      "Recommend.All",
      "description",
      "name",
      "type",
      "subtype",
      "update_mode",
      "pricescale",
      "minmov",
      "fractional",
      "minmove2",
    ],
    sort: { sortBy: "name", sortOrder: "asc" },
  };
  // const MR = await fetch("https://scanner.tradingview.com/forex/scan", {
  //   method: "POST",
  //   body: JSON.stringify(MS),
  // });

  const CSymbol = await (await fetch("CM.json")).json();
  const CR = await fetch("https://scanner.tradingview.com/forex/scan", {
    method: "POST",
    Headers: {
      Origin: "https://www.tradingview.com",
    },
    body: JSON.stringify(CS),
  });
  var CRes = await (await CR).json();
  console.log(CRes);

  // const MSymbol = ["XAU", "XPD", "XPT", "XAG"];
  // const MR = await fetch("https://scanner.tradingview.com/forex/scan", {
  //   method: "POST",
  //   Headers: {
  //     Origin: "https://www.tradingview.com",
  //   },
  //   body: JSON.stringify(MS),
  // });
  // var MRes = await (await MR).json();

  CProcess(CRes, Base_Currency, Currencies, CSymbol);
  // MProcess(MRes, Base_Currency, Metals, MSymbol, CSymbol);
};

var Connections = 0;
var Messages = 0;
const MY_API = () => {
  let ws = new WebSocket("ws://localhost:5000"); //"wss://obscure-harbor-71297.herokuapp.com");
  var z = `6F92ADB200663185FC815BCA7E8BB297B96C21B17CDB03872F71`;
  var y = "";
  ws.addEventListener("open", () => {
    ws.send(
      JSON.stringify({
        UUID_SESSION: z,
        HANDLE_KEY: y,
      })
    );
  });
  ws.addEventListener("message", async (e) => {
    Messages++;
    console.log(Messages);
    await Sock_Manipulate(JSON.parse(e.data));
    ws.send(
      JSON.stringify({
        Type: "Subscribe",
      })
    );
  });
};
// const Fetcher_Sock = () => {
//   var Socket = new WebSocket(
//     "wss://dashboard.acuitytrading.com/signalRCommonHub?widget=Widgets"
//   );
//   Socket.addEventListener("open", () => {
//     console.log("Connected To OANDA");
//     Socket.send(
//       JSON.stringify({
//         protocol: "json",
//         version: 1,
//       }) + ""
//     );
//     if (Connections >= 1) {
//       Sock_initialize();
//     }
//   });

//   Socket.addEventListener("message", (e) => {
//     if (Messages == 600) {
//     }
//     const JSON_Data = JSON.parse(e.data.substring(0, e.data.length - 1));
//     if (JSON_Data["type"] == undefined) {
//       Socket.send(
//         JSON.stringify({
//           arguments: ["oanda_priceMessage", "updateAllPrice_OGM"],
//           invocationId: "0",
//           target: "subscribe",
//           type: 1,
//         }) + ""
//       );
//     } else if (JSON_Data["type"] == 7) {
//       Connections++;
//       Fetcher_Sock();
//     } else {
//       Messages++;
//       if (JSON_Data["type"] == 3) {
//       } else if (JSON_Data["type"] == 1) {
//         for (var i = 0; i < JSON_Data["arguments"][0].length; i++) {
//           if (JSON_Data["arguments"][0][i]["Instrument"] == "XAU_USD") {
//             Sock_Manipulate(JSON_Data["arguments"][0][i]);
//           } else {
//           }
//         }
//       }
//       if (Messages % 4 == 0) {
//         Socket.send(JSON.stringify({ type: 6 }) + "");
//       }
//     }
//   });
//   Socket.addEventListener("close", () => {
//     Connections++;
//     Fetcher_Sock();
//   });
// };
const DF = (N, O) => {
  N = parseFloat(N).toFixed(2);
  O = parseFloat(O).toFixed(2);
  const DIFF = (N - O).toFixed(2);
  const NS = N.toString();
  const OS = O.toString();

  var FD = [];
  for (var i = 0; i < Math.min(NS.length, OS.length); i++) {
    if (NS[i] !== OS[i]) {
      FD.push(i);
    }
  }
  FD = FD[0];
  const SS = NS.substring(0, FD);
  const DS = NS.substring(FD);
  if (DIFF < 0) {
    return `${SS}<span class="DOWN">${DS}</span><span><img src="IMG/SORT_DOWN.svg"/></span>`;
  } else if (DIFF > 0) {
    return `${SS}<span class="UP">${DS}</span><span><img src="IMG/SORT_UP.svg"/></span>`;
  } else {
    return `${SS}`;
  }
};
const Sock_Manipulate = (JD) => {
  console.log(JD);
  const JS = ["OZ", "GM", "KG", "TT"];
  const ARR = ["BP", "AP", "HP", "LP"];

  if (typeof Storage !== "undefined") {
    if (sessionStorage.getItem(Site) == null) {
      for (var j = 0; j < JS.length; j++) {
        for (var i = 0; i < ARR.length; i++) {
          var Elem = document.querySelector(`#${ARR[i]}${JS[j]}`);
          Elem.innerHTML = JD[JS[j]][ARR[i]];
        }
      }
    } else if (JSON.parse(sessionStorage.getItem(Site)).length != JD.length) {
      for (var j = 0; j < JS.length; j++) {
        for (var i = 0; i < ARR.length; i++) {
          var Elem = document.querySelector(`#${ARR[i]}${JS[j]}`);
          Elem.innerHTML = JD[JS[j]][ARR[i]];
        }
      }
    } else if (JSON.parse(sessionStorage.getItem(Site)) == JD) {
      const TD = JSON.parse(sessionStorage.getItem(Site));
      for (var j = 0; j < JS.length; j++) {
        for (var i = 0; i < ARR.length; i++) {
          var Elem = document.querySelector(`#${ARR[i]}${JS[j]}`);
          Elem.innerHTML = TD[JS[j]][ARR[i]];
        }
      }
    } else {
      const TD = JSON.parse(sessionStorage.getItem(Site));
      for (var j = 0; j < JS.length; j++) {
        for (var i = 0; i < ARR.length; i++) {
          var Elem = document.querySelector(`#${ARR[i]}${JS[j]}`);
          Elem.innerHTML = DF(JD[JS[j]][ARR[i]], TD[JS[j]][ARR[i]]);
        }
      }
    }
    sessionStorage.setItem(Site, JSON.stringify(JD));
  }
  // } else {
  //   if (document.cookie.indexOf(`${Site}`) == -1) {
  //     for (var j = 0; j < JS.length; j++) {
  //       for (var i = 0; i < ARR.length; i++) {
  //         var Elem = document.querySelector(`#${ARR[i]}${JS[j]}`);
  //         Elem.innerHTML = JD[JS[j]][ARR[i]];
  //       }
  //     }
  //   } else if (
  //     JSON.parse(document.cookie.substring(Site.length + 1)).length != JD.length
  //   ) {
  //     for (var j = 0; j < JS.length; j++) {
  //       for (var i = 0; i < ARR.length; i++) {
  //         var Elem = document.querySelector(`#${ARR[i]}${JS[j]}`);
  //         Elem.innerHTML = JD[JS[j]][ARR[i]];
  //       }
  //     }
  //   } else if (JSON.parse(document.cookie.substring(Site.length + 1)) == JD) {
  //     for (var j = 0; j < JS.length; j++) {
  //       for (var i = 0; i < ARR.length; i++) {
  //         var Elem = document.querySelector(`#${ARR[i]}${JS[j]}`);
  //         Elem.innerHTML = JD[JS[j]][ARR[i]];
  //       }
  //     }
  //   } else {
  //     const TD = JSON.parse(document.cookie.substring(Site.length + 1));
  //     for (var j = 0; j < JS.length; j++) {
  //       for (var i = 0; i < ARR.length; i++) {
  //         var Elem = document.querySelector(`#${ARR[i]}${JS[j]}`);
  //         Elem.innerHTML = DF(JD[JS[j]][ARR[i]], TD[JS[j]][ARR[i]]);
  //       }
  //     }
  //   }
  document.cookie == `${Site}=${JSON.stringify(JD)}`;
};

//gm = oz * 0.032150746568627
//kg = 1000 * gm
//TTBar = 11.663 * gm
