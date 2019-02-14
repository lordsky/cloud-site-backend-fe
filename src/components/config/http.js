//封装axios
//  import { Loading } from 'element-ui';
 import { MessageBox } from 'element-ui';
//  import axios from 'axios'
// axios.defaults.headers.common['Accept'] = 'application/json';
// axios.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8';
import axios from 'axios'
import hostConfig from './host'
import { Loading } from 'element-ui'

const options = {
  lock: true,
  text: 'Loading',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.5)'
}

let loading

let showLoading = ()=> {
  loading = Loading.service(options)
}

let closeLoading = ()=> {
  loading.close()
}

let instance = axios.create({
  baseURL: hostConfig.hostUrl,
  // withCredentials: true,
  timeout: 1000 * 12,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})


// http请求拦截器
instance.interceptors.request.use(config => {
  showLoading()
  console.log('发起请求')
  return config
}, error => {
  closeLoading()
  console.log('请求失败')
  return Promise.reject(error)
})

// http响应拦截器
instance.interceptors.response.use(data => {
  closeLoading()
  console.log('响应成功')
  return data
}, error => {
  closeLoading()
  console.log('响应失败')
  throw Error(error)
  return Promise.reject(error)
})

// const http = {
// 	post:function(url,data,success,headers){
// 		let loadingInstance = Loading.service(options);
// 		var config = {}
// 		if(headers){
// 			config.headers = headers
// 		}else{
// 			config.headers={};
// 		}
// 		axios.post(url, data, config).then((res)=>{
// 			loadingInstance.close();
// 			success(res)
// 		}).catch((e)=>{
// 		    loadingInstance.close();
// 	     this.$alert('这是一段内容', '标题名称', {
//           confirmButtonText: '确定',
//           callback: action => {
//             this.$message({
//               type: 'info',
//               message: ''
//             });
//           }
//         });
// 		})
// 	},
// 	get:function(url,success){
// 		let loadingInstance = Loading.service(options);
// 		axios.get(url).then((res)=>{
// 			loadingInstance.close();
// 			success(res)
// 		}).catch((e)=>{
// 			loadingInstance.close();
// 			console.log(e)
// 		})
// 	},
//   getLocalTime:function(now) {
//     let year=now.getFullYear();
//     let month=now.getMonth()+1;
//     if(month<10){
//       month="0"+month;
//     }
//     let date=now.getDate();
//     if(date<10){
//       date="0"+date;
//
//     }
//     let hour=now.getHours();
//     if(hour<10){
//       hour="0"+hour;
//     }
//     let minute=now.getMinutes();
//     if(minute<10){
//       minute="0"+minute;
//     }
//     let second=now.getSeconds();
//     if(second<10){
//       second="0"+second;
//     }
//     console.log(year+"-"+month+"-"+date+" "+hour+":"+minute);
//     return year+"-"+month+"-"+date;
//   }
// }

export default instance
