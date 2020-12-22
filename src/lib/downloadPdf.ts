import * as PdfMake from "pdfmake/build/pdfmake";
import { pdfMake } from "pdfmake/build/vfs_fonts";

export type DocumentDefinition = Parameters<typeof PdfMake.createPdf>[0];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(PdfMake.vfs as any) = pdfMake.vfs;

const downloadPdf = (
  documentDefinition: DocumentDefinition,
  defaultFileName: string
): void => {
  PdfMake.createPdf(documentDefinition).download(defaultFileName);
};

export default downloadPdf;
