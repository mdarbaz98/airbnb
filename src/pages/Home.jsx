import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { AirbnbCardSkeleton } from '../components/AirbnbCardSkeleton';
import { Link } from 'react-router-dom';

export default function Home() {

  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/room')
      setRooms(response.data); 
      setLoading(false);
    } catch (error) {
      toast.error(`${error}`,{
        position: "bottom-center",
        style: {
          maxWidth: "fit-content"
        }
      })
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }



  if (loading) {
    return <div className='pages lg:mx-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-[1420px]:grid-cols-6'>
      <AirbnbCardSkeleton />
    </div>;
  }

  return (
    <div className='pages'>
      <Toaster/>
      <div className='lg:px-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-[1420px]:grid-cols-6'>
        {rooms && rooms.map((room, index) => {
          return(
            <Link to={`/room/${room.id}`}>
            <div className='room__card cursor-pointer' key={index}>
              <div className="image__container">
              {room?.images?.map((img, ind) => {
              return(<img key={ind} className='card__img rounded-2xl object-cover aspect-square bg-slate-500' src={img.name} alt="Room-img" />)
              })}
              </div>
              <div className="card__body py-2">
                <div className="title font-semibold">
                    {room.name}
                </div>
                <p className="dts text-[15px] text-gray-600">
                  {room.location}
                </p>
                <p className='abl text-[15px] text-gray-600'>
                  {room.adultCapacity +'-'+ room.childrenCapacity}
                </p>
                <div>
                  <strong className='text-sm'>₹{room.roomPrice}</strong> <span className='text-sm '>night</span>
                </div>
              </div>
            </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
