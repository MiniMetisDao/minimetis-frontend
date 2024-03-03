import { useEffect, useState } from "react";

import { usePaginationStore } from "store/usePaginationStore";

const Pagination = ({
  totalItems,
  itemsPerPage,
}: {
  totalItems: number;
  itemsPerPage: number;
}) => {
  const { currentPage, changePage } = usePaginationStore();
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      changePage(newPage);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= Math.min(5, totalPages); i++) {
      pages.push(
        <li
          key={i}
          className={i === page ? "active" : ""}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      );
    }

    if (totalPages > 5) {
      pages.push(<li key="ellipsis">...</li>);
    }

    for (let i = Math.max(totalPages - 2, 6); i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={i === page ? "active" : ""}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      );
    }

    return pages;
  };

  return <ul className="pagination">{renderPageNumbers()}</ul>;
};

export default Pagination;
