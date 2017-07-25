import TaxCalculator from '../TaxCalculator';

it('calculate numbers', () => {
  expect(TaxCalculator.getNationalPension()).toEqual(197880);
});
