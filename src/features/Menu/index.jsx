import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom'
import menu from './menu.jpg'
import AuthContext from "../../AuthContext";
import moment from "moment";

const Menu = () => {
    // state, props, hooks
    const navigate = useNavigate()
    const {token, url, loginResult} = useContext(AuthContext)
    const [pemilihan, setPemilihan] = useState([])
    const [votedPeriodes, setVotedPeriodes] = useState([])
    // const {id} = useParams()
    const {user, setUser} = useState(null)

    useEffect(() => {
        (async () => {
            const result = await axios.get(url+'/periode', {
                headers: {
                    "Authorization": "bearer "+token
                }
            })
                .then((response) => response.data)
            setPemilihan(result)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const result = await axios.get(url+'/vote/periode-ids', {
                headers: { 
                    "Authorization": "bearer " + token
                }
            }).then(res => res.data)

            setVotedPeriodes(result)
        })()
    }, [])

    const goToVoting = (id) => {
        const selected = pemilihan.find(p => p.id == id)
        const selisihWaktu = moment().diff(moment(selected.waktuBerakhir), 'seconds')
        if (selisihWaktu > 0) {
            alert("Pemilihan telah berakhir")
        }
        // navigate(`/voting/${id}`)
    }

    const ToHasil = () => {
        navigate('/dev/hasil')
    }

    function ProfilePage() {
        // Get the userId param from the URL.
        let { setId } = useParams();
        // ...
    }
      

    return (
        <div className="mx-auto text-center p-3 max-w-[300px] md:max-w-[500px]">
            <img src={menu} className="rounded-3xl py-25 md:col-span-2 md:w-full mb-5"/>
            <p className="font-bold text-left">
                Hallo {loginResult ? loginResult.displayName : ''}!
            </p>
            <p className="text-left mb-5">Tekan Pemilihan di bawah untuk mulai memilih</p>
            <div className="flex flex-col gap-5 md:grid grid-cols-2 grid-rows-1 ">
                
                {pemilihan.filter(v => v.isActive).map(p => (
                    <button 
                        key={p.id} 
                        className="bg-primary py-5 px-3 rounded-md relative text-left"
                        onClick={ () => goToVoting(p.id) }
                        >
                        <span className="font-bold">{p.name}</span>
                        <span className="block">Berakhir pada {moment(p.waktuBerakhir).format('HH:mm')} WIB</span>
                        { (votedPeriodes.find( vtd => vtd == p.id)) ? 
                            (<i className="bg-yellow-300 text-[0.8em] rounded-tr rounded-bl px-3 py-1 inline-block absolute top-0 right-0">sudah memilih</i>) 
                            : (moment().diff(moment(p.waktuBerakhir), 'seconds') <= 0) ? (
                                <i className="bg-green-300 text-[0.8em] rounded-tr rounded-bl px-3 py-1 inline-block absolute top-0 right-0">dibuka</i>
                            ) : (
                                <i className="bg-gray-300 text-[0.8em] rounded-tr rounded-bl px-3 py-1 inline-block absolute top-0 right-0">berakhir</i>
                            )
                        }

                    </button>
                ))}

                <button className="py-5 px-10 rounded-md bg-secondary text-white" onClick={ToHasil}>
                    Hasil Pemilihan
                </button>
            </div>
            
        </div>    
        
    )
}

export default Menu