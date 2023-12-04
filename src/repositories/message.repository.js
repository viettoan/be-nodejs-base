import BaseRepository from "./base.repository.js";
import Message from "../models/message.model.js";

class MessageRepository extends BaseRepository
{
  constructor() {
    super(Message);
  }
}

export default MessageRepository;