//封装axios
 import { MessageBox,Message,Loading } from 'element-ui';
 import axios from 'axios'
 import host from './host'

const options = {
  lock: true,
  text: '加载中'
}

let loading

let showLoading = ()=> {
  loading = Loading.service(options)
}

let closeLoading = ()=> {
  loading.close()
}

var instance = axios.create({
    baseURL:host.hostUrl,
//  baseURL:'http://six-pulse-nerve-backend-dev.uworks.cc',
    withCredentials: true,
    timeout: 1000 * 15,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
//      "Accept":'application/json',
    },
})
var AUTH_TOKEN = function(){
	   if(localStorage.cloudUser){
	   	  return JSON.parse(localStorage.cloudUser).token
	   }
}

function testUrl(config,test){
	return config.indexOf(test)
}

instance.interceptors.request.use(config => {
  let res = config.url
testUrl(res,'/checkAccount') >-1?'':showLoading()
  if(testUrl(res,'adminLogin') >-1||testUrl(res,'showUserList')>-1||testUrl(res,'displayTemplateTestOnBackend')>-1||testUrl(res,'userTemplateBackend')>-1||testUrl(res,'refuseLogin') >-1||testUrl(res,'showUserDetail') >-1||testUrl(res,'stopUserTemplate') >-1){
    	   console.log('不带token')
    	   if(testUrl(res,'showUserList')>-1||testUrl(res,'displayTemplateTestOnBackend')>-1){
    	   	config.withCredentials = false
    	   }
    }else{
      config.headers.Authorization = 'Bearer' + AUTH_TOKEN(); 
    }
    return config
}, error => {
    closeLoading()
	console.log(error)
   Promise.reject(error)
})

instance.interceptors.response.use(data => {
	 closeLoading()
	if(data.data.code!==200){
		Message({
        message: data.data.msg,
        type: 'error'
      })
	}
    return data
}, error => {
	closeLoading()
    Message({
        message: '服务器端错误，请稍后重试',
        type: 'error'
    })
    return Promise.reject(error)
})

const http = {
	post:function(url,data,success,headers){
		var config = {}
		if(headers){
			config.headers = headers
		}
		instance.post(url, data, config).then((res)=>{
			success(res)
		}).catch((error)=>{
			console.log(error)
		})
	},
	get:function(url,success,data){
		instance.get(url,data).then((res)=>{
			success(res)
		}).catch((e)=>{
			console.log(e)
		})
	},
	delete:function(url,data,success){
		instance.delete(url,data).then((res)=>{
			success(res)
		}).catch((e)=>{
			console.log(e)
		})
	},
  getLocalTime:function(now) {
    let year=now.getFullYear();
    let month=now.getMonth()+1;
    if(month<10){
      month="0"+month;
    }
    let date=now.getDate();
    if(date<10){
      date="0"+date;

    }
    let hour=now.getHours();
    if(hour<10){
      hour="0"+hour;
    }
    let minute=now.getMinutes();
    if(minute<10){
      minute="0"+minute;
    }
    let second=now.getSeconds();
    if(second<10){
      second="0"+second;
    }
    console.log(year+"-"+month+"-"+date+" "+hour+":"+minute);
    return year+"-"+month+"-"+date;
  },
  getLocalTimeDate:function(now) {
    let year=now.getFullYear();
    let month=now.getMonth()+1;
    if(month<10){
      month="0"+month;
    }
    let date=now.getDate();
    if(date<10){
      date="0"+date;

    }
    let hour=now.getHours();
    if(hour<10){
      hour="0"+hour;
    }
    let minute=now.getMinutes();
    if(minute<10){
      minute="0"+minute;
    }
    let second=now.getSeconds();
    if(second<10){
      second="0"+second;
    }
    console.log(year+"-"+month+"-"+date+" "+hour+":"+minute);
    return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
  }
}

export {http,instance}
