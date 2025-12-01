import createServer from 'fastify';
import { initController } from './controller.js';
import { diContainer } from './diContainer.js';

const serverOpts = {
  logger: true,
}

const server = createServer(serverOpts);
const routes = initController(diContainer);

for (const route of routes) server.route(route);

server.listen({ port: 5000 });
