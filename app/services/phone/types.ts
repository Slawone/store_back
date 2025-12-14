/**********************************************
  Global
**********************************************/

import { DiContainer } from '../../types';
import { RouteOpts } from '../../types';

export type {
  DiContainer,
  RouteOpts,
};

/**********************************************
  Infra
**********************************************/

import { DbPool } from '../../infra/types';

export type {
  DbPool,
};

/**********************************************
  Phone
**********************************************/

import { PhoneForDb } from './types/phone';
import { PhoneFromDb } from './types/phone';

export type {
  PhoneForDb,
  PhoneFromDb,
};

/**********************************************
  Deps
**********************************************/

import { Model } from './model.js';

export type Props = {
  dbPool: DbPool;
};

export type Deps = {
  model: Model;
};

/**********************************************
  Service
**********************************************/

export type Service = {
  getPhones: () => Promise<PhoneFromDb[]>;
  getPhoneById: (id: string) => Promise<PhoneFromDb>;
  createPhone: (phoneForCreate: PhoneForDb) => Promise<PhoneFromDb>;
  updatePhone: (id: string, phoneForUpdate: PhoneForDb) => Promise<PhoneFromDb>;
  deletePhone: (id: string) => Promise<PhoneFromDb>;
};
