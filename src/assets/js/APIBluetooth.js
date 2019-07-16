let deviceCache = null;
function connectjs() {

  return (deviceCache ? Promise.resolve(deviceCache) :
    requestBluetoothDevice()).
    then(device => connectDeviceAndCacheCharacteristic(device)).
    then(characteristic => startNotifications(characteristic)).
    catch(error => console.log(error));

}


function requestBluetoothDevice() {
  console.log('Requesting bluetooth device...');

  return navigator.bluetooth.requestDevice({
    filters: [{ services: [0xFFE0] }],
  }).
    then(device => {
      console.log('"' + device.name + '" bluetooth device selected');
      deviceCache = device;

      return deviceCache;
    });
}

let characteristicCache = null;

// Connect to the device specified, get service and characteristic
function connectDeviceAndCacheCharacteristic(device) {
  if (device.gatt.connected && characteristicCache) {
    return Promise.resolve(characteristicCache);
  }

  console.log('Connecting to GATT server...');

  return device.gatt.connect().
    then(server => {
      console.log('GATT server connected, getting service...');

      return server.getPrimaryService(0xFFE0);
    }).
    then(service => {
      console.log('Service found, getting characteristic...');

      return service.getCharacteristic(0xFFE1);
    }).
    then(characteristic => {
      console.log('Characteristic found');
      characteristicCache = characteristic;

      return characteristicCache;
    });
}

function startNotifications(characteristic) {
  console.log('Starting notifications...');

  return characteristic.startNotifications().
      then(() => {
        console.log('Notifications started');
      });
}








  //   navigator.bluetooth.requestDevice({
  //    acceptAllDevices: true,
  //    optionalServices: ['0000180f-0000-1000-8000-00805f9b34fb']
  //  })
  //    .then(device =>device.gatt.connect()
  //    )
  //    .then(server =>server.getPrimaryService
  //      ('battery_service')
  //    )
  //    .then(async service => {
  //      try {
  //        return Promise.all([
  //          service.getCharacteristic('battery_level')
  //            .then(characteristic => {
  //              return characteristic.readValue();
  //            })
  //            .then(value => {
  //              console.log(value.getUint8(0));
  //            })
  //        ]);
  //      }
  //      catch (error) {
  //        console.log("error: ", error);
  //      }


  //    })
