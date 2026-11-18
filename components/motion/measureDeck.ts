/** Scroll-scene measurement for the /services card deck (see app/scroll-scenes.css). */
export function measureDeck(root: HTMLElement) {
  const deck = root.querySelector<HTMLElement>(".sc-deck");
  if (!deck) return;
  const cards = [...deck.querySelectorAll<HTMLElement>(":scope > .sc-deck-card")];
  deck.style.setProperty("--sc-deck-h", `${deck.offsetHeight}px`);
  cards.forEach((card, index) => {
    card.style.setProperty("--i", String(index));
    card.style.setProperty("--n", String(cards.length));
    card.style.setProperty("--sc-x", `${deck.clientWidth / 2 - (card.offsetLeft + card.offsetWidth / 2)}px`);
  });
}
