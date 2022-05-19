import { rest } from 'msw';
import { initDatabase } from '../emojiData';
import { server } from '../../../testHelpers/mocks/server';
// import { InMemoryStoreFactory, InMemoryStore } from '../../../testHelpers/InMemoryStore';
import * as util from '../../util';
import { InMemoryStore, InMemoryStoreFactory } from '../InMemoryStore';
// jest.mock('../InMemoryStore', () => {
//   const originalModule = jest.requireActual
// });

// jest.mock('../InMemoryStore', () => {
//   return {
//     __esModule: true,

//   }
// });

// import '../../../testHelpers/mockDatabase';

import { Emoji, MessagesDataset } from 'emojibase';

const headRequests = [
  rest.head('https://cdn.jsdelivr.net/npm/emojibase-data@latest/en/:dataset.json', (req, res, ctx) => {
    return res(ctx.status(200), ctx.set('etag', `${req.params.dataset}-etag`));
  })
];

const headErrorRequests = [
  rest.head('https://cdn.jsdelivr.net/npm/emojibase-data@latest/en/:dataset.json', (req, res, ctx) => {
    return res(ctx.status(500));
  })
];

const dataRequests = [
  rest.get('https://cdn.jsdelivr.net/npm/emojibase-data@latest/en/:dataset.json', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(responseData[req.params.dataset as string]),
      ctx.set('etag', `${req.params.dataset}-etag`)
    );
  })
];

const staticMessages = {
  groups: [
    { key: 'smileys-emotion', message: 'Group 1', order: 1 },
    { key: 'symbols', message: 'Group 1', order: 2 }
  ],
  skinTones: [],
  subgroups: []
};

const staticEmojis = [
  { emoji: '😎', text: 'smile' },
  { emoji: '⚡️', text: 'zap' }
];

const responseData = {
  data: staticEmojis,
  messages: staticMessages
};

describe('emojiData', () => {
  jest.spyOn(util, 'computeHash').mockResolvedValue('abc123');
  const populateMock = jest.spyOn(InMemoryStore.prototype, 'populate');
  // const populateMock = jest.spyOn(InMemoryStore.prototype, 'populate');

  beforeEach(() => {
    populateMock.mockReset();
  });

  test('creates a database with static data', async () => {
    const store = await initDatabase(
      'en',
      InMemoryStoreFactory,
      staticMessages as MessagesDataset,
      staticEmojis as Emoji[]
    );

    expect(store).toBeDefined();
  });

  describe('CDN data', () => {
    test('populates an empty database from CDN', async () => {
      server.use(...headRequests, ...dataRequests);

      jest.spyOn(InMemoryStore.prototype, 'isPopulated').mockResolvedValue(false);

      await initDatabase('en', InMemoryStoreFactory);
      expect(populateMock).toHaveBeenCalledWith({
        groups: staticMessages.groups,
        emojis: staticEmojis,
        emojisEtag: 'data-etag',
        messagesEtag: 'messages-etag'
      });
    });

    test('checks a populated database for updates (no update)', async () => {
      server.use(...headRequests);

      jest.spyOn(InMemoryStore.prototype, 'isPopulated').mockResolvedValue(true);
      jest.spyOn(InMemoryStore.prototype, 'getEtags').mockResolvedValue({
        storedEmojisEtag: 'data-etag',
        storedMessagesEtag: 'messages-etag'
      });

      await initDatabase('en', InMemoryStoreFactory);
      expect(populateMock).not.toHaveBeenCalled();
    });

    test('does not repopulate if the etag request fails', async () => {
      server.use(...headErrorRequests);

      jest.spyOn(InMemoryStore.prototype, 'isPopulated').mockResolvedValue(true);
      await initDatabase('en', InMemoryStoreFactory);
      expect(populateMock).not.toHaveBeenCalled();
    });

    test('repopulates if unable to get etags from the database', async () => {
      server.use(...headRequests, ...dataRequests);

      InMemoryStore.prototype.locale = 'en';
      jest.spyOn(InMemoryStore.prototype, 'isPopulated').mockResolvedValue(true);
      jest.spyOn(InMemoryStore.prototype, 'getEtags').mockRejectedValue(new Error('Database error'));

      await initDatabase('en', InMemoryStoreFactory);

      expect(populateMock).toHaveBeenCalledWith({
        groups: staticMessages.groups,
        emojis: staticEmojis,
        emojisEtag: 'data-etag',
        messagesEtag: 'messages-etag'
      });
    });

    test('checks a populated database for updates (update available, repopulate)', async () => {
      server.use(...headRequests, ...dataRequests);

      jest.spyOn(InMemoryStore.prototype, 'isPopulated').mockResolvedValue(true);
      jest.spyOn(InMemoryStore.prototype, 'getEtags').mockResolvedValue({
        storedEmojisEtag: 'data-etag-old',
        storedMessagesEtag: 'messages-etag-old'
      });
      InMemoryStore.prototype.locale = 'en';

      await initDatabase('en', InMemoryStoreFactory);

      expect(populateMock).toHaveBeenCalledWith({
        groups: staticMessages.groups,
        emojis: staticEmojis,
        emojisEtag: 'data-etag',
        messagesEtag: 'messages-etag'
      });
    });
  });

  describe('local data', () => {
    test('populates an empty database from local', async () => {
      jest.spyOn(InMemoryStore.prototype, 'isPopulated').mockResolvedValue(false);
      InMemoryStore.prototype.locale = 'en';

      await initDatabase('en', InMemoryStoreFactory, staticMessages as MessagesDataset, staticEmojis as Emoji[]);
      expect(populateMock).toHaveBeenCalledWith({
        groups: staticMessages.groups,
        emojis: staticEmojis,
        hash: 'abc123'
      });
    });

    test('checks a populated database for updates (no update)', async () => {
      jest.spyOn(InMemoryStore.prototype, 'isPopulated').mockResolvedValue(true);
      jest.spyOn(InMemoryStore.prototype, 'getHash').mockResolvedValue('abc123');

      await initDatabase('en', InMemoryStoreFactory, staticMessages as MessagesDataset, staticEmojis as Emoji[]);
      expect(populateMock).not.toHaveBeenCalled();
    });

    test('checks a populated database for updates (update available, repopulate)', async () => {
      jest.spyOn(InMemoryStore.prototype, 'isPopulated').mockResolvedValue(true);
      jest.spyOn(InMemoryStore.prototype, 'getHash').mockResolvedValue('old-hash');

      await initDatabase('en', InMemoryStoreFactory, staticMessages as MessagesDataset, staticEmojis as Emoji[]);
      expect(populateMock).toHaveBeenCalledWith({
        groups: staticMessages.groups,
        emojis: staticEmojis,
        hash: 'abc123'
      });
    });
  });
});
