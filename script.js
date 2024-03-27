function setPrint() {
  const closePrint = () => {
      document.body.removeChild(this);
  };
  this.contentWindow.onbeforeunload = closePrint;
  this.contentWindow.onafterprint = closePrint;
  this.contentWindow.print();
}

document.getElementById("print_external").addEventListener("click", () => {
  const hideFrame = document.createElement("iframe");
  hideFrame.onload = setPrint;
  hideFrame.style.display = "block"; // hide iframe
  hideFrame.src = "external-page.html";
  document.body.appendChild(hideFrame);
});

  // setTimeout(() => {
  // const div = document.createElement('div')
  // div.style.width = '100px'
  // div.style.height = '100px'
  // div.style.backgroundColor = 'gray'
  
  // const body = document.querySelector('body')
  // body.appendChild(div)
  // },3000)

  // console.log(' ===> ',   window.hasOwnProperty('console'))

// let pingCounterray = 0;
// let waitingCounter = 0;
// const json = {
  
// }

// function ping(){

// fetch('https://catfact.ninja/fac')
// .then(resJOSON => {
//   return resJOSON.json()
// })
// .then(function(res){
// document.querySelector('.ping_cats').innerHTML = `<p>${res.fact}</p> <p>пинг текущего сервера</p>`
// pingCounter = 0;
// },function(error){
//   pingCounter++;
//   document.querySelector('.fail').innerHTML = '<h2>Основной сервер упал</h2>'
//   document.querySelector('.ping_success').innerHTML = `попытка пинга до 3-х раз N ${pingCounter}`
 
//   if (pingCounter === 3) {

//     const interval = setInterval(() => {
//       fetch('https://catfact.ninja/fac')
//       .then(resJOSON => {
//         return resJOSON.json()
//       })
//       .then(function(res){
//         document.querySelector('.error_cats_master').innerHTML = `<p>${res.fact}</p> <p>пинг  сервера до 1 минуты</p>`
//         json.role = 1
//         if( json.role = -1){
//           window.location.href = '/redirectToServer.html'
//         }
//         //редирект на адрес, который опрашиваю, если json.role 1 или -1
//       },function(error){
       
//         document.querySelector('.ping_fail_master').innerHTML = `попытка пинга до 1 минуты  сервера N ${waitingCounter}`
//         waitingCounter ++
//       }
//     )

//     fetch('https://catfact.ninja/fac')
//     .then(resJOSON => {
//       return resJOSON.json()
//     })
//     .then(function(res){
//       document.querySelector('.error_cats_slave').innerHTML = `<p>${res.fact}</p> <p>пинг  сервера до 1 минуты</p>`
//       json.role = -1
//       if( json.role = -1){
//         window.location.href = '/redirectToServer.html'
//       }
//        //редирект на адрес, который опрашиваю, если json.role 1 или -1
//     },function(error){
      
//       document.querySelector('.ping_fail_slave').innerHTML = `попытка пинга до 1 минуты сервера N ${waitingCounter}`
//       waitingCounter ++
//     }
//   )

//     },3000)

//     setTimeout(() => { 

//       window.location.href = '/notExistingPage/html'

   
//       clearInterval(interval)
//     },15000)
// }
// }
// )
// console.log(' pingCounter===> ', pingCounter)
// setTimeout(() => {
//   if(pingCounter <=3){
//     ping()
//   }
  
// },3000)
// }

// ping()
