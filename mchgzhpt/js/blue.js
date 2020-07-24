initBlue:function(){

    var that = this;

    wx.openBluetoothAdapter({//调用微信小程序api 打开蓝牙适配器接口

      success: function (res) {

        // console.log(res)

        wx.showToast({

          title: '初始化成功',

          icon: 'success',

          duration: 800

        })

        that.findBlue();//2.0

      },

      fail: function (res) {//如果手机上的蓝牙没有打开，可以提醒用户

        wx.showToast({

          title: '请开启蓝牙',

          icon: 'fails',

          duration: 1000

        })

      }

    })

  },

// 2、搜索蓝牙设备

// 手机蓝牙初始化成功之后，就会去搜索周边的蓝牙设备

/**

*开始搜索蓝牙设备

*/

findBlue(){

    var that = this

    wx.startBluetoothDevicesDiscovery({

      allowDuplicatesKey: false,

      interval: 0,

      success: function (res) {

        

        wx.showLoading({

          title: '正在搜索设备',

        })

        that.getBlue()//3.0

      }

    })

  },

// 3、获取蓝牙设备信息

// 搜索蓝牙设备之后，需要获取搜索到的蓝牙设备信息，微信小程序提供了两个方法可以获取搜索到的蓝牙设备信息，分别是：

// wx.onBluetoothDeviceFound：监听寻找到新设备的事件 ，表示只要找到一个新的蓝牙设备就会调用一次该方法。

// wx.getBluetoothDevices：获取在蓝牙模块生效期间所有已发现的蓝牙设备，包括已经和本机处于连接状态的设备

// 看两个方法的介绍我们知道他们的区别，但是不了解他们的区别会造成什么样的问题？

// 第一次我使用的是wx.onBluetoothDeviceFound方法进行联调，发现一切正常，由于调试的时候就只有一台设备，发现第二次重新扫码这个蓝牙设备的时候，找不到这个设备了，因为对这个方法来说，这不是一个新的设备，以前连接上过；或者当你因为某些原因蓝牙传送数据指令的时候出错了需要重新连接，再次连接的时候也找不到当前设备，还是同样的原因，因为当前设备对这个方法来说不是一个新设备

// 所以后来我就用了wx.getBluetoothDevices方法

/**

  * 获取搜索到的设备信息

 */

  getBlue(){

    var that = this

    wx.getBluetoothDevices({

      success: function(res) {

        wx.hideLoading();

        for (var i = 0; i < res.devices.length; i++){

　　　        /*that.data.inputValue：表示的是需要连接的蓝牙设备ID，简单点来说就是我想要连接这个蓝牙设备，所以我去遍历我搜索到的蓝牙设备中是否有这个ID*/

          if (res.devices[i].name == that.data.inputValue || res.devices[i].localName == that.data.inputValue){

            that.setData({

              deviceId: res.devices[i].deviceId,

              consoleLog: "设备：" + res.devices[i].deviceId,

            })

            that.connetBlue(res.devices[i].deviceId);//4.0

            return;

          }

        }

      },

      fail: function(){

        console.log("搜索蓝牙设备失败")

      }

    })

  },

//4、连接蓝牙设备

//通过上一个步骤找到这个蓝牙之后，通过蓝牙设备的id进行蓝牙连接


/**

  * 获取到设备之后连接蓝牙设备

 */

  connetBlue(deviceId){                    

    var that = this;

    wx.createBLEConnection({

      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接

      deviceId: deviceId,//设备id

      success: function (res) {

        wx.showToast({

          title: '连接成功',

          icon: 'fails',

          duration: 800

        })

        console.log("连接蓝牙成功!")

        wx.stopBluetoothDevicesDiscovery({

          success: function (res) {

            console.log('连接蓝牙成功之后关闭蓝牙搜索');

          }

        })

        that.getServiceId()//5.0

      }

    })

  },

//5、获取服务uuid

//连接上需要的蓝牙设备之后，获取这个蓝牙设备的服务uuid


