import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { BsCalendarEvent } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineWifi } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineMinus } from "react-icons/ai";
import { MdTableRestaurant } from "react-icons/md";
import { BsDoorOpenFill } from "react-icons/bs";
import { DateRange, DateRangePicker } from "react-date-range";
import { addDays, format, differenceInCalendarDays } from "date-fns";

export default function Room() {
  const { id } = useParams();

  const [toggleDate, setToggleDate] = useState(false);
  const [toggleGuest, setToggleGuest] = useState(false);

  const [data, setData] = useState(null);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  useEffect(() => {
    getRoomData();
  }, []);

  const [booking, setBooking] = useState({
    room: id || null,
    startDate: state[0].startDate,
    endDateDate: state[0].endDate,
    adults: 1,
    children: 0,
    totalPrice: 0,
  });

  console.log(booking);

  let totalDays = differenceInCalendarDays(
    booking.endDateDate,
    booking.startDate
  );

  const getRoomData = async () => {
    try {
      const response = await axios.get(`/room/${id}`);
      setData(response.data);
      setBooking((prevS) => ({...prevS,totalPrice: data?.roomPrice * totalDays}))
    } catch (error) {
      const err = error?.response?.data?.message || "something went wrong :(";
      toast.error(`${err}`, {
        position: "bottom-center",
        style: {
          maxWidth: "fit-content",
        },
      });
    }
  };

  const addGuests = (target) => {
    if (target == "adult") {
      setBooking((prevState) => ({
        ...prevState,
        adults: prevState.adults + 1,
      }));
    } else {
      setBooking((prevState) => ({
        ...prevState,
        children: prevState.children + 1,
      }));
    }
  };

  const removeGuests = (target) => {
    if (target == "adult") {
      setBooking((prevState) => ({
        ...prevState,
        adults: prevState.adults - 1,
      }));
    } else {
      setBooking((prevState) => ({
        ...prevState,
        children: prevState.children - 1,
      }));
    }
  };



  return (
    <div className="pages">
      <Toaster />
      <div className="single__page__room px-16">
        {data ? (
          <div className="">
            <h1 className="text-2xl font-semibold leading-10">{data?.name}</h1>
            <ul className="short__desc text-sm font-light flex gap-5">
              <li>
                4.88 · <div className="underline inline-block">205 reviews</div>
              </li>
              <li>· Superhost ·</li>
              <li>{data.location}</li>
            </ul>
            <div className="images__container hidden grid-cols-3 grid-rows-2 gap-4 my-5 max-h-60 md:max-h-96 md:grid rounded-2xl overflow-hidden">
              {data.images?.map((img, ind) => {
                return (
                  <img
                    key={ind}
                    className={`cursor-pointer w-full h-full object-cover ${
                      ind == 0 && "col-span-2 row-span-3"
                    }`}
                    src={img.name}
                    alt=""
                  />
                );
              })}
            </div>
            <div className="grid py-8 grid-cols-12 gap-10">
              <div className="lg:col-span-7">
                <div className="user__info border-b-[1px] pb-6 border-gray-300 flex justify-between items-center">
                  <div className="info">
                    <h2 className="font-semibold text-xl leading-10">
                      Entire cottage hosted by Daleep
                    </h2>
                    <ul className="flex gap-5 text-sm">
                      <li>
                        {data.adultCapacity + data.childrenCapacity} guests
                      </li>
                      <li>2 bedrooms</li>
                      <li>3 beds</li>
                      <li>1 bathroom</li>
                    </ul>
                  </div>
                  <div className="image">
                    <img
                      className="w-16 rounded-full object-cover h-16"
                      src="https://a0.muscache.com/im/pictures/user/d87628a6-3c1a-4e2e-a4ae-7743ab5f6ece.jpg?im_w=240"
                      alt="user"
                    />
                  </div>
                </div>
                <ul className="highlighted__section ps-3 space-y-8 last:mb-4 border-b-[1px] py-6 border-gray-300">
                  <li className="flex gap-9">
                    <div className="leading-8 text-2xl">
                      <MdTableRestaurant />
                    </div>
                    <div>
                      <p className="font-semibold">Dedicated workspace</p>
                      <span className="font-normal text-sm text-gray-500">
                        A common area with wifi that’s well suited for working.
                      </span>
                    </div>
                  </li>
                  <li className="flex gap-9">
                    <div className="leading-8 text-2xl">
                      <BsDoorOpenFill />
                    </div>
                    <div>
                      <p className="font-semibold">Self check-in</p>
                      <span className="font-normal text-sm text-gray-500">
                        You can check in with the building staff.
                      </span>
                    </div>
                  </li>
                </ul>
                <div className="py-8 border-b-[1px] border-gray-300">
                  <div className="description">{data.about}</div>
                  <div className="perks">
                    <h2 className="font-semibold leading-10">
                      What this place offers
                    </h2>
                    <ul className="py-3 grid gap-y-4 grid-cols-1 md:grid-cols-2">
                      <li className="flex gap-4 items-center">
                        <div className="text-2xl">
                          <AiOutlineWifi />
                        </div>
                        <div>Mountain view</div>
                      </li>
                      <li className="flex gap-4 items-center">
                        <div className="text-2xl">
                          <AiOutlineWifi />
                        </div>
                        <div>Mountain view</div>
                      </li>
                    </ul>
                    <button className="px-5 py-3 rounded-md border-2 border-black mt-4">
                      Show all 57 amenities
                    </button>
                  </div>
                </div>
                <div className="select__rang py-8">
                  <DateRange
                    color="#000000"
                    rangeColors="#000000"
                    editableDateInputs={true}
                    onChange={(item) => setState([item.selection])}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    direction="horizontal"
                    ranges={state}
                  />
                </div>
              </div>
              <div className="lg:col-span-5">
                <div className="side__card relative">
                  <div className="card shadow-lg p-6 sticky border h-fit space-y-4 mx-auto top-28 lg:max-w-sm rounded-xl">
                    <div className="top__bar flex justify-between items-center">
                      <div className="price">
                        <strong className="text-xl text-gray-900">
                          ₹{data.roomPrice} 
                        </strong>
                        <span className="text-sm ms-2">night</span>
                      </div>
                      <span className="text-sm">205 reviews</span>
                    </div>
                    <div className="body relative">
                      <div className="container border border-gray-500 rounded-lg">
                        <button
                          className="grid grid-cols-2 w-full"
                          onClick={() => {
                            setToggleDate(!toggleDate);
                          }}
                        >
                          <div className="p-3 h-full text-start border-r border-gray-500">
                            <p className="text-xs font-bold uppercase">
                              Check-in
                            </p>
                            <span className="text-sm text-gray-600 font-light">
                              {format(state[0].startDate, "dd-MM-yyyy")}
                            </span>
                          </div>
                          <div className="p-3 text-start">
                            <p className="text-xs font-bold uppercase">
                              Check-out
                            </p>
                            <span className="text-sm text-gray-600 font-light">
                              {format(state[0].endDate, "dd-MM-yyyy")}
                            </span>
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setToggleGuest(!toggleGuest);
                          }}
                          className="border-t border-gray-500 w-full flex justify-between items-center p-3"
                        >
                          <div>
                            <p className="text-xs font-bold uppercase">
                              Guests
                            </p>
                            <span className="text-sm text-gray-600 font-light">
                              {booking.adults + booking.children} guest
                            </span>
                          </div>
                          <IoIosArrowDown className="text-xl" />
                        </button>
                      </div>
                      {toggleGuest && (
                        <div className="guest__card absolute bg-white left-0 right-0 w-full rounded-md py-6 px-4 shadow-sm border">
                          <div className="slt__part flex justify-between items-center mb-6">
                            <div>
                              <p className="text-lg font-medium">Adults</p>
                              <span className="text-sm text-gray-700">
                                Age 13+
                              </span>
                            </div>
                            <div className="act flex items-center gap-4">
                              <button
                                className={`${
                                  booking.adults <= 1
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                                } border rounded-full w-10 h-10 flex justify-center items-center`}
                                onClick={() => removeGuests("adult")}
                                disabled={
                                  booking.adults <= 1 &&
                                  booking.adults <= data.adultCapacity
                                    ? true
                                    : false
                                }
                              >
                                <AiOutlineMinus />
                              </button>
                              <p className="">{booking.adults}</p>
                              <button
                                className="cursor-pointer border rounded-full w-10 h-10 flex justify-center items-center"
                                onClick={() => addGuests("adult")}
                              >
                                <AiOutlinePlus />
                              </button>
                            </div>
                          </div>
                          <div className="slt__part flex justify-between items-center mb-6">
                            <div>
                              <p className="text-lg font-medium">Children</p>
                              <span className="text-sm text-gray-700">
                                Ages 2–12
                              </span>
                            </div>
                            <div className="act flex items-center gap-4">
                              <button
                                className={`${
                                  booking.children <= 0
                                    ? "cursor-not-allowed"
                                    : "cursor-pointer"
                                } border rounded-full w-10 h-10 flex justify-center items-center`}
                                onClick={() => removeGuests("children")}
                                disabled={
                                  booking.children <= 0 &&
                                  booking.children <= data.childrenCapacity
                                    ? true
                                    : false
                                }
                              >
                                <AiOutlineMinus />
                              </button>
                              <p className="">{booking.children}</p>
                              <button
                                className="cursor-pointer border rounded-full w-10 h-10 flex justify-center items-center"
                                onClick={() => addGuests("children")}
                              >
                                <AiOutlinePlus />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      {toggleDate && (
                        <div className="date__select absolute right-0 top-20 shadow-2xl rounded-2xl overflow-hidden">
                          <DateRange
                            color="#000000"
                            rangeColors="#000000"
                            editableDateInputs={true}
                            onChange={(item) => setState([item.selection])}
                            moveRangeOnFirstSelection={false}
                            months={2}
                            direction="horizontal"
                            ranges={state}
                          />
                        </div>
                      )}
                    </div>
                    <div className="bottom__bar">
                      <button className="w-full bg-rose-600 text-white rounded-xl py-4">
                        Check Availability
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
