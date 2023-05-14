// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract BlockTube {
    struct Channel {
        uint256 id;
        string username;
        string channelName;
        string coverImage;
        string profileImage;
        address walletId;
        address[] subscribers;
    }

    struct Video {
        address owner;
        uint256 id;
        string uuid;
        string title;
        string videoUrl;
        string thumbnailUrl;
        string description;
        string[] tags;
        string category;
        address[] views;
        address[] likes;
        address[] dislikes;
        bool isDeleted;
        string username;
        string channelName;
        string profileImage;
        uint amount;
    }

    mapping(uint256 => Video) public videos;
    mapping(uint256 => Channel) public channels;

    uint256 public numberOfVideos = 0;
    uint256 public numberOfChannels = 0;

    address BlockTubeOwner = 0xD579f98C47D4139EA8FCC0A5Ad71fc7c4604d17e;

    function getUserProfile(
        address _address
    ) public view returns (Channel memory) {
        Channel memory userDetails;

        for (uint256 i = 0; i < numberOfChannels; i++) {
            if (channels[i].walletId == _address) {
                userDetails = channels[i];
                break;
            }
        }

        return userDetails;
    }

    function getAllChannels() external view returns (Channel[] memory) {
        Channel[] memory allChannels = new Channel[](numberOfChannels);

        for (uint256 i = 0; i < numberOfChannels; i++) {
            allChannels[i] = channels[i];
        }

        return allChannels;
    }

    function uploadVideo(
        string memory uuid,
        string memory title,
        string memory videoUrl,
        string memory thumbnail,
        string memory description,
        string[] memory tags,
        string memory category
    ) public {
        Video storage video = videos[numberOfVideos];
        Channel memory ChannelDetails;
        address[] memory emptyAddress;

        ChannelDetails = getUserProfile(msg.sender);

        video.owner = msg.sender;
        video.id = numberOfVideos;
        video.uuid = uuid;
        video.title = title;
        video.videoUrl = videoUrl;
        video.thumbnailUrl = thumbnail;
        video.description = description;
        video.tags = tags;
        video.category = category;
        video.views = emptyAddress;
        video.likes = emptyAddress;
        video.dislikes = emptyAddress;
        video.isDeleted = false;
        video.username = ChannelDetails.username;
        video.channelName = ChannelDetails.channelName;
        video.profileImage = ChannelDetails.profileImage;
        video.amount = 0;

        numberOfVideos++;
    }

    function createChannel(
        string memory username,
        string memory channelName,
        string memory profileImg,
        string memory coverImg
    ) external {
        Channel storage channel = channels[numberOfChannels];

        address[] memory emptyAddress;

        channel.id = numberOfVideos;
        channel.username = username;
        channel.channelName = channelName;
        channel.coverImage = coverImg;
        channel.profileImage = profileImg;
        channel.walletId = msg.sender;
        channel.subscribers = emptyAddress;

        numberOfChannels++;
    }

    function updateChannel(
        string memory username,
        string memory channelName,
        string memory profileImg,
        string memory coverImg,
        address walletId
    ) external {
        for (uint256 i = 0; i < numberOfChannels; i++) {
            if (channels[i].walletId == walletId) {
                channels[i].username = username;
                channels[i].channelName = channelName;
                channels[i].profileImage = profileImg;
                channels[i].coverImage = coverImg;

                break;
            }
        }

        for (uint256 i = 0; i < numberOfVideos; i++) {
            if (videos[i].isDeleted == false && videos[i].owner == walletId) {
                videos[i].username = username;
                videos[i].channelName = channelName;
                videos[i].profileImage = profileImg;
            }
        }
    }

    function isChannelNameExist(
        string memory channelName
    ) public view returns (bool isExist) {
        bool isChannelExist = false;

        for (uint256 i = 0; i < numberOfChannels; i++) {
            if (
                keccak256(bytes(channels[i].channelName)) ==
                keccak256(bytes(channelName))
            ) {
                isChannelExist = true;
                break;
            }
        }

        return isChannelExist;
    }

    function getChannel(
        string memory channelName
    ) public view returns (Channel memory) {
        Channel memory channel;

        for (uint256 i = 0; i < numberOfChannels; i++) {
            if (
                keccak256(bytes(channels[i].channelName)) ==
                keccak256(bytes(channelName))
            ) {
                channel = channels[i];
                break;
            }
        }

        return channel;
    }

    function addSubscribe(uint256 userId) external {
        bool isUserAlreadySubscribed = false;

        for (uint256 i = 0; i < channels[userId].subscribers.length; i++) {
            if (channels[userId].subscribers[i] == msg.sender) {
                isUserAlreadySubscribed = true;
                break;
            }
        }

        if (!isUserAlreadySubscribed) {
            channels[userId].subscribers.push(msg.sender);
        }
    }

    function deleteVideo(uint256 id) external {
        videos[id].isDeleted = true;
    }

    function getAllVideos() external view returns (Video[] memory) {
        uint256 counter = 0;

        for (uint256 i = 0; i < numberOfVideos; i++) {
            if (videos[i].isDeleted == false) {
                counter++;
            }
        }

        Video[] memory allVideos = new Video[](counter);

        for (uint256 i = 0; i < counter; i++) {
            if (videos[i].isDeleted == false) {
                allVideos[i] = videos[i];
            }
        }

        return allVideos;
    }

    function getChannelVideos(
        address walletId
    ) external view returns (Video[] memory) {
        uint256 counter = 0;

        for (uint256 i = 0; i < numberOfVideos; i++) {
            if (videos[i].isDeleted == false && videos[i].owner == walletId) {
                counter++;
            }
        }

        Video[] memory allVideos = new Video[](counter);

        for (uint256 i = 0; i < counter; i++) {
            if (videos[i].isDeleted == false && videos[i].owner == walletId) {
                allVideos[i] = videos[i];
            }
        }

        return allVideos;
    }

    function getVideo(uint256 id) external view returns (Video memory) {
        return videos[id];
    }

    function updateVideo(
        uint256 videoId,
        string memory title,
        string memory description
    ) external {
        require(
            videos[videoId].owner == msg.sender,
            "You don't have permission to edit"
        );

        videos[videoId].title = title;
        videos[videoId].description = description;
    }

    function addViews(uint256 id) public {
        uint256 amount = 0.00001e18;

        (bool sent, ) = payable(BlockTubeOwner).call{value: amount}("");

        if (sent) {
            videos[id].amount += amount;
        }

        videos[id].views.push(msg.sender);
    }

    function addLikes(uint256 id) public returns (Video memory result) {
        bool isUserDisLikedTheVideo = false;

        for (uint256 i = 0; i < videos[id].dislikes.length; i++) {
            if (videos[id].dislikes[i] == msg.sender) {
                isUserDisLikedTheVideo = true;
                break;
            }
        }

        bool isUserAllowedToLike = true;

        if (!isUserDisLikedTheVideo) {
            for (uint256 i = 0; i < videos[id].likes.length; i++) {
                if (videos[id].likes[i] == msg.sender) {
                    isUserAllowedToLike = false;
                    break;
                }
            }
        }

        if (isUserAllowedToLike) {
            videos[id].likes.push(msg.sender);
        }

        return videos[id];
    }

    function addDisLikes(uint256 id) public returns (Video memory result) {
        bool isUserLikedTheVideo = false;

        for (uint256 i = 0; i < videos[id].likes.length; i++) {
            if (videos[id].likes[i] == msg.sender) {
                isUserLikedTheVideo = true;
                break;
            }
        }

        bool isUserAllowedToDisLike = true;

        if (!isUserLikedTheVideo) {
            for (uint256 i = 0; i < videos[id].likes.length; i++) {
                if (videos[id].likes[i] == msg.sender) {
                    isUserAllowedToDisLike = false;
                    break;
                }
            }
        }

        if (isUserAllowedToDisLike) {
            videos[id].dislikes.push(msg.sender);
        }

        return videos[id];
    }
}
