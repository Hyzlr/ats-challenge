import { writeFile } from 'node:fs';

const DOT_ENV_FILENAME: string = '.env';
const DOT_ENV_EXAMPLE_FILENAME: string = '.env.example';
const DOT_ENV_EXAMPLE_FILE_VALUE_PLACEHOLDER: string = 'XXXXXX';

/**
 * This script analyzes a .env file at the base of the project and -
 *
 *  1. Generate a .env.example file if not already exists
 *  2. Updates an .env.example file if changes in the .env file exists
 */

/**
 * Reads a dotenv file at a given path asynchronously and returns an object containing env keys and its corresponding values
 *
 * @param {string} path path to .env, .env.example or .env.* files
 * @returns {Promise<Record<string, string>>} Object containing env keys along with its values
 */
const readDotFileForEnv = async (
  path: string,
): Promise<Record<string, string>> => {
  const dotFile = Bun.file(path);
  const fileContents = (await dotFile.text()).split('\n');

  // cleaning
  const envs: Record<string, string> = Object.create(null);

  for (const line of fileContents) {
    if (line.includes('#')) continue;

    const [envName, envValue] = line
      .replaceAll(' ', '')
      .replaceAll('"', '')
      .split('=');

    if (envName.length === 0) continue;

    envs[envName] = envValue;
  }

  return envs;
};

/**
 * Checks whether a dot file (a file starting with a dot) exists at the specified path.
 *
 * @param {string} path - The path to the file.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the file exists, otherwise `false`.
 */
const doesDotFileExists = (path: string): Promise<boolean> => {
  return Bun.file(path).exists();
};

const compareEnvRecords = (
  source: Record<string, string>,
  dest: Record<string, string>,
) => {
  const differenceSourceToDest: Set<string> = new Set();
  const differenceDestToSource: Set<string> = new Set();

  const sourceEnvEntries = Object.keys(source);
  const destEnvEntries = Object.keys(dest);

  // comparing source with dest
  for (const env of Object.keys(source)) {
    if (!destEnvEntries.includes(env)) {
      differenceSourceToDest.add(env);
    }
  }

  // comparing dest with source
  for (const env of Object.keys(dest)) {
    if (!sourceEnvEntries.includes(env)) {
      differenceDestToSource.add(env);
    }
  }

  return {
    extras: Array.from(differenceDestToSource),
    missing: Array.from(differenceSourceToDest),
  };
};

// runner function
(async () => {
  const doesDotEnvFileExists = await doesDotFileExists(DOT_ENV_FILENAME);
  const doesDotEnvExampleFileExists = await doesDotFileExists(
    DOT_ENV_EXAMPLE_FILENAME,
  );

  if (!doesDotEnvFileExists) {
    throw Error('.env file not found in the project');
  }

  const dotEnvFileContents = await readDotFileForEnv(DOT_ENV_FILENAME);

  if (!doesDotEnvExampleFileExists) {
    console.log('.env.example file not found... creating one');

    await Bun.write(DOT_ENV_EXAMPLE_FILENAME, '');
    const dotEnvExampleFile = Bun.file(DOT_ENV_EXAMPLE_FILENAME);
    console.log('.env.example file created at the root of project');

    const dotEnvExampleFileWriter = dotEnvExampleFile.writer();
    for (const envName of Object.keys(dotEnvFileContents)) {
      dotEnvExampleFileWriter.write(
        `${envName.toUpperCase()} = ${DOT_ENV_EXAMPLE_FILE_VALUE_PLACEHOLDER}\n`,
      );
    }

    return;
  }

  const dotEnvExampleFileContents = await readDotFileForEnv(
    DOT_ENV_EXAMPLE_FILENAME,
  );

  const envAnalysis = compareEnvRecords(
    dotEnvFileContents,
    dotEnvExampleFileContents,
  );

  console.log(envAnalysis);

  writeFile(
    DOT_ENV_EXAMPLE_FILENAME,
    Object.keys(dotEnvFileContents)
      .map(
        (env) =>
          `${env.toUpperCase()} = ${DOT_ENV_EXAMPLE_FILE_VALUE_PLACEHOLDER}`,
      )
      .join('\n'),
    () => {},
  );
})();
