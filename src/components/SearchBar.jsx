import React from 'react'

export default function SearchBar({ searchValue, setSearchValue, handleSearchChange, handleSearchSubmit}) {
  return (
    <>
      <Form onSubmit={handleSearchSubmit}>
        <Container fluid className='mb-5'>
          <Row>
            <Col>
              <Form.Control
                type='text'
                placeholder='Search'
                className='mr-sm-2'
                value={searchValue}
                onChange={handleSearchChange}
              />
            </Col>
            <Col>
              <Button variant='secondary' type='submit'>Search</Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  )
}
