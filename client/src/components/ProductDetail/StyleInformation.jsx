import React, { useState, useEffect, useRef } from 'react';
import Parse from '../../parse';
import { OrbitSpinner } from 'react-epic-spinners';
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from 'react-icons/ti';

function ProductInformation ({
  p1,
  currentProduct,
  currentStyle,
  renderStars,
  handleStyleClick,
  handleLocalClick,
  localName,
  localId,
  handleLocalSave,
  styleThumbUrl,
}) {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if(p1.length > 0) {
      setLoading(false);
    }
  }, [p1])

  let renderAvgStars = () => {
    return renderStars(currentProduct.averageRating).map((star => star))
  };

  // pending to use api to add to card
  async function addToCart(skusId) {
    let params;
    let data;
    const request =  await Parse.create(`cart/`, params, skusId);
  }


  const relatedLink = (e) => {
    e.preventDefault();
    window.location.replace("/#related");
  }

    return (
      <div>
         {!loading ?
        <div className='info-container'>
        <div>
        {renderAvgStars()}
          <a href='' className='reviews' onClick={relatedLink}>Read all {currentProduct.totalReviews} reviews</a>
        </div>

        <h4>{currentProduct.category}</h4>
        {currentStyle ? <h2>{currentStyle.name}</h2> : <h2>{currentProduct.name}</h2>}
        {currentStyle ? <h2>${currentStyle.original_price}</h2> : <h2>${currentProduct.default_price}</h2>}

        <div>
      <div className='style-title'>
        <h4> STYLE > </h4>
        <h4>{localName}</h4>
      </div>
      <div className='style-container'>

        {
          currentProduct.styles.map(item => {
          let id = Math.random();
          return (
            <img key={id}
            id={item.style_id}
            name={item.name}
            ref={styleThumbUrl}
            onClick={(e, url, prod) => {
              handleLocalClick(e);
              handleStyleClick(e, item.photos[0].url, item);
            }}
            src={item.photos[0].thumbnail_url} className='style-entry'></img>
          )
        })}

      </div>
    </div>

    <div className='add-container'>

      <select>
        <option value="0">SELECT SIZE</option>
        { currentStyle ?
          Object.values(currentStyle.skus).map((item => {
            let id = Math.random();
            return <option key={id}>{item.size}</option>
          }))
        :
          <div></div>
        }
      </select>

      <select>
        <option value="0">1</option>
        {currentStyle ?
            Object.values(currentStyle.skus).map((item => {
              let id = Math.random();
              return <option key={id}>{item.quantity}</option>
            }))
        :
            <div></div>
        }
      </select>

      <button onClick={handleLocalSave}>ADD TO CART</button>
      <button onClick={handleLocalSave}><TiStarFullOutline /></button>
    </div>

      </div>
          :
          <OrbitSpinner color="teal" />
          }
      </div>



    )

}

export default ProductInformation;