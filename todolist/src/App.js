import {useState} from 'react';
import { FaFilter, FaRegCheckSquare, FaRegSquare } from 'react-icons/fa'
import './App.css';

function App() {

  const[list, setList] = useState([]);

  function onSubmit(e) {
    e.preventDefault()
    console.log(e.target.task.value);
    const task = {
      id: new Date(),
      name: e.target.task.value,
      status: "pendente"
    };
    setList([...list, task])
  }
  
  function done(item) {
    const newList = list.map((t) => {
      if (t.id === item.id) {
        if (t.status === "feito") {
          t.status = "pendente";
        } else {
          t.status = "feito";
        }
      }
      return t;
    })

    setList(newList);
  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input name="task" />
        <button type="submit">Adicionar</button>
      </form>
      <button> Não concluída </button>
      <ul>
      {list.map((item, index) => {
        // fazer filtro de "não concluídas"
        // editar a tarefa
        return (
          <li style={ item.status === "feito" ? { textDecoration: "line-through" } : {}} key={ index }>
          <span>{ item.name }</span>
          <button onClick={() => done(item)}>
            {item.status === "feito" ? <FaRegCheckSquare /> : <FaRegSquare />}
          </button>
          </li>
        );

      })}
      </ul>
      
    </div>
  );
}

export default App;
