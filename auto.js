const fetch = require("node-fetch");

const refreshServer = async function () {
  await fetch("https://backend-providers-wine.vercel.app/uber/server-refresh", {
    method: "PUT",
  }).then(() => console.log("Uber Suppression Success"));
  await fetch(
    "https://backend-providers-wine.vercel.app/heetch/server-refresh",
    {
      method: "PUT",
    }
  ).then(() => console.log("Heetch Suppression Success"));
  await fetch("https://backend-providers-wine.vercel.app/bolt/server-refresh", {
    method: "PUT",
  }).then(() => console.log("Bolt SuppressionSuccess"));
};

refreshServer();
