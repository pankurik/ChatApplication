package handler;

import dao.ConversationDao;
import dao.UserDao;
import dto.ConversationDto;
import dto.MessageDto;
import handler.AuthFilter.AuthResult;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import org.bson.Document;
import request.ParsedRequest;
import response.CustomHttpResponse;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

public class CreateMessageHandler implements BaseHandler {

  @Override
  public HttpResponseBuilder handleRequest(ParsedRequest request) {
    System.out.println(request.getBody());
    ConversationDto conversationDto = GsonTool.gson.fromJson(request.getBody(), dto.ConversationDto.class);
//  MessageDao messageDao = MessageDao.getInstance();
    UserDao userDao = UserDao.getInstance();
    ConversationDao conversationDao = ConversationDao.getInstance();

    AuthResult authResult = AuthFilter.doFilter(request);
    if(!authResult.isLoggedIn){
      return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
    }

    if (userDao.query(new Document("userName", conversationDto.getToUsername())).size() == 0) {
      var res = new RestApiAppResponse<>(false, null,
              "Sending message to unknown user");
      return new HttpResponseBuilder().setStatus("400 BAD_REQUEST").setBody(res);
    }

    String conversationId = makeConvoId(conversationDto.getFromUsername(),  conversationDto.getToUsername());
    conversationDto.setConversationId(conversationId);
    conversationDao.put(conversationDto);
    // }

    var res = new RestApiAppResponse<>(true, List.of(conversationDto), null);
    return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
  }

  public static String makeConvoId(String a, String b){
    return List.of(a,b).stream()
            .sorted(Comparator.naturalOrder())
            .collect(Collectors.joining("_"));
  }

}
