import React, { useEffect, useMemo, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { usePagination, useTable } from 'react-table'
import Pagination from './Pagination'
import SearchBar from './SearchBar'

export default function TableGrid({ data }) {
  const [currentData, setCurrentData] = useState([])

  const columns = useMemo(
    () => Object.keys(data[0]).map((key) => ({ Header: key, accessor: key })),
    [data]
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    pageOptions,
    page,
    state: { pageIndex, pageSize },
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  )

  useEffect(() => {
    setCurrentDataFn()
  }, [pageSize])

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    console.log(searchValue)
  }

  function setCurrentDataFn() {
    const dataArray = page.map(row => {
      const rowObj = {}
      columns.forEach(col => {
        const accessor = col.accessor
        const value = row.values[accessor]
        rowObj[accessor] = value
      })
      return rowObj
    })
    setCurrentData(dataArray)
  }

  return (
    <>
      <SearchBar />
      <Container className='mx-5'>
        <Table striped bordered hover {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Pagination
          gotoPage={gotoPage}
          nextPage={nextPage}
          previousPage={previousPage}
          pageOptions={pageOptions}
          setPageSize={setPageSize}
        />
      </Container>
    </>
  )
}
