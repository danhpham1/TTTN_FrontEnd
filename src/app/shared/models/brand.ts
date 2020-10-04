export interface Brand {
    success: boolean,
    data: Array<BrandData>
}

export interface BrandData {
    dateCreate?: string,
    dateUpdate?: string,
    isHide: boolean,
    _id: string,
    title: string,
    logo: string,
}