import { validateEmail } from "./email";

describe('Email validation', () => {
  let email = '';

  test('An empty input should not be valid', () => {
    expect(validateEmail(email)).toEqual(false);
  });

  test('It should have an @ symbol', () => {
    email = 'john@mail.com';
    expect(email.includes('@')).toEqual(true);
  });

  test('It should have an . symbol', () => {
    expect(email.includes('.')).toEqual(true);
  });

  test('A valid email should pass validation', () => {
    email = 'john@mail.com';
    expect(validateEmail(email)).toEqual(true);
  });

  test('An invalid email should not pass validation', () => {
    email = 'john@Mail';
    expect(validateEmail(email)).toEqual(false);
  });
})