/* ==========================================================================
   PORTFÓLIO GABRIELA REIS E SOUZA - JAVASCRIPT VANILLA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. ALTERNÂNCIA DE TEMA (DARK / LIGHT MODE)
       ---------------------------------------------------------------------- */
    const botaoTema = document.getElementById('botaoTema');
    const elementoHtml = document.documentElement;

    // Recupera o tema salvo no localStorage ou mantém o padrão 'dark'
    const temaSalvo = localStorage.getItem('tema_portfolio') || 'dark';
    elementoHtml.setAttribute('data-tema', temaSalvo);

    function alternarTema() {
        const temaAtual = elementoHtml.getAttribute('data-tema');
        const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
        
        elementoHtml.setAttribute('data-tema', novoTema);
        localStorage.setItem('tema_portfolio', novoTema);
    }

    if (botaoTema) {
        botaoTema.addEventListener('click', alternarTema);
    }

    /* ----------------------------------------------------------------------
       2. MENU MOBILE (HAMBÚRGUER)
       ---------------------------------------------------------------------- */
    const botaoHamburguer = document.getElementById('botaoHamburguer');
    const menuNavegacao = document.getElementById('menuNavegacao');
    const linksMenu = document.querySelectorAll('.link-menu');

    function alternarMenuMobile() {
        menuNavegacao.classList.toggle('ativo');
        botaoHamburguer.classList.toggle('ativo');
    }

    if (botaoHamburguer) {
        botaoHamburguer.addEventListener('click', alternarMenuMobile);
    }

    // Fechar o menu ao clicar em qualquer link de navegação
    linksMenu.forEach(link => {
        link.addEventListener('click', () => {
            menuNavegacao.classList.remove('ativo');
            botaoHamburguer.classList.remove('ativo');
        });
    });

    /* ----------------------------------------------------------------------
       3. EFEITO MÁQUINA DE ESCREVER (TYPING EFFECT)
       ---------------------------------------------------------------------- */
    const elementoTextoDigitar = document.getElementById('textoEfeitoDigitar');
    const textosParaDigitar = [
        'Estudante de TI',
        'Desenvolvedora Front-end',
        'Futura Dev Full Stack'
    ];
    
    let indiceTextoAtual = 0;
    let indiceCaractere = 0;
    let estaApagando = false;
    const velocidadeDigitar = 100;
    const velocidadeApagar = 50;
    const tempoPausa = 2000;

    function executarEfeitoDigitar() {
        const textoAtual = textosParaDigitar[indiceTextoAtual];

        if (estaApagando) {
            elementoTextoDigitar.textContent = textoAtual.substring(0, indiceCaractere - 1);
            indiceCaractere--;
        } else {
            elementoTextoDigitar.textContent = textoAtual.substring(0, indiceCaractere + 1);
            indiceCaractere++;
        }

        let tempoProximoPasso = estaApagando ? velocidadeApagar : velocidadeDigitar;

        if (!estaApagando && indiceCaractere === textoAtual.length) {
            tempoProximoPasso = tempoPausa;
            estaApagando = true;
        } else if (estaApagando && indiceCaractere === 0) {
            estaApagando = false;
            indiceTextoAtual = (indiceTextoAtual + 1) % textosParaDigitar.length;
            tempoProximoPasso = 500;
        }

        setTimeout(executarEfeitoDigitar, tempoProximoPasso);
    }

    if (elementoTextoDigitar) {
        executarEfeitoDigitar();
    }

    /* ----------------------------------------------------------------------
       4. ANIMAÇÃO AO ROLAR A TELA (SCROLL REVEAL)
       ---------------------------------------------------------------------- */
    const elementosParaRevelar = document.querySelectorAll('.elemento-revelar');

    function verificarScrollRevelar() {
        const pontoGatilho = window.innerHeight * 0.85;

        elementosParaRevelar.forEach(elemento => {
            const topoElemento = elemento.getBoundingClientRect().top;
            if (topoElemento < pontoGatilho) {
                elemento.classList.add('visivel');
            }
        });
    }

    window.addEventListener('scroll', verificarScrollRevelar);
    verificarScrollRevelar(); // Executa ao carregar para revelar o topo

    /* ----------------------------------------------------------------------
       5. BOTÃO VOLTAR AO TOPO DA PÁGINA
       ---------------------------------------------------------------------- */
    const botaoTopo = document.getElementById('botaoTopo');

    function gerenciarBotaoTopo() {
        if (window.scrollY > 400) {
            botaoTopo.classList.add('visivel');
        } else {
            botaoTopo.classList.remove('visivel');
        }
    }

    if (botaoTopo) {
        window.addEventListener('scroll', gerenciarBotaoTopo);
        botaoTopo.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ----------------------------------------------------------------------
       6. GERENCIAMENTO DO MODAL DE E-MAIL
       ---------------------------------------------------------------------- */
    const modalEmail = document.getElementById('modalEmail');
    const botaoAbrirModalEmail = document.getElementById('botaoAbrirModalEmail');
    const botaoFecharModalModal = document.getElementById('botaoFecharModalModal');
    const botaoCopiarEmail = document.getElementById('botaoCopiarEmail');
    const emailParaCopiar = "gabrielareisesouza@gmail.com";

    function abrirModalEmail() {
        modalEmail.classList.add('ativo');
    }

    function fecharModalEmail() {
        modalEmail.classList.remove('ativo');
    }

    if (botaoAbrirModalEmail) {
        botaoAbrirModalEmail.addEventListener('click', abrirModalEmail);
    }

    if (botaoFecharModalModal) {
        botaoFecharModalModal.addEventListener('click', fecharModalEmail);
    }

    if (modalEmail) {
        modalEmail.addEventListener('click', (evento) => {
            if (evento.target === modalEmail) {
                fecharModalEmail();
            }
        });
    }

    // Copiar E-mail para a área de transferência
    if (botaoCopiarEmail) {
        botaoCopiarEmail.addEventListener('click', () => {
            navigator.clipboard.writeText(emailParaCopiar).then(() => {
                const textoBotaoCopiar = document.getElementById('textoBotaoCopiar');
                const iconeCopiar = document.getElementById('iconeCopiar');

                textoBotaoCopiar.textContent = "E-mail copiado com sucesso!";
                iconeCopiar.className = "bi bi-check-circle-fill";

                setTimeout(() => {
                    textoBotaoCopiar.textContent = "Copiar endereço de e-mail";
                    iconeCopiar.className = "bi bi-clipboard-check";
                }, 3000);
            }).catch(erro => {
                console.error("Erro ao copiar e-mail: ", erro);
            });
        });
    }

    /* ----------------------------------------------------------------------
       7. ANO DINÂMICO NO RODAPÉ
       ---------------------------------------------------------------------- */
    const elementoAnoAtual = document.getElementById('anoAtual');
    if (elementoAnoAtual) {
        elementoAnoAtual.textContent = new Date().getFullYear();
    }

});