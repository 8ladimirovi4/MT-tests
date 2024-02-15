
fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=aaaa&appid=ea26a861414de47dbc881542c1e48705`)
.then(response => {
  if(!response.ok){
    return response.json()
    .then(data => {
     throw Object.assign(new Error('error loading data'), {
        response: data
      })
    })
  }
  return response.json()
})
.then(data => console.log('===> data', data))
.catch(error => {
  console.log('===> ',  error.message)
  console.log('===> ', error.response)
})

const xhr = {
  status: 300
}

if(xhr.status < 200 || xhr.status > 299){
  console.log('===> error', )
}else{
  console.log('===> success', )
}
 