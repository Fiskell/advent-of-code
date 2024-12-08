const fs = require('fs');
const path = require('path');
const { solution_part2 } = require('../solution');

describe('2024 - Day 8 - Part 2', () => {
  it('should handle horizontal pattern', () => {
    const input = fs.readFileSync(path.resolve(__dirname, './horizontal.txt'), 'utf8');
    expect(solution_part2(input)).toBe(5); // two points plus one antinode
  });

  it('should handle vertical pattern', () => {
    const input = fs.readFileSync(path.resolve(__dirname, './vertical.txt'), 'utf8');
    expect(solution_part2(input)).toBe(3); // two points plus one antinode
  });

  it('should handle diagonal down-right pattern', () => {
    const input = fs.readFileSync(path.resolve(__dirname, './diagonal-down-right.txt'), 'utf8');
    expect(solution_part2(input)).toBe(3); // two points plus one antinode
  });

  it('should handle diagonal up-right pattern', () => {
    const input = fs.readFileSync(path.resolve(__dirname, './diagonal-up-right.txt'), 'utf8');
    expect(solution_part2(input)).toBe(5); // two points plus one antinode
  });

  it('should handle sample case correctly', () => {
    const input = fs.readFileSync(path.resolve(__dirname, '../sample.txt'), 'utf8');
    expect(solution_part2(input)).toBe(34);
  });

  it('should handle sample case 2 correctly', () => {
    const input = fs.readFileSync(path.resolve(__dirname, '../sample2.txt'), 'utf8');
    expect(solution_part2(input)).toBe(9);
  });
});
