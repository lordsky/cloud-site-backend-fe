
const hostConfig = {
  // hostUrl: 'http://six-pulse-nerve-gateway-dev.uworks.cc'
  hostUrl: 'http://six-pulse-nerve-gateway-test.uworks.cc'
}
var domain = window.location.host;
domain = domain.split(".")[0];
if (domain.indexOf("test") >= 0) {
hostConfig.hostUrl = 'http://cloud-site-backend-fe-test.uworks.cc/dist';
} else if (domain.indexOf("dev") >= 0) {
hostConfig.hostUrl = 'http://cloud-site-backend-fe-dev.uworks.cc/dist';
}else{
hostConfig.hostUrl = 'http://cloud-site-backend-fe-test.uworks.cc/dist';

}
export default hostConfig
