import TaxCalculator from '../TaxCalculator';

it('calculate numbers', () => {
  expect(TaxCalculator.getNationalPension()).toEqual(197880);
});

it('translate', () => {
  expect(TaxCalculator.translate('income')).toEqual('収入');
  expect(TaxCalculator.translate('test')).toEqual('test');
});
