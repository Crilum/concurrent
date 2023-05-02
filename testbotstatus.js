//const json = require("json");
const headers = {
    "Authorization": "Bearer ptlc_2e6SQALQgOtOwa3dvNyWyFdw2FGPGq5nzhjJeIIBLoq",
    "Content-Type": "application/json",
    "Accept": "Application/vnd.pterodactyl.v1+json"
}
async function getServerStatus() {
    const resp = await fetch(`https://panel.botshard.com/api/client`, { method: 'GET', headers: headers })
        .then(interaction => interaction.json())
    const resp3 = await fetch(`https://panel.botshard.com/api/client/servers/${resp.data[0].attributes.identifier}/resources`, { method: 'GET', headers: headers })
        .then(interaction => interaction.json())

    const resp2 = await fetch(`https://panel.botshard.com/api/client/servers/${resp.data[0].attributes.identifier}/websocket`, { method: 'GET', headers: headers })
        .then(interaction => interaction.json())

    console.log(resp)
    console.log(resp.data[0].attributes.identifier)
    console.log(resp2)
    console.log(resp3)
    const WebSocket = require('ws');
    let clients = [
        new WebSocket(resp2.data.socket),
    ];

    clients.map(client => {
        client.on('message', msg => console.log(msg));
    });

    // Wait for the client to connect using async/await
    await new Promise(resolve => clients[0].once('open', resolve));

    // Prints "Hello!" twice, once for each client.
    clients[0].send({ "event": "auth", "args": [resp2.data.token] });

}
getServerStatus();