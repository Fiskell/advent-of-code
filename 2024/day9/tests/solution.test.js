const fs = require('fs');
const path = require('path');
const { solution_part1, solution_part2 } = require('../solution');

describe('2024 - Day 8 - Part 2', () => {
  it('simple', () => {
    const input = '12345';
    expect(solution_part1(input)).toBe(60);
  });
  it('sample', () => {
    const input = '2333133121414131402';
    expect(solution_part1(input)).toBe(1928);
  });

  it('part 2', () => {
    const input = '2333133121414131402';
    expect(solution_part2(input)).toBe(2858);
  });
});
