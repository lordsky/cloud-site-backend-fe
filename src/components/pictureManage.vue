<template>
  <div class="pictureManage">
    <div class="picture-head">
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">图片素材</el-menu-item>
        <el-menu-item index="2">视频素材</el-menu-item>
      </el-menu>
      <div class="line"></div>
      </el-menu>
    </div>
    <div class="picture-box">
      <div class="picture-check" v-show="listLabel==1">
        <span class="check-item"><el-checkbox v-model="checked" :indeterminate="picAllStatu"  @change="picAllChange">全选</el-checkbox></span>
        <span class="check-item"><el-button type="primary" size="small" @click="allDel">批量删除</el-button></span>
      </div>
      <div class="picture-list" v-show="listLabel==1">
        <div class="picture-list-item update" >
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="imgSuccess" :before-upload="imgUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <i class="el-icon-warning picture-warning">上传图片支持jpg,png,gif等格式，不超过10M</i>
        </div>
        <div class="picture-list-item" v-for="(x,i) in 7" @mouseleave="itemShow = null" @mouseenter="itemShow = i" >
        	  <img src="../assets/logo.jpeg" @click="choose(i,checkShow[i])"/>
        	  <div class="picture-list-item-check">
        	  	
        	    <el-checkbox v-model="checkList[i]" v-show="checkShow[i]" disabled></el-checkbox>
        	  </div>
        	  <div class="picture-list-item-hoverTop" v-show="itemShow==i" :class="{topBar:itemShow==i}"><span>导航栏</span></div>
        	  <div class="picture-list-item-hoverFoot" v-show="itemShow==i" :class="{footBar:itemShow==i}">
        	  	<span class="el-icon-view"></span>
        	  	<span class="el-icon-edit" @click="editItem"></span>
        	  	<span class="el-icon-delete" @click="delItem"></span>
        	  </div>
        </div>
      </div>
      <div class="picture-check" v-show="listLabel==2">
        <span class="check-item"><el-checkbox v-model="checkVideo":indeterminate="videoAllStatu"  @change="videoAllChange">全选</el-checkbox></span>
        <span class="check-item"><el-button type="primary" size="small" @click="allDel">批量删除</el-button></span>
      </div>
      <div class="picture-list" v-show="listLabel==2">
        <div class="picture-list-item update" >
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="imgSuccess" :before-upload="videoUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <i class="el-icon-warning picture-warning">上传视频支持MP4,wma等格式，不超过10M</i>
        </div>
        <div class="picture-list-item" v-for="(x,i) in 3" @mouseleave="itemShow = null" @mouseenter="itemShow = i" >
        	  <img src="../assets/logo.jpeg" @click="videoChoose(i,checkVideoShow[i])"/>
        	  <div class="picture-list-item-check">
        	    <el-checkbox v-model="checkVideoList[i]" v-show="checkVideoShow[i]" disabled></el-checkbox>
        	  </div>
        	  <div class="picture-list-item-hoverTop" v-show="itemShow==i" :class="{topBar:itemShow==i}"><span>记录视频</span></div>
        	  <div class="picture-list-item-hoverFoot" v-show="itemShow==i" :class="{footBar:itemShow==i}">
        	  	<span class="el-icon-view"></span>
        	  	<span class="el-icon-edit" @click="editItem"></span>
        	  	<span class="el-icon-delete" @click="delItem"></span>
        	  </div>
        </div>
      </div>
       
      <div class="pictrue-page"v-show="listLabel==1">
      	<el-pagination
      @size-change="handleSizeChange"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
        </el-pagination>
      </div>
       <div class="pictrue-page"v-show="listLabel==2">
      	<el-pagination
      @size-change="handleSizeChange"
      background
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pictureManage',
    data() {
      return {
        checked: '',
        checkVideo:'',
        imageUrl: '',
        itemShow:null,
        checkShow:[],
        checkList:[],
        listLabel:'1',
        currentPage:1,
        checkVideoShow:[],
        checkVideoList:[],
        picAllStatu:false,
        videoAllStatu:false
      }
    },
    watch:{
    	
    },
    methods: {
    	 //全选
    	  picAllChange(val){
    	  	if(this.picAllStatu){
    	  	    this.picAllStatu = false
    	  	    this.checked = val
    	  	}
    	  	this.setcheckAll(val,'pic',7)
    	  },
    	  videoAllChange(val){
    	  	if(this.videoAllStatu){
    	  	    this.videoAllStatu = false
    	  	    this.checkVideo = val
    	  	}
    	  	this.setcheckAll(val,'video',3)
    	  },
    	//批量删除
    	  allDel(){
    	  	console.log(this.checked)
    	  },
    	  //删除
    	  delItem(){
    	  	this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    	  },
    	  //修改
    	  editItem(){
    	  	
    	  	this.$prompt('', '修改文件名', {
          confirmButtonText: '保存',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
    	  },
    	  //导航
      handleSelect(key) {
        this.listLabel = key
      },
      imgSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      //图片上传
      imgUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //视频上传
      videoUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
     
      //图片选择
      choose(key,stu){
      	if(stu){
      		this.setArray('pic',key,false)
      	}else{
      		this.setArray('pic',key,true)
      	}
      	this.picAllStatu = true
      	this.checked = false
      },
      //视频选择
      videoChoose(key,stu){
      	if(stu){
      		this.setArray('video',key,false)
      	}else{
      		this.setArray('video',key,true)
      	}
      	this.videoAllStatu = true
      	this.checkVideo = false
      },
      
      setArray(val,key,statu){
      	if(val=='pic'){
      		this.$set(this.checkShow,key,statu)
      	    this.$set(this.checkList,key,statu)
      	}else if(val=='video'){
      		this.$set(this.checkVideoShow,key,statu)
      	    this.$set(this.checkVideoList,key,statu)
      	}
      },
      setcheckAll(val,text,list){
      	  if(val){
    	     	for(var i =0;i<list;i++){
    	     		this.setArray(text,i,true)
    	     	}
    	      }else{
    	     	for(var i =0;i<list;i++){
    	     		this.setArray(text,i,false)
    	     	}
    	      }
      },
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style lang="less" scoped>
  .picture-head {
    margin-top: 10px;
  }
  .picture-box {
    margin-top: 10px;
    .picture-check {
      .check-item {
        width: 100px;
        display: inline-block;
        text-align: center;
      }
    }
    .pictrue-page{
     	margin-bottom: 20px;
    }
  }
  .picture-list{
  	width: 100%;
  	margin-bottom: 20px;
  	&:after{
  		content: '';
  		clear: both;
  		display:block;
  	}
  	.picture-list-item{
  		overflow: hidden;
  		float: left;
  		margin-right: 3%;
  		margin-top: 10px;
  		position: relative;
  		width: 22%;
  		height: 300px;
  		border:10px solid #cccccc;
  		.el-upload{
  		width: 100%;
  		height: 270px;
  		display: flex;
  		justify-content: center;
  		align-items: center;
  		.avatar-uploader-icon{
  			font-size: 40px;
  		}
  	   }
  	   .picture-list-item-hoverTop{
  	   	height: 20%;
  	   	width: 100%;
  	   	background: rgba(0,0,0,0.5);
  	   	position: absolute;
  	   	top: 0;
  	    font-size: 18px;
  	    font-weight: 200;
  	    color: white;
  	    display: flex;
  	    align-items: center;
  	    span{
  	    	   padding-left: 20px;
  	    }
  	   }
  	   .picture-list-item-hoverFoot{
  	   	height: 20%;
  	   	width: 100%;
  	   	background: rgba(0,0,0,0.5);
  	   	position: absolute;
  	   	bottom: 0;
  	   	display: flex;
  	   	justify-content: center;
  	   	align-items: center;
  	   	span{
  	   		display: inline-block;
  	   		width: 25px;
  	   		height: 25px;
  	   		background: #bfbfbf;
  	   		margin-right: 10px;
  	   		display: flex;
  	   		align-items: center;
  	   		justify-content: center;
  	   		border-radius: 4px;
  	   		font-size: 16px;
  	   		color: white;
  	   		cursor: pointer;
  	   	}
  	   }
  	   .picture-warning{
  		font-size: 13px;
  		color: red;
  		padding-left: 5px;
  	   }
  	   img{
  	   	width: 100%;
  	   	height: 100%;
  	   }
  	   .picture-list-item-check{
  	   	position: absolute;
  	   	top: 0px;
  	   	right: 0px;
  	   	z-index: 10;
  	   	.el-checkbox__inner{
  	   		background-color:#1afa29;
  	   		border-color: #1afa29;
  	   		width: 40px;
  	   		height: 40px;
  	   		border-radius: 50%;
  	   		display: flex;
  	   		justify-content: center;
  	   		align-items: center;
  	   		&:after{
  	   			position: static;
  	   			border: 3px white solid;
  	   			height: 15px;
  	   			width: 7px;
  	   			border-left: 0;
  	   			border-top: 0;
  	   		}
  	   	}
  	   }
  	}
  	.update{
  		border: 0;
  	}
  	.itemHover{
  		display: block;
  	}
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .topBar{
  	animation: aa .5s ease;
  }
  @keyframes aa{
  	from{transform: translateY(-50px);}
  	to{transform: translateY(0);}
  }
  .footBar{
  	animation: bb .5s ease;
  }
  @keyframes bb{
  	from{transform: translateY(50px);}
  	to{transform: translateY(0);}
  }
</style>