const registerButton = document.getElementById('registerButton')

registerButton.addEventListener('click', async () => {
    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const confirmPassword = document.getElementById('confirm-password').value

    console.log(name, email, password, confirmPassword)

})