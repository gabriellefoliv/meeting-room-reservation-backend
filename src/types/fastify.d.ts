// fastify.d.ts
import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    employee?: {
      id: string;
      email: string;
      // Outros campos que você deseja adicionar
    };
  }
}