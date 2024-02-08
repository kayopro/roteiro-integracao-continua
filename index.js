// "Commit 3 - Mais Extract Functions"

function gerarFaturaStr(fatura, pecas) {
  // função extraída
  function calcularCredito(apre) {
    let creditos = 0;
    creditos += Math.max(apre.audiencia - 30, 0);
    if (getPeca(apre).tipo === "comedia")
      creditos += Math.floor(apre.audiencia / 5);
    return creditos;
  }

  // função extraída
  function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(valor / 100);
  }

  let result = "";
  let volumeCreditos = 0;

  for (let apre of fatura) {
    let total = calcularTotalApresentacao(apre);
    let creditos = calcularCredito(apre);
    let peca = getPeca(apre.pecaID, pecas);
    result += `${peca.nome}: R$ ${formatarMoeda(total)} (${
      apre.audiencia
    } assentos)\n`;
    volumeCreditos += creditos;
  }
  result += `Valor total: R$ ${formatarMoeda(total)}\n`;
  result += `Créditos acumulados: ${volumeCreditos} \n`;
  return result;
}
