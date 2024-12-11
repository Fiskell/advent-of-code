const fs = require('fs');
const path = require('path');
const { solution_part1, solution_part2 } = require('../solution');

describe('2024 - Day 8 - Part 2', () => {
  it('simple', () => {
    const input = fs.readFileSync(path.resolve(__dirname, './sample.txt'), 'utf8');
    expect(solution_part1(input)).toBe(10);
  });
  it('sample', () => {
    const input = fs.readFileSync(path.resolve(__dirname, './sample2.txt'), 'utf8');
    expect(solution_part1(input)).toBe(36);
  });

  // it('part 2', () => {
  //   const input = fs.readFileSync(path.resolve(__dirname, './diagonal-down-right.txt'), 'utf8');
  //   expect(solution_part2(input)).toBe(2858);
  // });
});
