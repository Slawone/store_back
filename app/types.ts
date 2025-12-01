export type { RouteOptions as RouteOpts } from 'fastify';

import { DbPool } from './infra/db/types';
import { Service as PhoneService } from './services/phone/types';

export type Infra = {
  dbPool: DbPool;
}

type Service = {
  phone: PhoneService;
}

export type DiContainer = {
  infra: Infra;
  service: Service;
}
