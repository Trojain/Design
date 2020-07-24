function reset() {
    var w = document.body.clientWidth / 750;
    document.documentElement.style.fontSize = w * 100 + 'px';
}
window.onresize = function () {
    reset();
};

// $(window).on('popstate', function () {
//     var hashLocation = location.hash;
//     var hashSplit = hashLocation.split('#!/');
//     var hashName = hashSplit[1];
//     if (hashName !== '') {
//         var hash = window.location.hash;
//         if (hash === '') {
//             alert('你点击了返回键');
//         }
//     }
// });

// $(function () {
//     window.addEventListener(
//         'popstate',
//         function (e) {
//             alert(1);
//         },
//         false
//     );
// });

window.onload = function () {
    window.addEventListener(
        'popstate',
        function (e) {
            alert(1);
        },
        false
    );
};
