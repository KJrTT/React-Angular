function Product({title, price, discount = 0}){
    const FullPrice = price - (price * discount) / 100;
    let DiscountBlock  = null; 

    if (discount > 0){
        DiscountBlock = (
            <p>
              <s>{price} ₽</s> Скидка: {discount}%
            </p>
          );
    }
    return(
        <div>
            <h3>{title}</h3>
            <p>{FullPrice}</p>
            {DiscountBlock}
        </div>
    )
}

export default Product;