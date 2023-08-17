import React, { FC } from 'react'
import styles from './Cart.module.css'

interface CartProps {
    count: string;
    submitCart: () => void;
}

const Cart: FC<CartProps> = ({ count, submitCart }) => {
    return (
        <div className={styles.cart}>
            <div>
                <h4 className={styles.titlt}>Корзина</h4>
                <p className={styles.count}>{count}</p>
            </div>
            <button
                className={styles.button}
                onClick={submitCart}
                disabled={count === 'Корзина пуста'}
            >
                Отправить
            </button>
        </div>
    )
}

export default Cart;