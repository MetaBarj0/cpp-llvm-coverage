export class CoverageSummary {
  constructor(count: number, covered: number, notCovered: number, percent: number) {
    this.count = count;
    this.covered = covered;
    this.notCovered = notCovered;
    this.percent = percent;
  }

  readonly count: number;
  readonly covered: number;
  readonly notCovered: number;
  readonly percent: number;
};