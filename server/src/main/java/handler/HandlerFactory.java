package handler;

import request.ParsedRequest;

public class HandlerFactory {
  // routes based on the path. Add your custom handlers here
  public static BaseHandler getHandler(ParsedRequest request) {
    switch (request.getPath()) {
      case "/createUser":
        return new CreateUserHandler();
      case "/login":
        return new LoginHandler();
      case "/allUsers":
        return new GetAllUsers();
      case "/getConversations":
        return new GetConversationsHandler();
      case "/getConversation":
        return new GetConversationHandler();
      case "/createMessage":
        return new CreateMessageHandler();
      case "/blockUser":
        return new BlockUserHandler();
      case "/unblockUser":
        return new UnblockUserHandler();
      case "/isBlocked":
        return new IsBlockedHandler();
      default:
        return new FallbackHandler();
    }
  }

}
