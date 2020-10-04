export interface Slider {
    success: boolean,
    data: Array<SliderData>
}

export interface SliderData {
    dateCreate?: string,
    _id: string,
    logo: string,
    creator?: string
}