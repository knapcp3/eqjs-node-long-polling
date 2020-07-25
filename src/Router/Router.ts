import { parse } from 'url';
import { Route, RequestHandler } from '../models/Route.model';
import { IncomingMessage } from 'http';
import { Response } from '../models/Response.model';

class Router {
  private _routes: Route[];

  constructor() {
    this._routes = [];
  }

  add(method: string, urlRegex: RegExp, handler: RequestHandler): void {
    this._routes.push({ method, urlRegex, handler });
  }

  resolve(request: IncomingMessage): Promise<Response> | null {
    const path = parse(request.url || '').pathname || '';

    for (const { method, urlRegex, handler } of this.routes) {
      const match = urlRegex.exec(path);
      if (!match || request.method != method) continue;
      const urlMatches = match.slice(1).map(decodeURIComponent);
      return handler(urlMatches, request);
    }
    return null;
  }

  public get routes(): Route[] {
    return this._routes;
  }
}

export default Router;
