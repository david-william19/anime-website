import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../../components/Card'
import Layout from '../../components/Layouts'

function AnimeCollectionDetail() {
    const query = useParams()
    const { name } = query
    const [collection, setCollection] = useState([])
    console.log(name)

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('collection'))
        setCollection(data[name])
    }, [name])

    console.log(collection)
    return (
        <Layout>
            <Container>
                <Header>
                    <Heading>Anime Collection</Heading>
                </Header>
                {collection.length === 0 && <Paragraph>No anime in here, please add new</Paragraph>}
                <CardContainer>
                    {collection.map(data => {
                        return (
                            <Card
                                key={data?.Media?.id}
                                title={data?.Media.title?.english ?? data?.Media.title?.romaji}
                                type={data?.Media.type}
                                image={data?.Media.coverImage?.medium}
                                episode={data?.Media.episodes}
                                status={data?.Media.status}
                                linkTo={`anime-detail/${data?.Media?.id}`}
                            />
                        )
                    })}
                </CardContainer>
            </Container>
        </Layout>
    )
}

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

const Paragraph = styled.p`
    font-size: 16px;
    margin: 10px 0;
    margin-left: 50px;
`

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

const Heading = styled.h2`
    font-size: 32px;
    font-weight: 'extra-bold';
    color: #DF8E52;
    margin-bottom: 40px;
`

export default AnimeCollectionDetail