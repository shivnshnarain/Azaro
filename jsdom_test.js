const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const http = require("http");

http.get("http://localhost:3000", (res) => {
  let data = "";
  res.on("data", chunk => data += chunk);
  res.on("end", () => {
    const virtualConsole = new jsdom.VirtualConsole();
    virtualConsole.on("error", (err) => { console.error("JSDOM ERROR:", err); });
    virtualConsole.on("warn", (warn) => { console.warn("JSDOM WARN:", warn); });
    virtualConsole.on("log", (log) => { console.log("JSDOM LOG:", log); });
    virtualConsole.on("jsdomError", (err) => { console.error("JSDOM FATAL:", err); });

    console.log("Starting JSDOM...");
    const dom = new JSDOM(data, {
      url: "http://localhost:3000/",
      runScripts: "dangerously",
      resources: "usable",
      virtualConsole
    });
    
    setTimeout(() => {
      console.log("JSDOM execution complete.");
    }, 5000);
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
