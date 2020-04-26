addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {

  const init = {
    headers: {
      'content-type': 'text/html;charset=UTF-8'
    }
  }
  
  let url = "https://cfw-takehome.developers.workers.dev/api/variants"


let resp = await fetch(url)
.then((response) => response.text())
.catch((error) => {
  console.log(error)
});

var processed = resp.substring(resp.indexOf("[") + 1, resp.indexOf("]"))
var choices = processed.split(",")
var randomNum = Math.random() < 0.5 ? 0 : 1
var output = choices[randomNum]



html = `
<html>
  <body>
  <h1>Hey there! Thanks for considering my appliation! Here's your link:</h1>
  <a href=` + output + `> Follow Me! </a> <br> 
  <p> Don't worry, you're being sent to ` + output + `</p> 
  <iframe width="560" height="315" src="https://www.youtube.com/embed/y6Sxv-sUYtM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

  </body>
</html>
`

let respText = "Hiya! Here's your link: " + output

// document.innerHTML = html

// return new Response(output, {status: 200})

return new Response(html, init)
}

