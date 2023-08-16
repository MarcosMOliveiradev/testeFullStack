const fs = require('fs');
const readline = require('readline');
const mercadopago = require('mercadopago');
const QRCode = require('qrcode');
const { exec } = require('child_process');

// Configuração das credenciais do Mercado Pago
const publicKey = "APP_USR-f45a41dd-f689-4144-afcb-c9076ab1917e";
const clientId = "6439238174866135";
const clientSecret = "NoNNJAP9v0VmrrBMI36PdPlehe6W3en1";

// Inicialização do SDK do Mercado Pago
mercadopago.configure({
  access_token: publicKey,
  integrator_id: 'dev_24c65fb163bf11ea96500242ac130004'
});

// Cria uma interface para ler a entrada do usuário no terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function criarPreferencia(valor, descricao) {
  const preferenceData = {
    items: [
      {
        title: descricao,
        quantity: 1,
        currency_id: "BRL",
        unit_price: valor
      }
    ]
  };

  return mercadopago.preferences.create(preferenceData);
}

function realizarPagamento(modoPagamento) {
  rl.question("Digite o valor do pagamento: ", function (valor) {
    valor = parseFloat(valor);
    rl.question("Digite a descrição do pagamento: ", function (descricao) {
      criarPreferencia(valor, descricao)
        .then(response => {
          const preferenceId = response.body.id;

          let paymentData;
          if (modoPagamento === "debito") {
            paymentData = {
              transaction_amount: valor,
              payment_method_id: "visa",
              payer: {
                email: "test_user_XXXXX@testuser.com"
              }
            };
          } else if (modoPagamento === "credito") {
            paymentData = {
              transaction_amount: valor,
              payment_method_id: "master",
              payer: {
                email: "test_user_XXXXX@testuser.com"
              }
            };
          }

          return mercadopago.payment.create(preferenceId, paymentData);
        })
        .then(response => {
          console.log("Modo de Pagamento:", modoPagamento);
          console.log("Status do pagamento:", response.body.status);
          rl.close();
        })
        .catch(error => {
          console.error("Erro ao realizar o pagamento:", error);
          rl.close();
        });
    });
  });
}

function gerarQRCodePIX(chavePIX) {
  rl.question("Digite o valor do pagamento PIX: ", function (valor) {
    valor = parseFloat(valor);
    const qrCodeData = `00020101021126560014BR.GOV.BCB.PIX0114${chavePIX}52040000530398654060.005802BR5913Nome do Beneficiario6009SAO PAULO62290510Unidade Federativa6304${valor.toFixed(2)}64530201.1907`;

    QRCode.toFile('qrcode.png', qrCodeData, { type: 'png' }, function (err) {
      if (err) {
        console.error("Erro ao gerar o QR code:", err);
        rl.close();
        return;
      }

      exec('start qrcode.png', (error, stdout, stderr) => {
        if (error) {
          console.error("Erro ao abrir a imagem:", error);
        }
      });

      console.log("QR code gerado com sucesso!");
      rl.close();
    });
  });
}

console.log("Sistema de Pagamento_teste");
console.log("Escolha uma opção:");
console.log("1 - Pagar com Cartão Débito");
console.log("2 - Pagar com Cartão Crédito");
console.log("3 - Gerar QR Code PIX");

rl.question("Digite o número da opção desejada: ", function (opcao) {
  if (opcao === "1") {
    realizarPagamento("debito");
  } else if (opcao === "2") {
    realizarPagamento("credito");
  } else if (opcao === "3") {
    gerarQRCodePIX("a62578eb-4d7e-4b0c-888f-90eb731dbada");
  } else {
    console.error("Opção inválida.");
    rl.close();
  }
});

// Função para obter os parâmetros da URL ...

document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
    document.querySelector('.loading-container').style.display = 'none';
    document.querySelector('.container').classList.remove('hidden');
  }, 1500);

  var valorTotal = 0;

  function updateValorTotal() {
    valorTotal = 0;
    var items = document.querySelectorAll("tbody tr");
    for (var i = 0; i < items.length; i++) {
      var valor = parseFloat(items[i].querySelector(".valor").textContent);
      var quantidade = parseInt(items[i].querySelector(".quantidade").value);
      valorTotal += valor * quantidade;
    }
    document.getElementById("valorTotal").textContent = valorTotal.toFixed(2);
    updateParcelas();
  }

  function updateParcelas() {
    var parcelas = parseInt(document.getElementById("parcelas").value);
    var juros = 1;
    if (parcelas === 2) {
      juros = 1.0893; // 8.93% de juros
    } else if (parcelas === 3) {
      juros = 1.1024; // 10.24% de juros
    }
    var valorParcela = valorTotal * juros / parcelas;
    document.querySelector(".valorParcela").textContent = valorParcela.toFixed(2);
  }

  // ... Botões de ação no carrinho ...

  // Abrir a janela pop-up do PIX
  document.querySelectorAll(".btn-pagar-pix").forEach(function(button) {
    button.addEventListener("click", function() {
      abrirPopUpPIX();
    });
  });

  function abrirPopUpPIX() {
    var popup = window.open("", "Pagamento PIX", "width=400,height=400");
    popup.document.write(`
      <h3>Informações do Pagamento PIX</h3>
      Nome: <input type="text" id="nome"><br>
      Endereço: <input type="text" id="endereco"><br>
      Número: <input type="text" id="numero"><br>
      CEP: <input type="text" id="cep"><br>
      <button type="button" id="proximo">Seguinte</button>
      <div id="qrcodeContainer" style="display:none;">
        <h3>QR Code PIX</h3>
        <img id="qrcode" src="" alt="QR Code PIX">
        <p id="mensagemPagamento" style="color:green;display:none;">Pagamento efetuado com sucesso</p>
      </div>
    `);

    popup.document.getElementById("proximo").addEventListener("click", function() {
      var nome = popup.document.getElementById("nome").value;
      var endereco = popup.document.getElementById("endereco").value;
      var numero = popup.document.getElementById("numero").value;
      var cep = popup.document.getElementById("cep").value;

      gerarQRCodePIX("a62578eb-4d7e-4b0c-888f-90eb731dbada", valorTotal, nome, endereco, numero, cep, popup);
    });
  }

  function gerarQRCodePIX(chavePIX, valor, nome, endereco, numero, cep, popup) {
    const qrCodeData = `00020101021126560014BR.GOV.BCB.PIX0114${chavePIX}52040000530398654060.005802BR5913${nome}6009${endereco}6229${numero}6304${cep}6304${valor.toFixed(2)}64530201.1907`;

    QRCode.toDataURL(qrCodeData, { type: 'image/png' }, function (err, url) {
      if (err) {
        console.error("Erro ao gerar o QR code:", err);
        popup.close();
        return;
      }

      popup.document.getElementById("qrcodeContainer").style.display = "block";
      popup.document.getElementById("qrcode").src = url;
      popup.document.getElementById("mensagemPagamento").style.display = "block";
    });
  }
});