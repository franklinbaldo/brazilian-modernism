import '@testing-library/jest-dom';

// Mock element.animate for jsdom environments (used by svelte/transition)
if (typeof Element !== 'undefined') {
  Element.prototype.animate = () => {
    return {
      finished: Promise.resolve(),
      play: () => {},
      cancel: () => {},
      onfinish: null,
      oncancel: null,
    } as unknown as Animation;
  };
}

// Enhanced Dialog mock to properly set 'open' attribute
if (typeof HTMLDialogElement !== 'undefined') {
  HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
    this.setAttribute('open', '');
    this.dispatchEvent(new Event('open'));
  };
  HTMLDialogElement.prototype.close = function () {
    this.open = false;
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
}
