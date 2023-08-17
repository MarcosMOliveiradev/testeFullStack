const buttonResetPass = document.getElementById('buttonReset')

buttonResetPass.addEventListener('click', async () => {
    const password = document.getElementById('password').value
    const confirmPassword = document.getElementById('confirm-password').value

    if(password != confirmPassword) {
        return alert('as senhas precisan ser iguais!')
    }

    const email = 'marcos5@marcos.com'
    try{
        const response = await fetch(`http://localhost:3333/redefinir/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({password})
        })

        if(response.ok) {
            window.location.href = '../login/index.html'
        }
    } catch (err){
        console.error('algo deu errado')
    }
})