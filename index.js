//Load program dependencies 
const express = require('express')
const axios = require('axios')
const dotenv = require('dotenv').config()
const crypto = require("crypto");
const Websocket = require('ws')
const webSocketServer = require('websocket').server
const jinky = express()

//Config vars
const PORT = 5000 || 3000
const key = '5604a6f68fcf0ce39ea5aa020684b8dd'
const secret = 'SlCBdWPvsWxVGQwIhZSXsqkPa/dy+AXIwq6fVRs1ZIpIW1rkrs3xT/RG3JkULNSVt1WqT0CwtYV+AGIzAeC+Dw=='
const passPhrase = '8bystr00t3g'
const timestamp = Math.floor(new Date().getTime() / 1000)

//handles problems
process.on("unhandledRejection", (reason, p) => {
    console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
    // application specific logging, throwing an error, or other logic here
  });
/*___________________________SERVER___________________________________________*/
const httpServer = require('http').createServer(jinky).listen(PORT, ()=> (console.log(new Date() + ` [HTTP]: Server is listening on port ${PORT}`)))
//websocket server and http server & link /*no wss origin*/ listening on Ports  3000/5000

//websocket server
wss = new webSocketServer({
    httpServer,
    autoAcceptConnections: true,
    port: `${PORT}`
})

wss.on('connection', (ws) =>{
    console.log('[Server] a client was connected')
   
    ws.on('close', () => {console.log('[Server] Client disconnected.')})
    ws.on('message', (message) =>{
        console.log('[Server] Received message %s', message)
        //broadcast to everyone else connected
        wss.clients.forEach(function each(client){
            if(client !== ws && client.readyState === Websocket.OPEN){
                client.send(message)
            }
        })
    })
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

/*______________________API CALLS_____________________________________________*/

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
            // console.log(err)
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
           // console.log(res.data.data)
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
            // console.log(res.data.data)
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
            // console.log(res.data.data)
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
           // console.log(res.data)
         }).catch(err=>{
             //console.log(err)
         })
        
    })
});
})



  //${req.protocol}://${req.get('host')}${req.originalUrl}: moment().format()
