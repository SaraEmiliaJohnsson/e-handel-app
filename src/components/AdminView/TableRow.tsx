import { AdminItem } from '../../types';
import './AdminView.css';

interface TableRowProps {
    item: AdminItem;
}

const TableRow = ({ item }: TableRowProps) => {
    return (
        <tr className="adminview-table-row">
            <td>{item.category}</td>
            <td>{item.name}</td>
            <td>{item.price} </td>
            <td>{item.description}</td>
            <td>{item.imgURL}</td>
            <td>
                <button className="admin-view-btn">Redigera</button>
            </td>
        </tr>
    );
};

export default TableRow;
