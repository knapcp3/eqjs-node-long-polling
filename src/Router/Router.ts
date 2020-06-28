import { parse } from "url";
import { Route } from "../models/Route.model";
import { IncomingMessage } from "http";
import SkillShareServer from "src/SkillShareServer/SkillShareServer";

class Router {
  private _routes: Route[];

  constructor() {
    this._routes = [];
  }

  add(method: string, url: RegExp, handler: () => Promise<Response>): void {
    this.routes.push({ method, url, handler });
  }
  
  resolve(context: SkillShareServer, request: IncomingMessage): Promise<Response> | null {
    const path = parse(request.url || '').pathname || '';

    for (const { method, url, handler } of this.routes) {
      const match = url.exec(path);
      if (!match || request.method != method) continue;
      const urlParts = match.slice(1).map(decodeURIComponent);
      return handler(context, ...urlParts, request);
    }
    return null;
  }

  public get routes(): Route[] {
    return this._routes;
  }
};

export default Router;