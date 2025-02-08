import { Logger as TypeOrmLogger } from 'typeorm';
import { Logger } from '@nestjs/common';

export class DBLogger implements TypeOrmLogger {
  private logger = new Logger(DBLogger.name);

  private stringifyParameters(parameters: any[]) {
    if (!parameters) return '';
    return JSON.stringify(parameters);
  }

  logQuery(query: string, parameters?: any[]) {
    this.logger.log(
      `${query} -- Parameters: ${this.stringifyParameters(parameters)}`,
    );
  }

  logQueryError(error: string | Error, query: string, parameters?: any[]) {
    this.logger.error(
      `${query} -- Parameters: ${this.stringifyParameters(parameters)} -- Error: ${error}`,
    );
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    this.logger.warn(
      `${query} -- Parameters: ${this.stringifyParameters(parameters)} -- Execution time: ${time}ms`,
    );
  }

  logSchemaBuild(message: string) {
    this.logger.debug(`Schema build: ${message}`);
  }

  logMigration(message: string) {
    this.logger.debug(`Migration: ${message}`);
  }

  log(level: 'log' | 'info' | 'warn', message: any) {
    if (level === 'log') {
      this.logger.log(message);
    }

    if (level === 'info') {
      this.logger.debug(message);
    }

    if (level === 'warn') {
      this.logger.warn(message);
    }
  }
}
