import Form from 'react-bootstrap/Form';
import { useAppDispatch } from '../../../redux/hooks';
import { setUnit } from '../../../redux/erc-20/slides/unitSlide';

export const SelectUnit = () => {
    const dispatch = useAppDispatch();
    const handlChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        dispatch(setUnit(e.target.value));
    }
    return (
        <>
            <h5>==Select Unit==</h5>
            <Form.Select
                style={{ "width": "150px" }}
                onChange={handlChange}
                defaultValue="wei"
                className="mb-3"
            >
                <option value="wei">wei</option>
                <option value="gwei">gwei</option>
                <option value="ether">ether</option>
            </Form.Select>
            <hr />
        </>
    );
}
