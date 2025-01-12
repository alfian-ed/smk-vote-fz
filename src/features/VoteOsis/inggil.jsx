import axios from "axios";
import React, {useEffect,useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";

const VotingOsis4 = () => {
    const [judulVoting, setJudulVoting] = useState([])
    const [voting, setVoting] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const result = await axios.get('http://116.197.129.178:8083/api/calon/periode/4')
                .then((response) => response.data)
            setVoting(result)
        })()
    }, [])

    
    useEffect(() => {
        (async () => {
            const result = await axios.get('http://116.197.129.178:8083/api/periode/4')
                .then((response) => response.data)
            setJudulVoting(result)
        })()
    }, [])

    const goToSukses = () => {
        navigate('/sukses')
    }

    return(
        <div className="">
            <h1 className="font-bold text-center mt-5 text-3xl">{judulVoting.name}</h1>
            <p className="text-center mb-2">Klik gambar kandidat pilihan anda <br /> untuk memberi voting</p>
            <div className="flex-row md:flex">
                {voting.map(c => (
                    <img 
                        src={c.img} 
                        key={c.id} 
                        className={`rounded-3xl pb-1 mx-auto border border-4 ${c.selected ? 'border-secondary ' : ''} bg-primary`}
                        />
                ))}
            </div>
            <button 
                className="bg-[url('https://dummyimage.com/172x45/7BA9AC/fff&text=+')] text-white mt-5 mx-auto px-14 py-3 rounded-xl md:display: block"
                onClick = {goToSukses}>Submit</button>
        </div>
    )
}

export default VotingOsis4