import { Talk } from '../models/Talk.model';
import { Comment } from '../models/Comment.model';
import { ICRUDService } from '../models/services.model';

class TalksService implements ICRUDService<Talk, Talk> {
  private _talks: Talk[];

  constructor() {
    this._talks = [];
  }

  async existsById(id: string): Promise<boolean> {
    return this._talks.some((talk) => talk.id === id);
  }

  async findById(id: string): Promise<Talk | undefined> {
    return this._talks.find((talk) => talk.id === id);
  }

  async findAll(): Promise<Talk[]> {
    return this._talks;
  }

  async deleteById(id: string): Promise<void> {
    this._talks = this._talks.filter((talk) => talk.id !== id);
  }

  async deleteAll(): Promise<void> {
    this._talks = [];
  }

  async updateById(id: string, talk: Talk): Promise<Talk> {
    const talkIndex = this._talks.findIndex((talk) => id === talk.id);
    this._talks[talkIndex] = talk;
    return talk;
  }

  async updateAll(): Promise<Talk[]> {
    // TODO
    return [];
  }

  async create(talk: Talk): Promise<Talk> {
    this._talks.push(talk);
    return talk;
  }

  async createAll(talks: Talk[]): Promise<Talk[]> {
    talks.forEach((talk) => {
      this._talks.push(talk);
    });

    return talks;
  }

  async createComment(talkId: string, comment: Comment): Promise<boolean> {
    const talk = await this.findById(talkId);
    if (talk) {
      talk.comments.push(comment);
      return true;
    }
    return false;
  }

  get talks(): Talk[] {
    return this._talks;
  }
}

const talksService = new TalksService();
export { talksService };

export default TalksService;
