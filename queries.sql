CREATE TABLE GameGenres (
    GameGenreID int primary key AUTO_INCREMENT,
 	GameGenreName varchar(25));
CREATE TABLE Games (
    GameID int primary key AUTO_INCREMENT,
    GameTitle varchar(25),
    GameDescription text,
    BackgroundPath varchar(125),
    LogoPath varchar(125),
    GameGenreID int,
    FOREIGN KEY (GameGenreID) REFERENCES GameGenres(GameGenreID));
    
CREATE TABLE Lobbies (
    LobbyID int primary key AUTO_INCREMENT,
   	LobbyName varchar(25),
    GameID int,
    FOREIGN KEY (GameID) REFERENCES Games(GameID)
    );
    
CREATE TABLE ChatTypes (
	ChatTypeID int primary key AUTO_INCREMENT,
    TypeName varchar(25)

);

CREATE TABLE Chats(
    ChatID int primary key AUTO_INCREMENT,
    ChatName varchar(25),
    ChatTypeID int,
    ImageUrl text,
    FOREIGN KEY (ChatTypeID) REFERENCES ChatTypes(ChatTypeID)
    );
    
CREATE TABLE LobbyChats (
	LobbyChatID int primary key AUTO_INCREMENT,
    ChatID int,
    LobbyID int,
    FOREIGN KEY ( ChatID ) REFERENCES Chats(ChatID),
    FOREIGN KEY ( LobbyID ) REFERENCES Lobbies(LobbyID)
);

CREATE TABLE UserStatuses (
	UserStatusID int primary key AUTO_INCREMENT,
    StatusName varchar(25)
);

CREATE TABLE Roles (
	RoleID int primary key AUTO_INCREMENT,
    RoleName varchar(25)
);

CREATE TABLE Users(
	UserID int primary key AUTO_INCREMENT,
    Username varchar(25),
    Email varchar(50),
    PasswordHash text,
    RoleID int,
    UserStatusID int,
    FOREIGN KEY (RoleID) REFERENCES Roles(RoleID),
    FOREIGN KEY (UserStatusID) REFERENCES UserStatuses(UserStatusID)
);

CREATE TABLE UserTokens(
	UserTokenID int primary key AUTO_INCREMENT,
    Token text,
    CreatedAt timestamp,
    UserID int,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE ChatUsers(
 ChatUserID int primary key AUTO_INCREMENT,
    IsChatCreator boolean,
    ChatID int,
    UserID int,
    FOREIGN KEY (ChatID) REFERENCES Chats(ChatID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)

);

CREATE TABLE MessagingVisualTypes(
	VisualTypeID int primary key AUTO_INCREMENT,
    Type varchar(25)
);

CREATE TABLE MessagingVisuals(
	VisualID int primary key AUTO_INCREMENT,
    Tag varchar(25),
    VisualPath varchar(125),
    VisaulTypeID int,
    FOREIGN KEY (VisaulTypeID) REFERENCES MessagingVisualTypes(VisualTypeID)
);

CREATE TABLE MessagingVisualsPacks (
	VisualsPackID int primary key AUTO_INCREMENT,
    PackName varchar(25)
);

CREATE TABLE MessagingVisualsPacksVisuals (
    MessagingVisualsPacksVisualsID int primary key AUTO_INCREMENT,
    VisualID int,
    PackID int,
    FOREIGN KEY (VisualID) REFERENCES MessagingVisuals(VisualID),
    FOREIGN KEY (PackID) REFERENCES MessagingVisualsPacks(VisualsPackID)
);

CREATE TABLE ChatMessages (
    ChatMessageID int primary key AUTO_INCREMENT,
    Content text,
    CreatedAt timestamp,
    ChatID int,
    UserID int,
    FOREIGN KEY (ChatID) REFERENCES Chats(ChatID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE MessagesReactions (
    MessageReactionID int primary key AUTO_INCREMENT,
    UserID int,
    ChatMessageID int,
    VisualID int,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ChatMessageID) REFERENCES ChatMessages(ChatMessageID),
    FOREIGN KEY (VisualID) REFERENCES MessagingVisuals(VisualID)
);