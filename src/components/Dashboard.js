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

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

var colorMap = ["#ff0460", "#cbdc56", "#64a3ea", 	"#ffc100", "#c356ea", "#8ff243", "#71aef2", "#ea5645"];
  
  return (
    <div style={{ display: "flex", flexDirection: "column",justifyContent: "center", alignItems:"flex-start",width: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div>
            <h2 style={{textAlign: "center", marginTop: 32}}>{column.name}</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                float: "center"

              }}
              key={columnId}
            >
              
              <div style={{ marginTop: 8 }}>
                <Droppable droppableId={columnId} key={columnId} direction="horizontal">
                  {(provided, snapshot) => {
                    return (

                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "#0090d0"
                            : "#00b0f0",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          flexFlow: "row",
                          flexWrap: "nowrap",
                          padding: 10,
                          paddingTop: 20,
                          paddingBottom: 20,
                          height: "30vh",
                          minWidth: "100vw",
                          borderTop: "10px solid #c2b280",
                          borderBottom: "10px solid #c2b280",
                          backgroundColor: "#00b0f0"
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
                                      padding: 24,
                                      margin: "0 8px 0 0",
                                      height: "20vh",
                                      border: "8px solid " + item.priority,
                                      backgroundColor: snapshot.isDragging
                                        ? "#131517"
                                        : "#2C2F33",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                      width: "22vh"
                                    }}
                                  >
                                    <div><strong>{item.taskName}</strong></div>

                                    <div class="task-skills">
                                      {(item.skills).map(skill => (
                                        <div class="task-skill" style={{backgroundColor: colorMap[skill.length % colorMap.length]}}>{skill}</div>
                                        ))}
                                    </div>

                                    <Modal 
                                      isOpen={modalIsOpen} 
                                      onClose={closeModal} 
                                      style={customStyles}
                                    >
                                      <h2>Hello</h2>
                                      <button onClick={closeModal}>close</button>
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
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default Dashboard;
