export interface User {
     name: String  ,
     age : String 
}
export interface AllUser {
    data: [User]
}

export interface Responsedata {
     message: String ,
     data : User ,
     value: Boolean
}
export interface  AllUserResponse {
     message: String ,
     data : AllUser ,
     value: Boolean
}