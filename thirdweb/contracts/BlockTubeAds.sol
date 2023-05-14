// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract BlockTubeAds {
    struct Manager {
        uint256 id;
        string companyName;
        string companyImg;
        address walletId;
    }

    struct Video {
        address owner;
        uint256 id;
        string title;
        uint256 bidAmount;
        uint256[] transactionHistory;
        string websiteLink;
        string videoUrl;
        string description;
        string category;
        bool isDeleted;
    }

    address BlockTubeOwner = 0xD579f98C47D4139EA8FCC0A5Ad71fc7c4604d17e;

    mapping(uint256 => Manager) public managers;
    mapping(uint256 => Video) public videos;

    uint256 public numberOfManagers = 0;
    uint256 public numberOfVideos = 0;

    function getManagerProfile(
        address _address
    ) public view returns (Manager memory) {
        Manager memory ManagerDetails;

        for (uint256 i = 0; i < numberOfManagers; i++) {
            if (managers[i].walletId == _address) {
                ManagerDetails = managers[i];
                break;
            }
        }

        return ManagerDetails;
    }

    function getAllManager() external view returns (Manager[] memory) {
        Manager[] memory allManager = new Manager[](numberOfManagers);

        for (uint256 i = 0; i < numberOfManagers; i++) {
            allManager[i] = managers[i];
        }

        return allManager;
    }

    function getAllAdVideos() external view returns (Video[] memory) {
        Video[] memory allVideos = new Video[](numberOfVideos);

        for (uint256 i = 0; i < numberOfVideos; i++) {
            allVideos[i] = videos[i];
        }

        return allVideos;
    }

    function getAdVideosByAddress(
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

    function uploadAdVideo(
        string memory title,
        string memory websiteLink,
        string memory videoUrl,
        string memory description,
        string memory category
    ) public {
        Video storage video = videos[numberOfVideos];
        uint256[] memory emptyInt;

        video.owner = msg.sender;
        video.id = numberOfVideos;
        video.title = title;
        video.bidAmount = 0;
        video.websiteLink = websiteLink;
        video.videoUrl = videoUrl;
        video.description = description;
        video.category = category;
        video.isDeleted = false;
        video.transactionHistory = emptyInt;

        numberOfVideos++;
    }

    function createManager(
        string memory companyName,
        string memory companyImg
    ) external {
        Manager storage manager = managers[numberOfManagers];

        manager.id = numberOfManagers;
        manager.companyName = companyName;
        manager.companyImg = companyImg;
        manager.walletId = msg.sender;

        numberOfManagers++;
    }

    function bidAd(uint256 _id) public payable {
        Video storage video = videos[_id];

        uint256 amount = msg.value;

        (bool sent, ) = payable(BlockTubeOwner).call{value: amount}("");

        if (sent) {
            video.bidAmount += amount;
            video.transactionHistory.push(amount);
        }
    }
}
