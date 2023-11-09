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

    const createImags = images.map(async (item) => {
      RoomImages.create({ name: item, RoomId: newRoom.id });
    })

    const createPerks = perks.map(async (item) => {
      await RoomPerks.create({ name: item, RoomId: newRoom.id });
    })

    await Promise.all(
      [...createImags,...createPerks]
    );

    // await RoomDates.create({ start, end, RoomId: newRoom.id });
    // await RoomPerks.create({ name: perks, RoomId: newRoom.id });

    res.status(201).json({message: "Successfully Created room"});
  } catch (error) {
    next(error);
  }
};

// get Room
export const getRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getRoom = await Room.findOne({
      where: { id },
      include: [
        { model: RoomImages, as: "images" },
        { model: RoomPerks, as: "perks" },
        { model: RoomDates, as: "dates" },
      ],
    });
    if (!getRoom)
      return next(createError(404, "No room found with this id :("));
    res.status(200).json(getRoom);
  } catch (error) {
    next(error);
  }
};
// pending
export const updateRoom = async (req, res, next) => {
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

    const existingRoom = await Room.findByPk(req.params.id);

    if (!existingRoom) {
      return next(createError(404, "Room not found."));
    }

    // Update Room
    await existingRoom.update({
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

    // Update RoomImages
    const existingImage = await RoomImages.findAll({
      where: { RoomId: existingRoom.id },
    });
    console.log(existingImage);
    if (existingImage) {
      await RoomImages.update({ name: images });
    }

    // Update RoomPerks
    const existingPerk = await RoomPerks.findAll({
      where: { RoomId: existingRoom.id },
    });
    if (existingPerk) {
      await existingPerk.update({ name: perks });
    }

    // Update RoomDates
    const existingDate = await RoomDates.findAll({
      where: { RoomId: existingRoom.id },
    });
    if (existingDate) {
      await existingDate.update({ start, end });
    }

    res.status(201).json("updated");
  } catch (error) {
    next(error);
  }
};

export const deleteRoom = async (req, res, next) => {
  try {

    const roomToDelete = await Room.findByPk(req.params.id, {
      include: [
        { model: RoomImages, as: 'images' },
        { model: RoomPerks, as: 'perks' },
        { model: RoomDates, as: 'dates' },
      ],
    });
  
    if (!roomToDelete) {
      return next(createError(404,'Room not found.'));
    }
  
    // Delete the Room, and associated records will be deleted automatically
    await roomToDelete.destroy();
    res.status(200).json({ message: "Room Deleted successfully :)" });
  } catch (error) {
    next(error);
  }
};

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
