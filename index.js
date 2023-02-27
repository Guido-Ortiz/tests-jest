// function Booking(name, email, checkin, checkout, discount, room){
//     this.name = name;
//     this.email = email;
//     this.checkin = checkin;
//     this.checkout = checkout;
//     this.discount = discount;
//     this.room = room;
// }

// Booking.prototype.getFee = function(){
//     let rate = this.room.rate - (this.room.rate * this.room.discount) / 100
//     return rate - (rate * this.discount) / 100
// }

// function Room(name, bookings, rate, discount){
//     this.name = name;
//     this.bookings = bookings;
//     this.rate = rate;
//     this.discount = discount;
// }

// module.exports = {
//     Booking,
//     Room
// }



class Room {
    constructor({ name, bookings, rate, discount }) {
      this.name = name;
      this.bookings = bookings;
      this.rate = rate;
      this.discount = discount;
    }
  
    setBookings(bookings) {
      this.bookings = bookings;
    }
  
    // Returns an array of dates between start date and end date
    getDatesInRange(start, end) {
      let range = [];
      let startDate = start;
  
      while (startDate <= end) {
        range = [...range, startDate.toISOString().slice(0, 10)];
        startDate.setDate(startDate.getDate() + 1);
      }
      return range;
    }
  
    // Is occupied if given date is between the booking check in and check out
    isOccupied(date) {
      for (let i = 0; i < this.bookings.length; i++) {
        if (
          date >= this.bookings[i].checkIn &&
          date <= this.bookings[i].checkOut
        ) {
          return true;
        }
      }
      return false;
    }
  
    // Checks for each date between the dates range if the current room is occupied. Then calculates the percentage
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
  
    // Check which room is completely occupied in the dates range. Then calculates the percentage based on the total amount of bookings
    static totalOccupancyPercentage = (rooms, startDate, endDate) => {
      let bookingsBetweenRange = 0;
      let bookingsCount = 0;
  
      rooms.forEach((room) => {
        room.bookings.forEach((booking) => {
          bookingsCount++;
          if (
            booking.checkIn.getTime() >= startDate.getTime() &&
            booking.checkOut.getTime() < endDate.getTime()
          ) {
            bookingsBetweenRange++;
          }
        });
      });
  
      return (bookingsBetweenRange * 100) / bookingsCount;
    };
  
    static availableRooms = (rooms, startDate, endDate) => {
      let availableRoomsArray = [];
  
      rooms.forEach((room) => {
        let roomIsOccupied = false;
        room.bookings.forEach((booking) => {
          if (
            booking.checkIn.getTime() < startDate.getTime() &&
            booking.checkOut.getTime() < startDate.getTime()
          ) {
            roomIsOccupied = false;
          } else if (
            booking.checkIn.getTime() > endDate.getTime() &&
            booking.checkOut.getTime() < endDate.getTime()
          ) {
            roomIsOccupied = false;
          } else {
            roomIsOccupied = true;
          }
        });
        roomIsOccupied === false && !availableRoomsArray.includes(room)
          ? availableRoomsArray.push(room)
          : null;
      });
  
      return availableRoomsArray;
    };
  }
  
  class Booking {
    constructor({ name, email, checkIn, checkOut, discount }) {
      this.name = name;
      this.email = email;
      this.checkIn = checkIn;
      this.checkOut = checkOut;
      this.discount = discount;
    }
  
    getFee(room) {
      let rateRoom = room.rate - (room.rate * room.discount) / 100;
      return rateRoom - (rateRoom * this.discount) / 100;
    }
  }
  
  module.exports = { Room, Booking };