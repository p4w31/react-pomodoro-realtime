import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const defaultProps = {};
  
const propTypes = {
    item: PropTypes.shape({
        key: PropTypes.string,
        data: PropTypes.shape({
            start: PropTypes.number,
            stop: PropTypes.number,
            type: PropTypes.string
        })
    }),
    removeInterval: PropTypes.func,
};

function parseTimestamp(timestamp) {
    return moment.unix(timestamp).format("YYYY-MM-DD H:mm:ss Z");
}

function EditableItemTitle(props) {
    const {
        item,
        removeInterval
    } = props;

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

EditableItemTitle.defaultProps = defaultProps;
EditableItemTitle.propTypes = propTypes;

export default EditableItemTitle;