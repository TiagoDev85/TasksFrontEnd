import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import api from "../../services/api";

import moment from "moment";
// style
import "../../styles/pages/taskDetail.css";

interface ITask {
  id_task: number;
  title: string;
  description: string;
  finished: boolean;
  created_at: Date;
  updated_at: Date;
}

interface ITaskParams {
  id_task: string;
}

const Detail: React.FC = () => {
  const history = useHistory();
  const params = useParams<ITaskParams>();
  const [task, setTask] = useState<ITask>();

  useEffect(() => {
    findTask();
  }, [params]);

  function back() {
    history.goBack();
  }
  
  async function findTask() {
    const response = await api.get<ITask>(`/task/${params.id_task}`);
    setTask(response.data);
  }

  function formateDate(date: Date | undefined) {
    return moment(date).format("DD/MM/YYYY");
  }

  return (
    <div className="container">
      <br />
      <div className="task-header">
        <h1>Detalhes da Tarefa</h1>
        <Button className="back-task" variant="info" size="sm" onClick={back}>
          Voltar
        </Button>
      </div>
      <br />
      <Card>
        <Card.Header>{task?.title}</Card.Header>
        <Card.Body>
          <Card.Text>{task?.description}</Card.Text>
          <Badge
            className="badge-status"
            variant={task?.finished ? "success" : "warning"}
          >
            {task?.finished ? "FINALIZADO" : "PENDENTE"}
          </Badge>
          <div className="info">
            <strong>Cadastrada em:</strong>
            <Badge variant="success">{formateDate(task?.created_at)}</Badge>
            <br />
            <strong>Atualizada em:</strong>
            <Badge variant="warning">{formateDate(task?.updated_at)}</Badge>
          </div>
          {/* <Card.Text>{task?.description}</Card.Text> */}
          {/* <Button variant="warning">Add</Button> */}
          {/* TODO: adicionar subtarefas dentro das tarefas */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Detail;
