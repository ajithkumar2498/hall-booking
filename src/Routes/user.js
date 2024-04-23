import { Router } from "express"
import UserController from "../Controller/user.js"

const router = Router()

router.post('/createRoom',UserController.CreateRoom)
router.get('/listRoom',UserController.listrooms)
router.post('/RoomBooking',UserController.BookARoom)
router.get('/bookedRoomList',UserController.ListRoomWithBooked)
router.get('/bookedCustomerList',UserController.ListCustomerswithBookedData)
router.get('/:CustomerName/:RoomName/:BookingStatus',UserController.CustomerDetailsforBookedRooms)
export default router