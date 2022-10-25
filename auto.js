const refreshServer = async function () {
await fetch('https://backend-providers-wine.vercel.app/uber/server-delete')
await fetch('https://backend-providers-wine.vercel.app/heetch/server-delete')
await fetch('https://backend-providers-wine.vercel.app/bolt/server-delete')
await fetch('https://backend-providers-wine.vercel.app/uber/server-generate/200')
await fetch('https://backend-providers-wine.vercel.app/heetch/server-generate/200')
await fetch('https://backend-providers-wine.vercel.app/bolt/server-generate/200')
}

refreshServer()
