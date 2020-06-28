import { createServer, Server } from 'http';
import Router from './../Router/Router';
import ecstatic from 'ecstatic';

const router = new Router();
const defaultHeaders = { 'Content-Type': 'text/plain' };

class SkillShareServer {
  private talks: any;
  private version: number;
  private waiting: any[];
  private server: Server;

  constructor(talks: any) {
    this.talks = talks;
    this.version = 0;
    this.waiting = [];

    const fileServer = ecstatic({ root: `${process.cwd()}/build/public` });

    this.server = createServer((request, response) => {
      const resolved = router.resolve(this, request);

      if (resolved) {
        resolved
          .catch((error) => {
            if (error.status != null) return error;
            return { body: String(error), status: 500 };
          })
          .then(({ body, status = 200, headers = defaultHeaders }) => {
            response.writeHead(status, headers);
            response.end(body);
          });
      } else {
        fileServer(request, response);
      }
    });
  }

  start(port: number): void {
    this.server.listen(port);
  }
  
  stop(): void {
    this.server.close();
  }
}

export default SkillShareServer;
