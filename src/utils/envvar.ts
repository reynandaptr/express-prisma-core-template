type EnvvarType = 'PORT' | 'TZ';

type EnvvarResult = {
  value?: string;
  error?: string;
}

export const getEnvvarValue = (envVarName: EnvvarType, required: boolean, callback?: (error: string) => void) => {
  const result: EnvvarResult = {};
  if (required && !process.env[envVarName]) {
    if (callback) {
      callback(`Missing environment variable ${envVarName}`);
    }
    result.error = `Missing environment variable ${envVarName}`;
  } else {
    result.value = process.env[envVarName];
  }

  return result;
};
