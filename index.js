//Load program dependencies 
const express = require('express')
const axios = require('axios')
const dotenv = require('dotenv').config()
const crypto = require("crypto");
const webSocketServer = require('websocket').server
const jinky = express()
const httpServer = require('http').createServer(jinky)
//Config vars
const PORT = 3000 || 5000
const key = '5604a6f68fcf0ce39ea5aa020684b8dd'
const secret = 'SlCBdWPvsWxVGQwIhZSXsqkPa/dy+AXIwq6fVRs1ZIpIW1rkrs3xT/RG3JkULNSVt1WqT0CwtYV+AGIzAeC+Dw=='
const passPhrase = '8bystr00t3g'
const timestamp = Math.floor(new Date().getTime() / 1000)

/*___________________________SERVER___________________________________________*/

//websocket server and http server & link /*no wss origin*/ listening on Ports  3000/5000
httpServer.listen(PORT, ()=> (console.log(new Date() + `Server is listening on port ${PORT}`)))
//websocket server
wsServer = new webSocketServer({
    httpServer: httpServer,
    autoAcceptConnections: true,
})
function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
  }
  wsServer.on('request', function(request) {
      if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
      }
      var connection = request.accept('echo-protocol', request.origin);
      console.log((new Date()) + ' Connection accepted.');
      connection.on('message', function(message) {
          if (message.type === 'utf8') {
              console.log('Received Message: ' + message.utf8Data);
              connection.sendUTF(message.utf8Data);
          }
          else if (message.type === 'binary') {
              console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
              connection.sendBytes(message.binaryData);
          }
      });
      connection.on('close', function(reasonCode, description) {
          console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
      });
  })

/*_______________________HASH_ALGOR_SIGNATURE_________________________________*/
//creating hmac object 
var hmac = crypto.createHmac('sha256', `'${secret}'`);
//passing the data to be hashed
data = hmac.update('nodejsera');
//Creating the hmac in the required format
gen_hmac= data.digest('hex');
//Printing the output on the console
let sign =  + gen_hmac + timestamp + 'accounts';

/*______________________REST API CONFIG WITH HASH_____________________________*/

//http confg for REST api call
const coinbaseProConfig = axios.create({
    baseURL: 'https://api.exchange.coinbase.com/currencies',
    headers: {
    "Accept": 'application/json',
    "Content-Type": "application/json",
    "CB-ACCESS-KEY": `"${key}"`,
    "CB-ACCESS-SIGN": `${sign}`,
    "CB-ACCESS-TIMESTAMP": `"${timestamp}"`,
    "CB-ACCESS-PASSPHRASE": `"${passPhrase}"`
     }
   })

/*______________________API CALL______________________________________________*/

//buy
 coinbaseProConfig({
    method: 'GET',
}).then(res=>{
let data =  res.data
data.forEach(element => {
    let arr = []
    arr.push(element)
    arr.forEach((x)=>{
        
         coinbaseProConfig({
            method: 'GET',
            baseURL: `https://api.coinbase.com/v2/prices/buy?currency=${x.id}`
        }).then(res=>{
             console.log(res.data.data)
         }).catch(err=>{
             console.log(err)
         })
        
    })
});
})
//sell
coinbaseProConfig({
    method: 'GET',
}).then(res=>{
let data =  res.data
data.forEach(element => {
    let arr = []
    arr.push(element)
    arr.forEach((x)=>{
        
         coinbaseProConfig({
            method: 'GET',
            baseURL: `https://api.coinbase.com/v2/prices/sell?currency=${x.id}`
        }).then(res=>{
            console.log(res.data.data)
         }).catch(err=>{
             //console.log(err)
         })
        
    })
});
})

//spot
coinbaseProConfig({
    method: 'GET',
}).then(res=>{
let data =  res.data
data.forEach(element => {
    let arr = []
    arr.push(element)
    arr.forEach((x)=>{
        
         coinbaseProConfig({
            method: 'GET',
            baseURL: `https://api.coinbase.com/v2/prices/spot?currency=${x.id}`
        }).then(res=>{
             console.log(res.data.data)
         }).catch(err=>{
             //console.log(err)
         })
        
    })
});
})
//time
coinbaseProConfig({
    method: 'GET',
}).then(res=>{
let data =  res.data
data.forEach(element => {
    let arr = []
    arr.push(element)
    arr.forEach((x)=>{
        
         coinbaseProConfig({
            method: 'GET',
            baseURL: `https://api.coinbase.com/v2/time`
        }).then(res=>{
             console.log(res.data.data)
         }).catch(err=>{
             //console.log(err)
         })
        
    })
});
})
//rates
coinbaseProConfig({
    method: 'GET',
}).then(res=>{
let data =  res.data
data.forEach(element => {
    let arr = []
    arr.push(element)
    arr.forEach((x)=>{
        
         coinbaseProConfig({
            method: 'GET',
            baseURL: `https://api.coinbase.com/v2/exchange-rates`
        }).then(res=>{
            console.log(res.data)
         }).catch(err=>{
             //console.log(err)
         })
        
    })
});
})



  //${req.protocol}://${req.get('host')}${req.originalUrl}: moment().format()
