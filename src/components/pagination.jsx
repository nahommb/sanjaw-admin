import ReactPaginate from "react-paginate";

export function Pagination({ pageCount, onPageChange }) {

  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={onPageChange()}
      containerClassName="flex gap-2"
      pageClassName="px-3 py-1 bg-gray-200 rounded"
      activeClassName="bg-blue-500 text-white"
      previousLabel="<"
      nextLabel=">"
    />
  );
}
