<template>
  <div style="height: 100%">
    <!-- <el-button icon="el-icon-arrow-left" @click="getPreYearDate"
      >上一年</el-button
    >
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <span>{{ year }}年学生数量</span>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <el-button @click="getNextYearDate"
      >下一年<i class="el-icon-arrow-right"></i
    ></el-button> -->

    <div id="main" :style="{ width: '100%', height: '100%' }">
      <h2 style="color:#fff">Welcome to microcomputer <span style="color:orange">class 1908</span> student management system</h2>
    </div>
  </div>
</template>

<script>
import studentApi from "@/api/student.js";
export default {
//   data() {
//     return {
//       year: new Date().getFullYear(),
//     };
//   },
//   components: {},
//   mounted() {
//     this.getChars();
//   },
//   methods: {
//     getPreYearDate() {
//       this.year--;
//       this.getChars();
//     },
//     getNextYearDate() {
//       this.year++;
//       this.getChars();
//     },
//     getChars() {
//       studentApi.getStudentListForMonth(this.year).then((response) => {
//         const res = response.data;
//         if (res.status === 0) {
//           // echarts要渲染dom
//           var chartDom = document.getElementById("main");
//           // echarts 初始化
//           var myChart = this.$echarts.init(chartDom);
//           // 配置项
//           var option;
//           // 展示数据
//           let dataArr = [0];

//           // 如果当年有数据 则显示 如果没有则提示无此年数据
//           if (res.data && res.data.length) {
//             res.data.map((item) => {
//               dataArr[parseInt(item._id) - 1] = item.count;
//             });
//           } else {
//             this.$message({
//               message: "当前年份无数据",
//               type: "warning",
//               duration: 5 * 1000,
//             });
//           }

//           option = {
//             xAxis: {
//               type: "category",
//               data: [
//                 "Jan",
//                 "Feb",
//                 "Mar",
//                 "Apr",
//                 "May",
//                 "Jun",
//                 "Jul",
//                 "Aug",
//                 "Sep",
//                 "Oct",
//                 "Nov",
//                 "Dec",
//               ],
//             },
//             yAxis: {
//               type: "value",
//             },
//             series: [{ data: dataArr, type: "bar" }],
//           };
//           // console.log(res.data);
//           option && myChart.setOption(option);
//         }
//       });
//     },
//   },
};
</script>

<style scoped>
div {
  text-align: center;
}
#main {
  width: 600px;
  height: 400px;
  margin-top: 10px;
  background: url("../../assets/v8.jpg") no-repeat;
  background-size: cover; 
}
</style>