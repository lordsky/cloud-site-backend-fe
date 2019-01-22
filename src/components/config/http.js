//封装axios
 import { Loading } from 'element-ui';
 import { MessageBox } from 'element-ui';
 import axios from 'axios'
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json; charset=UTF-8';
//axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
var options = {
		text:'加载中'
	}
const http = {
	post:function(url,data,success,headers){
		let loadingInstance = Loading.service(options);
		var config = {}
		if(headers){
			config.headers = headers
		}else{
			config.headers={};
		}
		axios.post(url, data, config).then((res)=>{
			loadingInstance.close();
			success(res)
		}).catch((e)=>{
		    loadingInstance.close();
	     this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: ''
            });
          }
        });
		})
	},
	get:function(url,success){
		let loadingInstance = Loading.service(options);
		axios.get(url).then((res)=>{
			loadingInstance.close();
			success(res)
		}).catch((e)=>{
			loadingInstance.close();
			console.log(e)
		})
	}
}

export default http