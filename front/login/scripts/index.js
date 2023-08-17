const loginButton = document.getElementById('loginButton')

loginButton.addEventListener('click', async () => {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  try {
    const response = await fetch('http://localhost:3333/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    if (response.ok) {
      const data = await response.json()
      const token = data.token
      localStorage.setItem('token', token)
      window.location.href = '../layout/index.html'
    } else {
      alert('Loguin ou senha invalido', response.status, response.text)
    }
  } catch (err) {
    alert('Erro ao fazer login', err)
  }
})
