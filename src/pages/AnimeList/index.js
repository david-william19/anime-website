import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import Card from '../../components/Card'
import Layout from '../../components/Layouts'
import { GET_ALL_ANIME } from '../../lib/query'

function AnimeList() {
  const [itemOffset, setItemOffset] = useState(1);
  const { loading, data } = useQuery(GET_ALL_ANIME, {
    variables: {
      pageNumber: itemOffset
    }
  })
  const [pageTotal, setPageTotal] = useState(0)

  const handlePageClick = (event) => {
    setItemOffset(event.selected + 1);
  };


  useEffect(() => {
    if (data) setPageTotal(data.Page.pageInfo.lastPage)
    // groupCollection()
  }, [data])

  console.log(data)

  return (
    <Layout>
      <Container>
        <Header>
          <Heading>Anime List</Heading>
        </Header>
        <CardContainer>
          {loading ?
            Array.from({ length: 12 }, (x, i) => {
              return (
                <Card loading />
              )
            })
            :
            data?.Page?.media.map(data => {
              return (
                <Card
                  key={data?.id}
                  title={data?.title?.english ?? data?.title?.romaji}
                  type={data?.type}
                  image={data?.coverImage?.medium}
                  episode={data?.episodes}
                  status={data?.status}
                  linkTo={`anime-detail/${data?.id}`}
                />
              )
            }
            )
          }
        </CardContainer>
        <PaginateContainer>
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageTotal}
            previousLabel="<"
            className={PaginateContainer}
            breakClassName='break-me'
            containerClassName='pagination-wrapper'
            activeClassName='active'
            pageLinkClassName='page-link'
            renderOnZeroPageCount={null}
          />
        </PaginateContainer>
      </Container>
    </Layout>
  )
}

const Container = styled.div`
    height: 100%;
    overflow-y: scroll;
    @media (min-width: 768px){
        flex: 1;
    }
`

const Header = styled.div`
    padding: 20px;
    @media (min-width: 768px){
      padding: 40px 0 40px 50px;
    }
`

const CardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin: 0 5px;
    @media (min-width: 768px){
      grid-template-columns: repeat(6, 1fr);
      grid-gap: 14px;
      margin: 0 50px;
      margin-bottom: 0;
    }
`

const PaginateContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 35px;
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 120px;
  ul {
    display: flex;
    gap: 15px;
  }

  ul li {
    list-style-type: none;
    cursor: pointer;
  }

  ul li a {
    padding: 5px;
  }

  .break-me {
    cursor: default;
  }
  .active {
    border-color: transparent;
    color: #DF8E52;
  }
  @media (min-width: 768px){
    font-size: 14px;
    margin-bottom: 60px;
    ul {
      display: flex;
      gap: 15px;
    }
    ul li a {
      padding: 10px;
    }
  }
`

const Heading = styled.h2`
    font-size: 32px;
    font-weight: 'extra-bold';
    color: #DF8E52;
`

export default AnimeList