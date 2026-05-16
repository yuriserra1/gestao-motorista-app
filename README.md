# 📊 Driver Profit Calc

Uma aplicação web projetada para auxiliar motoristas de aplicativos a realizarem o controle financeiro de seus turnos de trabalho, calculando a rentabilidade real com foco no faturamento bruto por quilômetro e na saúde financeira do veículo.

---

## 💡 O Problema que o Projeto Resolve

Muitos motoristas de aplicativo cometem o erro crítico de calcular seu lucro diário considerando apenas o faturamento da plataforma e o gasto imediato com o combustível no posto de gasolina. 

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
