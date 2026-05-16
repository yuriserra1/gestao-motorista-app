const form = document.getElementById('uber-form');
const tableBody = document.getElementById('uber-table-body');
const totalFaturamentoEl = document.getElementById('total-faturamento');
const totalCustosEl = document.getElementById('total-custos');
const lucroLiquidoEl = document.getElementById('lucro-liquido');
const brutoPorKmEl = document.getElementById('bruto-por-km');

// Taxa estimada de custo por KM (Depreciação + Manutenção futura)
const DEPRECIACAO_POR_KM = 0.22;

// Carrega os dados salvos do LocalStorage
let dadosUber = JSON.parse(localStorage.getItem('uber_front_data')) || [];

function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatarDataBR(dataISO) {
    if(!dataISO) return "";
    const partes = dataISO.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function atualizarDashboard() {
    // 1. ORDENAÇÃO: Organiza o array por data (mais recente primeiro)
    dadosUber.sort((a, b) => new Date(b.data) - new Date(a.data));

    tableBody.innerHTML = '';
    
    let faturamentoAcumulado = 0;
    let custosAcumulados = 0;
    let totalKmRodados = 0;

    dadosUber.forEach((dia) => {
        // Cálculos matemáticos por turno
        const litrosConsumidos = dia.kmRodado / dia.mediaKm;
        const custoCombustivel = litrosConsumidos * dia.valorGasolina;
        const custoTotalDia = custoCombustivel;
        const lucroLiquidoDia = dia.faturamento - custoTotalDia;
        const brutoPorKmDia = dia.faturamento / dia.kmRodado;

        // Somatórias para os Cards globais
        faturamentoAcumulado += dia.faturamento;
        custosAcumulados += custoTotalDia;
        totalKmRodados += dia.kmRodado;

        // Monta a linha da tabela com o ID único gerado no cadastro
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${formatarDataBR(dia.data)}</td>
            <td>${formatarMoeda(dia.faturamento)}</td>
            <td>${dia.kmRodado} KM</td>
            <td>${formatarMoeda(custoCombustivel)}</td>
            <td style="color: ${lucroLiquidoDia >= 0 ? '#34d399' : '#f87171'}">${formatarMoeda(lucroLiquidoDia)}</td>
            <td style="font-weight: bold; color: #f59e0b;">${formatarMoeda(brutoPorKmDia)}/KM</td>
            <td><button class="btn-delete" onclick="deletarRegistro(${dia.id})">Remover</button></td>
        `;
        tableBody.appendChild(tr);
    });

    // Cálculos dos cards de resumo superiores
    const lucroLiquidoGeral = faturamentoAcumulado - custosAcumulados;
    const brutoPorKmGeral = totalKmRodados > 0 ? (faturamentoAcumulado / totalKmRodados) : 0;

    // Renderiza nos cards do HTML
    totalFaturamentoEl.textContent = formatarMoeda(faturamentoAcumulado);
    totalCustosEl.textContent = formatarMoeda(custosAcumulados);
    lucroLiquidoEl.textContent = formatarMoeda(lucroLiquidoGeral);
    brutoPorKmEl.textContent = `${formatarMoeda(brutoPorKmGeral)}/KM`;

    // Estilização dinâmica de cores
    lucroLiquidoEl.style.color = lucroLiquidoGeral < 0 ? '#f87171' : '#34d399';

    // Salva a lista atualizada e ordenada no navegador
    localStorage.setItem('uber_front_data', JSON.stringify(dadosUber));
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Captura e converte os valores digitados
    const faturamento = parseFloat(document.getElementById('faturamento').value);
    const kmRodado = parseFloat(document.getElementById('km-rodado').value);
    const valorGasolina = parseFloat(document.getElementById('valor-gasolina').value);
    const mediaKm = parseFloat(document.getElementById('media-km').value);

    // VALIDAÇÃO DE SEGURANÇA: Bloqueia o código se qualquer valor for igual ou menor que zero
    if (faturamento <= 0 || kmRodado <= 0 || valorGasolina <= 0 || mediaKm <= 0) {
        alert("🚨 Erro: Não é permitido cadastrar valores iguais a zero ou negativos!");
        return; // Interrompe a função aqui e NÃO salva nada no banco/localStorage
    }

    // Se passou na validação acima, o código continua normalmente
    const novoDia = {
        id: Date.now(), 
        data: document.getElementById('data-turno').value,
        faturamento: faturamento,
        kmRodado: kmRodado,
        valorGasolina: valorGasolina,
        mediaKm: mediaKm
    };

    dadosUber.push(novoDia);
    atualizarDashboard();
    form.reset();
});

// Função para deletar um registro buscando pelo ID único
window.deletarRegistro = function(id) {
    dadosUber = dadosUber.filter(dia => dia.id !== id);
    atualizarDashboard();
}

// Inicializa o sistema ao carregar a página
atualizarDashboard();