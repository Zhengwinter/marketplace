import Fastify from 'fastify';
import app from './app'; // this comes from src/app/index.ts

const server = Fastify({ logger: true });

server.register(app); // this sets up routes, etc.

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server ready at ${address}`);
});
