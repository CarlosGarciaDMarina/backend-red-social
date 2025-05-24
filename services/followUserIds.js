const Follow = require("../models/follow")

const followUserIds = async(userId) => {
    try {
        // Sacamos la info de seguimiento
        let following = await Follow.find({"user": userId})
                                    .select({"_id":0,"__v":0,"user":0,"created_at":0})
                                    .exec();
        let followers = await Follow.find({"followed": userId})
                                    .select({"_id":0,"__v":0,"created_at":0})
                                    .exec();

        // Procesar array de ids de los que sigo
        let followingClean = [];

        following.forEach(follow => {
            followingClean.push(follow.followed);
        });

        // Procesar array de ids de los que sigo
        let followerClean = [];

        followers.forEach(follow => {
            followerClean.push(follow.user);
        });

        // Devovemos los arrays
        return {
            following: followingClean,
            followers: followerClean
        }
    } catch (error) {
        return `Ha ocurrido un error en el servicio followUserIds: ${error}`;
    }
}

const followThisUser = async(userId, profileUserId) => {
    try {
        // Sacamos la info de seguimiento
        let following = await Follow.findOne({"user": userId, "followed": profileUserId});
        let follower = await Follow.findOne({"user": profileUserId, "followed": userId});

        // Devolvemos los arrays 
        return {
            following,
            follower
        };

    } catch (error) {
        return `Ha ocurrido un error en el servicio followThisUser: ${error}`;
    }
}

module.exports = {
    followUserIds,
    followThisUser
}