import { Client, Databases, Account } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Pakai URL langsung biar aman
    .setProject('aura-os-tax-debt-plan');       // Project ID asli lo

export const databases = new Databases(client);
export const account = new Account(client);
export const DATABASE_ID = 'DatabaseAura';
export const COLLECTION_ID = 'history';
