// Get DOM elements
const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

// Add event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

// Add keyboard support
document.addEventListener('keydown', handleKeyPress);

function handleButtonClick(event) {
    const value = event.target.textContent;
    
    switch(value) {
        case 'C':
            clearDisplay();
            break;
        case '⌫':
            deleteLastChar();
            break;
        case '=':
            calculate();
            break;
        default:
            appendToDisplay(value);
    }
}

function handleKeyPress(event) {
    const key = event.key;
    
    // Handle numbers and operators
    if (/[\d\+\-\*\/\.\(\)]/.test(key)) {
        appendToDisplay(key);
    }
    // Handle Enter key as equals
    else if (key === 'Enter') {
        calculate();
    }
    // Handle Backspace
    else if (key === 'Backspace') {
        deleteLastChar();
    }
    // Handle Escape key as clear
    else if (key === 'Escape') {
        clearDisplay();
    }
}

function appendToDisplay(value) {
    if (display.value === 'Error') {
        display.value = '';
    }
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLastChar() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // Safely evaluate the expression
        const result = Function('"use strict";return (' + display.value + ')')();
        display.value = Number.isInteger(result) ? result : result.toFixed(2);
    } catch(error) {
        display.value = 'Error';
    }
} 