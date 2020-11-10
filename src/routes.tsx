import React from 'react';
import { Switch, Route } from 'react-router-dom';

// paginas
import Home from './pages/Home/index';
import Tasks from './pages/Tasks/index';
import TasksForm from './pages/Form/index';
import TaskDetail from './pages/Detail/index';

const Routes: React.FC = () => {
  return(
    <Switch>
      <Route path="/" exact component={Home}/>
      <Route path="/tasks" component={Tasks} />
      <Route path="/task/:id_task" exact component={TaskDetail} />
      <Route path="/task_add" exact component={TasksForm} />
      <Route path="/task_add/:id_task" exact component={TasksForm} />
    </Switch>
  );
}

export default Routes;