import React from 'react';
import moment from 'moment';

function parseTimestamp(timestamp) {
    return moment.unix(timestamp).format("YYYY-MM-DD H:mm:ss Z");
}

function EditableItemTitle({item, removeInterval}) {
    return (
        <tr>
            <td>
                { parseTimestamp(item.data.start) } 
            </td>
            <td>
                { parseTimestamp(item.data.stop) } 
            </td>
            <td>
                { item.data.type }
            </td>
            <td>
                <span className="remove-btn" 
                    onClick={ () => removeInterval(item.key) }>
                    &#10005;
                </span>
            </td>
        </tr>
    );
}

export default EditableItemTitle;