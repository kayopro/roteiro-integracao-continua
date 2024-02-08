function gerarFaturaStr(fatura, pecas) {
  // função extraída
  function calcularTotalApresentacao(apre, peca) {
    let total = 0;
    switch (peca.tipo) {
      case "tragedia":
        total = 40000;
        if (apre.aud < 30) {
          total += 1000 * (apre.aud - 30);
        }
        break;
      case "comedia":
        total = 30000;
        if (apre.aud < 20) {
          total += 10000 + 500 * (apre.aud - 20);
        }
        total += 300 * apre.aud;
        break;
      default:
        throw new Error(`Tipo de peça desconhecido: ${peca.tipo}`);
    }
    return total;
  }

  for (let apre of fatura) {
    let peca = getPeca(apre.pecaID, pecas);
    let total = calcularTotalApresentacao(apre, peca);
    result += `${peca.nome}: R$ ${formatarValor(total / 100)} (${
      apre.aud
    } assentos)\n`;
    volumeCreditos += Math.max(apre.aud - 30, 0);
    if ("comedia" === peca.tipo) volumeCreditos += Math.floor(apre.aud / 5);
  }

  result += `Valor total: R$ ${formatarValor(total / 100)}\n`;
  result += `Créditos acumulados: ${volumeCreditos} \n`;
  return result;
}
