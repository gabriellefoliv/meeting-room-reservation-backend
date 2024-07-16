import fastify from 'fastify'
import { createEmployee } from './routes/create-employee'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(createEmployee)



app.listen({ port: 3333 }).then(() => {
    console.log("Server running on port 3333!")
})