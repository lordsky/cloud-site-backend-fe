<template>
<div class="content">
	  	<div class="content-text">
	  		<div class="content-box">
	  			<navHead></navHead>
	  			<slot></slot>
	  		</div>
	  	</div>
	 </div>
</template>

<script>
import navHead from './navHead';
	export default{
		name:'contentCommon',
		data(){
			return{
				
			}
		},
		props:[],
		watch:{
		 	
		},
		methods:{
			
		},
		components:{
			navHead
		},
	}
</script>

<style lang="less">
.content{
  	height: calc(100vh - 60px);
  	background: #f0f2f5;
  	display: flex;
  	
  	.content-text{
  	   box-shadow: 0 10px 20px black;
  	   width: 95%;
  	   margin: 0 auto;
  	   margin-top: 10px;
  	   background: white;
  	   overflow: auto;
  	}
  	.content-box{
        position: relative;
  		width: 97%;
  		margin: 0 auto;
  		margin-top: 50px;
  	}
  	}
</style>
