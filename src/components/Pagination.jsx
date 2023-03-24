import React from 'react'

export default function Pagination({
  gotoPage,
  previousPage,
  nextPage,
  setPageSize,
  pageOptions
}) {

  const pageCount = 0
  const canPreviousPage = true
  const canNextPage = true

  return (
    <Container fluid className='pagination mx-5'>
      <Container>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>
      </Container>
      <Container>
        <Row className='align-items-center'>
          <Col>
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
          </Col>
        </Row>
      </Container>
      <Container>
        <Dropdown className='mx-2' onSelect={(e) => {
          setPageSize(Number(e))
          setCurrentDataFn()
        }}>
          <Dropdown.Toggle variant='secondary' id='dropdown-basic'>{pageSize}</Dropdown.Toggle>
          <Dropdown.Menu>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <Dropdown.Item key={pageSize} eventKey={pageSize}>Show {pageSize}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Container>
  )
}
