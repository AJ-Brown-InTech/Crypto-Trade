//Load program dependencies 
const express = require('express')
const axios = require('axios')
const dotenv = require('dotenv').config()
const crypto = require("crypto");
const app = express()
//Config vars
const PORT = 3000 || 5000
const key = '5604a6f68fcf0ce39ea5aa020684b8dd'
const secret = 'SlCBdWPvsWxVGQwIhZSXsqkPa/dy+AXIwq6fVRs1ZIpIW1rkrs3xT/RG3JkULNSVt1WqT0CwtYV+AGIzAeC+Dw=='
const passPhrase = '8bystr00t3g'
const timestamp = Math.floor(new Date().getTime() / 1000)

//create Hash for api secret key
//creating hmac object 
var hmac = crypto.createHmac('sha256', `'${secret}'`);
//passing the data to be hashed
data = hmac.update('nodejsera');
//Creating the hmac in the required format
gen_hmac= data.digest('hex');
//Printing the output on the console
let sign =  + gen_hmac + timestamp + 'accounts';

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})

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
             //console.log(res.data.data)
         }).catch(err=>{
             //console.log(err)
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
             //console.log(res.data.data)
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
             //console.log(res.data.data)
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
             //console.log(res.data.data)
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
            //console.log(res.data)
         }).catch(err=>{
             //console.log(err)
         })
        
    })
});
})
//reports

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
            baseURL: `https://api.coinbase.com/fees`
        }).then(res=>{
             console.log(res)
         }).catch(err=>{
             //console.log(err)
         })
        
    })
});
})

  //${req.protocol}://${req.get('host')}${req.originalUrl}: moment().format()
