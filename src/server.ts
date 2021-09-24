import express, { request, response } from 'express' //importamos o express
import { v4 as uuid } from 'uuid'

const app = express() // criamos a const onde o app vai ser montado


//Métodos HTTP -> GET | POST | PUT | DELETE

// http://localhost:3333/users

app.use(express.json()) // usar todo tipo de comunicacao em json

interface User {
    id: string
    name: string
    email: string
}

const users: User[] = []


//Tipos de Parametros

// QUery Params
// Route Params
// Request Body


app.get('/users', (request, response) => {
    // buscar usuarios do BD
    return response.json(users)
})

app.post('/users',(request, response) =>{
    //receber os dados do novo usuario
    const { name, email } = request.body

    //criar um novo usuario

    const user = { id: uuid(), name, email}

    // registrar usuario na base

    users.push(user)

    // retornar os dados 
    return response.json(users)
})

app.put('/users/:id',(request, response) =>{
    //receber os dados do usuario
    const { id } = request.params
    const { name, email } = request.body

    const userIndex = users.findIndex((user) => user.id === id )

    // se o usuario nao existir mostrar um erro

    if(userIndex < 0) {
        return response.status(404).json({Error: 'user not found.'})

    }

    const user = { id, name,email }

     //atualizar o usuario
     users[userIndex] = user

     return response.json(user)

})

app.delete('/users/:id',(request, response) =>{

    //locarlizar o usuario na base de dados
    const { id } = request.params

    // receber o id do usuario
    const userIndex = users.findIndex((user) => user.id === id )

    //verificar se o usuario existe
    if(userIndex < 0) {
        return response.status(404).json({error:'User Not Found'})
    }

    //excluir usuario
    users.splice(userIndex, 1)

    return response.status(204).send()

})


app.listen('3333', () => {
    console.log('backend started')
}) // definimos a porta que vai ser ouvida

