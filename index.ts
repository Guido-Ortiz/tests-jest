interface RoomInput {
  name: string;
  bookings: Booking[];
  rate: number;
  discount: number;
}


class Room {
  name: string;
  bookings: Booking[];
  rate: number;
  discount: number;


  constructor(room: RoomInput) {
    this.name = room.name;
    this.bookings = room.bookings;
    this.rate = room.rate;
    this.discount = room.discount;
  }


  setBookings(bookings: Booking[]) {
    this.bookings = bookings;
  }


  getDatesInRange(start: Date, end: Date): string[] {
    let range: string[] = []
    let startDate: Date = start;


    while (startDate <= end) {
      range = [...range, startDate.toString().slice(0, 10)];
      startDate.setDate(startDate.getDate() + 1);
    }
    return range;
  }


  isOccupied(date: Date): boolean {
    for (let i = 0; i < this.bookings.length; i++) {
      if ( date >= this.bookings[i].checkIn && date <= this.bookings[i].checkOut) {
        return true;
      }
    }
    return false;
  }


  occupancyPercentage(start: Date, end: Date): number {
    const range: string[] = this.getDatesInRange(start, end);
    let occupiedDates: number = 0;
    range.forEach((date) => {
      if (this.isOccupied(new Date(date)) !== false) {
        return (occupiedDates += 1);
      }
    });
    const totalPercentage: number = (occupiedDates * 100) / range.length;
    return totalPercentage;
  }


  static totalOccupancyPercentage = (rooms: Room[], startDate: Date, endDate: Date): number => {
    let bookingsBetweenRange: number = 0;
    let bookingsCount: number = 0;


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


  static availableRooms = (rooms: Room[], startDate: Date, endDate: Date): Room[] => {
    let availableRoomsArray: Room[] = [];


    rooms.forEach((room) => {
      let roomIsOccupied: boolean = false;
      room.bookings.forEach((booking) => {
        if (booking.checkIn.getTime() < startDate.getTime() && booking.checkOut.getTime() < startDate.getTime()) {
          roomIsOccupied = false;
        } else if (booking.checkIn.getTime() > endDate.getTime() && booking.checkOut.getTime() < endDate.getTime()) {
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






interface BookingsInput {
  name: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  discount: number;
}


class Booking {
  name: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  discount: number;


  constructor(booking: BookingsInput) {
    this.name = booking.name;
    this.email = booking.email;
    this.checkIn = booking.checkIn;
    this.checkOut = booking.checkOut;
    this.discount = booking.discount;
  }


  getFee(room: RoomInput): number {
    let rateRoom = room.rate - (room.rate * room.discount) / 100;
    return rateRoom - (rateRoom * this.discount) / 100;
  }
}

export { Room, Booking };
// module.exports = { Room, Booking };




















// class Room {
//     constructor({ name, bookings, rate, discount }) {
//       this.name = name;
//       this.bookings = bookings;
//       this.rate = rate;
//       this.discount = discount;
//     }
  
//     setBookings(bookings) {
//       this.bookings = bookings;
//     }
  
//     getDatesInRange(start, end) {
//       let range = [];
//       let startDate = start;
  
//       while (startDate <= end) {
//         range = [...range, startDate.toISOString().slice(0, 10)];
//         startDate.setDate(startDate.getDate() + 1);
//       }
//       return range;
//     }
  
//     isOccupied(date) {
//       for (let i = 0; i < this.bookings.length; i++) {
//         if (
//           date >= this.bookings[i].checkIn &&
//           date <= this.bookings[i].checkOut
//         ) {
//           return true;
//         }
//       }
//       return false;
//     }
  
//     occupancyPercentage(start, end) {
//       const range = this.getDatesInRange(start, end);
//       let occupiedDates = 0;
//       range.forEach((date) => {
//         if (this.isOccupied(new Date(date)) !== false) {
//           return (occupiedDates += 1);
//         }
//       });
//       const totalPercentage = (occupiedDates * 100) / range.length;
//       return totalPercentage;
//     }
  
//     static totalOccupancyPercentage = (rooms, startDate, endDate) => {
//       let bookingsBetweenRange = 0;
//       let bookingsCount = 0;
  
//       rooms.forEach((room) => {
//         room.bookings.forEach((booking) => {
//           bookingsCount++;
//           if (
//             booking.checkIn.getTime() >= startDate.getTime() &&
//             booking.checkOut.getTime() < endDate.getTime()
//           ) {
//             bookingsBetweenRange++;
//           }
//         });
//       });
  
//       return (bookingsBetweenRange * 100) / bookingsCount;
//     };
  
//     static availableRooms = (rooms, startDate, endDate) => {
//       let availableRoomsArray = [];
  
//       rooms.forEach((room) => {
//         let roomIsOccupied = false;
//         room.bookings.forEach((booking) => {
//           if (
//             booking.checkIn.getTime() < startDate.getTime() &&
//             booking.checkOut.getTime() < startDate.getTime()
//           ) {
//             roomIsOccupied = false;
//           } else if (
//             booking.checkIn.getTime() > endDate.getTime() &&
//             booking.checkOut.getTime() < endDate.getTime()
//           ) {
//             roomIsOccupied = false;
//           } else {
//             roomIsOccupied = true;
//           }
//         });
//         roomIsOccupied === false && !availableRoomsArray.includes(room)
//           ? availableRoomsArray.push(room)
//           : null;
//       });
  
//       return availableRoomsArray;
//     };
//   }
  
//   class Booking {
//     constructor({ name, email, checkIn, checkOut, discount }) {
//       this.name = name;
//       this.email = email;
//       this.checkIn = checkIn;
//       this.checkOut = checkOut;
//       this.discount = discount;
//     }
  
//     getFee(room) {
//       let rateRoom = room.rate - (room.rate * room.discount) / 100;
//       return rateRoom - (rateRoom * this.discount) / 100;
//     }
//   }
  
//   module.exports = { Room, Booking };