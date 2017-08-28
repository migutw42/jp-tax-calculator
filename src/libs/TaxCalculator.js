// @flow

export type TaxInfo = {
  income: number,
  expenses: number,
  nationalHealthInsurance: number,
  nationalPension: number,
  incomeDeduction: number,
  residentsTax: number,
  incomeTax: number,
  totalFee: number
};

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
  static getNationalPension(): number {
    return 16490 * 12;
  }

  // 所得税
  static getIncomeTax(
    income: number,
    expenses: number,
    incomeDeduction: number
  ) {
    const whitePaperDedutionForm = 100000;

    type IncomeTax = {
      threshold: number,
      rate: number,
      debutation: number
    };
    const INCOME_TAX_TABLE: IncomeTax[] = [
      { threshold: 1950000, rate: 0.05, debutation: 0 },
      { threshold: 3300000, rate: 0.1, debutation: 97500 },
      { threshold: 6950000, rate: 0.2, debutation: 427500 },
      { threshold: 9000000, rate: 0.23, debutation: 636000 },
      { threshold: 18000000, rate: 0.33, debutation: 1536000 },
      { threshold: 40000000, rate: 0.4, debutation: 2796000 },
      { threshold: Infinity, rate: 0.45, debutation: 4796000 }
    ];

    const incomeTax: ?IncomeTax = INCOME_TAX_TABLE.find(
      (el: IncomeTax) => income <= el.threshold
    );

    // 恐らくNaNのときだけ値を取得できないので、その時はNaNを返す。
    if (!incomeTax) {
      console.error('invalid income');
      return NaN;
    }

    return Math.round(
      (income - expenses - whitePaperDedutionForm - incomeDeduction) *
        incomeTax.rate -
        incomeTax.debutation
    );
  }

  // 所得控除
  static getIncomeDeduction(nationalHealthInsuranceFee: number): number {
    const baseDedution: number = 380000;
    return Math.round(baseDedution + nationalHealthInsuranceFee);
  }

  static getTaxInfo(income: number, expenses: number): TaxInfo {
    const nationalHealthInsurance = this.getNationalHealthInsurance(
      income,
      expenses
    );

    const nationalPension: number = this.getNationalPension();

    const incomeDeduction: number = this.getIncomeDeduction(
      nationalHealthInsurance
    );

    const residentsTax: number = this.getResidentsTax(
      income,
      expenses,
      incomeDeduction
    );

    const incomeTax: number = this.getIncomeTax(
      income,
      expenses,
      incomeDeduction
    );

    const totalFee: number =
      nationalHealthInsurance + nationalPension + residentsTax + incomeTax;

    return {
      income: income,
      expenses: expenses,
      nationalHealthInsurance: nationalHealthInsurance,
      nationalPension: nationalPension,
      incomeDeduction: incomeDeduction,
      residentsTax: residentsTax,
      incomeTax: incomeTax,
      totalFee: totalFee
    };
  }

  static translate(key: string): string {
    const words = {
      income: '収入',
      expenses: '支出',
      nationalHealthInsurance: '国民健康保険料',
      nationalPension: '国民年金',
      incomeDeduction: '所得控除',
      residentsTax: '住民税',
      incomeTax: '所得税',
      totalFee: '合計費用'
    };
    return words[key] || key;
  }
}
