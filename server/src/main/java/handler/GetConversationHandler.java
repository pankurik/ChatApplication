package handler;

import dao.ConversationDao;

import dto.ConversationDto;
import handler.AuthFilter.AuthResult;
import org.bson.Document;
import request.ParsedRequest;
import response.CustomHttpResponse;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GetConversationHandler implements BaseHandler {

  @Override
  public HttpResponseBuilder handleRequest(ParsedRequest request) {
    ConversationDao conversationDao = ConversationDao.getInstance();
    AuthResult authResult = AuthFilter.doFilter(request);
    if(!authResult.isLoggedIn){
      return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
    }

    String[] splitted = request.getQueryParam("conversationId").toString().split("_");
    var filter = new Document("conversationId",request.getQueryParam("conversationId").toString());
    List<ConversationDto> firstList= conversationDao.query(filter);
    filter= new Document("conversationId",splitted[1] + "_" + splitted[0]);
    List<ConversationDto> secondList= conversationDao.query(filter);
    firstList.addAll(secondList);
    var res = new RestApiAppResponse<>(true, firstList, null);
    return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
  }

}