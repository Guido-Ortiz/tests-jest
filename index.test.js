const { Room, Booking } = require("./index");

describe('Room occupied or not', () => {

    test("NOT occupied", () => {
        const bookingOne = new Booking({
            name: "Guido",
            email: "guido@gmail.com",
            checkIn: new Date("2022-02-27"),
            checkOut: new Date("2022-03-01"),
            discount: 15,
        });
        const bookingTwo = new Booking({
            name: "Mariano",
            email: "mariano@gmail.com",
            checkIn: new Date("2022-03-20"),
            checkOut: new Date("2022-03-28"),
            discount: 15,
        });
        const room = new Room({
            name: "Suite",
            bookings: [bookingOne, bookingTwo],
            rate: 6500,
            discount: 15,
        });

        expect(room.isOccupied(new Date("2022-12-06"))).toBe(false);
        expect(room.isOccupied(new Date("2022-03-14"))).toBe(false);
    });

    test("IS occupied", () => {
        const bookingOne = new Booking({
            name: "Guido",
            email: "guido@gmail.com",
            checkIn: new Date("2022-02-27"),
            checkOut: new Date("2022-03-01"),
            discount: 15,
        });
        const bookingTwo = new Booking({
            name: "Mariano",
            email: "mariano@gmail.com",
            checkIn: new Date("2022-03-20"),
            checkOut: new Date("2022-03-28"),
            discount: 15,
        });
        const room = new Room({
            name: "Suite",
            bookings: [bookingOne, bookingTwo],
            rate: 6500,
            discount: 15,
        });

        expect(room.isOccupied(new Date("2022-03-21"))).toBe(true);
        expect(room.isOccupied(new Date("2022-03-28"))).toBe(true);
        expect(room.isOccupied(new Date("2022-02-27"))).toBe(true);
        expect(room.isOccupied(new Date("2022-02-28"))).toBe(true);
    });
})


describe('BOOKING FEES', () => {

    test('Get booking fee with no discount', () => {
        const bookingOne = new Booking({
            name: "guido",
            email: "guido@gmail.com",
            checkIn: new Date("2022-12-11"),
            checkOut: new Date("2022-12-11"),
            discount: 0,
        });
        const room = new Room({
            name: "Suite",
            bookings: [bookingOne],
            rate: 6500,
            discount: 0,
        });
        expect(bookingOne.getFee(room)).toBe(6500);
    });

    test('Get booking fee 15% off', () => {
        const bookingOne = new Booking({
            name: "guido",
            email: "guido@gmail.com",
            checkIn: new Date("2022-12-11"),
            checkOut: new Date("2022-12-11"),
            discount: 15,
        });
        const room = new Room({
            name: "Suite",
            bookings: [bookingOne],
            rate: 6500,
            discount: 15,
        });
        expect(bookingOne.getFee(room)).toBe(4696.25);
    });

    test('Get booking fee 20% off', () => {
        const bookingOne = new Booking({
            name: "guido",
            email: "guido@gmail.com",
            checkIn: new Date("2022-12-11"),
            checkOut: new Date("2022-12-11"),
            discount: 5,
        });
        const room = new Room({
            name: "Suite",
            bookings: [bookingOne],
            rate: 5000,
            discount: 20,
        });
        expect(bookingOne.getFee(room)).toBe(3800);
    });

})


