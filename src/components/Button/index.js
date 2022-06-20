import styled from '@emotion/styled'

function ButtonComponent({ backgroundColor, backgroundColorHover, onClick, title, icon }) {
    return (
        <ButtonWrapper onClick={onClick} backgroundColor={backgroundColor} backgroundColorHover={backgroundColorHover}>
            {icon}
            <Paragraph>{title}</Paragraph>
        </ButtonWrapper>
    )
}


const ButtonWrapper = styled.button`
    border-radius: 5px;
    border: 0;
    padding: 10px 0;
    width: 100%;
    background-color: ${props => (
        props.backgroundColor ?? 'gray'
    )};
    @media (min-width: 768px){
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        overflow: auto;
    };
    &:hover{
        background-color: ${props => (
        // eslint-disable-next-line no-unused-expressions
        props.backgroundColorHover ?? 'gray'
    )
    };
        border-radius: 5px;
    }
`

const Paragraph = styled.p`
    font-size: 14px;
    margin-left: 8px;
    color: white;

`

export default ButtonComponent