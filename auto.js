const fetch = require("node-fetch");

const refreshServer = async function () {
  await fetch("https://backend-providers-wine.vercel.app/uber/server-delete", {
    method: "DELETE",
  }).then(() => console.log("Uber Suppression Success"));
  await fetch(
    "https://backend-providers-wine.vercel.app/heetch/server-delete",
    {
      method: "DELETE",
    }
  ).then(() => console.log("Heetch Suppression Success"));
  await fetch("https://backend-providers-wine.vercel.app/bolt/server-delete", {
    method: "DELETE",
  }).then(() => console.log("Bolt SuppressionSuccess"));
  await fetch(
    "https://backend-providers-wine.vercel.app/uber/server-generate/10",
    {
      method: "POST",
    }
  ).then(() => console.log("Uber Generation Success"));
  await fetch(
    "https://backend-providers-wine.vercel.app/heetch/server-generate/10",
    {
      method: "POST",
    }
  ).then(() => console.log("Heetch Generation Success"));
  await fetch(
    "https://backend-providers-wine.vercel.app/bolt/server-generate/10",
    {
      method: "POST",
    }
  ).then(() => console.log("Bolt Generation Success"));
};

refreshServer();
