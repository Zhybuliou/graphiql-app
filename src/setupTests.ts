/* eslint-disable import/no-extraneous-dependencies */
// import { expect } from 'vitest';
// import * as matchers from '@testing-library/jest-dom/matchers';
//
// expect.extend(matchers);

import '@testing-library/jest-dom';
import { server } from './tests/server';

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error',
  })
);

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
