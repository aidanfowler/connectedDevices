/*Aidan Lincoln Fowler
  Connected Devices
  BLE Central which connects to arduino peripheral and turns the onboard light on and off
  Boilerplate from https://itp.nyu.edu/physcomp/labs/lab-bluetooth-le-and-p5-ble/
*/

const serviceUuid = "19B10000-E8F2-537E-4F6C-D104768A1214";
let myCharacteristic;
let input;
let myBLE;

function setup() {
  myBLE = new p5ble();
}

function connectToBle() {
  // Connect to a device by passing the service UUID
  myBLE.connect(serviceUuid, gotCharacteristics);
}

function test(){
  document.getElementById("connected").removeAttribute("hidden");
  document.getElementById("p1").innerHTML = "Status: Connected!";
  document.getElementById("connectButton").style.display="none";
}

function gotCharacteristics(error, characteristics) {
  if (error) {
    console.log('error: ', error);
  }
  else{
    document.getElementById("connected").removeAttribute("hidden");
    document.getElementById("p1").innerHTML = "Status: Connected!";
    document.getElementById("p1").style.color="rgb(148, 255, 110)";
    document.getElementById("connectButton").style.display="none";
  }
  console.log('characteristics: ', characteristics);
  // Set the first characteristic as myCharacteristic
  myCharacteristic = characteristics[0];
}

function writeToBle() {
  var messageVal = document.getElementById("message").value;
  // Write the value of the input to the myCharacteristic
  myBLE.write(myCharacteristic, messageVal);
}

// add a listener for the page to load:
window.addEventListener('DOMContentLoaded', setup);