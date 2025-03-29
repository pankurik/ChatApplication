package dto;

import java.time.Instant;
import org.bson.Document;

public class MessageDto extends BaseDto{

  public String fromId;
  private String toId;

  public String getFromId() {
    return fromId;
  }

  public String getToId() {
    return toId;
  }

  public void setToId(String toId) {
    this.toId = toId;
  }

  public void setFromId(String fromId) {
    this.fromId = fromId;
  }


  public Document toDocument(){
    return new Document()
            .append("fromUsername", fromId)
            .append("toUsername", toId);
  }

  public static MessageDto fromDocument(Document document) {
    var message = new MessageDto();
    message.setFromId(document.getString("fromUsername"));
    message.setToId(document.getString("toUsername"));
    return message;
  }
}
