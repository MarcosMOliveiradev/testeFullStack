document
  .getElementById('stripe-login')
  .addEventListener('submit', function (event) {
    event.preventDefault() // Impede o envio padrão do formulário

    const form = event.target
    const formData = new FormData(form)

    // Envia os dados do formulário para o servidor usando a Fetch API
    fetch('/api/register', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          // Exibir mensagem de sucesso
          const successMessage = document.createElement('p')
          successMessage.textContent = 'Cadastro realizado com sucesso!'
          form.appendChild(successMessage)

          // Habilitar o botão de acesso à página principal
          const accessButton = document.createElement('button')
          accessButton.textContent = 'Acessar página principal'
          accessButton.addEventListener('click', function () {
            window.location.href = '/layout/index.html' // Redirecionar para a página principal (layout)
          })
          form.appendChild(accessButton)
        } else if (data.error) {
          // Exibir mensagem de erro (se houver)
          const errorMessage = document.createElement('p')
          errorMessage.textContent = `Erro: ${data.error}`
          form.appendChild(errorMessage)
        }
      })
      .catch((error) => {
        // Exibir mensagem de erro (se houver)
        const errorMessage = document.createElement('p')
        errorMessage.textContent = `Erro: ${error.message}`
        form.appendChild(errorMessage)
      })
  })
