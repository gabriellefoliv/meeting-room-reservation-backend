import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { prisma } from "../lib/prisma";
import bcrypt from 'bcrypt'

export async function createEmployee(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/employees', {
        schema: {
            body: z.object({
                name: z.string(),
                email: z.string().email(),
                password: z.string().min(8),
                isAdmin: z.boolean().optional()
            })
        },
    }, async (request) => {
        const { name, email, password, isAdmin } = request.body

        // Algumas limitações 
        // if name < 8, throw new Error
        // transformar senha em bcrypt
        // if isAdmin true, disparar email pra chefe (conta master) com código
        const hashedPassword = await bcrypt.hash(password, 10)

        if (isAdmin) {
            // enviar email
            return
        }

        const employee = await prisma.employees.create({
            data: {
                name,
                email,
                password: hashedPassword,
                admin: isAdmin
            }
        })


        return { employee }
    })
}