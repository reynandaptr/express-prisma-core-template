import {prisma} from '@reynandaptr/express-prisma-types/dist';

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
  console.log(`Server listening on port ${port}`);
}).on('close', () => {
  prisma.$disconnect();
});
