import { keyframes } from '@emotion/react';
import styled from '@emotion/styled'
import React from 'react'
import { Link } from 'react-router-dom';

const skeletonKeyframes = keyframes`
0% {
  background-position: -200px 0;
}
100% {
  background-position: calc(200px + 100%) 0;
}
`;

function Card({ title, fontSize, textAlign, margin, status, episode, type, image, loading, linkTo, data, children }) {
    if (loading) {
        return (
            <Container>
                <ImageSkeleton />
                <ParagraphSkeleton marginTop={'10px'}>&zwnj;</ParagraphSkeleton>
                <ParagraphSkeleton>&zwnj;</ParagraphSkeleton>
            </Container>
        )
    }

    const limitString = (title) => {
        return title.substring(0, 30) + (title.length > 30 ? '...' : '')
    }
    return (
        <Container>
            <Link to={linkTo ?? ''} reloadDocument>
                {image && <CardImage src={image} />}
                {data &&
                    <ImageGrid>
                        {data.map(data => {
                            return (
                                <Image src={data.Media.coverImage.medium} />
                            )
                        })}
                    </ImageGrid>
                }
                <CardBody>
                    <Heading fontSize={fontSize} textAlign={textAlign} margin={margin}>{limitString(title)}</Heading>
                    {type && <
                        InfoWrapper>
                        <Paragraph>{type}</Paragraph>
                        <Paragraph>episode: {episode}</Paragraph>
                        <Paragraph>status: {status}</Paragraph>
                    </InfoWrapper>
                    }
                </CardBody>
            </Link>
            {children}
        </Container>
    )
}

const Container = styled.div`
    flex: 0 1 10rem;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.22);
    @media (min-width: 768px){
        width: 100%;
    }
    a{
        text-decoration: none;
        color: #000;
    }
`

const CardImage = styled.img`
    width: 202px;
    height: 150px;
    border-radius: 10px 10px 0 0;
    @media (min-width: 768px){
        width: 100%;
        height: 170px;
    }
`

const InfoWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`

const Heading = styled.h4`
    font-size: ${props => (
        props.fontSize ?? '14px'
    )};
    text-align: ${props => (
        props.textAlign ?? 'none'
    )};
    margin: ${props => (
        props.margin ?? '0'
    )};
    font-weight: 700;
    &:hover{
        display: block;
    }
`

const ParagraphSkeleton = styled.div`
display: inline-block;
  height: ${props => props.height || "14px"};
  width: ${props => props.width || "80%"};
  animation: ${skeletonKeyframes} 1300ms ease-in-out infinite;
  background-color: #eee;
  background-image: linear-gradient(
    90deg,
    #eee,
    #f5f5f5,
    #eee
  );
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  margin-bottom: 8px;
  margin-top: ${props => props.marginTop || "0"}
`

const ImageSkeleton = styled(ParagraphSkeleton)`
    margin-top: 0px;
    width: 200px;
    height: 150px;
    display: block;
    @media (min-width: 768px){
        width: 100%;
        height: 170px;
    }
`;

const ImageGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    height: 200px;
    border-radius: 10px 10px 0 0;
    gap: 0;
    background: #e8e8e8;
    overflow: auto;
`

const Image = styled.img`
    width: 100%;
    height: 100px;
`

const Paragraph = styled.p`
    font-size: 10px;
    background-color: #DF8E52;
    font-weight: 600;
    margin-top: 4px;
    color: white;
    width: fit-content;
    padding: 4px;
    border-radius: 2px;
`

const CardBody = styled.div`
    padding: 10px;
`

export default Card