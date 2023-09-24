// scripts.js

import { receiveJSON } from "./test.js";

// function stringifyChangeLog(changeLog) {
//     var changeLogString = "Below represent the changed values in your budgeting plan:\n\n";
//     for (let [outerCategory, subCatMap] of changeLog) {
//         var outerCatStr = `Category ${outerCategory}:\n`
//         for (let [subCategory, subCatCost] of subCatMap) {
//             outerCatStr += `\tSubcategory ${subCategory}: $${subCatCost.toFixed(2)}\n`;
//         }
//         changeLogString += outerCatStr;
//     }
//     return changeLogString;
// }

document.addEventListener('DOMContentLoaded', function () {
    const socket = io('http://127.0.0.1:5000/');

    socket.emit('chat_message', 'Hello, server!');

    // Listen for an event from the server
    socket.on('send_message', (message) => {
        console.log('Received message from server:', message);
    });

    socket.on('update_piecharts', (message) => {
        console.log("message is being received:", message);
        receiveJSON(message);
        // var changeLogString = stringifyChangeLog(changeLog);
        // socket.emit('changelog_message', changeLogString);
    });
});


