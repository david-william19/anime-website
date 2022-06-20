import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Layouts'
import Modal from '../../components/Modal'
import { GET_ANIME_BY_ID } from '../../lib/query'

function AnimeDetail() {
    const query = useParams()
    const [show, setShow] = useState(false)
    const [showAdd, setShowAdd] = useState(false)
    const [nameCollection, setNameCollection] = useState('')
    const [selectCollection, setSelectCollection] = useState([])
    const [message, setMessage] = useState('')
    const [select, setSelect] = useState('')
    const { id } = query;
    const dataCollection = JSON.parse(localStorage.getItem('collection'))
    const { data } = useQuery(GET_ANIME_BY_ID, {
        variables: {
            id: id
        }
    })

    // modal function for add anime to collection and add new collection
    const showModal = () => {
        return setShow(true)
    }

    const closeModal = () => {
        return setShow(false)
    }
    const showAddModal = () => {
        getNameCollection()
        return setShowAdd(true)
    }

    const closeAddModal = () => {
        return setShowAdd(false)
    }

    // function for add new collection
    const createCollection = () => {
        console.log(dataCollection)
        if (dataCollection === null) {
            const collection = {}
            collection[nameCollection] = [];
            localStorage.setItem('collection', JSON.stringify(collection))
            setMessage('success create collection')
        }
        const newCollection = []
        dataCollection[nameCollection] = newCollection;
        localStorage.setItem('collection', JSON.stringify(dataCollection))
        setMessage('success add new collection')
        setTimeout(() => {
            setMessage('')
        }, 3000)
    }

    // get name of collection
    const getNameCollection = () => {
        if (dataCollection !== null) {
            for (let name in dataCollection) {
                setSelectCollection(value => [...value, name])
            }
        }
    }

    // add anime to collection
    const addToCollection = () => {
        const newAnime = {
            ...data,
        }
        dataCollection[select].push(newAnime)
        localStorage.setItem('collection', JSON.stringify(dataCollection))
        setMessage('success add anime into collection')
        setTimeout(() => {
            setMessage('')
        }, 3000)
    }

    return (
        <Layout>
            <Container>
                <Header>
                    <Heading margin={'20px 0 10px 40px'}>Anime Detail</Heading>
                </Header>
                <DetailWrapper>
                    <Image src={data?.Media?.coverImage?.large} alt='foto' />
                    <div className='detail-container'>
                        <Title fontSize={'30px'}>{data?.Media?.title?.english}</Title>
                        <InfoWrapper>
                            <Paragraph fontSize={'14px'}><span>Season: </span>{data?.Media?.season}</Paragraph>
                            <Paragraph fontSize={'14px'}><span>Status: </span>{data?.Media?.status}</Paragraph>
                            <Paragraph fontSize={'14px'}><span>Episodes: </span>{data?.Media?.episodes}</Paragraph>
                        </InfoWrapper>
                        <Paragraph fontSize={'13px'} dangerouslySetInnerHTML={{ __html: data?.Media?.description }} />
                        <ButtonWrapper>
                            <Button onClick={showModal}>Create Collection</Button>
                            <Button onClick={showAddModal}>Add to collection</Button>
                        </ButtonWrapper>
                    </div>
                </DetailWrapper>
            </Container>

            {/* modal collection */}
            <Modal show={show}>
                <Heading>Create collection</Heading>
                <InputWrapper>
                    <label>Collection name</label>
                    <Input type='text' placeholder="name collection..." onChange={e => setNameCollection(e.target.value)} />
                    <Messages>{message !== '' ? message : ''}</Messages>
                </InputWrapper>
                <ButtonWrapper>
                    <Button backgroundColor='#DF8E52' onClick={createCollection}>Add collection</Button>
                    <Button backgroundColor='#d44242' onClick={closeModal}>Close</Button>
                </ButtonWrapper>
            </Modal>

            {/* modal add collection */}
            <Modal show={showAdd}>
                <Heading>Add to collection</Heading>
                <InputWrapper>
                    <label>name collection</label>
                    <Select placeholder='select collection...' onChange={e => setSelect(e.target.value)}>
                        <option selected='selected'>--- select collection ---</option>
                        {selectCollection.map((data, index) => {
                            return <option value={data}>{data}</option>
                        })}
                    </Select>
                </InputWrapper>
                <ButtonWrapper>
                    <Button backgroundColor='#DF8E52' onClick={addToCollection}>Add</Button>
                    <Button backgroundColor='#d44242' onClick={closeAddModal}>Close</Button>
                </ButtonWrapper>
            </Modal>
        </Layout>
    )
}

const Container = styled.div`
    height: 100%;
    overflow-y: scroll;
    @media (min-width: 768px){
        flex: 1;
    }
    pre {
        font-size: 12px;
    }
`

const Messages = styled.p`
    color: #0c9c18;
    margin: 5px 0;
`

const Button = styled.button`
    background-color: ${props => (props.backgroundColor ?? '#DF8E52')};
    color: white;
    border: 0;
    padding: 10px;
    border-radius: 7px;
    margin-top: 15px;
`

const Select = styled.select`
    border-radius: 8px;
    padding: 6px 0;
`

const Header = styled.div`
    padding: 20px;
    @media (min-width: 768px){
      padding: 40px 0 40px 50px;
    }
`

const Image = styled.img`
    border-radius: 10px;
    width: 350px;
    height: 350px;
    margin: 0 auto;
    @media (min-width: 768px){
        width: 500px;
        height: 500px;
        margin-left: 40px;
    }
`

const Heading = styled.h2`
    font-size: 32px;
    font-weight: 'extra-bold';
    color: #DF8E52;
`

const Title = styled.h3`
    font-size: 20px;
    color: #212121;
    margin: ${props => (
        props.margin ?? '0'
    )};

    @media (min-width: 768px){
        font-size: ${props => (
        props.fontSize ?? '20px'
    )};
    }
`

const Paragraph = styled.p`
    font-size: 12px;
    color: #212121;
    span {
        font-weight: 700;
    }

    @media (min-width: 768px){
        font-size: ${props => (
        props.fontSize ?? '12px'
    )};
    }
`

const DetailWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
    margin-bottom: 120px;
    .detail-container {
        padding: 0 40px;
    }
    @media (min-width: 768px){
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        .detail-container {
            padding: 0;
            padding-right: 30px;
        }
    }
`

const InfoWrapper = styled.div`
    margin: 10px 0;
`

const Input = styled.input`
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #595959;
`

const ButtonWrapper = styled.div`
    display: flex;
    gap: 8px;
`

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    label{
        margin: 10px 0;
    }
`

export default AnimeDetail