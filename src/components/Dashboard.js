import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button } from "react-bootstrap"
import { v4 as uuid } from 'uuid';
import { auth, db }  from '../firebase'
import { useHistory } from "react-router-dom"
import Modal from 'react-modal';
import "../css/Dashboard.css"

const observer = db.collection("task")
  .onSnapshot(querySnapshot => {
    querySnapshot.docChanges().forEach(change => {
      if (change.type === "added") {
        console.log("New Task: ", change.doc.id);
      }
      if (change.type === "modified") {
        if (change.doc.get("recipientUID") == null) {
          console.log("Task added to Pool: ", change.doc.id);
        }
        else {
          console.log("Task taken from Pool", change.doc.id);
        }
      }
      if (change.type === "removed") {
        console.log("Removed Task: ", change.doc.id);
      }
    });
  });



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
      db.collection("task").doc(removed.DBID).update ({
        recipientUID: auth.currentUser.uid
    })
    } else {
      db.collection("task").doc(removed.DBID).update ({
        recipientUID: null
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
const [modalIsOpen,setIsOpen] = React.useState(false);
var poolTasks = []
var myItems = []
const [columns, setColumns] = useState({
  [uuid()]: {
    name: "My Tasks",
    items: myItems
  },
  [uuid()]: {
    name: "Task Pool",
    items: poolTasks
  }
});



Modal.setAppElement('body')

useEffect(()=>{
  let promises = [getPool(), getMyTasks()]
  Promise.all(promises)
    .then(() => {
      setColumns({
        [uuid()]: {
          name: "My Tasks",
          items: myItems
        },
        [uuid()]: {
          name: "Task Pool",
          items: poolTasks
        }
      });
    });
  
}, [])

async function getPool() {
  
  const poolTasksDB = await taskRef.where("recipientUID", "==", null).get();
  poolTasksDB.forEach(doc => {
    switch (doc.get("priority")) {
      case "Medium":
        var borderColor = "#ffae00";
        break;
      case "High":
        var borderColor = "#ff0000";
        break;
      default:
        var borderColor = "#00ff1e";
        break;
    }
    var shortDesc = doc.get("desc");
    if (shortDesc.length > 150) {
      shortDesc = shortDesc.substring(0, 150) + "...";
    }
    poolTasks.push({ id: uuid(), taskName: doc.get("name"), DBID: doc.id, priority: borderColor, skills: doc.get("skills"), dbid: doc.id})
  });

}

async function getMyTasks() {
  const myTasks = await taskRef.where("recipientUID", "==", auth.currentUser.uid).get();
  myTasks.forEach(doc => {
    switch (doc.get("priority")) {
      case "Medium":
        var borderColor = "#ffae00";
        break;
      case "High":
        var borderColor = "#ff0000";
        break;
      default:
        var borderColor = "#00ff1e";
        break;
    }
    myItems.push({ id: uuid(), taskName: doc.get("name"), DBID: doc.id, priority: borderColor, skills: doc.get("skills"), dbid: doc.id})
  });
}

function openModal() {
  setIsOpen(true);
}

function closeModal() {
  setIsOpen(false);
}

var colorMap = ["#ff0460", "#cbdc56", "#64a3ea", 	"#ffc100", "#c356ea", "#8ff243", "#71aef2", "#ea5645"];
  
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
                            ? "#23272a"
                            : "#2C2F33",
                          padding: 4,
                          width: 400,
                          minHeight: 500,
                          border: "3px solid #00b0f0"
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
                                    onClick={openModal}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}

                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      border: "3px solid " + item.priority,
                                      backgroundColor: snapshot.isDragging
                                        ? "#131517"
                                        : "#2C2F33",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                      height: 100
                                    }}
                                  >
                                    <div><strong>{item.taskName}</strong></div>

                                    <div class="task-skills">
                                      {(item.skills).map(skill => (
                                        <div class="task-skill" style={{backgroundColor: colorMap[skill.length % colorMap.length]}}>{skill}</div>
                                        ))}
                                    </div>

                                    <Modal isOpen={modalIsOpen} onClose={closeModal}
                                    aria-labelledby="simple-modal-title"
                                    aria-describedby="simple-modal-description">
                                      <p>{item.content}</p>
                                    </Modal>
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
