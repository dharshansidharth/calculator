import React from 'react'
import { ACTION } from './App'


const Evaluate = ({ dispatch }) => {
    return (
        <>
            <div
                onClick={() => dispatch({ type: ACTION.EVALUATE})}
                
            >
                =

            </div>

        </>
    )
}

export default Evaluate