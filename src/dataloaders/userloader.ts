import DataLoader from 'dataloader';
import { User } from '../types/index.js';
import { findUserById } from '../data/database.js';

type BatchGetUsers = (userIds: readonly string[]) => Promise<(User | null)[]>;

// Batch function pour charger plusieurs users en une seule fois
const batchGetUsers: BatchGetUsers = async (userIds: readonly string[]) => {
  console.log('📦 Batch loading users:', [...userIds]);
  
  const users = userIds.map(id => findUserById(id));
  
  // Retourner dans le même ordre que les IDs demandés
  return userIds.map(id => users.find(user => user?.id === id) || null);
};

export const createUserLoader = (): DataLoader<string, User | null> => {
  return new DataLoader<string, User | null>(batchGetUsers);
};