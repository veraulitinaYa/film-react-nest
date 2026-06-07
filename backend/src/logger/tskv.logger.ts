import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {

  private format(level: string, message: string, optionalParams: string[]) {
    const fields: Record<string, string> = {
      level,
      message: String(message),
      timestamp: new Date().toISOString(),
    };

    if (optionalParams?.length) {
      fields.params = JSON.stringify(optionalParams);
    }

    return Object.entries(fields)
      .map(([k, v]) => `${k}=${v}`)
      .join('\t');
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