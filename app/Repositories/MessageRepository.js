import BaseRepository from "./BaseRepository.js";
import Message from "../Models/Message.js";

class MessageRepository extends BaseRepository
{
  constructor() {
    super(Message);
  }
}

export default MessageRepository;