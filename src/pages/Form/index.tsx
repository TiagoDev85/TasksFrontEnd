import React, { useState, useEffect, ChangeEvent } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import api from "../../services/api";

import '../../styles/pages/formtask.css';

interface ITask {        
  title: string;
  description: string;  
}
interface ITaskParams{
  id_task: string;
}

const Tasks: React.FC = () => {

  const history = useHistory();  
  const params = useParams<ITaskParams>();

  useEffect(() => {    
    if(params.id_task !== undefined){
      findTask(params.id_task)    
    }
  },[params.id_task]);

  const [model, setModel] = useState<ITask>({        
    title: '',
    description: ''
  })  

  function updatedModel(e: ChangeEvent<HTMLInputElement>){
    setModel({
      ...model,
      [e.target.name]: e.target.value
    })
  }

  function back(){
    history.goBack();
  }

  async function onSubmit(e: ChangeEvent<HTMLFormElement>){
    e.preventDefault();
    if(params.id_task !== undefined){
      const response = await api.put(`/task/${params.id_task}`, model);      
      console.log(response)
    }else{
      const response = await api.post('/task', model);
    }
    back();
  }

  async function findTask(id: string){
    const response = await api.get(`/task/${id}`)
    setModel({
      title: response.data.title,
      description: response.data.description
    })    
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h3>Nova Tarefa</h3>
        <Button variant="danger" size="sm" onClick={back}>
          Voltar
        </Button>
      </div>
      <div className="container body">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Título</Form.Label>
            <Form.Control type="text" placeholder="título" name="tittle" value={model.title} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Descrição</Form.Label>
            <Form.Control className="area" as="textarea" rows={3} placeholder="descrição" name="description"  value={model.description} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}/>
          </Form.Group>
          <Button variant="success" type="submit">          
            {
              params.id_task !== undefined ? "Salvar" : "Adicionar"
            }
          </Button>
        </Form>
      </div>
      <br />
    </div>
  );
};

export default Tasks;
