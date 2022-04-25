import { screen } from '@testing-library/dom';
import { testView } from '../../../testHelpers/testView';

import { EmojiPreview } from '../Preview';

import { Events } from '../../events';
import { AppEvent } from '../../AppEvents';

describe('Preview', () => {
  const events = new Events<AppEvent>();

  test('shows and hides a preview', async () => {
    const preview = await testView(EmojiPreview, [], { events });

    const emoji = {
      label: 'smile',
      tags: ['tag1', 'tag2']
    };

    const emojiContent = document.createElement('span');
    emojiContent.textContent = '😎';

    events.emit('preview:show', emoji, emojiContent);
    
    expect(preview.ui.emoji).toHaveTextContent('😎');
    expect(preview.ui.name).toHaveTextContent('smile');
    const tags = screen.getAllByRole('listitem');
    expect(tags).toHaveLength(2);
    expect(tags[0]).toHaveTextContent('tag1');
    expect(tags[1]).toHaveTextContent('tag2');

    events.emit('preview:hide');
    expect(preview.ui.emoji).toBeEmptyDOMElement();
    expect(preview.ui.name).toBeEmptyDOMElement();
    expect(preview.ui.tagList).toBeEmptyDOMElement();
  });
});
