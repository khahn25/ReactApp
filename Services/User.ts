import axios from "axios";
import { User } from "./Interfaces/UserApi";

const BASE_URL = 'http://kiemtra.stecom.vn:8888/api/cong-viec/NXK103765'
export const addUserApi = ({ tenCongTy, maSoThue, viTriTuyenDung, yeuCauTuyenDung, diaChi }: User) => {
    return axios({
        method: "POST",
        url: BASE_URL.concat('/create'),
        data: {
            tenCongTy, 
            maSoThue,
            diaChi,
            yeuCauTuyenDung,
            viTriTuyenDung
        }
    })
}


export const getByIdApi = (id: string) => {
    return axios({
        method: "GET",
        url: BASE_URL.concat("/").concat(id)
    })
}


export const deleteApi = (id: string) => {
    return axios({
        method: "DELETE",
        url: BASE_URL.concat("/").concat(id)
    })
}

export const listUserApi = () => {
    return axios({
        method: "GET",
        url: BASE_URL.concat('/get-all?pageSize=20&pageIndex=1')
    })
}

