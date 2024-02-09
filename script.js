
let consecutiveFailures = 0;

function ping(){

fetch('https://catfact.ninja/fact')
.then(resJOSON => {
  return resJOSON.json()
})
.then(function(res){
document.querySelector('div').innerHTML = res.fact
consecutiveFailures = 0;
},function(error){
  consecutiveFailures++;
  document.querySelector('div').innerHTML = '<h2>fatalError</h2>'
  document.querySelector('h1').innerHTML = `попытка пинга N ${consecutiveFailures}`
 
  if (consecutiveFailures === 3) {
    
    // setTimeout(() => {
    //   window.location.href = '/redirect.html'
    // },2800)
}
console.log(' ===> failed to fetch', error)
}
)
setTimeout(() => {
  ping()
},3000)
}

ping()