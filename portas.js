function obterPortas() {
    const portas = new Array(3).fill(false);
    const indiceAleatorio = obterNumeroAleatorio();
    portas[indiceAleatorio] = true;
    return portas;
}

function obterNumeroAleatorio(valorMaximo = 3) {
    return Math.floor(Math.random() * valorMaximo);
}

function abrirPortaApresentador(portas) {
    const portasPerdedoras = portas
        .map((venceu, indice) => ({venceu, indice}))
        .filter(relacaoPorta => !relacaoPorta.venceu);
    const indiceAleatorioPortaEscolhida = obterNumeroAleatorio(2);
    return portasPerdedoras[indiceAleatorioPortaEscolhida].indice;
}

function realizarJogo(portaDeveSerTrocada) {
    const portas = obterPortas();
    const indicePortaEscolhida = obterNumeroAleatorio();
    const indicePortaAbertaPeloApresentador = abrirPortaApresentador(portas);
    if (portaDeveSerTrocada) {
        return portas.filter( (_venceu, indice) => indice !== indicePortaEscolhida && indice !== indicePortaAbertaPeloApresentador)[0] ? 1 : 0;
    }
    return portas[indicePortaEscolhida] ? 1 : 0;
}


(function () {
    const TOTAL_JOGOS = 999;
    const realizarJogoTrocandoPorta = () => realizarJogo(true);
    const realizarJogoMantendoPorta = () => realizarJogo(false);
    
    const reduzirParaSoma = (acc, curr) => acc + curr;
    const arrayComTotalJogos = [...new Array(TOTAL_JOGOS)];
    const totalVitoriasTrocandoPorta = arrayComTotalJogos.map(realizarJogoTrocandoPorta).reduce(reduzirParaSoma, 0);
    const totalVitoriasSemTrocarPorta = arrayComTotalJogos.map(realizarJogoMantendoPorta).reduce(reduzirParaSoma, 0);

    [totalVitoriasTrocandoPorta, totalVitoriasSemTrocarPorta]
        .map(total => total / TOTAL_JOGOS)
        .forEach( mediaVitorias => console.log(mediaVitorias.toFixed(3)));
})();
