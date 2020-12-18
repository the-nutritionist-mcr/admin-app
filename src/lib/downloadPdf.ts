import * as PdfFonts from "pdfmake/build/vfs_fonts";
import * as PdfMake from "pdfmake/build/pdfmake";

export type DocumentDefinition = Parameters<typeof PdfMake.createPdf>[0];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(PdfMake.vfs as any) = PdfFonts.pdfMake.vfs;

const downloadPdf = (
  documentDefinition: DocumentDefinition,
  defaultFileName: string
): void => {
  PdfMake.createPdf(documentDefinition).download(defaultFileName);
};

export default downloadPdf;
