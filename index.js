//"Commit 8 - Classe Repositorio"

const { readFileSync } = require("fs");

class Repositorio {
  constructor() {
    this.pecas = JSON.parse(readFileSync("./pecas.json"));
  }

  getPeca(apre) {
    return this.pecas[apre.pecaID];
  }
}

class ServicoCalculoFatura {
  constructor(repo) {
    this.repo = repo;
  }

  calcularCredito(apre) {
    let creditos = 0;
    creditos += Math.max(apre.audiencia - 30, 0);
    if (this.repo.getPeca(apre).tipo === "comedia")
      creditos += Math.floor(apre.audiencia / 5);
    return creditos;
  }

  calcularTotalCreditos(apresentacoes) {
    let creditos = 0;
    for (let apre of apresentacoes) {
      creditos += this.calcularCredito(apre);
    }
    return creditos;
  }

  calcularTotalApresentacao(apre) {
    let total = 0;
    const peca = this.repo.getPeca(apre);
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

  calcularTotalFatura(apresentacoes) {
    let total = 0;
    for (let apre of apresentacoes) {
      total += this.calcularTotalApresentacao(apre);
    }
    return total;
  }
}

function gerarFaturaStr(faturas, calc) {
  let faturaStr = `Fatura ${faturas.cliente}\n`;
  for (let apre of faturas.apresentacoes) {
    const peca = calc.repo.getPeca(apre);
    faturaStr += `  ${peca.nome}: ${formatarMoeda(
      calc.calcularTotalApresentacao(apre)
    )} (${apre.audiencia} assentos)\n`;
  }
  faturaStr += `Valor total: ${formatarMoeda(
    calc.calcularTotalFatura(faturas.apresentacoes)
  )}\n`;
  faturaStr += `Créditos acumulados: ${calc.calcularTotalCreditos(
    faturas.apresentacoes
  )} \n`;
  return faturaStr;
}

const faturas = JSON.parse(readFileSync("./faturas.json"));
const calc = new ServicoCalculoFatura(new Repositorio());
const faturaStr = gerarFaturaStr(faturas, calc);
console.log(faturaStr);
