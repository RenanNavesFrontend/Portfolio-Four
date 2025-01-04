// Variáveis para os elementos de entrada e exibição
const billInput = document.getElementById('bill');
const customTipInput = document.getElementById('custom-tip');
const peopleInput = document.getElementById('people');
const tipAmountDisplay = document.getElementById('tip-amount');
const totalAmountDisplay = document.getElementById('total-amount');
const resetButton = document.querySelector('button[type="reset"]');

// Variável para armazenar a porcentagem de gorjeta selecionada
let selectedTipPercentage = 0;

// Função para definir a porcentagem de gorjeta a partir dos botões
function setTip(tipPercentage) {
    selectedTipPercentage = tipPercentage;
    customTipInput.value = ''; // Limpa o campo de gorjeta personalizada
    calculateAmounts(); // Recalcula os valores
}

// Função para calcular o valor da gorjeta e o total por pessoa
function calculateAmounts() {
    const billValue = parseFloat(billInput.value) || 0; // Valor da conta
    const peopleCount = parseInt(peopleInput.value) || 1; // Número de pessoas (mínimo 1)
    
    // Define a porcentagem de gorjeta com base no valor de entrada ou no botão selecionado
    const tipPercentage = customTipInput.value
        ? parseFloat(customTipInput.value)
        : selectedTipPercentage;

    if (tipPercentage > 0 && peopleCount > 0) {
        const tipAmount = (billValue * (tipPercentage / 100)) / peopleCount;
        const totalAmount = (billValue / peopleCount) + tipAmount;
        
        // Exibe os valores calculados com duas casas decimais
        tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
        totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
    } else {
        // Define valores como $0.00 caso os dados sejam insuficientes
        tipAmountDisplay.textContent = '$0.00';
        totalAmountDisplay.textContent = '$0.00';
    }
}

// Função para redefinir todos os campos e valores exibidos
function resetCalculator() {
    billInput.value = '';
    customTipInput.value = '';
    peopleInput.value = '';
    selectedTipPercentage = 0;
    tipAmountDisplay.textContent = '$0.00';
    totalAmountDisplay.textContent = '$0.00';
}

// Eventos para ativar o cálculo quando os valores são alterados
billInput.addEventListener('input', calculateAmounts);
customTipInput.addEventListener('input', () => {
    selectedTipPercentage = 0; // Limpa o valor da gorjeta do botão quando um valor personalizado é inserido
    calculateAmounts();
});
peopleInput.addEventListener('input', calculateAmounts);

// Evento para o botão de reset
resetButton.addEventListener('click', resetCalculator);

// Define o placeholder original usando data-attribute
billInput.dataset.placeholder = "0";
customTipInput.dataset.placeholder = "Custom tip (%)";
peopleInput.dataset.placeholder = "0";
