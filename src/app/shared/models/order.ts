export type OrderHistory = OrderDetail | OrderList;
export interface OrderDetail {
    data?: Order,
    success: boolean,
}

export interface OrderList {
    data?: Array<Order>,
    success: boolean,
}

export interface Order {
    address: string,
    dateCreate: string,
    name: string,
    orderDetail: Array<OrderDetail>,
    state: number,
    total: number,
    username: string,
    _id: string,
    phone: string
}

export interface OrderDetail {
    idProduct: string,
    amout: number,
    logo: string,
    name: string,
    price: number
}