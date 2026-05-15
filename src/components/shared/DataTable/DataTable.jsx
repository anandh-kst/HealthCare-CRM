import Table from '@components/ui/Table';
import Spinner from '@components/ui/Spinner';
import EmptyState from '../EmptyState';

const DataTable = ({ columns, data, isLoading, onRowClick, emptyMessage }) => {
  if (isLoading) return <Spinner />;
  if (!data?.length) return <EmptyState message={emptyMessage} />;
  return <Table columns={columns} data={data} onRowClick={onRowClick} />;
};

export default DataTable;
