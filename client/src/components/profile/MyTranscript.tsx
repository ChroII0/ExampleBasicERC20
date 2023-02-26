import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'







export const MyTranscript = () => {
    return (<>
        <Container className='col-12'>
            <Image
                className='mt-5'
                width="100%"
                src='./images/transcript-1.png'
            />
            <Image
                width="100%"
                src='./images/transcript-2.png'
            />
            <Image
                width="100%"
                src='./images/transcript-3.png'
            />
        </Container>
    </>);
}