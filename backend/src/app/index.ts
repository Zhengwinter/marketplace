import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import jobRoutes from './routes/jobRoutes';
import customerRoutes from './routes/customerRoutes';
import providerRoutes from './routes/providerRoutes';

export default async function app(
  fastify: FastifyInstance,
  options: FastifyPluginOptions
) {
  // Register route modules
  fastify.register(jobRoutes, { prefix: '/jobs' });
  fastify.register(customerRoutes, { prefix: '/customers' });
  fastify.register(providerRoutes, { prefix: '/providers' });
}
