import React, { Component } from 'react';


export default class Page extends Component {
    componentDidMount() {
        const { color, index } = this.props;
        this[`Page${index}`].style.background = color;
    }

    render() {
        const { isHiddenLeft, isHiddenRight, title, content, index } = this.props; 
        return (
            <div className={`Page ${isHiddenLeft && 'hiddenleft'} ${isHiddenRight && 'hiddenright'}`} ref={node => (this[`Page${index}`] = node)}>
                <div className="title">
                    {title}
                </div>
                <div className="content">
                    {content}
                </div>
            </div>
        )
    }
}