describe('OCCUPANCY PERCENTAGES', () => {

    test("Percentage occupancy 50%", () => {
        const bookingOne = new Booking({
            name: "guido",
            email: "guido@gmail.com",
            checkIn: new Date("2023-02-20"),
            checkOut: new Date("2023-02-23"),
            discount: 15,
        });
        const bookingTwo = new Booking({
            name: "mariano",
            email: "mariano@gmail.com",
            checkIn: new Date("2023-12-25"),
            checkOut: new Date("2023-12-27"),
            discount: 15,
        });
        const room = new Room({
            name: "Suite",
            bookings: [bookingOne, bookingTwo],
            rate: 6500,
            discount: 15,
        });

        expect(
            room.occupancyPercentage(new Date("2023-02-20"), new Date("2023-02-27"))
        ).toBe(50);
    });

    test("Total occupancy percentage to be 75%", () => {
        const bookingOne = new Booking({
            name: "guido",
            email: "guido@gmail.com",
            checkIn: new Date("2022-12-11"),
            checkOut: new Date("2022-12-11"),
            discount: 15,
        });
        const bookingTwo = new Booking({
            name: "guido",
            email: "guido@gmail.com",
            checkIn: new Date("2022-12-07"),
            checkOut: new Date("2022-12-14"),
            discount: 15,
        });
        const room = new Room({
            name: "Suite",
            bookings: [bookingOne, bookingTwo],
            rate: 6500,
            discount: 15,
        });

        const bookingThree = new Booking({
            name: "guido",
            email: "guido@gmail.com",
            checkIn: new Date("2022-12-11"),
            checkOut: new Date("2022-12-15"),
            discount: 15,
        });
        const bookingFour = new Booking({
            name: "guido",
            email: "guido@gmail.com",
            checkIn: new Date("2022-12-11"),
            checkOut: new Date("2022-12-12"),
            discount: 15,
        });
        const roomTwo = new Room({
            name: "Suite",
            bookings: [bookingThree, bookingFour],
            rate: 6500,
            discount: 15,
        });
        const Rooms = [room, roomTwo];

        expect(Room.totalOccupancyPercentage(Rooms, new Date("2022-12-11"), new Date("2022-12-16"))).toBe(75);
    });

    test("RoomTwo is fully available between given dates", () => {
        const bookingOne = new Booking({
            name: "guido",
            email: "guido@gmail.com",
            checkIn: new Date("2022-12-11"),
            checkOut: new Date("2022-12-11"),
            discount: 15,
        });
        const bookingTwo = new Booking({
            name: "guido",
            email: "guido@gmail.com",
            checkIn: new Date("2022-12-07"),
            checkOut: new Date("2022-12-14"),
            discount: 15,
        });
        const room = new Room({
            name: "Suite",
            bookings: [bookingOne, bookingTwo],
            rate: 6500,
            discount: 15,
        });
        const bookingThree = new Booking({
            name: "guido",
            email: "guido@gmail.com",
            checkIn: new Date("2022-12-05"),
            checkOut: new Date("2022-12-06"),
            discount: 15,
        });
        const bookingFour = new Booking({
            name: "guido",
            email: "guido@gmail.com",
            checkIn: new Date("2022-12-02"),
            checkOut: new Date("2022-12-03"),
            discount: 15,
        });
        const roomTwo = new Room({
            name: "Suite",
            bookings: [bookingThree, bookingFour],
            rate: 6500,
            discount: 15,
        });
        const Rooms = [room, roomTwo];

        expect(
            Room.availableRooms(Rooms, new Date("2022-12-11"), new Date("2022-12-16"))
        ).toStrictEqual([roomTwo]);
    });

    test("No rooms are fully available between given dates", () => {
        const bookingTemplateOne = new Booking({
            name: "Test1",
            email: "test1@gmail.com",
            checkIn: new Date("2022-12-11"),
            checkOut: new Date("2022-12-11"),
            discount: 15,
        });
        const bookingTemplateTwo = new Booking({
            name: "Test2",
            email: "test2@gmail.com",
            checkIn: new Date("2022-12-07"),
            checkOut: new Date("2022-12-14"),
            discount: 15,
        });
        const room = new Room({
            name: "Suite",
            bookings: [bookingTemplateOne, bookingTemplateTwo],
            rate: 6500,
            discount: 15,
        });
        const bookingTemplateThree = new Booking({
            name: "Test3",
            email: "test3@gmail.com",
            checkIn: new Date("2022-12-05"),
            checkOut: new Date("2022-12-06"),
            discount: 15,
        });
        const bookingTemplateFour = new Booking({
            name: "Test4",
            email: "test4@gmail.com",
            checkIn: new Date("2022-12-02"),
            checkOut: new Date("2022-12-12"),
            discount: 15,
        });
        const roomTwo = new Room({
            name: "Suite",
            bookings: [bookingTemplateThree, bookingTemplateFour],
            rate: 6500,
            discount: 15,
        });
        const Rooms = [room, roomTwo];

        expect(
            Room.availableRooms(Rooms, new Date("2022-12-11"), new Date("2022-12-16"))
        ).toStrictEqual([]);
    });
})