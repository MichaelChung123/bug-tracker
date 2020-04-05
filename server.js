const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const db = require('./queries')
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({
        info: 'Node.js, Express, and Postgres API'
    });
});

app.get('/admin/tickets/all', db.getTickets)
app.get('/admin/dashboard', db.getDashboardContent)

app.post('/admin/projects/all', db.createProject)
app.get('/admin/projects/details/:id', db.getProjectByID)
app.get('/admin/projects/details/tickets/:id', db.getTicketsByProjectID);
app.get('/admin/projects/details/users/:id', db.getUsersByProjectID);
app.get('/admin/users', db.getUsers);

app.post('/admin/projects/details/select/user/:id', db.assignUserToProject);
app.get('/admin/user/:id', db.getUserByID);
app.put('/admin/projects/details/deselect/user/:id', db.deleteUserFromProject);

app.get('/projects/all', db.getAllProjects);
app.post('/tickets/create', db.createTicket);

app.get('/admin/tickets/details/:id', db.getTicketByID);
app.post('/upload/attachment', db.addAttachment);

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
})