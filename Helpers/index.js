const BOT_USER_ID = 894153328353759243;

function getPupul(userId) {
    if (userId == BOT_USER_ID) {
        return 'https://cdn.imgchest.com/files/my8xcol38w4.jpg';
    }

    let pupul_len = Math.floor(Math.random() * 20);
    let pupul = '8=';
    for (let i = 0; i < pupul_len; i++) {
        pupul += '=';
    }
    pupul += 'D';
    return pupul;
}

module.exports = {
    getPupul
}
