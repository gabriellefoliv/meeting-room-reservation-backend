import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";


export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
    try {
        const token = request.headers.authorization?.split(' ')[1];
        if(!token) {
            return reply.status(401).send({ error: "Unauthorized" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; email: string };
        request.employee = decoded;
    } catch (error) {
        reply.status(401).send({ error: "Unauthorized" })
    }
}