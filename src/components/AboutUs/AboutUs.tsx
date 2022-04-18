import useResizeObserver from "beautiful-react-hooks/useResizeObserver";
import React from "react";
import { useTranslation } from "react-i18next";
import { Document, Page, pdfjs } from "react-pdf";

import whitepaper from "assets/whitepaper.pdf";
import { LoadingSpinner } from "components/LoadingSpinner";

import { styles } from "./styles";

pdfjs.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";

export const AboutUs: React.FC = () => {
  const { t } = useTranslation("aboutUs");
  const ref = React.useRef(null);
  const parentRect = useResizeObserver(ref);
  const [pageNumbers, setPageNumbers] = React.useState<number | null>(null);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setPageNumbers(numPages);
  };

  return (
    <div css={styles} ref={ref}>
      <div className="download-btn-wrapper">
        <a href="whitepaper.pdf" target="_blank">
          {t("downloadWhitepaper")}
        </a>
      </div>
      <Document
        loading={<LoadingSpinner />}
        file={whitepaper}
        onLoadSuccess={handleDocumentLoadSuccess}
      >
        {Array.from(new Array(pageNumbers), (_, index) => (
          <Page
            width={parentRect?.width}
            key={`page_${index + 1}`}
            pageNumber={index + 1}
          />
        ))}
      </Document>
    </div>
  );
};
