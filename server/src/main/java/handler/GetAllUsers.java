package handler;

import dao.UserDao;
import org.bson.Document;
import request.ParsedRequest;
import response.HttpResponseBuilder;
import response.RestApiAppResponse;

public class GetAllUsers implements BaseHandler {

    @Override
    public HttpResponseBuilder handleRequest(ParsedRequest request) {
        UserDao userDao = UserDao.getInstance();
        AuthFilter.AuthResult authResult = AuthFilter.doFilter(request);
        if(!authResult.isLoggedIn){
            return new HttpResponseBuilder().setStatus(StatusCodes.UNAUTHORIZED);
        }

        var filter = new Document();
        var res = new RestApiAppResponse<>(true, userDao.query(filter), null);
        return new HttpResponseBuilder().setStatus("200 OK").setBody(res);
    }

}