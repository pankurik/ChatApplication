package dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.bson.Document;

public class ConversationDto extends BaseDto{

  private String conversationId;
  private String fromUsername;

  private String toUsername;
  private String message;

  private Long timestamp;

  public String getConversationId() {
    return conversationId;
  }

  public void setConversationId(String conversationId) {
    this.conversationId = conversationId;
  }

  public String getFromUsername() {
    return fromUsername;
  }

  public void setFromUsername(String fromUsername) {
    this.fromUsername = fromUsername;
  }

  public String getToUsername() {
    return toUsername;
  }

  public void setToUsername(String toUsername) {
    this.toUsername = toUsername;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public Long getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(Long timestamp) {
    this.timestamp = timestamp;
  }

  @Override
  public Document toDocument() {
    var doc = new Document();
    doc.append("sender", fromUsername);
    doc.append("receiver", toUsername);
    doc.append("message", message);
    doc.append("timestamp", timestamp);
    doc.append("conversationId", conversationId);
    return doc;
  }

  public static ConversationDto fromDocument(Document document) {
    var res = new ConversationDto();
    res.setConversationId(document.getString("conversationId"));
    res.setFromUsername(document.getString("sender"));
    res.setToUsername(document.getString("receiver"));
    res.setMessage(document.getString("message"));
    res.setTimestamp(document.getLong("timestamp"));
    return res;
  }
}
