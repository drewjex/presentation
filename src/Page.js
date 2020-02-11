import React, { Component } from 'react';
import PureIframe from "./PureIframe";

export default class Page extends Component {
    componentDidMount() {
        const { color, index } = this.props;
        this[`Page${index}`].style.background = color;
        this.props.onLoad(index);
    }

    render() {
        const { 
            isSelected, 
            isHiddenLeft, 
            isHiddenRight, 
            title, 
            content, 
            index, 
            footer, 
            header, 
            iframe, 
            image, 
            imageStyle, 
            isZoomed, 
            style, 
            onClick 
        } = this.props; 
        
        return (
            <div style={style} 
                 className={`Page ${isSelected && 'selected'} ${isHiddenLeft && 'hiddenleft'} ${isHiddenRight && 'hiddenright'} ${header && 'has-header'} ${isZoomed && 'zoomed'}`}
                 onClick={event => onClick(index)} 
                 ref={node => (this[`Page${index}`] = node)}>
                 {header && 
                    <div className="header">
                        {header}
                    </div>
                 }
                <div className={`title ${index === 0 && 'big'}`}>
                    {title}
                </div>
                <div className={`content ${index === 0 && 'big'}`}>
                    {typeof content === "string" &&
                        content
                    }
                    {content instanceof Array &&
                        <ul>
                            {content.map((c, i) => {
                                return <li key={i}>{c}</li>
                            })}
                        </ul>
                    }
                    {iframe && 
                        <PureIframe iframe={iframe} 
                                    index={index} />
                    }
                    {image && 
                        <img alt='' className={`${imageStyle === 'contain' && 'contain'}`} src={image} width="100%" height="100%" />
                    }
                </div>
                <div className="footer">
                    {footer ? footer : index}
                </div>
                <img alt='' className="logo" src="https://banner2.kisspng.com/20180426/hoe/kisspng-amazon-com-amazon-web-services-cloud-computing-amazon-logo-5ae209d786e676.3280528715247630955526.jpg" />
            </div>
        )
    }
}