// src/Calculator.js
import React, { useState } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [confetti, setConfetti] = useState(false);

  const handleClick = (value) => {
    if (value === '=') {
      try {
        const evaluatedResult = Function('"use strict";return (' + display.replace(/×/g, '*').replace(/÷/g, '/') + ')')();
        setDisplay(String(evaluatedResult));

        if (/2\s*[\+\-\*\/]\s*6|6\s*[\+\-\*\/]\s*2/.test(display)) {
          setConfetti(true);
          setTimeout(() => setConfetti(false), 2000);
        }
      } catch (error) {
        setDisplay('Error');
      }
    } else if (value === 'AC') {
      setDisplay('');
    } else if (value === 'C') {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay(display + value);
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display || '0'}</div>
      <div className="buttons">
        {['(', ')', 'mc', 'm+', 'm-', 'mr', 'C', '÷', '7', '8', '9', '×', '4', '5', '6', '-', '1', '2', '3', '+', '0', '.', '=', '2nd', 'x²', 'x³', 'xy', 'ex', '10x', '1/x', '2√x', '3√x', 'y√x', 'ln', 'log10', 'x!', 'sin', 'cos', 'tan', 'e', 'EE', 'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand'].map((button) => (
          <button key={button} onClick={() => handleClick(button)}>
            {button}
          </button>
        ))}
      </div>
      {confetti && <ConfettiExplosion />}
    </div>
  );
};

export default Calculator;
