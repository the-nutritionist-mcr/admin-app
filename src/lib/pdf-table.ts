// eslint-disable-next-line import/no-unresolved
import { Content, Table } from "pdfmake/interfaces";
import { batchArray } from "./batch-array";

export class PdfTable {
  public constructor(private columns: number, private headerRows = 0) {}

  private content: Content[][] = [];

  private makeFillerCells(size: number) {
    return new Array(size)
      .fill({ text: "" })
      .map((cell, index) => (index === 0 ? { ...cell, colSpan: size } : cell));
  }

  public row(headerCell: Content, row: Content[]) {
    this.content.push(
      ...batchArray(row, this.columns)
        .map((mapRow, index, array) => ({
          rowSpan: array.length,
          mapRow
        }))
        .map(({ mapRow, rowSpan }) => [{ rowSpan, text: headerCell }, ...mapRow])
        .map((mapRow) =>
          mapRow.length < this.columns + 1
            ? [...mapRow, ...this.makeFillerCells(this.columns - mapRow.length + 1)]
            : mapRow
        )
    );
    return this;
  }

  public get(): Table {
    return {
      widths: [...new Array(this.columns + 1)].map(() => "*"),
      body: this.content,
      keepWithHeaderRows: 0,
      headerRows: this.headerRows,
      dontBreakRows: true,
    };
  }
}
