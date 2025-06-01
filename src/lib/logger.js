// ロガー
import pino from "pino";
import pretty from "pino-pretty";

const stream = pretty({
  colorize: true,
  translateTime: "yyyy-mm-dd HH:MM:ss.l",
  ignore: "pid,hostname",
});

const logger = pino({}, stream);

export default logger;
