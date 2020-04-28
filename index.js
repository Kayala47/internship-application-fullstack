addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

const cookie = getCookie(request, "url")
var output
var cookieNotice = ""

if (!cookie){
  //if we don't have a cookie with the name url, have to generate a new one
    
let url = "https://cfw-takehome.developers.workers.dev/api/variants"

let resp = await fetch(url)
.then((response) => response.text())
.catch((error) => {
  console.log(error)
});

var processed = resp.substring(resp.indexOf("[") + 1, resp.indexOf("]"))
var choices = processed.split(",")
var randomNum = Math.random() < 0.5 ? 0 : 1
output  = choices[randomNum]

}else{

  output = cookie
  cookieNotice = `<p> Note: It looks like you've visitied this site before.
   You'll be sent to the same site every time unless you delete your cookies :) </p> `
  
}


html = `
<html>
  <body>
  <h1>Hey there! Thanks for considering my appliation! Here's your link:</h1>
  <a href=` + output + `> Follow Me! </a> <br> 
  <p> Don't worry, you're being sent to ` + output + `</p> ` + cookieNotice + `
  <iframe width="560" height="315" 
  src="https://www.youtube.com/embed/y6Sxv-sUYtM?start=13" 
  frameborder="0" allow="accelerometer; 
  autoplay; encrypted-media; gyroscope; 
  picture-in-picture" allowfullscreen></iframe>
  </body>
</html>
`

let respText = "Hiya! Here's your link: " + output

const cookieText = "url=" + output

const init = {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
      'Set-Cookie' : cookieText
    }
  }

// return new Response(output, {status: 200})


return  new Response(html, init)


}

/**
 * Credit to: https://developers.cloudflare.com/workers/templates/pages/cookie_extract/
 * Grabs the cookie with name from the request headers
 * @param {Request} request incoming Request
 * @param {string} name of the cookie to grab
 */
function getCookie(request, name) {
  let result = null
  let cookieString = request.headers.get('Cookie')
  if (cookieString) {
    let cookies = cookieString.split(';')
    cookies.forEach(cookie => {
      let cookieName = cookie.split('=')[0].trim()
      if (cookieName === name) {
        let cookieVal = cookie.split('=')[1]
        result = cookieVal
      }
    })
  }
  return result
}

