import { useEffect, useReducer, useRef } from 'react'
import { ActionTypes } from './reducer/ActionTypes';
import { todoReducer } from './reducer/todoReducer'
import './App.css';

function App() {
  const [state, dispatch] = useReducer(todoReducer, { items: [] });

  const itemRef = useRef<HTMLInputElement>(null);
  const renderRef = useRef(0);

  function handleAddItem() {
    dispatch({ type: ActionTypes.ADD_ITEM, payload: itemRef.current?.value })
    clearInput();
  }

  function handleRemoveItem(id: string) {
    dispatch({ type: ActionTypes.REMOVE_ITEM, payload: id })
    clearInput();
  }

  function clearInput() {
    if (!itemRef.current) return;
    itemRef.current.value = '';
    itemRef.current.focus();
  }

  useEffect(() => {
    renderRef.current++;
  }, [state])

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input type="text" autoFocus ref={itemRef} />
        <button type="button" onClick={() => handleAddItem()}>add</button>
      </div>
      <ul>
        {state.items.map(item => <li key={item.id}>
          {item.name}
          <button onClick={() => handleRemoveItem(item.id)}>x</button>
        </li>)}
      </ul>

      <footer>
        re-renders: {Math.round(renderRef.current / 2)} | items: {state.items.length}
      </footer>
    </div>
  )
}

export default App
