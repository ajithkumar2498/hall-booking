const RoomData =[]
const BookingData=[]

const CreateRoom = (req,res)=>{
    try {
        const {RoomName,numberofseats,additionalseats,pricefor1day,roomNo}=req.body
        let RoomId = RoomData.length?RoomData[RoomData.length-1].RoomId + 1 : 1
       let data = req.body
        data.RoomId=RoomId
        let BookingStatus= false
        data.BookingStatus=BookingStatus
       
        const newRoom={
            RoomName,
            numberofseats,
            additionalseats,
            pricefor1day,
            RoomId,
            roomNo,
            BookingStatus
        }
        RoomData.push(newRoom)
        res.status(201).send({
            message:"room details created successfully",
            room:newRoom
        })
    } catch (error) {
        res.status(500).send({message:"internal server error"})
    }
   
}

const listrooms =(req,res)=>{
    try {
        res.status(200).send({
            message:"room details fetched successfully",
           room:RoomData
        })
    } catch (error) {
        res.status(500).send({message:"internal server error"})
    }
   
}

const BookARoom = (req,res)=>{
    try {
        const {roomNo,RoomName,CustomerName,Date,startTime,endTime,RoomId,phoneNO,email}=req.body
        let BookingID = BookingData.length?BookingData[BookingData.length-1].BookingID + 1 : 1
        let data = req.body
         data.BookingID=BookingID
         data.RoomId=RoomData.RoomId
         const BookingStatus = false
         data.BookingStatus= BookingStatus
         console.log(data.BookingStatus)
        const roomExist = RoomData.find((room)=> room.roomNo==roomNo)
        if(!roomExist){
            res.status(404).send({
                message:"room Not Found"
            })
        }        
        const newBooking = {
                RoomName,
                roomNo,
                CustomerName,
                BookingID,
                BookingStatus,
                phoneNO,
                email,
                Date,
                startTime,
                endTime,
                RoomId
            }
            if(newBooking.BookingStatus==false){
                newBooking.BookingStatus=true
                BookingData.push(newBooking)
                    res.status(201).send({
                        message:"Rooms Booked Successfully",
                       BookingData
                    })
            }
            else {
                newBooking.BookingStatus=true
                res.status(400).send({
                    message:"room already booked"
                })
            }
         
    } catch (error) {
        res.status(500).send({message:"internal server error"})
    }
}

const ListRoomWithBooked = (req,res)=>{
    try {
        const RoomWithBookings = RoomData.map((room)=>{
           const BookingsForRoom = BookingData.filter((booking)=>booking.roomNo===room.roomNo)
            return {...room, BookingData:BookingsForRoom}
        })
        res.status(200).send({
            message:"Rooms with Booking Data",
            RoomData:RoomWithBookings
        })
    } catch (error) {
        res.status(500).send({message:"internal server error"})
    }
}

const ListCustomerswithBookedData =(req,res)=>{
    try {
        const roomsWithCustomers = RoomData.map((room) => {
            const bookingsForRoom = BookingData.filter((booking) => booking.roomNo === room.roomNo);
            const customers = bookingsForRoom.map((booking) => booking.CustomerName);
            return { ...room, customers };
          });
          res.status(200).send({
            message:"Booked Customer Details",
            RoomData:roomsWithCustomers
          })
    } catch (error) {
        res.status(500).send({message:"internal server error"})
    }
}

const CustomerDetailsforBookedRooms = (req,res)=>{
    try {
        const{CustomerName,RoomName,BookingStatus}=req.params
        const customerBookings = BookingData.filter(
            (booking) => {return booking.CustomerName == CustomerName || booking.RoomName == RoomName || booking.BookingStatus == BookingStatus}
          );
          console.log(customerBookings)
          const NumberofBookings = customerBookings.length
          res.status(200).send({
            message:"customer list for Booked Room",
            CustomerName,
            RoomName,
            BookingStatus,
            NumberofBookings
          })
    } catch (error) {
        res.status(500).send({message:"internal server error"})
    }
}
export default {
    CreateRoom,listrooms,BookARoom,ListRoomWithBooked,ListCustomerswithBookedData,CustomerDetailsforBookedRooms
}
