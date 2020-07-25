import { IncomingMessage } from 'http';
import { Response } from './Response.model';

export type RequestHandler = (
  urlMatches: string[],
  request: IncomingMessage
) => Promise<Response>;

export interface Route {
  method: string;
  urlRegex: RegExp;
  handler: RequestHandler;
}
