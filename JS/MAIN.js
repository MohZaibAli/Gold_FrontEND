// Declarations
const Site = "MZP";
var Connections = 0;
var Messages = 0;

// Fetching
const Connect = async () => {
  let ws = await new WebSocket("wss://gold-rates-usd.herokuapp.com");
  var z = `6F92AD7721C33520FC815BCA7E8BB297B96C21B17CDB03872F71`;
  var y = "Developed_By_MohZaib_Tech";
  ws.addEventListener("open", () => {
    ws.send(
      JSON.stringify({
        UUID_SESSION: z,
        HANDLE_KEY: y,
      })
    );
  });
  ws.addEventListener("message", async (e) => {
    if (JSON.parse(e.data).Error == undefined) {
      Messages++;
      Data_Manipulate(JSON.parse(e.data));
      setTimeout(() => {
        ws.send(
          JSON.stringify({
            Type: "Subscribe",
          })
        );
      }, 500);
    } else {
      ws.close();
    }
  });
  ws.addEventListener("close", () => {});
  Data_Manipulate(false);
};

// Manipulation
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
  const SS = Format(NS.substring(0, FD));
  const DS = Format(NS.substring(FD));
  if (DIFF < 0) {
    return `${SS}<span class="DOWN">${DS}</span><span class="DOWN_IMG"><img src="IMG/SORT_DOWN.svg"/></span>`;
  } else if (DIFF > 0) {
    return `${SS}<span class="UP">${DS}</span><span class="UP_IMG"><img src="IMG/SORT_UP.svg"/></span>`;
  } else {
    return `${SS}`;
  }
};
const Format = (x) => {
  x = x.toString();
  var p = /(-?\d+)(\d{3})/;
  while (p.test(x)) x = x.replace(p, "$1,$2");
  return x;
};
const Data_Manipulate = (JD) => {
  const JS = ["OZ", "GM", "KG", "TT"];
  const ARR = ["BP", "AP", "HP", "LP"];
  if (JD == false) {
    for (var j = 0; j < JS.length; j++) {
      for (var i = 0; i < ARR.length; i++) {
        var Elem = document.querySelector(`#${ARR[i]}${JS[j]}`);
        Elem.innerHTML = "-";
      }
    }
  } else if (typeof Storage !== "undefined") {
    if (sessionStorage.getItem(Site) == null) {
      for (var j = 0; j < JS.length; j++) {
        for (var i = 0; i < ARR.length; i++) {
          var Elem = document.querySelector(`#${ARR[i]}${JS[j]}`);
          Elem.innerHTML = Format(JD[JS[j]][ARR[i]]);
        }
      }
    } else if (JSON.parse(sessionStorage.getItem(Site)).length != JD.length) {
      for (var j = 0; j < JS.length; j++) {
        for (var i = 0; i < ARR.length; i++) {
          var Elem = document.querySelector(`#${ARR[i]}${JS[j]}`);
          Elem.innerHTML = Format(JD[JS[j]][ARR[i]]);
        }
      }
    } else if (JSON.parse(sessionStorage.getItem(Site)) == JD) {
      const TD = JSON.parse(sessionStorage.getItem(Site));
      for (var j = 0; j < JS.length; j++) {
        for (var i = 0; i < ARR.length; i++) {
          var Elem = document.querySelector(`#${ARR[i]}${JS[j]}`);
          Elem.innerHTML = Format(TD[JS[j]][ARR[i]]);
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
  } else {
    if (document.cookie.indexOf(`${Site}`) == -1) {
      for (var j = 0; j < JS.length; j++) {
        for (var i = 0; i < ARR.length; i++) {
          var Elem = document.querySelector(`#${ARR[i]}${JS[j]}`);
          Elem.innerHTML = Format(JD[JS[j]][ARR[i]]);
        }
      }
    } else if (
      JSON.parse(document.cookie.substring(Site.length + 1)).length != JD.length
    ) {
      for (var j = 0; j < JS.length; j++) {
        for (var i = 0; i < ARR.length; i++) {
          var Elem = document.querySelector(`#${ARR[i]}${JS[j]}`);
          Elem.innerHTML = Format(JD[JS[j]][ARR[i]]);
        }
      }
    } else if (JSON.parse(document.cookie.substring(Site.length + 1)) == JD) {
      const TD = JSON.parse(document.cookie.substring(Site.length + 1));
      for (var j = 0; j < JS.length; j++) {
        for (var i = 0; i < ARR.length; i++) {
          var Elem = document.querySelector(`#${ARR[i]}${JS[j]}`);
          Elem.innerHTML = Format(TD[JS[j]][ARR[i]]);
        }
      }
    } else {
      const TD = JSON.parse(document.cookie.substring(Site.length + 1));
      for (var j = 0; j < JS.length; j++) {
        for (var i = 0; i < ARR.length; i++) {
          var Elem = document.querySelector(`#${ARR[i]}${JS[j]}`);
          Elem.innerHTML = DF(JD[JS[j]][ARR[i]], TD[JS[j]][ARR[i]]);
        }
      }
    }
    document.cookie == `${Site}=${JSON.stringify(JD)}`;
  }
};
document.addEventListener("DOMContentLoaded", Connect());
