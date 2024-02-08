//"Commit 4 - Separando Apresentação dos Cálculos"

function gerarFaturaStr(fatura, pecas) {
  // função aninhada
  function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(valor / 100);
  }

  // corpo principal
  let faturaStr = `Fatura ${fatura.cliente}\n`;
  for (let apre of fatura.apresentacoes) {
    faturaStr += `  ${getPeca(apre).nome}: ${formatarMoeda(
      calcularTotalApresentacao(apre)
    )} (${apre.audiencia} assentos)\n`;
  }
  faturaStr += `Valor total: ${formatarMoeda(calcularTotalFatura())}\n`;
  faturaStr += `Créditos acumulados: ${calcularTotalCreditos()} \n`;
  return faturaStr;

  // função aninhada
  function calcularTotalFatura() {
    let total = 0;
    for (let apre of fatura.apresentacoes) {
      total += calcularTotalApresentacao(apre);
    }
    return total;
  }

  // função aninhada
  function calcularTotalCreditos() {
    let creditos = 0;
    for (let apre of fatura.apresentacoes) {
      creditos += calcularCredito(apre);
    }
    return creditos;
  }
}
