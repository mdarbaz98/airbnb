import Room from "../models/room.js";
import RoomDates from "../models/roomDates.js";
import RoomImages from "../models/roomImages.js";
import RoomPerks from "../models/roomPerks.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  try {
    const {
      name,
      adultCapacity,
      childrenCapacity,
      roomPrice,
      images,
      location,
      shortIntro,
      specialThings,
      about,
      highlighted,
      perks,
      start,
      end,
    } = req.body;

    const newRoom = await Room.create({
      name,
      adultCapacity,
      childrenCapacity,
      roomPrice,
      location,
      shortIntro,
      specialThings,
      about,
      highlighted,
    });

    await RoomImages.create({ name: images, RoomId: newRoom.id });
    await RoomPerks.create({ name: perks, RoomId: newRoom.id });
    await RoomDates.create({ start, end, RoomId: newRoom.id });

    res.status(201).json(newRoom);
  } catch (error) {
    next(error);
  }
};

// get Room 
export const getRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getRoom = await Room.findOne({where: {id}, include: [
      { model: RoomImages, as: "images" },
      { model: RoomPerks, as: "perks" },
      { model: RoomDates, as: "dates" },
    ],});
    if(!getRoom) return next(createError(404,"No room found with this id :("))
    res.status(200).json(getRoom);
  } catch (error) {
    next(error)
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const data = req.body;
    const updatedRoom = await Room.update(data, { where: { id: req.body.id } });
    await RoomImages.create({ name: images, RoomId: newRoom.id });
    await RoomPerks.create({ name: perks, RoomId: newRoom.id });
    await RoomDates.create({ start, end, RoomId: newRoom.id });
    res.status(201).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = () => {};

export const getAllRoom = async (req, res, next) => {
  try {
    const roomsWithImages = await Room.findAll({
      include: [
        { model: RoomImages, as: "images" },
        { model: RoomPerks, as: "perks" },
        { model: RoomDates, as: "dates" },
      ],
    });
    res.status(200).json(roomsWithImages);
  } catch (error) {
    next(error);
  }
};
