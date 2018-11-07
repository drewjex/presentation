import React, { Component } from 'react';


export default class Page extends Component {
    componentDidMount() {
        const { color, index } = this.props;
        this[`Page${index}`].style.background = color;
    }

    render() {
        const { isHiddenLeft, isHiddenRight, title, content, index, footer, header, iframe } = this.props; 
        return (
            <div className={`Page ${isHiddenLeft && 'hiddenleft'} ${isHiddenRight && 'hiddenright'}`} 
                 ref={node => (this[`Page${index}`] = node)}>
                <div className="header">
                    {header}
                </div>
                <div className={`title ${index === 0 && 'big'}`}>
                    {title}
                </div>
                <div className={`content ${index === 0 && 'big'}`}>
                    {content}
                    {iframe && 
                        <iframe title={`iframe${index}`} src={iframe} width="100%" height="100%" />
                    }
                </div>
                <div className="footer">
                    {footer ? footer : index}
                </div>
            </div>
        )
    }
}