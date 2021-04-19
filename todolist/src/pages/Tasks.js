import { useEffect, useState } from 'react';
import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';
import React from 'react';
import { useParams } from 'react-router';

const Tasks = () => {

  const params = useParams();
  const[list, setList] = useState([]);
  const[filter, setFilter] = useState(false);

  useEffect(() => {
    console.log(params)
  }, [params]);

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

  function editTask(e, id) {
    const newList = list.map(l => l.id === id ? {
      ...l, name: e
    } : l);

    console.log(newList);
    setList(newList);
  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input name="task" />
        <button type="submit">Adicionar</button>
      </form>
      <button onClick={ () => setFilter(!filter) }> Filtrar </button>
      <ul>
      {list.map((item, index) => {
        if (!filter) {
          console.log(list);
          return (
            <li style={ item.status === "feito" ? { textDecoration: "line-through" } : {}} key={ index }>
            <input style={{ border: "none" }} type="text" onChange={(e) => editTask(e.target.value, item.id)}   value={item.name}/>
            
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
              <input style={{ border: "none" }} type="text" onChange={(e) => editTask(e.target.value, item.id)}   value={item.name}/>
              
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

export default Tasks;