getServiceId(){

    var that = this

    wx.getBLEDeviceServices({

      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接

      deviceId: that.data.deviceId,

      success: function (res) {

        var model = res.services[0]

        that.setData({

          services: model.uuid

        })

        that.getCharacteId()//6.0

      }

    })

  },

//6、通过id查看蓝牙设备的特征值

//如果一个蓝牙设备需要进行数据的写入以及数据传输，就必须具有某些特征值，所以通过上面步骤获取的id可以查看当前蓝牙设备的特征值

getCharacteId(){

    var that = this

    wx.getBLEDeviceCharacteristics({

      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接

      deviceId: that.data.deviceId,

      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取

      serviceId: that.data.services,

      success: function (res) {

        for (var i = 0; i < res.characteristics.length; i++) {//2个值

          var model = res.characteristics[i]

          if (model.properties.notify == true) {

            that.setData({

              notifyId: model.uuid//监听的值

            })

            that.startNotice(model.uuid)//7.0

          }

          if (model.properties.write == true){

            that.setData({

              writeId: model.uuid//用来写入的值

            })

          }

        }

      }

    })

  },

//7、从后台服务器获取的指令

startNotice(uuid){

    var that = this;

    wx.notifyBLECharacteristicValueChange({

      state: true, // 启用 notify 功能

      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接 

      deviceId: that.data.deviceId,

      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取

      serviceId: that.data.services,

      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取

      characteristicId: uuid,  //第一步 开启监听 notityid  第二步发送指令 write

      success: function (res) {

       

      　　  // 设备返回的方法

      　　  wx.onBLECharacteristicValueChange(function (res) {

         　　 　　// 此时可以拿到蓝牙设备返回来的数据是一个ArrayBuffer类型数据，所以需要通过一个方法转换成字符串

         　　　　 var nonceId = that.ab2hex(res.value) 

　　　　　　//拿到这个值后，肯定要去后台请求服务（当前步骤根据当前需求自己书写），获取下一步操作指令写入到蓝牙设备上去

　　　　　　

　　　　　wx.request({

                  　　method: "POST",

　　　　　　　　　

                 　　 data: {

                   　　　xx:nonceId

               　　   },

                　　  url: url,

                  　　success: (res) => {

                    　　//res.data.data.ciphertext：我这边服务返回来的是16进制的字符串，蓝牙设备是接收不到当前格式的数据的，需要转换成ArrayBuffer

                    　　that.sendMy(that.string2buffer(res.data.data.ciphertext))//8.0

                    　　// 服务器返回一个命令  我们要把这个命令写入蓝牙设备

                　　  }

                   })

　　}

    })

  },

//8、将从后台服务获取的指令写入到蓝牙设备当中

sendMy(buffer){

    var that = this

    wx.writeBLECharacteristicValue({

      // 这里的 deviceId 需要在上面的 getBluetoothDevices 或 onBluetoothDeviceFound 接口中获取

      deviceId: that.data.deviceId,

      // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取

      serviceId: that.data.services,

      // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取

      characteristicId: that.data.writeId,//第二步写入的特征值

      // 这里的value是ArrayBuffer类型

      value: buffer,

      success: function (res) {

        console.log("写入成功")

      },

      fail: function () {

        console.log('写入失败')

      },

      complete:function(){

        console.log("调用结束");

      }

    })

  },

//注：下面是需要使用到的两个格式相互转换的方法

/**

* 将字符串转换成ArrayBufer

*/

  string2buffer(str) {

    let val = ""

    if(!str) return;

    let length = str.length;

    let index = 0;

    let array = []

    while(index < length){

      array.push(str.substring(index,index+2));

      index = index + 2;

    }

    val = array.join(",");

    // 将16进制转化为ArrayBuffer

    return new Uint8Array(val.match(/[\da-f]{2}/gi).map(function (h) {

      return parseInt(h, 16)

    })).buffer

  },

  

  /**

   * 将ArrayBuffer转换成字符串

   */

  ab2hex(buffer) {

    var hexArr = Array.prototype.map.call(

      new Uint8Array(buffer),

      function (bit) {

        return ('00' + bit.toString(16)).slice(-2)

      }

    )

    return hexArr.join('');

  },