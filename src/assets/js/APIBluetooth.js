function connectJS() {

    navigator.bluetooth.requestDevice({
     acceptAllDevices: true,
     optionalServices: ['0000180f-0000-1000-8000-00805f9b34fb']
   })
     .then(device =>device.gatt.connect()
     )
     .then(server =>server.getPrimaryService
       ('battery_service')
     )
     .then(async service => {
       try {
         return Promise.all([
           service.getCharacteristic('battery_level')
             .then(characteristic => {
               return characteristic.readValue();
             })
             .then(value => {
               console.log(value.getUint8(0));
             })
         ]);
       }
       catch (error) {
         console.log("error: ", error);
       }
 
 
     })
 }
 