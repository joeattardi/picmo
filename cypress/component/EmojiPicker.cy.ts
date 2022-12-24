import EmojiPicker from '../../src/components/EmojiPicker.svelte';

describe('EmojiPicker.cy.ts', () => {
  it('jumps to a category when clicking a tab', () => {
    cy.mount(EmojiPicker);

    cy.get('[data-category-key="animals-nature"] > h3').should('not.be.visible');
    cy.get('li[data-category-key="animals-nature"]').click();

    cy.get('[data-category-key="animals-nature"] > h3').should('be.visible');
  });
});
