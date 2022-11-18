import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AuthContext from "../../AuthContext";

const Voting = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const {token, url} = useContext(AuthContext)
    const [votingData, setVotingData] = useState([])
    const [voting, setVoting] = useState([])
    const [simpan, setSimpan] = useState(null) //null adalah nilai default dari simpan

    useEffect(() => {
        (async () => {
            const result = await axios.get(`${url}/periode/${id}`)
                .then((response) => response.data)
                setVotingData(result)
        })()
    }, [id])

    useEffect(() => {
        (async () => {
            const result = await axios.get(`${url}/calon/periode/${id}`, {
                headers: {
                    "Authorization": "bearer " + token
                }
            })
                .then((response) => response.data)
            setVoting(result)
        })()
    }, [id])

    const cobaSimpan = (id) => {
        setSimpan(id)
    }

    const sendVote = async () => {
        const result = await axios.post(url + '/vote', {
            pilihanId: simpan,
            periodeId: votingData.id
        }, {headers: {"Authorization": "bearer " + token}})

        if (result.status == 200) {
            navigate("/sukses")
        } else {
            alert("Mohon maaf, voting anda tidak terkirim. Mohon ulangi. ")
        }
    }

    const goToSukses = async () =>{
        if (simpan===null){
            alert('Pilih salah satu calon terlebih dahulu')
        } else {
            console.log(simpan)
            await sendVote()
        }
    }
    
    return(
        <div className="">
            <h1 className="font-bold text-center mt-5 text-3xl">{votingData.name}</h1>
            <p className="text-center mb-2">Klik gambar kandidat pilihan anda <br /> untuk memberi voting</p>
            <div className="flex-row md:flex">
                {voting.map(c => (
                    <img 
                        src={c.photo} 
                        key={c.id}
                        onClick={() => cobaSimpan(c.id)}
                        className={`rounded-3xl pb-1 mx-auto border-4 ${simpan == c.id ? 'border-yellow-700 shadow-lg opacity-100' : 'opacity-90'}  bg-primary`}
                        />
                ))}
            </div>
            <button 
                className="bg-secondary text-white mt-5 mx-auto px-14 py-3 rounded-xl md:display: block" 
                onClick={goToSukses}>Kirim Vote</button>
        </div>
    )
}

export default Voting