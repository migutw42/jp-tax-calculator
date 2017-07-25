// @flow

export default class TaxCalculator {
  /**
   * 国民健康保険料計算
   * 01/01時点で住んでる自治体が基準となる
   * 計算式は東京23区内
   */
  static getNationalHealthInsurance(income: number, expenses: number): number {
    const debutation: number = 330000;
    const baseIncome: number = income - expenses - debutation;

    const baseFee: number = baseIncome * 0.0747 + 38400;
    const elderFee: number = baseIncome * 0.0196 + 11100;
    const careFee: number = 0;

    return Math.round(baseFee + elderFee + careFee);
  }

  static getResidentsTax(
    income: number,
    expenses: number,
    incomeDeduction: number
  ): number {
    const baseFee: number = income - expenses - (incomeDeduction + 50000);
    return Math.round(
      baseFee * 0.06 + 3500 + (baseFee * 0.04 + 1500) - incomeDeduction * 0.05
    );
  }

  // 国民年金
  static getNationalPension() {
    return 16490 * 12;
  }

  // 所得税
  static getIncomeTax(income, expenses, incomeDeduction) {
    const whitePaperDedutionForm = 100000;

    const INCOME_TAX_TABLE = [
      { threshold: 1950000, rate: 0.05, debutation: 0 },
      { threshold: 3300000, rate: 0.1, debutation: 97500 },
      { threshold: 6950000, rate: 0.2, debutation: 427500 },
      { threshold: 9000000, rate: 0.23, debutation: 636000 },
      { threshold: 18000000, rate: 0.33, debutation: 1536000 },
      { threshold: 40000000, rate: 0.4, debutation: 2796000 },
      { threshold: 99999999, rate: 0.45, debutation: 4796000 }
    ];

    const { rate, debutation } = INCOME_TAX_TABLE.find(
      el => income <= el.threshold
    );
    return Math.round(
      (income - expenses - whitePaperDedutionForm - incomeDeduction) * rate -
        debutation
    );
  }

  // 所得控除
  static getIncomeDeduction(nationalHealthInsuranceFee) {
    const baseDedution = 380000;
    return Math.round(baseDedution + nationalHealthInsuranceFee);
  }
}
