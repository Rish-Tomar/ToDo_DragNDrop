import React from 'react'
import styled from 'styled-components'
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

const Container=styled.div`
    margin:8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width:250px;
    display:flex;
    flex-direction:column;
`;
const Title =styled.h3`
    padding:8px;
`;
const TaskList=styled.div`
    padding:8px;
    flex-grow:1;
    background-color:${props => (props.isDraggingOver?'skyblue':'white')};
    min-height:100px;
`;

function Column(props) {
  return (
    <div>
       <Container>
       <Title>{props.column.title}</Title>
            <Droppable droppableId={props.column.id}>
                {
                    (provided,snapshot)=>(
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps} 
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                           {props.tasks.map((task,index)=> <Task key={task.id} task={task} index={index}/> )}
                           {provided.placeholder}
                        </TaskList>
                    )
                }                
            </Droppable>
       </Container>
    </div>
  )
}

export default Column