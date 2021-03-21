import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';
import { auth, db }  from '../firebase'
import { useHistory } from "react-router-dom"


const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
    if (destColumn.name == "My Tasks") {
      console.log(removed.DBID)
      db.collection("task").doc(removed.DBID).update ({
        recipientUID: auth.currentUser.uid
    })
    }
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function Dashboard() {
const taskRef = db.collection("task");
const poolTasks = []
const myItems = []
const [columns, setColumns] = useState({
  [uuid()]: {
    name: "My Tasks",
    items: poolTasks
  },
  [uuid()]: {
    name: "Task Pool",
    items: myItems
  }
});

useEffect(()=>{
  let promises = [getPool(), getMyTasks()]
  Promise.all(promises)
    .then(() => {
      setColumns({
        [uuid()]: {
          name: "My Tasks",
          items: poolTasks
        },
        [uuid()]: {
          name: "Task Pool",
          items: myItems
        }
      });
    });
  
}, [])

async function getPool() {
  
  const poolTasksDB = await taskRef.where("userUID", "!=", auth.currentUser.uid).get();

  poolTasksDB.forEach(doc => {
    console.log(doc.id, doc.get("name"))
    poolTasks.push({ id: uuid(), content: doc.get("name"), DBID: doc.id})
  });

}

async function getMyTasks() {
  const myTasks = await taskRef.where("recipientID", "==", auth.currentUser.uid).get();
  myTasks.forEach(doc => {
    myItems.push({ id: uuid(), content: doc.get("name"), DBID: doc.id})
  });
}


  
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    {item.content}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default Dashboard;
