import { useState, useReducer } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles.css'
import DigitButton from './digitButton'
import OperationButton from './OperationButton'
import Evaluate from './Evaluate'

export const ACTION = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTION.ADD_DIGIT:
        if(state.overwrite){
          return {
            ...state, 
            currentOperand: payload.digit,
            overwrite : false,
          }
        }
        if(payload.digit === '0' && state.currentOperand === '0'){return state}
        if (payload.digit === '.' && state.currentOperand.includes('.')) {
          return state;
        }
        
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`
      }

      case ACTION.CHOOSE_OPERATION:
        if(!state.currentOperand  && !state.previousOperand){
          console.log(1) 
          return state
        }
        if(!state.previousOperand){
          console.log(payload.sym)
          return {
           ...state,
           operation : `${payload.sym}`,
           previousOperand: state.currentOperand,
           currentOperand : null,
          }
        }

        if(!state.currentOperand){
          return {
            ...state,
            operation : payload.sym
          }
        }

        return {
          ...state,
          previousOperand: evaluate(state),
          operation: payload.sym,
          currentOperand: null,
        }

      case ACTION.EVALUATE:
        if(!state.previousOperand || !state.currentOperand || !state.operation){
          return state
        }
        return {
          ...state,
          overwrite : true,
          currentOperand: evaluate(state),
          previousOperand: null,
          operation: null
        }

      case ACTION.CLEAR:
        return {}

      case ACTION.DELETE_DIGIT:
        if(state.overwrite){
          return {
            ...state,
            overwrite: false,
            currentOperand: null,
          }
        }
        if(!state.currentOperand){
          return state
        }
        if(state.currentOperand.length === 1){
          return {
            ...state,
            currentOperand: null
          }
        }
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0 , -1)
        }
        
    default:
      return state;
  }
}

function evaluate({currentOperand , previousOperand , operation}){
  const a = parseFloat(currentOperand)
  const b = parseFloat(previousOperand)
  if(isNaN(a) || isNaN(b)){return ""}
  let res = 0
  switch(operation){
    case '+':
      res = a + b
      break;
    case '-':
      res = b - a
      break;
    case '*':
      res = a * b
      break;
    case '/':
      res = a / b
      break
  }
  return res.toString()
}

// const int_format = new Int.NumberFormat('en-us' , {
//   maximumFractionDigits: 0,
// })

// function formatOperand(operand){
//   if(!operand){return }
//   const [integer , decimal] = operand.split('.')
//   if (!decimal){
//     return int_format.format(integer)
//   }
// }
function App() {
  const [state, dispatch] = useReducer(reducer, { currentOperand: "", previousOperand: "", operation: "" , overwrite: false })



  return (
    <>
    <h1>{state.operation}</h1>
      <div className="calc">
        <div className="calculator-grid">
          <div className="output">
            <div className="previous-operand">{state.previousOperand || ""}{state.operation}</div>
            <div className="current-operand">{state.currentOperand || ""}</div>
          </div>
          <button className="span-two" onClick={() => dispatch({type : ACTION.CLEAR})}>AC</button>
          <button onClick={() => dispatch({ type : ACTION.DELETE_DIGIT })}>DEL</button>
          <OperationButton sym = '/' dispatch = {dispatch} />
          <DigitButton digit="1" dispatch={dispatch} />
          <DigitButton digit="2" dispatch={dispatch} />
          <DigitButton digit="3" dispatch={dispatch} />
          <OperationButton sym = '*' dispatch = {dispatch} />          
          <DigitButton digit="4" dispatch={dispatch} />
          <DigitButton digit="5" dispatch={dispatch} />
          <DigitButton digit="6" dispatch={dispatch} />
          <OperationButton sym = '+' dispatch = {dispatch} />          
          <DigitButton digit="7" dispatch={dispatch} />
          <DigitButton digit="8" dispatch={dispatch} />
          <DigitButton digit="9" dispatch={dispatch} />
          <OperationButton sym = '-' dispatch = {dispatch} />          
          <DigitButton digit="." dispatch={dispatch} />
          <DigitButton digit="0" dispatch={dispatch} />
          
          
          <button className='span-two' onClick={() => dispatch({type : ACTION.EVALUATE})}>=</button>
        </div>
      </div>
    </>
  )
}

export default App
