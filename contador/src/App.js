import { useState } from 'react';
import './App.css';

function App() {
  
  const styles = {
    buttons: {
      margin: 5
    }
  }
  
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      
      <div className="display">{ count }</div>

      <button style={styles.buttons} onClick={() => setCount(count + 1)}>+</button>
      <button style={styles.buttons} onClick={() => setCount(count - 1)}>-</button>

    </div>
  );

}

export default App;
