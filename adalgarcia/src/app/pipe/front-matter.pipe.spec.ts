import { FrontMatterPipe } from './front-matter.pipe';

describe('FrontMatterPipe', () => {
  it('create an instance', () => {
    const pipe = new FrontMatterPipe();
    expect(pipe).toBeTruthy();
  });
});
