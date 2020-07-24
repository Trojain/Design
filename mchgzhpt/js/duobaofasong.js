for (var i = 0;i<e.length;i+=20) {
 
var endLength = 0
 
if (i+20<e.length) {
 
var senddata = e
 
let buffer = new ArrayBuffer(20)
 
let dataView = new DataView(buffer)
 
let dataSend = [] for (var j = i; j < i + 20; j++) {
 
dataView.setUint8(j - i, senddata[j])
 
dataSend.push(dataView.getUint8(j-i)) }
 
console.log('多包发送的包数据:'+dataSend)
 
wx.writeBLECharacteristicValue({
 
deviceId: app.globalData.deviceId+"",
 
serviceId: app.globalData.writeServicweId+'',
 
characteristicId: app.globalData.writeCharacteristicsId+'',
 
value: buffer,
 
success: function (res) {
 
console.log('多包writeBLECharacteristicValue success',res.errMsg)
 
},
 
fail: function (res) {
 
console.log('发送失败')
 
}
 
})
 
sleep(0.02)
 
}else{ //console.log(app.globalData.writeServicweId+'-----------')
 
var senddata = e
 
if (20 < e.length) {
 
endLength = senddata.length-i
 
}else{
 
endLength = senddata.length
 
}
 
let buffer = new ArrayBuffer(endLength)
 
let dataView = new DataView(buffer)
 
let dataSend = []
 
for (var j = i; j < senddata.length; j++) {
 
dataView.setUint8(j-i, senddata[j])
 
dataSend.push(dataView.getUint8(j-i))
 
}
 
console.log('最后一包或第一数据:' + dataSend)
 
wx.writeBLECharacteristicValue({
 
deviceId: app.globalData.deviceId+"",
 
serviceId: app.globalData.writeServicweId+'',
 
characteristicId: app.globalData.writeCharacteristicsId+'',
 
value: buffer,
 
success: function (res) {
 
console.log('一包writeBLECharacteristicValue success',res.errMsg) },
 
fail: function (res) {
 
console.log('发送失败')
 
}
 
})
 
sleep(0.02)
 
}
 
}


function sleep(delay) {
var start = (new Date()).getTime();
while ((new Date()).getTime() - start < delay) {
continue;
}
}




https://zd.uni-code.net/mchgzhpt/appjsp/merchantcenter/agents/setDevice/merchantCoporateAgentsSetGroundingOrNot.jsp

https://zd.uni-code.net/mchgzhpt/appjsp/merchantcenter/commonPage/setDevice/setGroundingOrNot.jsp
https://zd.uni-code.net/mchgzhpt/appjsp/merchantcenter/commonPage/setBatchDevice/setBatchGroundingOrNot.jsp
https://zd.uni-code.net/mchgzhpt/appjsp/merchantcenter/agents/childSetDevice/merchantCoporateChildAgentsSetGroundingOrNot.jsp
https://zd.uni-code.net/mchgzhpt/appjsp/merchantcenter/commonPage/setDevice/setThreeGroundingOrNot.jsp

https://zd.uni-code.net/mchgzhpt/appjsp/merchantcenter/commonPage/setBatchDevice/setBatchThreeGroundingOrNot.jsp

https://zd.uni-code.net/mchgzhpt/appjsp/merchantcenter/shopkeeper/setDevice/merchantCoporateShopkeeperSetGroundingOrNot.jsp