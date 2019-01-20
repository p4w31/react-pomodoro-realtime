import React, { Component } from 'react';
import LoadingBars from '../LoadingBars';
import PropTypes from 'prop-types';

const withLoadingBars = (WrappedComponent) => {
    const defaultProps = {};
      
    const propTypes = {
        isLoading: PropTypes.bool,
    };
    
    class EnhancedComponent extends Component {
        render() {
            return (
                ( !this.props.isLoading )
                    ? <WrappedComponent {...this.props} />
                    : <LoadingBars />
            );
        }
    }

    EnhancedComponent.defaultProps = defaultProps;
    EnhancedComponent.propTypes = propTypes;

    return EnhancedComponent;
}

export default withLoadingBars;
