import {useState} from 'react';
import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';
import './App.css';

function App() {

  const[list, setList] = useState([]);
  const[filter, setFilter] = useState(true);

  function onSubmit(e) {
    e.preventDefault()
    const task = {
      id: new Date(),
      name: e.target.task.value,
      status: "pendente"
    };
    setList([...list, task]);
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

  function editTask(item, newName) {
    // const newName = e.target.newTask.value;
    const newList = list.map((t) => {
      if (t.id === item.id) {
        t.name = newName;
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
      <button onClick={ () => setFilter(!filter) }> Não concluída </button>
      <ul>
      {list.map((item, index) => {
        if (!filter) {
          console.log(list);
          return (
            <li style={ item.status === "feito" ? { textDecoration: "line-through" } : {}} key={ index }>
            <span contentEditable={true} onInput={(e) => editTask(item, e.currentTarget.textContent)}>{ item.name }</span>
            <button onClick={() => done(item)}>
              {item.status === "feito" ? <FaRegCheckSquare /> : <FaRegSquare />}
            </button>
            </li>
          );
          
        } else {
          console.log(list);
          if (item.status === "pendente") {
            return (
              <li style={ item.status === "feito" ? { textDecoration: "line-through" } : {}} key={ index }>
              <span contentEditable={true} onInput={(e) => editTask(item, e.currentTarget.textContent)}>{ item.name }</span>
              <button onClick={() => done(item)}>
                {item.status === "feito" ? <FaRegCheckSquare /> : <FaRegSquare />}
              </button>
              </li>
            );
          } 

          return (null);

        }

      })}
      </ul>
      
    </div>
  );
}

export default App;
