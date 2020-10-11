export interface Cart {
    items: Array<CartItem>
}

export interface CartItem {
    idProduct: string,
    name: string,
    amout: number,
    price: number,
    logo: string
}