import { AdminItem } from '../../types';

interface TableRowProps {
    item: AdminItem;
}

const TableRow = ({ item }: TableRowProps) => {
    return (
        <tr>
            <td>{item.category}</td>
            <td>{item.name}</td>
            <td>{item.price} kr</td>
            <td>{item.description}</td>
            <td>{item.imgURL}</td>
            <td>
                <button>Redigera</button>
            </td>
        </tr>
    );
};

export default TableRow;
