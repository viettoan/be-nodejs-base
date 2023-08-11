import MessageRepository from "../Repositories/MessageRepository.js";

class MessageService
{
  constructor() {
    this.messageRepository = new MessageRepository();
  }

  async store(data)
  {
    return await this.messageRepository.store(data);
  }
}

export default MessageService;