import Spinner from 'react-bootstrap/Spinner';




export const LoadingPage = () => {
    return (<>
        <main className="d-flex justify-content-center text-center h-100">
            <div className="align-self-center">
                <Spinner className='loading-item-delay-1' animation="grow" variant="primary" />
                <Spinner className='loading-item-delay-2' animation="grow" variant="secondary" />
                <Spinner className='loading-item-delay-3' animation="grow" variant="success" />
                <Spinner className='loading-item-delay-4' animation="grow" variant="danger" />
                <Spinner className='loading-item-delay-5' animation="grow" variant="warning" />
                <Spinner className='loading-item-delay-6' animation="grow" variant="info" />
                <Spinner className='loading-item-delay-7' animation="grow" variant="dark" />
            </div>
        </main>
    </>)
}