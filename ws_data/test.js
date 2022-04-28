const jquery = require("../public/js/jquery.min");
const db = require('../db/index');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { document } = (new JSDOM('<!doctype html><html><body></body></html>')).window;
global.document = document;
const window = document.defaultView;
const $ = require('jquery')(window);
function obj() {
    var arr;

    db.query("SELECT name , id FROM new_university_table", (err, results) => {
        if (err) {
            console.log("数据库执行错误");
            return;
        }
        else {


            arr = results
            // console.log(arr.length,111);
            // console.log(arr[0].name, arr[0].id);
            // return; //3638

            $(function () {
                // 1643

                let i = 0;
                let time = setInterval(() => {

                    if (i > 3) {
                        clearInterval(time);
                        return;
                    }

                    console.log(i);
                    let url = `http://47.107.23.59/gaokao-2.0/university/department?universityName=${arr[i].name}`;
                    
                    $.ajax({
                        url: url,
                        type: 'get',
                        data: {

                        },
                        beforeSend: function () {

                        },
                        success: function (res) {
                            // let data = res.data;
                            // for(let i = 0 ; i <= data.length ; i)
                            // console.log(res.data[0]);
                            // return;
                            // let { college, department} = res.data[0];
                            // console.log(arr[i].name, arr[i].id);
                            // console.log(college, department);
                            return ;
                            db.query("INSERT INTO major_detail_table set ?", { majorName, subject, majorType, majorCode, level, schoolYear, degree, similarMajor, summary, educationGoal, educationRequire, famousScholar, mainCourse, courseRequire, knowledgeAbility, boyGirlRate, wenLikeRate, graduateNum, avgSalary, jobRankingOfAll, jobRankingOfSubject, lastYearEmployedRate, maxRequireCity, maxRequireIndustry }, (err, results) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    console.log("成功");
                                }
                            })
                        },
                        error: function () {

                        },
                        complete: function () {
                            i++
                        }
                    })
                }, 2000);
            })
        }
    })
}
        // obj()

function test() {
    $(function () {
        let i = 1;
        let time = setInterval(() => {
            //如果超出数据的范围，就停止请求
            if (i > 3638) {
                clearInterval(time);
                return;
            }
            //请求网址
            let url = `http://47.107.23.59/gaokao-2.0/universitys/v2?page=${i}&universityName=&pageSize=1`;
            //jQuery封装的ajax方法
            $.ajax({
                url: url,
                type: 'get',
                data: {
                },
                beforeSend: function () {
                },
                success: function (res) {
                    //请求接口返回的数据
                    let { name, code, badge, type, isDoubleTop, is985, is211, ranking, city, province, nature, majorName } = res.data[0];
                    //执行数据库插入语句
                    db.query("INSERT INTO university_list_table set ?", { name, code, badge, type, isDoubleTop, is985, is211, ranking, city, province, nature, majorName }, (err, results) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log("成功");
                        }
                    })
                },
                error: function () {
                },
                complete: function () {
                    //最终变量i自增，进行下一个请求
                    i++
                }
            })
        }, 500);
    })
}
// test()
// let arr = obj();

// console.log(arr.arr.length);

// $(function(){
//     // 1669
//     // for (let i =1; i < 400; i++) {
//     //     let url = `http://47.107.23.59/gaokao-2.0/major/list?majorName=&level=&subject=&majorType=&page=${i}&pageSize=1`;
//     //     $.ajax({
//     //         url: url,
//     //         type: 'get',
//     //         data: {

//     //         },
//     //         beforeSend: function () {

//     //         },
//     //         success: function (res) {
//     //             console.log(res.data[0]);
//     //             let {majorName,majorCode,level,subject,schoolYear,boyGirlRate,lastYearEmployedRate,avgSalary} =  res.data[0]
//     //             console.log(majorName,majorCode,level,subject,schoolYear,boyGirlRate,lastYearEmployedRate,avgSalary);
//     //             db.query("INSERT INTO major_list set ?", {majorName,majorCode,level,subject,schoolYear,boyGirlRate,lastYearEmployedRate,avgSalary}, (err, results) => {
//     //                 if(err){
//     //                     console.log("数据库执行错误");
//     //                 }
//     //                 else{
//     //                     console.log("成功");
//     //                 }
//     //             })
//     //         },
//     //         error: function () {

//     //         },
//     //         complete: function () {

//     //         }
//     //     })
//     // }



// let i = 101;
// let time = setInterval(() => {

//     if (i >= 1668) {
//         clearInterval(time);
//         return;
//     }
//     i++
//     console.log(i);
//     let url = `http://47.107.23.59/gaokao-2.0/major/list?majorName=&level=&subject=&majorType=&page=${i}&pageSize=1`;
//     $.ajax({
//         url: url,
//         type: 'get',
//         data: {

//         },
//         beforeSend: function () {

//         },
//         success: function (res) {
//             console.log(res.data[0]);
//             let { majorName, majorCode, level, subject, schoolYear, boyGirlRate, lastYearEmployedRate, avgSalary } = res.data[0]
//             console.log(majorName, majorCode, level, subject, schoolYear, boyGirlRate, lastYearEmployedRate, avgSalary);
//             db.query("INSERT INTO major_list set ?", { majorName, majorCode, level, subject, schoolYear, boyGirlRate, lastYearEmployedRate, avgSalary }, (err, results) => {
//                 if (err) {
//                     console.log("数据库执行错误");
//                 }
//                 else {
//                     console.log("成功");
//                 }
//             })
//         },
//         error: function () {

//         },
//         complete: function () {

//         }
//     })
// }, 100);
// })
