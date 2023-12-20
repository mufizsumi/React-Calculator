import React from 'react';
import './App.css';

function Calculator() {
  const [display, setDisplay] = React.useState({
    current: '0',
    total: '0',
    isInitial: true,
    preOp: '',
  });

  function handleNumber(value) {
    let newValue = value;

    if (!display.isInitial) {
      newValue = display.current + value;
    }

    setDisplay({
      current: newValue,
      total: display.total,
      isInitial: false,
      preOp: display.preOp,
    });
  }

  function handleOperator(value) {
    const total = doCalculation();
    setDisplay({
      current: total.toString(),
      total: total.toString(),
      isInitial: true,
      preOp: value,
    });
  }

  function handleClear() {
    setDisplay({
      current: '0',
      total: '0',
      isInitial: true,
      preOp: '',
    });
  }

  function doCalculation() {
    let total = parseInt(display.total);

    switch (display.preOp) {
      case '+':
        total += parseInt(display.current);
        break;
      case '-':
        total -= parseInt(display.current);
        break;
      case '*':
        total *= parseInt(display.current);
        break;
      case '/':
        total /= parseInt(display.current);
        break;
      default:
        total = parseInt(display.current);
    }

    return total;
  }

  function renderDisplay() {
    return display.current;
  }

  return (
    <div className='calculator'>
      <div className='display'>{renderDisplay()}</div>
      <CalcButton value='7' onClick={handleNumber} />
      <CalcButton value='8' onClick={handleNumber} />
      <CalcButton value='9' onClick={handleNumber} />
      <CalcButton value='/' className='operator' onClick={() => handleOperator('/')} />

      <CalcButton value='4' onClick={handleNumber} />
      <CalcButton value='5' onClick={handleNumber} />
      <CalcButton value='6' onClick={handleNumber} />
      <CalcButton value='x' className='operator' onClick={() => handleOperator('*')} />

      <CalcButton value='1' onClick={handleNumber} />
      <CalcButton value='2' onClick={handleNumber} />
      <CalcButton value='3' onClick={handleNumber} />
      <CalcButton value='-' className='operator' onClick={() => handleOperator('-')} />

      {/* Add onClick for the "c" button */}
      <CalcButton value='c' onClick={handleClear} />

      <CalcButton value='0' onClick={handleNumber} />
      <CalcButton value='=' onClick={() => handleOperator('=')} />
      <CalcButton value='+' className='operator' onClick={() => handleOperator('+')} />
    </div>
  );
}

function CalcButton(props) {
  const handleClick = typeof props.onClick === 'function' ? () => props.onClick(props.value) : undefined;

  return (
    <button className={props.className} onClick={handleClick}>
      {props.value}
    </button>
  );
}

export default Calculator;
