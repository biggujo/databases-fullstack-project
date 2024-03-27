import React from 'react';
import TaskItem from '../TaskItem/TaskItem.jsx';

export default function TaskList({ tasks }) {

  return (<ul style={{
    listStyle: 'none',
  }}>
    {tasks.map((props) => <li key={props.id}>
      <TaskItem {...props} />
    </li>)}
  </ul>);
}
