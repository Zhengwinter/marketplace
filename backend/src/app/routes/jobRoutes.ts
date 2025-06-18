import { FastifyPluginAsync } from 'fastify';
import { prisma } from '../../lib/prisma';

const jobRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async (request, reply) => {
    const jobs = await prisma.job.findMany();
    reply.send(jobs);
  });

  fastify.post('/', async (request, reply) => {
    const { title, category, smartPrice, arrivalWindow, acceptPrice, customerId, providerId, createdAt } = request.body as any;
    const job = await prisma.job.create({
      data: {
        title,
        createdAt: new Date(createdAt),
        category,
        smartPrice,
        acceptPrice,
        arrivalWindow,
        customer: { connect: { id: customerId } },
        provider: providerId ? { connect: { id: providerId } } : undefined,
      },
    });
    reply.code(201).send(job);
  });
};

export default jobRoutes;
