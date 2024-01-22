import { readFileSync } from 'node:fs';
import { Command } from './command.interface.js';
import { resolve } from 'node:path';

type PackageJson = {
  version: string;
};

function isPackageJson(content: unknown): content is PackageJson {
  return (
    typeof content === 'object' &&
    content !== null &&
    !Array.isArray(content) &&
    Object.hasOwn(content, 'version')
  );
}

export class ViorsionCommand implements Command {
  constructor(
    private readonly filePath: string = './package.json'
  ) {}

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(this.filePath), 'utf-8');
    const importedContent: unknown = JSON.parse(jsonContent);

    if(! isPackageJson(importedContent)) {
      throw new Error('Invalid package.json');
    }
    return importedContent.version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(...params: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (error: unknown) {
      console.error(`Failed to read version from ${this.filePath}`);

      if (error instanceof Error) {
        console.error(error.message);
      }
    }

  }
}
