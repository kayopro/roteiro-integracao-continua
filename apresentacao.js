var util = require("./util.js");

module.exports = function gerarFaturaStr(faturas, calc) {
  let faturaStr = `Fatura ${faturas.cliente}\n`;
  for (let apre of faturas.apresentacoes) {
    const peca = calc.repo.getPeca(apre);
    faturaStr += `  ${peca.nome}: ${util.formatarMoeda(
      calc.calcularTotalApresentacao(apre)
    )} (${apre.audiencia} assentos)\n`;
  }
  faturaStr += `Valor total: ${util.formatarMoeda(
    calc.calcularTotalFatura(faturas.apresentacoes)
  )}\n`;
  faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(
    faturas.apresentacoes
  )} \n`;
  return faturaStr;
};
