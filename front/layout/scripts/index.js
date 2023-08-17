const user = document.getElementById('acc')
const login = document.getElementById('login')

const token = localStorage.getItem('token')
  if(token){
    try {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));

        user.removeAttribute('href')
        login.innerHTML = `${decodedPayload.name}`
      } catch (error) {
        console.error('Erro ao decodificar o token:', error.message);
      } 
  } 
    