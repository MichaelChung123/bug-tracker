const Pool = require('pg').Pool

const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'bugtrackerdb',
    password: 'password',
    port: 5432,
})

const getTickets = (req, res) => {
    pool.query('SELECT * FROM tickets', (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows);
        res.json(results.rows)
    })
}

const getDashboardContent = (req, res) => {
    pool.query('SELECT * FROM tickets', (error, results) => {
        if (error) {
            throw error
        }
        res.json(results.rows);
    })
}

const createProject = (request, response) => {
    const {
        title,
        description
    } = request.body;

    pool.query(`INSERT INTO projects (title, description) VALUES ('${title}', '${description}')`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Project Added: ${results}`)
    });
}

const getProjectByID = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(`SELECT * FROM projects WHERE project_id=${id}`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}


const getUsersByProjectID = (request, response) => {
    const project_id = parseInt(request.params.id);

    pool.query(
        `
            SELECT firstname, lastname, role, users.user_id
            FROM user_project
            JOIN users ON users.user_id = user_project.user_id
            JOIN projects ON projects.project_id = user_project.project_id
            WHERE user_project.project_id=${project_id};
        `, (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
}

const getTicketsByProjectID = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(`SELECT * from tickets WHERE project_id=${id}`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY role ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.json(results.rows)
    })
}

const assignUserToProject = (request, response) => {
    const {
        user_id,
        project_id
    } = request.body;

    pool.query(`
        INSERT INTO user_project (user_id, project_id)
        SELECT  users.user_id AS user_id,
                projects.project_id AS project_id
        FROM users CROSS JOIN projects 
        WHERE user_id=${user_id} AND projects.project_id=${project_id};`,
        (error, results) => {
            if (error) {
                throw error
            }
            console.log('results: ', results)
            response.status(201).send(results.rows);
        })
}

const getUserByID = (request, response) => {
    const {
        user_id
    } = request.body;

    pool.query(`SELECT * FROM users WHERE user_id=${user_id}`, (error, results) => {
        if (error) {
            throw error
        }
        response.json(results.rows)
    })
}

const deleteUserFromProject = (request, response) => {
    const {
        user_id,
        project_id
    } = request.body;

    pool.query(
        `
            DELETE FROM user_project 
            WHERE user_id=${user_id} AND project_id=${project_id};
        `, (error, results) => {
            if (error) {
                throw error
            }

            response.status(201).send(results.rows);
        })
}

const getAllProjects = (request, response) => {
    pool.query(`SELECT * FROM projects`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(results.rows);
    })
}

const createTicket = (request, response) => {
    const {
        selectedProject,
        selectedPriority,
        selectedType,
        ticketTitle,
        ticketDescription,
        creator,
        lastUpdated,
        createdDate,
        createdTime,
        lastUpdatedTime
    } = request.body;

    console.log(request.body);

    pool.query(`
    INSERT INTO tickets (ticket_id, title, creator, priority, type, status, lastupdated, createddate, description, createdtime, lastupdatedtime) 
    VALUES ( DEFAULT, '${ticketTitle}', '${creator}', '${selectedPriority}', '${selectedType}', 'Open', '${lastUpdated}', '${createdDate}', '${ticketDescription}', '${createdTime}', '${lastUpdatedTime}')`,
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(201).send(`Ticket Added: ${results}`)
        });
}

const getTicketByID = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query(`SELECT * FROM tickets WHERE ticket_id=${id}`, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getTickets,
    getDashboardContent,
    createProject,
    getProjectByID,
    getUsersByProjectID,
    getTicketsByProjectID,
    getUsers,
    assignUserToProject,
    getUserByID,
    deleteUserFromProject,
    getAllProjects,
    createTicket,
    getTicketByID
}


// const Pool = require('pg').Pool

// const pool = new Pool({
//     user: 'me',
//     host: 'localhost',
//     database: 'api',
//     password: 'password',
//     port: 5432,
// })

// const getUsers = (request, response) => {
//     pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.json(results.rows)
//     })
// }

// const getUserById = (request, response) => {
//     const id = parseInt(request.params.id)

//     pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).json(results.rows)
//     })
// }

// const createUser = (request, response) => {
//     const {
//         name,
//         email
//     } = request.body

//     pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(201).send(`User added with ID: ${results.insertId}`)
//     })
// }

// const updateUser = (request, response) => {
//     const id = parseInt(request.params.id)
//     const {
//         name,
//         email
//     } = request.body

//     pool.query(
//         'UPDATE users SET name = $1, email = $2 WHERE id = $3',
//         [name, email, id],
//         (error, results) => {
//             if (error) {
//                 throw error
//             }
//             response.status(200).send(`User modified with ID: ${id}`)
//         }
//     )
// }

// const deleteUser = (request, response) => {
//     const id = parseInt(request.params.id)

//     pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(200).send(`User deleted with ID: ${id}`)
//     })
// }

// module.exports = {
//     getUsers,
//     getUserById,
//     createUser,
//     updateUser,
//     deleteUser,
// }