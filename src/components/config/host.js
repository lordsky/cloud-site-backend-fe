//    const hostConfig = {
//    hostUrl: 'http://192.168.50.17:11000',
//    imgurl:'http://192.168.50.17:11000/common/upload',
//    editorUrl: 'http://editor.zhengqi.10086.cn/editor.html'
//    }

const hostConfig = {
hostUrl: 'http://six-pulse-nerve-gateway-test.uworks.cc',
editorUrl: 'http://cloud-site-fe-dev.uworks.cc/editor.html',
imgurl:'http://six-pulse-nerve-gateway-test.uworks.cc/common/upload'
}
var domain = window.location.host;
domain = domain.split(".")[0];
if (domain.indexOf("test") >= 0) {
hostConfig.hostUrl = 'http://six-pulse-nerve-gateway-test.uworks.cc'
hostConfig.editorUrl='http://cloud-site-fe-test.uworks.cc/editor.html'
hostConfig.imgurl='http://six-pulse-nerve-gateway-test.uworks.cc/common/upload'
} else if (domain.indexOf("dev") >= 0) {
hostConfig.hostUrl = 'http://six-pulse-nerve-gateway-dev.uworks.cc'
hostConfig.editorUrl='http://cloud-site-fe-dev.uworks.cc/editor.html'
hostConfig.imgurl='http://six-pulse-nerve-gateway-dev.uworks.cc/common/upload'
}else{
hostConfig.hostUrl = 'http://192.168.50.17:11000'
hostConfig.editorUrl='http://editor.zhengqi.10086.cn/editor.html'
hostConfig.imgurl='http://192.168.50.17:11000/common/upload'
//   hostConfig.hostUrl = 'http://six-pulse-nerve-gateway-test.uworks.cc'
//   hostConfig.editorUrl='http://cloud-site-fe-test.uworks.cc/editor.html'
//   hostConfig.imgurl='http://six-pulse-nerve-gateway-test.uworks.cc/common/upload'
}
export default hostConfig
