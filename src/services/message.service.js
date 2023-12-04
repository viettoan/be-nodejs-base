import MessageRepository from "../repositories/message.repository.js";

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