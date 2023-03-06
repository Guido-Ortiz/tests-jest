"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = exports.Room = void 0;
class Room {
    constructor(room) {
        this.name = room.name;
        this.bookings = room.bookings;
        this.rate = room.rate;
        this.discount = room.discount;
    }
    setBookings(bookings) {
        this.bookings = bookings;
    }
    getDatesInRange(start, end) {
        let range = [];
        let startDate = start;
        while (startDate <= end) {
            range = [...range, startDate.toString().slice(0, 10)];
            startDate.setDate(startDate.getDate() + 1);
        }
        return range;
    }
    isOccupied(date) {
        for (let i = 0; i < this.bookings.length; i++) {
            if (date >= this.bookings[i].checkIn && date <= this.bookings[i].checkOut) {
                return true;
            }
        }
        return false;
    }
    occupancyPercentage(start, end) {
        const range = this.getDatesInRange(start, end);
        let occupiedDates = 0;
        range.forEach((date) => {
            if (this.isOccupied(new Date(date)) !== false) {
                return (occupiedDates += 1);
            }
        });
        const totalPercentage = (occupiedDates * 100) / range.length;
        return totalPercentage;
    }
}
exports.Room = Room;
Room.totalOccupancyPercentage = (rooms, startDate, endDate) => {
    let bookingsBetweenRange = 0;
    let bookingsCount = 0;
    rooms.forEach((room) => {
        room.bookings.forEach((booking) => {
            bookingsCount++;
            if (booking.checkIn.getTime() >= startDate.getTime() && booking.checkOut.getTime() < endDate.getTime()) {
                bookingsBetweenRange++;
            }
        });
    });
    return (bookingsBetweenRange * 100) / bookingsCount;
};
Room.availableRooms = (rooms, startDate, endDate) => {
    let availableRoomsArray = [];
    rooms.forEach((room) => {
        let roomIsOccupied = false;
        room.bookings.forEach((booking) => {
            if (booking.checkIn.getTime() < startDate.getTime() && booking.checkOut.getTime() < startDate.getTime()) {
                roomIsOccupied = false;
            }
            else if (booking.checkIn.getTime() > endDate.getTime() && booking.checkOut.getTime() < endDate.getTime()) {
                roomIsOccupied = false;
            }
            else {
                roomIsOccupied = true;
            }
        });
        roomIsOccupied === false && !availableRoomsArray.includes(room)
            ? availableRoomsArray.push(room)
            : null;
    });
    return availableRoomsArray;
};
class Booking {
    constructor(booking) {
        this.name = booking.name;
        this.email = booking.email;
        this.checkIn = booking.checkIn;
        this.checkOut = booking.checkOut;
        this.discount = booking.discount;
    }
    getFee(room) {
        let rateRoom = room.rate - (room.rate * room.discount) / 100;
        return rateRoom - (rateRoom * this.discount) / 100;
    }
}
exports.Booking = Booking;
// module.exports = { Room, Booking };
