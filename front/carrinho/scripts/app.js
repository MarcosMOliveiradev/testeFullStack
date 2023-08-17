document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    document.querySelector('.loading-container').style.display = 'none'
    document.querySelector('.container').classList.remove('hidden')
  }, 1500)

  let valorTotal = 0

  function updateValorTotal() {
    valorTotal = 0
    const items = document.querySelectorAll('tbody tr')
    for (let i = 0; i < items.length; i++) {
      const valor = parseFloat(items[i].querySelector('.valor').textContent)
      const quantidade = parseInt(items[i].querySelector('.quantidade').value)
      valorTotal += valor * quantidade
    }
    document.getElementById('valorTotal').textContent = valorTotal.toFixed(2)
    updateParcelas()
  }

  function updateParcelas() {
    const parcelas = parseInt(document.getElementById('parcelas').value)
    let juros = 1
    if (parcelas === 2) {
      juros = 1.0893 // 8.93% de juros
    } else if (parcelas === 3) {
      juros = 1.1024 // 10.24% de juros
    }
    const valorParcela = (valorTotal * juros) / parcelas
    document.querySelector('.valorParcela').textContent =
      valorParcela.toFixed(2)
  }

  document.querySelectorAll('button.btn-danger').forEach(function (button) {
    button.addEventListener('click', function () {
      const tr = this.closest('tr')
      tr.remove()
      updateValorTotal()
    })
  })

  document.querySelectorAll('.btn-options').forEach(function (button) {
    button.addEventListener('click', function () {
      const optionsContainer =
        this.closest('tr').querySelector('.options-container')
      optionsContainer.classList.toggle('hidden')
    })
  })

  document
    .querySelectorAll('.quantidade, .tamanho, .cor')
    .forEach(function (input) {
      input.addEventListener('change', function () {
        updateValorTotal()
      })
    })

  document.getElementById('parcelas').addEventListener('change', function () {
    updateParcelas()
  })

  // Função para obter os parâmetros da URL
  function getURLParameters() {
    const searchParams = new URLSearchParams(window.location.search)
    const params = {}
    for (const param of searchParams.entries()) {
      params[param[0]] = param[1]
    }
    return params
  }

  // Obter os parâmetros da URL
  const urlParams = getURLParameters()
  if (urlParams.produto && urlParams.valor) {
    const productName = decodeURIComponent(urlParams.produto)
    const productValue = parseFloat(decodeURIComponent(urlParams.valor))

    // Adicionar o produto ao carrinho (atualize de acordo com a estrutura do seu carrinho)
    const cartItem = document.createElement('tr')
    cartItem.innerHTML = `
        <td>${productName}</td>
        <td class="valor">${productValue.toFixed(2)}</td>
        <td><input class="quantidade" type="number" value="1"></td>
        <td class="options"><button class="btn btn-options">Opções</button></td>
        <td class="options-container hidden">
          <!-- Aqui você pode adicionar opções adicionais, como tamanho, cor, etc. -->
        </td>
        <td><button class="btn btn-danger">Remover</button></td>
      `

    const cartTable = document.querySelector('tbody')
    cartTable.appendChild(cartItem)

    // Atualizar o valor total do carrinho
    updateValorTotal()
  }
})
