'use strict';
const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) return location.reload();
    })
}

ApiConnector.current(response => {
    if (response.success) ProfileWidget.showProfile(response.data);
});

const ratesBoard = new RatesBoard();
ratesBoard.getStocks = () => ApiConnector.getStocks(response => {
    if (response.success) {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    }
});
ratesBoard.getStocks();
setInterval(ratesBoard.getStocks, 60000);