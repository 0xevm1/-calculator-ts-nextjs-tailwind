import { useState } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const [input, setInput] = useState('0');

  let stack: string[] = [];

  function clear() {
    //clear stack too
    stack = [];

    setInput('0');
  }

  function display(value: string) {
    let display: string = input + value;

    if (input.substring(0) === '0') display = value;

    switch (stack.length) {
      case 2:
        display = value;
        break;
    }

    setInput(display);
  }

  function addToStack(operand: string) {
    switch (stack.length) {
      case 0:
        stack.push(input);
        stack.push(operand);
        break;
      case 2:
        stack.pop();

        stack.push(operand);

        stack.push(input);
        break;
      case 3:
        solve(operand, input);
        break;
    }
  }

  function solve(operand: string | undefined, latestValue: string | undefined) {
    let result = '0';

    //switch for operators
    switch (operand) {
      case '*':
        result = String(Number(stack.pop()) * Number(latestValue));
        break;
      case '/':
        result = String(Number(stack.pop()) / Number(latestValue));
        break;
      case '+':
        result = String(Number(stack.pop()) + Number(latestValue));
        break;
      case '-':
        result = String(Number(stack.pop()) - Number(latestValue));
        break;
    }
    stack = [];
    setInput(result);
  }

  function equal() {
    const displayValue: string | undefined = stack.pop(); //should match input
    const operand: string | undefined = stack.pop();

    solve(operand, displayValue);
  }

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section>
          <h1 style={{ textAlign: 'center' }}>Calculator</h1>

          <div className='container'>
            <br />
            <input
              type='text'
              id='result'
              className='screen'
              style={{ textAlign: 'right', width: '100%' }}
              value={input}
              onChange={() => ''}
            />

            <button
              className='button'
              style={{ width: '100%' }}
              onClick={() => clear()}
            >
              Clear
            </button>

            <div className='keys'>
              <input
                type='button'
                value='7'
                className='button'
                onClick={() => display('7')}
              ></input>

              <input
                type='button'
                value='8'
                className='button'
                onClick={() => display('8')}
              ></input>

              <input
                type='button'
                value='9'
                className='button'
                onClick={() => display('9')}
              ></input>

              <input
                type='button'
                value='/'
                className='operator'
                onClick={() => addToStack('/')}
              ></input>

              <input
                type='button'
                value='4'
                className='button'
                onClick={() => display('4')}
              ></input>

              <input
                type='button'
                value='5'
                className='button'
                onClick={() => display('5')}
              ></input>

              <input
                type='button'
                value='6'
                className='button'
                onClick={() => display('6')}
              ></input>

              <input
                type='button'
                value='X'
                className='operator'
                onClick={() => addToStack('*')}
              ></input>

              <input
                type='button'
                value='1'
                className='button'
                onClick={() => display('1')}
              ></input>

              <input
                type='button'
                value='2'
                className='button'
                onClick={() => display('2')}
              ></input>

              <input
                type='button'
                value='3'
                className='button'
                onClick={() => display('3')}
              ></input>

              <input
                type='button'
                value='-'
                className='operator'
                onClick={() => addToStack('-')}
              ></input>

              <input
                type='button'
                value='0'
                className='button'
                onClick={() => display('0')}
              ></input>

              <input
                type='button'
                value='.'
                className='button'
                onClick={() => display('.')}
              ></input>

              <input
                type='button'
                value='='
                className='button equal-sign'
                onClick={() => equal()}
              ></input>

              <input
                type='button'
                value='+'
                className='operator'
                onClick={() => addToStack('+')}
              ></input>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
