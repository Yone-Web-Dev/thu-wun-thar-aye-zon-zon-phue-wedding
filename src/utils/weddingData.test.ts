import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateWishInput,
  createNewWish,
  getTimeUntilWedding,
  INITIAL_WISHES
} from './weddingData';

test('validateWishInput rejects empty name', () => {
  const result = validateWishInput('', 'Wishing you great joy!');
  assert.equal(result.isValid, false);
  assert.equal(result.error, 'Please enter your name.');
});

test('validateWishInput rejects whitespace name', () => {
  const result = validateWishInput('   ', 'Wishing you great joy!');
  assert.equal(result.isValid, false);
  assert.equal(result.error, 'Please enter your name.');
});

test('validateWishInput rejects empty message', () => {
  const result = validateWishInput('Daw Mayzayar', '');
  assert.equal(result.isValid, false);
  assert.equal(result.error, 'Please write your message or blessing.');
});

test('validateWishInput rejects short message (<3 chars)', () => {
  const result = validateWishInput('Daw Mayzayar', 'hi');
  assert.equal(result.isValid, false);
  assert.equal(result.error, 'Your message should be at least 3 characters.');
});

test('validateWishInput rejects names over 100 characters', () => {
  const result = validateWishInput('a'.repeat(101), 'Congratulations!');
  assert.equal(result.isValid, false);
  assert.equal(result.error, 'Your name must be 100 characters or fewer.');
});

test('validateWishInput rejects messages over 2000 characters', () => {
  const result = validateWishInput('Aung San', 'a'.repeat(2001));
  assert.equal(result.isValid, false);
  assert.equal(result.error, 'Your message must be 2000 characters or fewer.');
});

test('validateWishInput accepts valid name and message', () => {
  const result = validateWishInput('Aung San', 'Congratulations on your special day!');
  assert.equal(result.isValid, true);
  assert.equal(result.error, undefined);
});

test('createNewWish builds a formatted wish object with trimmed strings', () => {
  const wish = createNewWish('  Daw Mayzayar  ', '  Wishing you the best!  ');
  assert.equal(wish.name, 'Daw Mayzayar');
  assert.equal(wish.message, 'Wishing you the best!');
  assert.ok(wish.id.startsWith('wish-'));
  assert.ok(wish.formattedDate.includes('Today at'));
});

test('getTimeUntilWedding computes remaining time correctly', () => {
  const future = new Date('2026-11-08T11:00:00Z');
  const current = new Date('2026-11-07T11:00:00Z');
  const res = getTimeUntilWedding(future, current);
  assert.equal(res.days, 1);
  assert.equal(res.hours, 0);
  assert.equal(res.isPast, false);
});
