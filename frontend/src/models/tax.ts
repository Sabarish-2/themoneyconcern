export interface Tax {
    _id : string,
    basicSalary : number,
    hra? : number,
    spla? : number,
    taxCal? : number,
    createdAt : string,
    updatedAt : string,
}