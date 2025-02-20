Getting Started

To get started with this project, follow these steps:

    Clone the repository
    Install dependencies: npm install
    Start the API cluster: node cluster.js
    
Features

    Node.js API cluster with two replica sets
    Rate limiting to enforce one task per second per user ID and 20 tasks per minute per user ID
    Task queueing system to manage tasks for each user ID
    Logging of task completion along with user ID and timestamp

How to Use

To use this project, send a POST request to http://localhost:3000/api/v1/task with a JSON body containing the user_id field.



