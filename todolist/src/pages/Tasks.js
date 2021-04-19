import { useEffect, useState } from 'react';
import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa';
import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Divider } from 'antd';

const endpoint = 'http://localhost:3004';

const Tasks = () => {

  const params = useParams();
  const[list, setList] = useState([]);
  const[lista, setLista] = useState({});
  const[filter, setFilter] = useState(false);

  async function getTasks(id) {
    const res = await axios.get(`${endpoint}/tasks?list_id${id}`);
    if (res.status === 200) {
      setList(res.data);
    }
  }

  async function getList(id) {
    const res = await axios.get(`${endpoint}/lists/${id}`);
    if (res.status === 200) {
      setLista(res.data);
    }
  }

  useEffect(() => {
    console.log(params);
    if (params.id) {
      getTasks(params.id);
      getList(params.id);
    }
  }, [params]);

  async function onSubmit(e) {
    // e.preventDefault()
    const task = {
      id: new Date(),
      list_id: params.id,
      name: e.target.task.value,
      status: "pendente"
    };
    await axios.post(`${endpoint}/tasks`, task);
    getTasks(params.id);
    // setList([...list, task]);
  }
  
  async function done(item) {
    item.status = item.status === "pendente" ? "feito" : "pendente";
    await axios.put(`${endpoint}/tasks/${item.id}`, item); 
    getTasks(params.id);
    // const newList = list.map((t) => {
    //   if (t.id === item.id) {
    //     if (t.status === "feito") {
    //       t.status = "pendente";
    //     } else {
    //       t.status = "feito";
    //     }
    //   }
    //   return t;
    // })

    // setList(newList);
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
      <h1>{lista && lista.name}</h1>
      <Divider />
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