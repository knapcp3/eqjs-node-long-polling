import { createServer, Server } from 'http';
import Router from '../Router/Router';
import ecstatic from 'ecstatic';
import { talksService } from '../Talks/Talks.service';


const defaultHeaders = { 'Content-Type': 'text/plain' };

class SkillShareServer {
  private _server: Server;
  private _router: Router;

  constructor(router: Router) {
    this._router = router;

    const fileServer = ecstatic({ root: `${process.cwd()}/build/public` });

    this._server = createServer((request, response) => {
      const resolved = this._router.resolve(request);

      if (resolved) {
        resolved
          .catch((error) => {
            if (error.status != null) return error;
            return { body: String(error), status: 500 };
          })
          .then(({ body, status = 200, headers = defaultHeaders }) => {
            response.writeHead(status, headers);
            response.end(body);
            
            console.log('---P');
            console.log(body);
            console.log(status);
            console.log(headers);
            console.log('---K');
          });
      } else {
        fileServer(request, response);
      }
    });
  }

  start(port: number): void {
    this._server.listen(port);
  }

  stop(): void {
    this._server.close();
  }
}

export default SkillShareServer;
