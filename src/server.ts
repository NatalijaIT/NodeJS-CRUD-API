import { createServer } from 'http';

export default function getServerInstance(workerMessage?: string) {
  return createServer(() => {
    if (workerMessage) {
      console.log(workerMessage);
    }
  });
}

export const server = getServerInstance();