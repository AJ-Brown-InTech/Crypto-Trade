// Computes the HMAC for requests sent to the Coinbase Pro API.
//
// - Add the following code as Postman pre-request script
// - Adapt the getPatch function an the variable names according to your needs

const timestamp = Date.now() / 1000;

function getPath(url) {
    // URL path regex works only if your URLs look like this: {{api_url}}/resource
    // If you use hardcoded URLs or any other scheme, adapt the regex pattern!
    const matches = url.match(/.+?(\/.+?)(?:#|\?|$)/);
    return (matches && matches.length > 1) ? matches[1] : ''; 
}
 
