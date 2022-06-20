import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'
import Layout from '../../components/Layouts'
import { MdClose } from "react-icons/md";
import ButtonComponent from '../../components/Button';
import Modal from '../../components/Modal';

function AnimeCollection() {
    const [collection, setCollection] = useState([])
    const [show, setShow] = useState(false)
    const [showAdd, setShowAdd] = useState(false)
    const [idCollection, setIdCollection] = useState('')
    const [message, setMessage] = useState('')
    const [nameCollection, setNameCollection] = useState('')

    const deleteCollection = (collections) => {
        delete collection[collections]
        localStorage.setItem('collection', JSON.stringify(collection))
    }

    // modal function for add anime to collection and add new collection
    const showModal = (data) => {
        setIdCollection(data)
        console.log('ini dari func', data)
        return setShow(true)
    }

    const closeModal = () => {
        return setShow(false)
    }


    const showAddModal = (data) => {
        return setShowAdd(true)
    }

    const closeAddModal = () => {
        return setShowAdd(false)
    }

    // function for add new collection
    const createCollection = () => {
        const dataCollection = JSON.parse(localStorage.getItem('collection'))
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

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('collection'))
        setCollection(data)
    }, [collection])

    return (
        <Layout>
            <Container>
                <Header>
                    <Heading>Anime Collection</Heading>
                    <ButtonWrapper>
                        <ButtonComponent title={'Add new collection'} backgroundColor={"#DF8E52"} onClick={showAddModal} backgroundColorHover={'#bd7844'} />
                    </ButtonWrapper>
                </Header>
                <CardContainer>
                    {Object.keys(collection).map((data, index) => {
                        return (
                            <Card
                                key={index}
                                title={data}
                                fontSize={'20px'}
                                textAlign={'center'}
                                margin={'0 0 30px 0'}
                                data={collection[data]}
                                linkTo={`/anime-collection/${data}`}
                                children={<ButtonComponent onClick={() => showModal(data)} title={'remove'} backgroundColor={'#b54033'} backgroundColorHover={'#8a3127'} icon={<MdClose color='white' />} />}
                            />
                        )
                    })}
                </CardContainer>
            </Container>

            {/* modal collection */}
            <Modal show={show}>
                <Heading>Attention</Heading>
                <Paragraph>Do you want delete this collection?</Paragraph>
                <ButtonWrapper>
                    <ButtonComponent title={'Yes'} backgroundColor={'#32ab58'} backgroundColorHover={'#278a46'} onClick={() => deleteCollection(idCollection)} />
                    <ButtonComponent onClick={closeModal} title={'No'} backgroundColor={'#b54033'} backgroundColorHover={'#8a3127'} />
                </ButtonWrapper>
            </Modal>

            {/* modal create collection */}
            <Modal show={showAdd}>
                <Heading>Add to collection</Heading>
                <InputWrapper>
                    <label>Collection name</label>
                    <Input type='text' placeholder="name collection..." onChange={e => setNameCollection(e.target.value)} />
                    <Messages>{message !== '' ? message : ''}</Messages>
                </InputWrapper>
                <ButtonWrapper>
                    <ButtonComponent backgroundColor='#DF8E52' backgroundColorHover={'#b57241'} onClick={createCollection} title={'Add'} />
                    <ButtonComponent backgroundColor='#d44242' backgroundColorHover={'#ab2b2b'} onClick={closeAddModal} title={'Close'} />
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
`

const Paragraph = styled.p`
    font-size: 16px;
    margin: 17px 0;
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

const ButtonWrapper = styled.div`
    display: flex;
    gap: 8px;
    width: 200px;
    margin-top: 15px;
`

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;

    label{
        margin-bottom: 5px;
    }
`

const Input = styled.input`
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #595959;
`

const Messages = styled.p`
    color: #0c9c18;
    margin: 5px 0;
`

export default AnimeCollection