export interface ProductResponse {
    success: boolean,
    data: Array<Product>
}

export interface Product {
    dateCreate: string,
    isHide: boolean,
    _id: string,
    title: string,
    name: string,
    brand: string,
    price: number,
    describe: ProductDescribe,
    warrantyPolicy: string,
    logo: string,
    creator: string,
    type: string,
    guarantee: string,
    amount: number
}

export interface ProductDescribe {
    thuonghieu: string,
    gioitinh: string,
    loaikinh: string,
    may: string,
    chatlieuday: string,
    maumatso: string,
    duongkinh: string,
    doday: string,
    mauday: string,
    nieng: string,
    chiunuoc: string,
    chucnang: string
}