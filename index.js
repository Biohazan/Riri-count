
let mailInput = document.getElementById('mail')
let passwordInput = document.getElementById('password')
let button = document.getElementById('enter')
let inputContainer = document.getElementsByClassName('input')

button.addEventListener('click', e =>{
    e.preventDefault()
    let user = {
        "email": mailInput.value,
        "password": passwordInput.value
    }
    fetch(`https://localhost:3000/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
          },
        body: JSON.stringify(user)
        })
        .then(valid => {
            
            if(valid.ok) {
                return valid.json()
            }
            else {  
                if ( inputContainer[0].querySelector(('p')) ){
                    inputContainer[0].lastElementChild.remove()
                } else {
                    let showError = document.createElement('p')
                    showError.textContent = "Erreur d'authentification"
                    showError.style.color = 'red'
                    inputContainer[0].appendChild(showError)}
                }
                 
        })
        .then(user =>{
            console.log(user)
            sessionStorage.setItem('TOKEN', user.token)
            location.replace(`./compteur.html?comptid=${user.comptId}`)
        })
        .catch(e => { console.log(e) })
})