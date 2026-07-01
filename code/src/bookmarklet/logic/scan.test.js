import test from 'node:test';
import assert from 'node:assert/strict';
import { deduplicateViolationNodes } from './scan.js';

test('deduplicates repeated node entries within the same violation', () => {
  const violations = [
    {
      id: 'color-contrast',
      nodes: [
        { target: ['#first'], html: '<button>' },
        { target: ['#first'], html: '<button>' },
        { target: ['#second'], html: '<a>' }
      ]
    }
  ];

  const result = deduplicateViolationNodes(violations);

  assert.equal(result[0].nodes.length, 2);
  assert.deepEqual(result[0].nodes.map((node) => node.target[0]), ['#first', '#second']);
});

test('keeps separate violations with the same node target', () => {
  const violations = [
    {
      id: 'color-contrast',
      nodes: [{ target: ['#shared'], html: '<button>' }]
    },
    {
      id: 'image-alt',
      nodes: [{ target: ['#shared'], html: '<img>' }]
    }
  ];

  const result = deduplicateViolationNodes(violations);

  assert.equal(result.length, 2);
  assert.equal(result[0].nodes.length, 1);
  assert.equal(result[1].nodes.length, 1);
});
