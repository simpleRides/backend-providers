const fetch = require("node-fetch");

const refreshServer = async function () {
  await fetch("https://backend-providers-wine.vercel.app/uber/server-refresh", {
    method: "PUT",
  }).then(() => console.log("Uber Refresh Success"));
  await fetch(
    "https://backend-providers-wine.vercel.app/heetch/server-refresh",
    {
      method: "PUT",
    }
  ).then(() => console.log("Heetch Refresh Success"));
  await fetch("https://backend-providers-wine.vercel.app/bolt/server-refresh", {
    method: "PUT",
  }).then(() => console.log("Bolt Refresh Success"));
};

refreshServer();
