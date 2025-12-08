import './gallery.scss'

import Zoom from 'react-medium-image-zoom'

const GalleryComponent = (props) => {
    const { items, title } = props

    return <div className="GalleryComponent">
        <h2>{title}</h2>
        <div className="items">
            {
                items && items.map((item, ind) => {
                    return <div key={`${item.alt}-${ind}`} className='item'>
                        <Zoom>
                            <img alt={item.alt} className="item" src={item.src} />
                        </Zoom>
                        <span className="alt">{item.alt}</span>
                    </div>
                })
            }
        </div>
    </div>
}

export default GalleryComponent
