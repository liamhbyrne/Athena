import React from 'react'

export default function CreateTask() {

    export function writeTaskToFirestore(date) {
        db.collection("task").doc(date).set({
            name: "Test",
            date: date
        }).then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }
    


    return (
        <div>
            <p></p>
        </div>
    )
}

