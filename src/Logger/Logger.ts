import redact from "../Constants";
export class Logger {
  log(str: string) {
    console.log(redact(str));
  }

  info(str: string) {
    console.info(redact(str));
  }

  debug(str: string) {
    console.debug(redact(str));
  }

  error(str: string) {
    console.error(redact(str));
  }

  warn(str: string) {
    console.warn(redact(str));
  }
}
