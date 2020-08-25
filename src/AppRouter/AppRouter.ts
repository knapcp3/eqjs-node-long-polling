import Router from '../Router/Router';
import { talksServiceProxy } from '../Talks/Talks.service.proxy';
import { HEADERS } from '../modules/headers';
import { readStream } from '../modules/utils';
import { Talk, TalkRB } from '../models/Talk.model';
import uniqid from 'uniqid';
import { Comment } from '../models/Comment.model';

const appRouter = new Router();

const talkPathRegex = /^\/talks$/;
const talkPathWithParamRegex = /^\/talks\/([^/]+)$/;
const commentPathRegex = /^\/talks\/([^/]+)\/comments$/;

appRouter.add('GET', talkPathWithParamRegex, async (urlMatches) => {
  const id = urlMatches[0];
  const talk = await talksServiceProxy.findById(id);

  if (talk) {
    return {
      body: JSON.stringify(talk),
      status: 200,
      headers: {
        [HEADERS.CONTENT_TYPE]: HEADERS.APP_JSON,
      },
    };
  } else {
    return {
      body: `No talk found with ${id} id`,
      status: 404,
    };
  }
});

appRouter.add('GET', talkPathRegex, async (_, request) => {
  const preferHeader = request.headers[HEADERS.PREFER];
  let preferWaitValue = 0;
  if (preferHeader !== '' && typeof preferHeader === 'string') {
    const regexArray = /\bwait=(\d+)/.exec(preferHeader);
    preferWaitValue = regexArray ? Number(regexArray[1]) : 0;
  }

  const ifNoneMatchTag = request.headers[HEADERS.IF_NONE_MATCH];

  if (
    !ifNoneMatchTag ||
    ifNoneMatchTag !== talksServiceProxy.version.toString()
  ) {
    return talksServiceProxy.buildTalksResponse();
  } else if (!preferWaitValue) {
    return {
      status: 304,
    };
  } else {
    return new Promise((resolve) => {
      talksServiceProxy.addResolveToWaiting(resolve);
      setTimeout(async () => {
        const isPromiseNotResolvedYet = !!talksServiceProxy.waiting.find(
          (resolveFn) => resolveFn === resolve
        );
        if (isPromiseNotResolvedYet) {
          resolve({
            status: 304,
          });
        }
      }, preferWaitValue * 1000);
    });
  }
});

appRouter.add('POST', talkPathRegex, async (_, request) => {
  const requestBody = await readStream(request);
  let talkRB: TalkRB;
  try {
    talkRB = JSON.parse(requestBody);
  } catch (_) {
    return { status: 400, body: 'Invalid JSON' };
  }

  if (
    !talkRB ||
    typeof talkRB.title !== 'string' ||
    typeof talkRB.presenter !== 'string' ||
    typeof talkRB.summary !== 'string'
  ) {
    return { status: 400, body: 'Bad talk data' };
  }

  const talk: Talk = {
    comments: [],
    ...talkRB,
    id: uniqid(),
  };

  const createdTalk = await talksServiceProxy.create(talk);

  return { status: 201, body: JSON.stringify(createdTalk) };
});

appRouter.add('DELETE', talkPathWithParamRegex, async (urlMatches) => {
  const id = urlMatches[0];

  await talksServiceProxy.deleteById(id);

  return {
    status: 204,
  };
});

appRouter.add('POST', commentPathRegex, async (urlMatches, request) => {
  const requestBody = await readStream(request);
  let comment: Comment;
  try {
    comment = JSON.parse(requestBody);
  } catch (_) {
    return { status: 400, body: 'Invalid JSON' };
  }

  if (
    !comment ||
    typeof comment.author !== 'string' ||
    typeof comment.message !== 'string'
  ) {
    return { status: 400, body: 'Bad comment data' };
  }

  const talkId = urlMatches[0];
  const talk = await talksServiceProxy.findById(talkId);

  if (talk) {
    await talksServiceProxy.createComment(talkId, comment);
    return {
      status: 201,
      body: JSON.stringify(comment),
    };
  } else {
    return {
      body: `No talk found with ${talkId} id`,
      status: 404,
    };
  }
});

export default appRouter;
