import React from "react";
import { TbThumbUp } from 'react-icons/tb'
import { useNavigate } from "react-router-dom";
import { KKPrimaryButton } from "../../components/KKButton";
import sukses from './Sukses.png'

const Sukses = () => {
    const navigate = useNavigate()

    return (
        <div className="text-center">
            <div className="w-[300px] h-[300px] flex items-center justify-center mx-auto mt-5 mb-4">
              <img src={sukses} alt="gambar"/>
            </div>
            <h1 className="text-primary-400 font-bold text-2xl">TERIMAKASIH</h1>
            <p>Pilihan anda telah tersimpan <br /> Tekan tombol di bawah untuk kembali ke halaman Menu</p>
            <KKPrimaryButton className=" bg-primary w-40 mt-10" onClick={() => {navigate("/")}}>Menu</KKPrimaryButton>
        </div>
    )
}

export default Sukses