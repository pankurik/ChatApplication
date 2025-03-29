package dao;

import com.mongodb.client.MongoCollection;
import dto.BlockedUserDto;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.bson.Document;

public class BlockedUserDao extends BaseDao<BlockedUserDto> {
    private static BlockedUserDao instance;

    private BlockedUserDao(MongoCollection<Document> collection){
        super(collection);
    }

    @Override
    public void put(BlockedUserDto blockedUserDto) {
        collection.insertOne(blockedUserDto.toDocument());
    }

    @Override
    public List<BlockedUserDto> query(Document filter) {
        return collection.find(filter)
                .into(new ArrayList<>())
                .stream()
                .map(BlockedUserDto::fromDocument)
                .collect(Collectors.toList());
    }

    public static BlockedUserDao getInstance(){
        if(instance != null){
            return instance;
        }
        instance = new BlockedUserDao(MongoConnection.getCollection("BlockedUserDao"));
        return instance;
    }

    public void blockUser(String blocker, String blocked) {
        var blockedUser = new BlockedUserDto();
        blockedUser.setBlocker(blocker);
        blockedUser.setBlocked(blocked);
        put(blockedUser);
    }

    public void unblockUser(String blocker, String blocked) {
        var filter = new Document()
                .append("blocker", blocker)
                .append("blocked", blocked);
        collection.deleteOne(filter);
    }

    public boolean isBlocked(String blocker, String blocked) {
        var filter = new Document()
                .append("blocker", blocker)
                .append("blocked", blocked);
        return collection.find(filter).iterator().hasNext();
    }
}