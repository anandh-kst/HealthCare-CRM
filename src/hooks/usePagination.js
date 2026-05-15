import { useState } from 'react';
import appConfig from '@config/app.config';

const usePagination = (pageSize = appConfig.paginationSize) => {
  const [page, setPage] = useState(1);

  const nextPage = () => setPage((p) => p + 1);
  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const goToPage = (n) => setPage(n);
  const reset    = () => setPage(1);

  return { page, pageSize, nextPage, prevPage, goToPage, reset };
};

export default usePagination;
