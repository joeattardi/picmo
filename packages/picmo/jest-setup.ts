import '@testing-library/jest-dom';
import 'node-fetch';
import './testHelpers/fetch-polyfill';
import { server } from './testHelpers/mocks/server';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());
afterEach(() => document.body.replaceChildren());

afterAll(() => server.close())
