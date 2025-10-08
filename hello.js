module.exports = (req, res) => {
  // Define o cabeçalho de resposta como JSON
  res.setHeader('Content-Type', 'application/json');

  // Lida com diferentes métodos HTTP
  if (req.method === 'GET') {
    res.status(200).json({
      message: 'Bem-vindo à API no Vercel!',
      status: 'success'
    });
  } else if (req.method === 'POST') {
    // Recebe o corpo da requisição
    const { name } = req.body || {};
    if (!name) {
      return res.status(400).json({
        message: 'Por favor, envie um nome no corpo da requisição',
        status: 'error'
      });
    }
    res.status(200).json({
      message: `Olá, ${name}! Sua requisição POST foi recebida.`,
      status: 'success'
    });
  } else {
    // Método não permitido
    res.status(405).json({
      message: 'Método não permitido. Use GET ou POST.',
      status: 'error'
    });
  }
};