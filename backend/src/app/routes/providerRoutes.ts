import { FastifyPluginAsync } from 'fastify';
import { prisma } from '../../lib/prisma';

const providerRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async (_, reply) => {
    const providers = await prisma.provider.findMany();
    reply.send(providers);
  });

  fastify.post('/', async (request, reply) => {
    const { name, email } = request.body as any;
    const provider = await prisma.provider.create({
      data: { name, email },
    });
    reply.code(201).send(provider);
  });
};

export default providerRoutes;
