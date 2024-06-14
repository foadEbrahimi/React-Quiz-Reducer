import React, { useReducer } from 'react';

const instialState = { amount: 900, withdraw: 90, account: 1385, deposit: 80 };
function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case 'withdraw':
      return { ...state, amount: state.amount - state.withdraw };
    case 'deposit':
      return { ...state, amount: state.amount + state.deposit };
    default:
      throw new Error('Unknown action');
  }
}
export default function Banker() {
  const [state, dispath] = useReducer(reducer, instialState);
  const { amount } = state;
  return (
    <div>
      <button
        style={{ margin: '1rem 0' }}
        onClick={() => dispath({ type: 'withdraw' })}
      >
        Request For Withdraw
      </button>
      <button onClick={() => dispath({ type: 'deposit' })}>
        Request For Deposit
      </button>
      <h4>Your account have {amount} dollars</h4>
    </div>
  );
}
