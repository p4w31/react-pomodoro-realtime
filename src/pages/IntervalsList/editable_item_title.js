import React, { Component, Fragment } from 'react';
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
                <span style={{ fontSize: '20px', float: 'right' }} 
                    onClick={ () => removeInterval(item.key) }>
                    X
                </span>
            </td>
        </tr>
    );
}

export default EditableItemTitle;