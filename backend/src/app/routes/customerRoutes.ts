import { FastifyPluginAsync } from 'fastify';
import { prisma } from '../../lib/prisma';

const customerRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async (_, reply) => {
    const customers = await prisma.customer.findMany();
    reply.send(customers);
  });

  fastify.post('/', async (request, reply) => {
    const { name, email } = request.body as any;
    const customer = await prisma.customer.create({
      data: { name, email },
    });
    reply.code(201).send(customer);
  });
};

export default customerRoutes;
