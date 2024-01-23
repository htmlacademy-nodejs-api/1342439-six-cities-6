import chalk from 'chalk';
import { TSVFileReader } from '../shared/libs/file-reader/tsv-file-reader.js';
import { Command } from './command.interface.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(...parameters: string[]): void {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(chalk.red(fileReader.toArray()));
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.log(chalk.green(`Can't import data from file : ${filename}`));
      console.error(chalk.bgGreenBright(`Details: ${error.message}`));
    }
  }
}
