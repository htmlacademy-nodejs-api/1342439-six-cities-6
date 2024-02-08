#!/usr/bin/env node
import { CLIApplication, HelpCommand, VersionCommand, ImportCommand } from './cli/index.js';
import chalk from 'chalk';

function bootstrap() {
  const cliApplication = new CLIApplication();
  cliApplication.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
  ]);
  console.log(chalk.bgBlue(process.argv));
  cliApplication.processCommand(process.argv);
}

bootstrap();
