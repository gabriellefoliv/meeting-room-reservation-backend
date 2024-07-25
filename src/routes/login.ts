import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod'
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function login(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().post('/login', {
        schema: {
            body: z.object({
                email: z.string().email(),
                password: z.string().min(8)
            }),
        },
    }, async (request, reply) => {
        const { email, password } = request.body

        const employee = await prisma.employees.findUnique({
            where: {
                email
            }
        })
        if (!employee || !(await bcrypt.compare(password, employee.password))) {
            return reply.status(401).send({ error: "Invalid email or password" })

        }

        const token = jwt.sign({ id: employee.id, email: employee.email }, process.env.JWT_SECRET!, { expiresIn: "1d" })

        reply.send({ success: true, token })
    })
}