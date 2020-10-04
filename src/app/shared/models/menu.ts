export interface MenuList {
    success: boolean,
    data: Array<Menu>
}

export interface Menu {
    dateCreate?: string,
    isHide: boolean,
    subMenu?: Array<any>,
    _id: string,
    title: string,
    creator?: string
}