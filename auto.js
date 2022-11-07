const fetch = require("node-fetch");

const refreshServer = async function () {
  await fetch("https://providers-sooty.vercel.app/uber/server-refresh", {
    method: "PUT",
  }).then(() => console.log("Uber Refresh Success"));
  await fetch("https://providers-sooty.vercel.app/heetch/server-refresh", {
    method: "PUT",
  }).then(() => console.log("Heetch Refresh Success"));
  await fetch("https://providers-sooty.vercel.app/bolt/server-refresh", {
    method: "PUT",
  }).then(() => console.log("Bolt Refresh Success"));
};

refreshServer();
