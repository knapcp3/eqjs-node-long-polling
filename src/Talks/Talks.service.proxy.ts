import TalksService, { talksService } from './Talks.service';
import { ResolveFn } from '../models/promises.model';
import { ICRUDService } from '../models/services.model';
import { Talk } from '../models/Talk.model';
import { Response } from '../models/Response.model';
import { Comment } from '../models/Comment.model';

class TalksServiceProxy implements ICRUDService<Talk, Talk> {
  private _talksService: TalksService;
  private _version: number;
  private _waiting: ResolveFn[];

  constructor(talksService: TalksService) {
    this._version = 1;
    this._waiting = [];
    this._talksService = talksService;
  }

  private updateWaiting() {
    this._version++;
    const response = this.buildTalksResponse();
    this._waiting.forEach((resolve) => resolve(response));
    this._waiting = [];
  }

  async buildTalksResponse(): Promise<Response> {
    const talks = await this.findAll();

    return {
      status: 200,
      body: JSON.stringify(talks),
      headers: {
        'Content-Type': 'application/json',
        ETag: this._version,
        'Cache-Control': 'no-store',
      },
    };
  }

  async existsById(id: string): Promise<boolean> {
    return this._talksService.existsById(id);
  }

  async findById(id: string): Promise<Talk | undefined> {
    return this._talksService.findById(id);
  }

  async findAll(): Promise<Talk[]> {
    return this._talksService.findAll();
  }

  async deleteById(id: string): Promise<void> {
    const result = this._talksService.deleteById(id);
    this.updateWaiting();
    return result;
  }

  async deleteAll(): Promise<void> {
    const result = this._talksService.deleteAll();
    this.updateWaiting();
    return result;
  }

  async updateById(id: string, talk: Talk): Promise<Talk> {
    const result = this._talksService.updateById(id, talk);
    this.updateWaiting();
    return result;
  }

  async updateAll(): Promise<Talk[]> {
    const result = this._talksService.updateAll();
    this.updateWaiting();
    return result;
  }

  async create(talk: Talk): Promise<Talk> {
    const result = this._talksService.create(talk);
    this.updateWaiting();
    return result;
  }

  async createAll(talks: Talk[]): Promise<Talk[]> {
    const result = this._talksService.createAll(talks);
    this.updateWaiting();
    return result;
  }

  async createComment(talkId: string, comment: Comment): Promise<boolean> {
    const result = this._talksService.createComment(talkId, comment);
    this.updateWaiting();
    return result;
  }

  addResolveToWaiting(resolveFn: ResolveFn): void {
    this._waiting.push(resolveFn);
  }

  get talks(): Talk[] {
    return this._talksService.talks;
  }

  get version(): number {
    return this._version;
  }

  get waiting(): ResolveFn[] {
    return this._waiting;
  }
}

const talksServiceProxy = new TalksServiceProxy(talksService);
export { talksServiceProxy };

export default TalksServiceProxy;
