//"Commit 7 - Classe ServicoCalculoFatura"

class ServicoCalculoFatura {
  calcularCredito(pecas, apre) {
    let creditos = 0;
    creditos += Math.max(apre.audiencia - 30, 0);
    if (this.getPeca(pecas, apre).tipo === "comedia")
      creditos += Math.floor(apre.audiencia / 5);
    return creditos;
  }

  calcularTotalCreditos(pecas, apresentacoes) {
    let creditos = 0;
    for (let apre of apresentacoes) {
      creditos += this.calcularCredito(pecas, apre);
    }
    return creditos;
  }

  calcularTotalApresentacao(pecas, apre) {
    let total = 0;
    const peca = this.getPeca(pecas, apre);
    switch (peca.tipo) {
      case "tragedia":
        total = 40000;
        if (apre.audiencia < 30) {
          total += 1000 * (apre.audiencia - 30);
        }
        break;
      case "comedia":
        total = 30000;
        if (apre.audiencia < 20) {
          total += 10000 + 500 * (apre.audiencia - 20);
        }
        total += 300 * apre.audiencia;
        break;
      default:
        throw new Error(`Tipo de peça desconhecido: ${peca.tipo}`);
    }
    return total;
  }

  calcularTotalFatura(pecas, apresentacoes) {
    let total = 0;
    for (let apre of apresentacoes) {
      total += this.calcularTotalApresentacao(pecas, apre);
    }
    return total;
  }

  getPeca(pecas, apre) {
    return pecas[apre.id];
  }
}

const calc = new ServicoCalculoFatura();
const faturaStr = gerarFaturaStr(fatura, pecas, calc);

// Comente o corpo da função gerarFaturaHTML e a sua respectiva chamada

// const faturaHTML = gerarFaturaHTML(fatura, pecas);

// console.log(faturaHTML);
console.log(faturaStr);
