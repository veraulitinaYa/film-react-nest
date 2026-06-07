import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {

  private format(level: string, message: string, optionalParams: string[]) {
    return JSON.stringify({
      level,
      message,
      optionalParams,
      timestamp: new Date().toISOString(),
    });
  }

  log(message: string, ...optionalParams: string[]) {
    console.log(this.format('log', message, optionalParams));
  }

  error(message: string, ...optionalParams: string[]) {
    console.log(this.format('error', message, optionalParams));
  }

  warn(message: string, ...optionalParams: string[]) {
    console.log(this.format('warn', message, optionalParams));
  }

  debug(message: string, ...optionalParams: string[]) {
    console.log(this.format('debug', message, optionalParams));
  }

  verbose(message: string, ...optionalParams: string[]) {
    console.log(this.format('verbose', message, optionalParams));
  }
}