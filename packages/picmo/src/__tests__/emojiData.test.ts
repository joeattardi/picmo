import { rest } from 'msw';
import { initDatabase } from '../emojiData';
import { server } from '../../testHelpers/mocks/server';

jest.mock('../db');

import * as util from '../util';

import { Database } from '../db';
import { Emoji, MessagesDataset } from 'emojibase';

const headRequests = [
  rest.head('https://cdn.jsdelivr.net/npm/emojibase-data@latest/en/:dataset.json', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.set('etag', `${req.params.dataset}-etag`),
    );
  })
];

const headErrorRequests = [
  rest.head('https://cdn.jsdelivr.net/npm/emojibase-data@latest/en/:dataset.json', (req, res, ctx) => {
    return res(
      ctx.status(500)
    );
  }),
]

const dataRequests = [
  rest.get('https://cdn.jsdelivr.net/npm/emojibase-data@latest/en/:dataset.json', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(responseData[req.params.dataset as string]),
      ctx.set('etag', `${req.params.dataset}-etag`),
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
  const populateMock = jest.spyOn(Database.prototype, 'populate');
  
  beforeEach(() => {
    populateMock.mockReset();
  });

  test('creates a database with static data', async () => {
    await initDatabase(
      'en',
      staticMessages as MessagesDataset,
      staticEmojis as Emoji[]
    );

    expect(Database).toHaveBeenCalledWith('en');
  });

  describe('CDN data', () => {
    test('populates an empty database from CDN', async () => {
      server.use(
        ...headRequests,
        ...dataRequests
      );

      jest.spyOn(Database.prototype, 'isPopulated').mockResolvedValue(false);

      await initDatabase('en');
      expect(populateMock).toHaveBeenCalledWith({
        groups: staticMessages.groups,
        emojis: staticEmojis,
        emojisEtag: 'data-etag',
        messagesEtag: 'messages-etag'
      })
    });

    test('checks a populated database for updates (no update)', async () => {
      server.use(...headRequests);

      jest.spyOn(Database.prototype, 'isPopulated').mockResolvedValue(true);
      jest.spyOn(Database.prototype, 'getEtags').mockResolvedValue({
        storedEmojisEtag: 'data-etag',
        storedMessagesEtag: 'messages-etag'
      });

      await initDatabase('en');
      expect(populateMock).not.toHaveBeenCalled();
    });

    test('does not repopulate if the etag request fails', async () => {
      server.use(...headErrorRequests);

      jest.spyOn(Database.prototype, 'isPopulated').mockResolvedValue(true);
      await initDatabase('en');
      expect(populateMock).not.toHaveBeenCalled();
    });

    test('repopulates if unable to get etags from the database', async () => {
      server.use(...headRequests, ...dataRequests);

      Database.prototype.locale = 'en';
      jest.spyOn(Database.prototype, 'isPopulated').mockResolvedValue(true);
      jest.spyOn(Database.prototype, 'getEtags').mockRejectedValue(new Error('Database error'));

      await initDatabase('en');

      expect(populateMock).toHaveBeenCalledWith({
        groups: staticMessages.groups,
        emojis: staticEmojis,
        emojisEtag: 'data-etag',
        messagesEtag: 'messages-etag'
      });
    });

    test('checks a populated database for updates (update available, repopulate)', async () => {
      server.use(...headRequests, ...dataRequests);

      jest.spyOn(Database.prototype, 'isPopulated').mockResolvedValue(true);
      jest.spyOn(Database.prototype, 'getEtags').mockResolvedValue({
        storedEmojisEtag: 'data-etag-old',
        storedMessagesEtag: 'messages-etag-old'
      });
      Database.prototype.locale = 'en';

      await initDatabase('en');

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
      jest.spyOn(Database.prototype, 'isPopulated').mockResolvedValue(false);
      Database.prototype.locale = 'en';

      await initDatabase('en', staticMessages as MessagesDataset, staticEmojis as Emoji[]);
      expect(populateMock).toHaveBeenCalledWith({
        groups: staticMessages.groups,
        emojis: staticEmojis,
        hash: 'abc123'
      });
    });

    test('checks a populated database for updates (no update)', async () => {
      jest.spyOn(Database.prototype, 'isPopulated').mockResolvedValue(true);
      jest.spyOn(Database.prototype, 'getHash').mockResolvedValue('abc123');

      await initDatabase('en', staticMessages as MessagesDataset, staticEmojis as Emoji[]);
      expect(populateMock).not.toHaveBeenCalled();
    });

    test('checks a populated database for updates (update available, repopulate)', async () => {
      jest.spyOn(Database.prototype, 'isPopulated').mockResolvedValue(true);
      jest.spyOn(Database.prototype, 'getHash').mockResolvedValue('old-hash');

      await initDatabase('en', staticMessages as MessagesDataset, staticEmojis as Emoji[]);
      expect(populateMock).toHaveBeenCalledWith({
        groups: staticMessages.groups,
        emojis: staticEmojis,
        hash: 'abc123'
      });
    });
  });
});
