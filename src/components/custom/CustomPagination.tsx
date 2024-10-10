import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

  interface CustomPaginationProps {
    currentPage: number,
    totalPage: number,
    onPageChange: (page: number) => void
  }
  
  export function CustomPagination({currentPage, totalPage, onPageChange }: CustomPaginationProps) {

    const handlePageClick = (page: number) => {
      onPageChange(page);
    }

    return (
      <Pagination className="w-5/6 p-0">
        <PaginationContent>
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious size={'smaller'} className="text-[12px]" disabled={currentPage == 1} onClick={()=> handlePageClick(currentPage-1)}/>
          </PaginationItem>
            {/* Render individual page links */}
            {Array.from({ length: totalPage }, (_, index) => {
            const pageNumber = index + 1;
            return (
                <PaginationItem key={pageNumber}>
                <PaginationLink
                    size={'smaller'}
                    className="text-[12px]"
                    href="#"
                    isActive={pageNumber === currentPage} // Mark as active if it's the current page
                    onClick={() => handlePageClick(pageNumber)}
                >
                    {pageNumber}
                </PaginationLink>
                </PaginationItem>
            );
            })}

            {/* Ellipsis when there are many pages */}
            {totalPage > 5 && <PaginationEllipsis />}
          <PaginationItem className="cursor-pointer">
            <PaginationNext disabled={currentPage == totalPage} size={'smaller'} className="text-[12px]" onClick={()=> handlePageClick(currentPage+1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
  