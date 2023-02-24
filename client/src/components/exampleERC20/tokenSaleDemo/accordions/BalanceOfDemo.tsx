
import Image from 'react-bootstrap/Image'

const listGifs = [
    "https://images6.fanpop.com/image/photos/37800000/Kikyou-InuYasha-egyptprincess7-37801183-500-281.gif",
]

export const BalanceOfDemo = () => {
    return (
        <>
            {listGifs.map((item, index)=>{ return (<Image key={index} src={item} fluid={true} />)})}
        </>
    );
}