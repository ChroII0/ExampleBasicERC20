import Spinner from 'react-bootstrap/Spinner';




export const LoadingButton = () => {
    return (
        <> <span> </span>
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
            />
            <span className="visually-hidden">Loading...</span>
        </>
    );
}