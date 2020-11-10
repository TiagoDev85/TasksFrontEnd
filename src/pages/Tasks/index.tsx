import React, { useState, useEffect } from "react";
import {  Badge,  Button,  Dropdown,  DropdownButton,  Table,} from "react-bootstrap";

//API
import api from "../../services/api";

//styles
import "../../styles/pages/tasks.css";


import moment from "moment";
import { useHistory } from "react-router-dom";

interface ITask {
  id_task: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const history = useHistory();

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const response = await api.get("/tasks");
    setTasks(response.data);
  }

  function formateDate(date: Date) {
    return moment(date).format("DD/MM/YYYY");
  }

  function newTask() {
    history.push("/task_add");
  }

  function editTask(id: number) {
    history.push(`/task_add/${id}`);
  } 

  async function finalizeTask(id: number) {     
    await api.patch(`/task/${id}`);
    loadTasks();    
  } 

  function viewTask(id: number) {
    history.push(`/task/${id}`);
  }

  async function removeTask(id: number) {
    await api.delete(`/task/${id}`);    
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Tarefas</h1>
        <Button  className="new-task" variant="info" size="sm" onClick={newTask}>
          Nova Tarefa
        </Button>
      </div>
      <br />
      <Table striped bordered hover className="text-center table">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Título</th>
            <th>Data de Atualização</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id_task}>
              {/* <td>{task.id_task}</td> */}
              <td>{task.title}</td>
              <td>{formateDate(task.updated_at)}</td>
              <td>
                <Badge variant={
                  task.finished ? "success" : "warning"
                }>
                  {task.finished ? "FINALIZADO" : "PENDENTE"}                  
                </Badge>
              </td>
              <td>
                {tasks ? (
                  <DropdownButton  variant="danger" size="sm" id="dropdown-basic-button" title="Ação">
                    <Dropdown.Item  disabled={task.finished} onClick={() => editTask(task.id_task)}>Editar</Dropdown.Item>
                    <Dropdown.Item disabled={task.finished} onClick={() => finalizeTask(task.id_task)}>Finalizar</Dropdown.Item>
                    <Dropdown.Item onClick={() => viewTask(task.id_task)}>Visualizar</Dropdown.Item>
                    <Dropdown.Item onClick={() => removeTask(task.id_task)}>Remover</Dropdown.Item>
                  </DropdownButton>
                ) : null}
                
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Tasks;
