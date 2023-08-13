import {prisma} from '@reynandaptr/express-prisma-types/dist';
import listEndpoints from 'express-list-endpoints';

import app from './app';
import {getEnvvarValue} from './utils/envvar';

const {
  value: port,
} = getEnvvarValue('PORT', true, (error) => {
  if (error) {
    throw new Error(error);
  }
});

app.listen(port, () => {
  for (const endpoint of listEndpoints(app)) {
    console.log(endpoint.methods, endpoint.path);
  }
  console.log(`Server listening on port ${port}`);
}).on('close', () => {
  prisma.$disconnect();
});
