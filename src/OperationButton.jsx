import React from 'react'
import { ACTION } from './App'

const OperationButton = ({ dispatch, sym }) => {
    return (
        <>
            <button
                onClick={() => dispatch({ type: ACTION.CHOOSE_OPERATION, payload: { sym } })}
            >
                {sym}

            </button>

        </>
    )
}

export default OperationButton