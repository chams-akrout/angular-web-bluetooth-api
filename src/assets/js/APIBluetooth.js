

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
function handleDisconnection(event) {
  let device = event.target;

  console.log('"' + device.name +
    '" bluetooth device disconnected, trying to reconnect...');

  connectDeviceAndCacheCharacteristic(device).
    then(characteristic => startNotifications(characteristic)).
    catch(error => console.log(error));
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

      // characteristic.addEventListener('characteristicvaluechanged',
      //   handleCharacteristicValueChanged);
    });

}



function disconnect() {
  if (deviceCache) {
    console.log('Disconnecting from "' + deviceCache.name + '" bluetooth device...');
    deviceCache.removeEventListener('gattserverdisconnected',
      handleDisconnection);

    if (deviceCache.gatt.connected) {
      deviceCache.gatt.disconnect();
      console.log('"' + deviceCache.name + '" bluetooth device disconnected');
    }
    else {
      console.log('"' + deviceCache.name +
        '" bluetooth device is already disconnected');
    }
  }

  if (characteristicCache) {
    // characteristicCache.removeEventListener('characteristicvaluechanged',
    //   handleCharacteristicValueChanged);
    characteristicCache = null;
  }
  deviceCache = null;
}

let decoder = new TextDecoder('utf-8');
var tab = new Array();
let characteristic;
let array = new Array();


function writeToCharacteristic(characteristic, data) {
  encodedData = new TextEncoder().encode(data);
  characteristic.writeValue(encodedData);
  return characteristic;
}

function send(data) {
  var val = String(data);
  tab.push(val);
  if (!data || !characteristicCache) {
    console.log("something happened");
    return;
  }
  characteristic = writeToCharacteristic(characteristicCache, tab);

read();

}

function read() {
  msgR = document.getElementById("msgR");
  characteristic.readValue().then(value => {
    array = decoder.decode(value).split(",");
    //localStorage.setItem('msg', array);
  });
}

function receive() {
   //msgR.innerHTML = localStorage.getItem('msg');
  //msgR.innerHTML=array.length;
  for (var i = 0; i < array.length; i = i + 1) {
    console.log('Msg ' + i + ': ' + array[i]);
    msgR.innerHTML+="<br />" +array[i];
  }

}

