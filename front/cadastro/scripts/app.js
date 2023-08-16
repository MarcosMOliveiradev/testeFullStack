function start2FA() {
  var loader = document.getElementById("loader");
  var checkmark = document.getElementById("checkmark");
  var button = document.querySelector(".btn-2fa");

  // Desabilitar o botão durante o carregamento
  button.disabled = true;

  // Ocultar o texto do botão e mostrar a bolinha de progresso
  button.querySelector(".text").style.display = "none";
  loader.style.display = "inline-block";

  // Simulando um tempo de carregamento
  setTimeout(function() {
      // Ocultar a bolinha de progresso e mostrar o ícone de check
      loader.style.display = "none";
      checkmark.style.display = "inline-block";

      // Restaurar o botão com o texto original após um breve atraso
      setTimeout(function() {
          button.disabled = false;
          button.querySelector(".text").style.display = "inline-block";
          checkmark.style.display = "none";
      }, 1500); // Tempo para restaurar o botão (1,5 segundos neste exemplo)
  }, 2000); // Tempo de carregamento (2 segundos neste exemplo)
}

document.addEventListener('DOMContentLoaded', function() {
  // Chama a função para iniciar a autenticação em duas etapas quando a página for carregada
  var startButton = document.querySelector(".start-2fa");
  startButton.addEventListener("click", start2FA);
});
