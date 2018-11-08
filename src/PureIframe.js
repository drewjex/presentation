import React, { PureComponent } from 'react';

export default class PureIframe extends PureComponent {
    onLoad = event => {
        window.focus();
    }

    render() {
        const { iframe, index } = this.props;
        return (
            <iframe title={`iframe${index}`} src={iframe} width="100%" height="100%" onLoad={this.onLoad} />
        );
    }
}