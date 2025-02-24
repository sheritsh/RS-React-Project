import { afterAll, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { server } from './mocks/server';
import { vi } from 'vitest';

const originalConsoleError = console.error;

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
  console.error = vi.fn();
  Object.defineProperty(window, 'location', {
    value: { reload: vi.fn() },
    writable: true,
  });
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
  console.error = originalConsoleError;
});
