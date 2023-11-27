CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(50) NOT NULL,
    UNIQUE KEY unique_combination (username, email)
);

CREATE TABLE IF NOT EXISTS properties (
    propertyID INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(300) NOT NULL,
    description VARCHAR(500) NOT NULL,
    bedrooms INT NOT NULL,
    bathrooms INT NOT NULL,
    location VARCHAR(50) NOT NULL,
    starting_bid DECIMAL(10,2) NOT NULL,
    end_time DATETIME NOT NULL,
    user_username VARCHAR(50),
    FOREIGN KEY (user_username) REFERENCES users(username)
);

CREATE TABLE IF NOT EXISTS bids (
    bidID INT AUTO_INCREMENT PRIMARY KEY,
    bid_amount DECIMAL(10,2) NOT NULL,
    user_username VARCHAR(50),
    property_propertyID INT,
    FOREIGN KEY (user_username) REFERENCES users(username),
    FOREIGN KEY (property_propertyID) REFERENCES properties(propertyID)
);