import { useState } from 'react';
import './App.css';
import initialData from './initialData';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container=styled.div`
  display:flex;
  flex-direction:row;
`;

function App() {
  const [data,setData]=useState(initialData)

  const onDragEnd =result=>{
    console.log(result)
    const {destination,source,draggableId}=result
    if(!destination)
      return;
    if(destination.droppableId===source.droppableId &&destination.index===source.index)
      return

      // const column= data.columns[source.droppableId];
      const start= data.columns[source.droppableId];
      const finish= data.columns[destination.droppableId];
      if(start===finish){
        const newTaskIds =Array.from(start.taskIds)
        newTaskIds.splice(source.index,1);
        newTaskIds.splice(destination.index,0,draggableId)

        const newColumn={
          ...start,
          taskIds:newTaskIds
        }
        const newState={
          ...data,
          columns:{
            ...data.columns,
            [newColumn.id]:newColumn
          }
        }
        setData(newState)
      }

      const startTaskIds =Array.from(start.taskIds);
      startTaskIds.splice(source.index,1);

      const newStart={
        ...start,
        taskIds:startTaskIds
      }

      const finishedTaskIds = Array.from(finish.taskIds)
      finishedTaskIds.splice(destination.index,0,draggableId);

      const newFinish ={
        ...finish,
        taskIds:finishedTaskIds
      };
      const newState={
        ...data,
        columns:{
          ...data.columns,
          [newStart.id]:newStart,
          [newFinish.id]:newFinish
        }
      }
      setData(newState)
      
  }
  return (
   <DragDropContext onDragEnd={onDragEnd}>
    <Container>
      {/* <div className="App"> */}
        { data.columnOrder.map((columnId)=>{
              const column = data.columns[columnId]
              const tasks   =column.taskIds.map(taskId=> data.tasks[taskId])

              return <Column key={column.id} column={column} tasks={tasks}/> 
          })
        }
      {/* </div> */}
    </Container>
   </DragDropContext>
  );
}

export default App;
