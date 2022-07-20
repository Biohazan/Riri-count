const numberOfRiri = document.getElementById('number')
const plusButton = document.getElementById('plus')
const minusButton = document.getElementById('minus')
const logOut = document.getElementById('logOut')

let token = sessionStorage.getItem('TOKEN')

let currentUrl = window.location.href
let url = new URL(currentUrl);
let comptId = url.searchParams.get("comptid");

fetch(`https://localhost:3000/api/compt/${comptId}`)
 .then(reponse => {
    if (reponse.ok){
      return reponse.json()
    } 
    else console.log(reponse)
 })
 .then(compt => {
    let comptHtml = document.getElementById('number')
    let ririLeft = (25 - compt.nombreBu)
    comptHtml.textContent = `${compt.nombreBu} Ricard bu sur les ${ririLeft} restants`
 })

plusButton.addEventListener('click', () =>{
    let plusNumber = {numberToSend: "1"}
    console.log(token)
    fetch(`https://localhost:3000/api/compt/${comptId}`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
         body: JSON.stringify(plusNumber)
     })
     .then(e => {
      console.log(e)
        location.reload()
     })
})

minusButton.addEventListener('click', () =>{
    let minusNumber = {numberToSend: "-1"}
    fetch(`https://localhost:3000/api/compt/${comptId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        body: JSON.stringify(minusNumber)
     })
     .then(e => {
        location.reload()
     })
})
logOut.addEventListener('click', () => {
   sessionStorage.setItem('TOKEN', '')
})
