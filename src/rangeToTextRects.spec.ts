import { rangeToTextRects } from './rangeToTextRects';

const coveredLength = (rects: DOMRect[]) => rects.reduce((sum, rect) => sum + rect.width, 0);

const textOf = (selector: string) => {
  const element = document.querySelector(selector);
  const node = element?.firstChild;
  if (!node || node.nodeType !== Node.TEXT_NODE) {
    throw new Error(`no text node for ${selector}`);
  }
  return node;
};

const select = (range: Range) => {
  const selection = window.getSelection();
  if (!selection) {
    throw new Error('no selection');
  }
  selection.removeAllRanges();
  selection.addRange(range);
  return range;
};

describe('rangeToTextRects', () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<div id="layer"><span id="a">Alpha</span><span id="b">Beta</span><span id="c">Gamma</span></div>';

    // jsdom does not lay out text. Width stands in for the characters covered.
    Range.prototype.getClientRects = function getClientRects() {
      const text = this.toString();
      if (!text) {
        return [] as unknown as DOMRectList;
      }
      const rect = {
        x: 0,
        y: 0,
        width: text.length,
        height: 10,
        top: 0,
        left: 0,
        bottom: 10,
        right: text.length,
      } as DOMRect;
      return [rect] as unknown as DOMRectList;
    };
  });

  it('covers a partial selection that starts and ends on text nodes', () => {
    const range = document.createRange();
    range.setStart(textOf('#a'), 2);
    range.setEnd(textOf('#c'), 3);
    select(range);

    expect(coveredLength(rangeToTextRects(range))).toBe(range.toString().length);
  });

  it('covers a selection whose start container is an element', () => {
    const layer = document.querySelector('#layer');
    if (!layer) {
      throw new Error('missing layer');
    }
    const range = document.createRange();
    range.setStart(layer, 0);
    range.setEnd(textOf('#c'), 3);
    select(range);

    const rects = rangeToTextRects(range);
    expect(rects.length).toBeGreaterThan(0);
    expect(coveredLength(rects)).toBe(range.toString().length);
  });

  it('covers a selection that starts and ends on an element', () => {
    const layer = document.querySelector('#layer');
    if (!layer) {
      throw new Error('missing layer');
    }
    const range = document.createRange();
    range.setStart(layer, 1);
    range.setEnd(layer, 3);
    select(range);

    const rects = rangeToTextRects(range);
    expect(rects.length).toBeGreaterThan(0);
    expect(coveredLength(rects)).toBe(range.toString().length);
    expect(range.toString()).toBe('BetaGamma');
  });

  it('stops at an element end boundary and leaves the next text node out', () => {
    const layer = document.querySelector('#layer');
    if (!layer) {
      throw new Error('missing layer');
    }
    const range = document.createRange();
    range.setStart(textOf('#a'), 0);
    range.setEnd(layer, 1);
    select(range);

    expect(range.toString()).toBe('Alpha');
    expect(coveredLength(rangeToTextRects(range))).toBe('Alpha'.length);
  });

  it('covers every line when the selection ends on an element', () => {
    const layer = document.querySelector('#layer');
    if (!layer) {
      throw new Error('missing layer');
    }
    const range = document.createRange();
    range.setStart(textOf('#a'), 1);
    range.setEnd(layer, layer.childNodes.length);
    select(range);

    expect(coveredLength(rangeToTextRects(range))).toBe(range.toString().length);
  });
});
