import { DbPool } from '../../infra/db/types';
import { Infra } from '../../types.js';
import { DiContainer } from '../../types';
import { RouteOpts } from '../../types';
import { PhoneForDb } from './types/phone';
import { PhoneFromDb } from './types/phone';
import { Model } from './model.js';

type PhoneDeps = {
  model: Model;
}

type Service = {
  getAllPhones: () => PhoneFromDb[];
  getPhoneById: (id: string) => PhoneFromDb;
  createPhone: (PhoneForCreate: PhoneForDb) => PhoneFromDb;
  updatePhone: (id: string, phoneForUpdate: PhoneForDb) => PhoneFromDb;
  deletePhone: (id: string) => PhoneFromDb;
};

export type {
  DbPool,
  DiContainer,
  Infra,
  RouteOpts,
  PhoneForDb,
  PhoneFromDb,
  Service,
  PhoneDeps,
}
