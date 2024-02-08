// "Commit 6 - Fatura em HTML"

function gerarFaturaHTML(fatura, pecas) {
  let faturaHTML = `
<html>
<p> Fatura ${fatura.cliente} </p>
<ul>
`;
  for (let apre of fatura.apresentacoes) {
    const peca = getPeca(pecas, apre);
    faturaHTML += `<li> ${peca.nome}: ${formatarMoeda(
      calcularTotalApresentacao(pecas, apre)
    )} (${apre.audiencia} assentos) </li>\n`;
  }
  faturaHTML += `</ul>
<p> Valor total: ${formatarMoeda(
    calcularTotalFatura(pecas, fatura.apresentacoes)
  )} </p>
<p> Créditos acumulados: ${calcularTotalCreditos(
    pecas,
    fatura.apresentacoes
  )} </p>
</html>
`;
  return faturaHTML;
}
