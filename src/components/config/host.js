const hostConfig = {
  hostUrl: 'http://six-pulse-nerve-gateway-test.uworks.cc',
  editorUrl: 'http://cloud-site-fe-dev.uworks.cc/editor.html'
}
var domain = window.location.host;
domain = domain.split(".")[0];
if (domain.indexOf("test") >= 0) {
hostConfig.hostUrl = 'http://six-pulse-nerve-gateway-test.uworks.cc'
hostConfig.editorUrl='http://cloud-site-fe-test.uworks.cc/editor.html'
} else if (domain.indexOf("dev") >= 0) {
hostConfig.hostUrl = 'http://six-pulse-nerve-gateway-dev.uworks.cc'
hostConfig.editorUrl='http://cloud-site-fe-dev.uworks.cc/editor.html'
}else{
hostConfig.hostUrl = 'http://six-pulse-nerve-gateway-test.uworks.cc'
hostConfig.editorUrl='http://cloud-site-fe-dev.uworks.cc/editor.html'
// hostConfig.hostUrl = 'http://192.168.4.97:9001'
}
export default hostConfig
