import React from "react";
import calon1 from '../../assets/Calon1.png'
const VotingOsis3 = () => {
    const judulVoting = 'Voting Pradana Putra'
    const candidates = [
        {
            id: 1,
            name: 'Rahmat & Rahmadhani',
            img: calon1,
            selected: false
        },
        {
            id: 2,
            name: 'Andika & Rahmat',
            img: 'https://dummyimage.com/333x193/81a9b8/fff?text=Andika-Rahmat',
            selected: true
        },
        {
            id: 3,
            name: 'Ramadhani & Andika',
            img: 'https://dummyimage.com/333x193/81a9b8/fff?text=Andika-Rahmat',
            selected: false
        }
    ]
    return(
        <div className="">
            <h1 className="font-bold text-center mt-5 text-3xl">{judulVoting.name}</h1>
            <p className="text-center mb-2">Klik gambar kandidat pilihan anda <br /> untuk memberi voting</p>
            <div className="flex-row md:flex">
                {candidates.map(c => (
                    <img 
                        src={c.photo} 
                        key={c.id} 
                        className={`rounded-3xl pb-1 mx-auto border-4 ${c.isActive ? 'border-4 border-sky-500 ' : ' border-black'} bg-primary`}
                        />
                ))}
            </div>
            <button 
                className="bg-[url('https://dummyimage.com/172x45/7BA9AC/fff&text=+')] text-white mt-5 mx-auto px-14 py-3 rounded-xl md:display: block" 
                onClick={goToSukses}
            >Submit</button>
        </div>
    )
}

export default VotingOsis3