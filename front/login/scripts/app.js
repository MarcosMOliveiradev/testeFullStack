const express = require('express');
const app = express();
const PORT = 8000;

// Rota para lidar com o redirecionamento do Google após o login
app.get('/google-login', (req, res) => {
  const code = req.query.code;
  // Aqui você pode processar o código de autorização retornado pelo Google
  // e realizar a autenticação do usuário no seu aplicativo, se necessário.
  // Depois disso, redirecione o usuário para a página desejada.

  // Exemplo: redirecionar o usuário para a página de perfil após o login bem-sucedido
  res.redirect('/perfil');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/`);
});
