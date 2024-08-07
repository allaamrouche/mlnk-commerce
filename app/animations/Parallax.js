import Animation from '../classes/Animation';
import Prefix from 'prefix';
import { getOffset } from '../utils/dom';
import { clamp, map } from '../utils/math';

export default class Parallax extends Animation {
  constructor({ element, elements }) {
    super({
      element,
      elements
    });

    this.transform = Prefix('transform');
    this.amount = 100;
    this.parallax = {
      current: -this.amount,
      target: -this.amount
    };
    this.scale = {
      current: 1.05,
      target: 1.05
    };

    this.media = this.element.querySelector('img');

    this.media.onload = _ => {
      this.onResize()
    }
    this.onResize()
  }

  onResize() {
    this.amount = window.innerWidth < 1024 ? 10 : 150
    this.offset = getOffset(this.element)
  }

  updateParallax(scroll) {
    if (!this.offset) {
      return;
    }

    const { innerHeight } = window;
    const offsetBottom = scroll.current + innerHeight;

    if (offsetBottom >= this.offset.top) {
      this.parallax.current = clamp(-this.amount, this.amount, map(this.offset.top - scroll.current, -this.offset.height, innerHeight, this.amount, -this.amount));
      this.scale.current = clamp(1, 1.05, map(this.offset.top - scroll.current, -this.offset.height, innerHeight, 1, 1.05));

      this.media.style[this.transform] = `translate3d(0, ${this.parallax.current}px, 0) scale(${this.scale.current})`;
    } else {
      this.media.style[this.transform] = `translate3d(0, -${this.amount}px, 0) scale(1.05)`;
    }
  }

  update(scroll) {
    this.updateParallax(scroll);
  }
}