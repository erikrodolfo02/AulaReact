import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = 3000

let tasks = [{
    id: 1,
    title: "Estudar Node js",
    completed: false
}]

let nextId = 2

app.get('/', (req, res) => {
    res.send("API ToDo rodando")
})

app.post('/api/tasks', (req, res) => {
    res.json(tasks)
})

app.get('api/tasks/:id', (req, res) => {
    const { id } = req.params

    const taks = tasks.find(t => t.id === id)

    if(!task) {
        return res.status(404).json({
            message: "Tarefa não encontrada"
        })

        res.json(task)
    }
})

app.post('/api/tasks', (req, res) => {
    const { title } = req.body

    if(!title) {
        return res.status(400).json({
            message: "O título é obrigatório"
        })
    }

    const newTask = {
        id: nextId++,
        title,
        completed: false
    }

    tasks.push(newTask)

    return res.status(201).json(newTask)
})

app.put('/api/tasks/:id', (req, res) => {
    const { id } = req.params
    const { title, completed } = req.body

    const task = tasks.find(t => t.id === id)

    if(!task) {
        return res.status(404).json({
            message: "Tarefa não encontrada"
        })
    }

    if(title !== undefined) {
        task.title = title
    }

    if(completed !== undefined) {
        task.completed = completed
    }

    res.json(task)
})

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params

    const taskExists = tasks.some(t => t.id === id)

    if(!taskExists) {
        return res.status(404).json({
            message: "tarefa não encontrada"
        })
    }

    tasks = tasks.filter(t => t.id !== id)

    res.json({
        message: "tarefa removida com sucesso"
    })
})

app.listen(PORT, () => {
    console.log(`server rodando na porta ${PORT}`)
})