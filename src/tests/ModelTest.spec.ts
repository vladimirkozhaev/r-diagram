import 'mocha';
import { expect } from 'chai';

describe('Hello function', () => {

  it('should return hello world', () => {
    const result = "Hello world!";
    expect(result).to.equal('Hello world!');
  });

});