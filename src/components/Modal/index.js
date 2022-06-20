import styled from '@emotion/styled'
import React from 'react'

function Modal({ handleClose, show, children }) {
    return (
        <Container display={show}>
            <ModalWrapper>
                {children}
            </ModalWrapper>
        </Container>
    )
}

const ModalWrapper = styled.div`
  position:fixed;
  background: white;
  padding: 10px;
  border-radius: 8px;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  @media(min-width: 768px){
    width: 30%;
    height: auto;
  }
`

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: ${props => (props.display ? 'block' : 'none')};
`

export default Modal