import { describe, it, expect } from "vitest";
import { convertTabToNotes } from "./index";

describe('basic test', () => {
  it('runs without errors', () => {
    const result = convertTabToNotes("e|--0--\nB|--1--\nG|--0--\nD|-----\nA|-----\nE|-----");
    expect(result.upper).toMatch(/E-C-G/);
  });
});
