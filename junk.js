const CoinbasePro = require('coinbase-pro');
var coinbaseWs = '';

function connect() {
    coinbaseWs = new CoinbasePro.WebsocketClient(
        ['BTC-USD'],
        'wss://ws-feed.pro.coinbase.com',
        {
            key: 'xxxx',
            secret: 'xxxx',
            passphrase: 'xxxx',
        },
        { channels: ['matches'] }
    );  

    coinbaseWs.on('message', async data => { 
        console.log(data)  
    });

    coinbaseWs.on('error', err => {
      console.error("Connection with Coinbase websocket failed with error: " + err);
      console.log("Error stack trace: " + err.stack);
    });

    coinbaseWs.on('close', () => {
      console.error("Connection with Coinbase websocket closed!");
    });
}

connect();