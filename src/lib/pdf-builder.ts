// eslint-disable-next-line import/no-unresolved
import { Content } from "pdfmake/interfaces";
import { DocumentDefinition, makePdf } from "./downloadPdf";
import { PdfTable } from "./pdf-table";

export class PdfBuilder {
  private content: Content[] = [];

  public constructor(private title?: string) {}

  public text(text: string): this {
    this.content.push({ text });
    return this;
  }

  public header(text: string): this {
    this.content.push({ text, style: "header" });
    return this;
  }

  public coverPage(text: string): this {
    this.content.push({
      text,
      style: "coverPage",
      pageBreak: "after",
      alignment: "center",
    });
    return this;
  }

  public pageBreak(): this {
    const lastContent = this.content[this.content.length - 1];
    if (typeof lastContent === "object") {
      this.content[this.content.length - 1] = {
        ...lastContent,
        pageBreak: "after",
      };
    }
    return this;
  }

  private removeLastPageBreak() {
    const lastContent = this.content[this.content.length - 1];
    if (typeof lastContent === "object" && "pageBreak" in lastContent) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { pageBreak, ...rest } = lastContent;
      this.content[this.content.length - 1] = rest;
    }
  }

  public table(rows: Content[][], columns: number) {
    const initialTable = new PdfTable(columns);

    const table = rows
      .reduce<PdfTable>(
        (currentTable, [customer, ...row]) => currentTable.row(customer, row),
        initialTable
      )
      .get();

    this.content.push({ table });
    return this;
  }

  public toDocumentDefinition(): DocumentDefinition {
    this.removeLastPageBreak();
    return makePdf(this.content, this.title);
  }
}
