
const hostConfig = {
  hostUrl: 'http://six-pulse-nerve-gateway-dev.uworks.cc'
}
var domain = window.location.host;
domain = domain.split(".")[0];
if (domain.indexOf("test") >= 0) {
hostConfig.hostUrl = 'http://six-pulse-nerve-gateway-test.uworks.cc';
} else if (domain.indexOf("dev") >= 0) {
hostConfig.hostUrl = 'http://six-pulse-nerve-gateway-dev.uworks.cc';
}else{
hostConfig.hostUrl = 'http://six-pulse-nerve-gateway-dev.uworks.cc';
}
export default hostConfig
