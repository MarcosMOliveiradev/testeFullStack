document.addEventListener('DOMContentLoaded', function () {
  // Slider
  const slides = document.querySelector('.slides')
  const slideItems = document.querySelectorAll('.slide')
  const slideWidth = slideItems[0].clientWidth

  let currentIndex = 0

  function goToSlide(index) {
    slides.style.transform = `translateX(-${index * slideWidth}px)`
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideItems.length
    goToSlide(currentIndex)
  }

  setInterval(nextSlide, 3000) // Troca de slide a cada 3 segundos

  // Encontre os botões do menu
  const bagButton = document.getElementById('bag')
  const cartButton = document.getElementById('cart-toggle')
  const accButton = document.getElementById('acc')

  // Encontre o elemento do contador de carrinho
  const cartCounter = document.getElementById('cart-counter')

  // Encontre o mini menu de carrinho
  const cartMenu = document.getElementById('cart-menu')

  // Inicialize o contador de produtos no carrinho
  let produtosNoCarrinho = 0

  // Crie um array para armazenar os produtos do carrinho
  const carrinhoProdutos = []

  // Adicione um manipulador de evento ao botão do carrinho
  cartButton.addEventListener('click', function () {
    // Mostrar/ocultar o mini menu de carrinho
    cartMenu.classList.toggle('active')
  })

  // Encontre os botões "Carrinho" nos produtos
  const productCartButtons = document.querySelectorAll('.product-button')

  // Adicione um manipulador de evento a cada botão "Carrinho" nos produtos
  productCartButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      // Aumente o contador de produtos no carrinho
      produtosNoCarrinho++
      cartCounter.textContent = produtosNoCarrinho

      // Obtenha informações do produto selecionado (nome, valor)
      const productName = button.getAttribute('date-product-name')
      const productValue = parseFloat(button.getAttribute('date-product-value'))

      // Adicione o produto ao array do carrinho
      carrinhoProdutos.push({
        name: productName,
        value: productValue,
      })
    })
  })

  // Encontre o ícone do carrinho
  const cartIcon = document.getElementById('cart-toggle')

  // Adicione um manipulador de evento ao ícone do carrinho para redirecionar para a página de carrinho
  cartIcon.addEventListener('click', function () {
    // Construir a query string com base nas informações do carrinho
    const queryString = carrinhoProdutos
      .map(function (product, index) {
        return `produto${index + 1}=${encodeURIComponent(product.name)}&valor${
          index + 1
        }=${encodeURIComponent(product.value)}`
      })
      .join('&')

    // Redirecionar para a página do carrinho com a query string
    window.location.href = `carrinho/index.html?${queryString}`
  })
  lk
  // Carousel
  let slideIndex = 1

  function showSlides(n) {
    let i
    const slides = document.getElementsByClassName('mySlides')
    const dots = document.getElementsByClassName('dot')
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
      slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none'
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '')
    }
    slides[slideIndex - 1].style.display = 'block'
    dots[slideIndex - 1].className += ' active'
  }

  function carousel() {
    let i
    const x = document.getElementsByClassName('mySlides')
    for (i = 0; i < x.length; i++) {
      x[i].style.display = 'none'
    }
    slideIndex++
    if (slideIndex > x.length) {
      slideIndex = 1
    }
    x[slideIndex - 1].style.display = 'block'
    setTimeout(carousel, 1500) // Change image every 1.5 seconds
  }

  showSlides(slideIndex)
  carousel()
})
