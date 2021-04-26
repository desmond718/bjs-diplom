'use strict';
const logoutButton = new LogoutButton();

//This is Logout
logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) return location.reload();
    })
}

//This is current user info
ApiConnector.current(response => {
    if (response.success) ProfileWidget.showProfile(response.data);
});

//This is current rate board
const ratesBoard = new RatesBoard();
ratesBoard.getStocks = () => ApiConnector.getStocks(response => {
    if (response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    }
});
ratesBoard.getStocks();
setInterval(ratesBoard.getStocks, 60000);

//This is MONEeeeeeey
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        moneyManager.setMessage(response.success, response.error);
        if (response.success) ProfileWidget.showProfile(response.data);
    })
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        moneyManager.setMessage(response.success, response.error);
        if (response.success) ProfileWidget.showProfile(response.data);
    })
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        moneyManager.setMessage(response.success, response.error);
        if (response.success) ProfileWidget.showProfile(response.data);
    })
}

//This is Favorite
const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        favoritesWidget.setMessage(response.success, response.error);
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    })
}

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        favoritesWidget.setMessage(response.success, response.error);
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    })
}