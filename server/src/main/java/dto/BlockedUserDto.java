package dto;

import org.bson.Document;

public class BlockedUserDto extends BaseDto {
    private String blocker;
    private String blocked;

    public String getBlocker() {
        return blocker;
    }

    public void setBlocker(String blocker) {
        this.blocker = blocker;
    }

    public String getBlocked() {
        return blocked;
    }

    public void setBlocked(String blocked) {
        this.blocked = blocked;
    }

    public Document toDocument(){
        return new Document()
                .append("blocker", blocker)
                .append("blocked", blocked);
    }

    public static BlockedUserDto fromDocument(Document document) {
        var blockedUser = new BlockedUserDto();
        blockedUser.setBlocker(document.getString("blocker"));
        blockedUser.setBlocked(document.getString("blocked"));
        return blockedUser;
    }
}
