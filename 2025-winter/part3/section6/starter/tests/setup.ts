import { worker } from './mocks/server';
import '@/index.css';

beforeAll(() => worker.start());
afterEach(() => worker.resetHandlers());
afterAll(() => worker.stop());
