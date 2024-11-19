import { GroupByNamePipe } from './group-by-name.pipe';

describe('GroupByNamePipe', () => {
  it('create an instance', () => {
    const pipe = new GroupByNamePipe();
    expect(pipe).toBeTruthy();
  });
});
