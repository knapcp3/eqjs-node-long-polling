import { TALKS_URL, request } from '../modules/api';
import { Talk, TalkRB } from '../models/Talk.model';
import { Comment } from '../models/Comment.model';
import { setTalks } from '../modules/actions';

class TalksService {
  public async getTalks(): Promise<Talk[]> {
    const url = TALKS_URL;
    try {
      const response = await request<Talk[]>(url, {
        method: 'GET',
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      return Promise.resolve([]);
    }
  }

  public pollTalks(onTalkResponse: (talks: Talk[]) => void): void {
    const url = TALKS_URL;
    const waitValue = 5;
    let etag: string | undefined = undefined;

    const sendRequest = async () => {
      try {
        const response = await request<Talk[]>(url, {
          method: 'GET',
          headers: etag
            ? {
                'If-None-Match': etag,
                Prefer: `wait=${waitValue}`,
              }
            : undefined,
        });

        if (response.status !== 304) {
          etag = response.headers['etag'];
          onTalkResponse(response.data);
        }
      } catch (error) {
        this.handleError(error);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      sendRequest();
    };

    sendRequest();
  }

  public async getTalkById(id: string): Promise<Talk | void> {
    const url = `${TALKS_URL}/${id}`;
    try {
      const response = await request<Talk>(url, {
        method: 'GET',
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      return Promise.resolve();
    }
  }

  public async createTalk(talk: TalkRB): Promise<Talk | void> {
    const url = TALKS_URL;
    try {
      const response = await request<Talk>(url, {
        method: 'POST',
        data: talk,
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      return Promise.resolve();
    }
  }

  public async createComment(
    talkId: string,
    comment: Comment
  ): Promise<Comment | void> {
    const url = `${TALKS_URL}/${talkId}/comments`;

    try {
      const response = await request<Comment>(url, {
        method: 'POST',
        data: {
          message: comment.message,
          author: comment.author,
        },
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
      return Promise.resolve();
    }
  }

  public async deleteTalk(id: string): Promise<void> {
    const url = `${TALKS_URL}/${id}`;
    try {
      await request<Talk[]>(url, {
        method: 'DELETE',
      });
      return Promise.resolve();
    } catch (error) {
      this.handleError(error);
      return Promise.resolve();
    }
  }

  private handleError(error: Error): void {
    console.error(error);
  }
}

export default TalksService;

const talksService = new TalksService();
export { talksService };
