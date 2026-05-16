# 📊 Driver Profit Calc

Uma aplicação web (Front-End Puro) de alta performance projetada para auxiliar motoristas de aplicativos a realizarem o controle financeiro de seus turnos de trabalho, calculando a rentabilidade real com foco no faturamento bruto por quilômetro e na saúde financeira do veículo.

---

## 💡 O Problema que o Projeto Resolve

Muitos motoristas de aplicativo cometem o erro crítico de calcular seu lucro diário considerando apenas o faturamento da plataforma e o gasto imediato com o combustível no posto de gasolina. Essa abordagem gera uma falsa percepção de ganho, pois ignora os **custos invisíveis** do veículo.

Este projeto resolve esse problema implementando:
1. **Métricas de Performance Reais:** Destaca o faturamento bruto por KM rodado, permitindo que o condutor avalie a eficiência estratégica do seu dia de trabalho.
2. **Taxa de Depreciação e Manutenção Preventiva:** O motor matemático do JavaScript adiciona automaticamente um custo fixo estimado de **R$ 0,22 por quilômetro rodado**. Esse valor simula o desgaste natural do veículo, provisionando recursos necessários para futuras trocas de óleo, filtros, pastilhas de freio, desgaste de pneus, embreagem e a desvalorização de mercado do carro (FIPE).

---

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web nativas para garantir máxima velocidade de carregamento, sem a necessidade de dependências ou frameworks externos:

* **HTML5:** Estruturação semântica da interface do usuário.
* **CSS3 (Modern Dark Theme):** Layout responsivo construído com variáveis globais CSS (`:root`), efeitos de transição suaves e uma identidade visual moderna baseada em paletas de cores utilizadas em dashboards de alta tecnologia.
* **JavaScript (ES6+):** Programação assíncrona, manipulação de DOM e lógica matemática interna.
* **Web Storage API (LocalStorage):** Persistência local dos dados do usuário diretamente no navegador, eliminando a perda de informações ao atualizar ou fechar a página.

---

## 🧠 Arquitetura de Software e Regras de Negócio

### 1. Motor de Ordenação Cronológica Decrescente
Para garantir uma visualização intuitiva e organizada no histórico de corridas, o JavaScript executa o método de ordenação `.sort()` manipulando objetos de tempo através do construtor `new Date()`. Isso garante que a tabela exiba sempre os **turnos mais recentes no topo**, independentemente da ordem em que foram inseridos no formulário.

```javascript
dadosUber.sort((a, b) => new Date(b.data) - new Date(a.data));
