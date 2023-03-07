
console.log('<----------------------Assignment 2 -Javascript Coding------------------------->');
console.log("");

const joinStr = (str) => {
    return str.split('-').join(" ")
}

//fetching row data from data.json
const fetchRawData = () => {
    fetch('/data.json')
        .then(res => {
            return res.json()
        })
        .then(data => {
            const dataRows = document.getElementById('data_body')
            // console.log("data ----->"+ data)
            for (ele of data) {
                dataRows.innerHTML +=
                    `
                        <div class="row">
                            <div class="data_blocks"><span class="data_text">${joinStr(ele.skills)}</span></div>
                            <div class="data_blocks center"><span class="data_text">${ele.today}%</span></div>
                            <div class="data_blocks center"><span class="data_text">${ele.future}%</span></div>
                        </div>
                    `
            }
        })
        .catch(error => {
            console.log('error');
        })
}

console.log("Solutions :>");
//fetching row data from data.json and ranked it according to the todays(2019) score
const calRankFirst = () => {
    fetch('/data.json')
        .then(res => {
            return res.json()
        })
        .then(data => {
            const dataRows = document.getElementById('rankFirst');
            const sortedArr = data.sort((a, b) => b.today - a.today);

            const consoleObj = sortedArr.map((ele, idx) => {
                const { id, future, ...obj } = ele;
                obj['rank'] = idx + 1;
                return obj
            })

            console.log("-> Rank of capabilities according to 2019 scores :");
            console.table(consoleObj);

            sortedArr?.forEach((data, idx) => {
                let i = 0;
                if (idx <= 2) {
                    i++;
                }
                if (idx >= sortedArr.length - 3 && idx < sortedArr?.length) {
                    i++;
                }
                dataRows.innerHTML +=
                    `
                    <div class="row">
                    <div class="rank_count data_blocks_bg${i}"><span class="data_head_txt">${idx + 1}</span></div>
                        <div class="data_blocks data_blocks_bg${i}"><span class="data_text">${joinStr(data.skills)}</span></div>
                        <div class="data_blocks center data_blocks_bg${i}"><span class="data_text">${data.today}%</span></div>
                    </div>
                `
            })
        })
        .catch(error => {
            console.log('error');
        })
}


//fetching row data from data.json and ranked it according to the todays(2024) score
const calRankSecond = () => {
    fetch('/data.json')
        .then(res => {
            return res.json()
        })
        .then(data => {

            const dataRows = document.getElementById('rankSecond')
            const sortedArr = data.sort((a, b) => b.future - a.future);

            const consoleObj = sortedArr.map((ele, idx) => {
                const { id, today, ...obj } = ele;
                obj['rank'] = idx + 1;
                return obj
            })

            console.log("-> Rank of capabilities according to 2024 scores :");
            console.table(consoleObj);

            sortedArr.forEach((data, idx) => {
                let i = 0;
                if (idx <= 2) {
                    i++;
                }
                if (idx >= sortedArr.length - 3 && idx < sortedArr?.length) {
                    i++;
                }
                dataRows.innerHTML +=
                    `
                    <div class="row">
                    <div class="rank_count data_blocks_bg${i}"><span class="data_head_txt">${idx + 1}</span></div>
                        <div class="data_blocks data_blocks_bg${i}"><span class="data_text">${joinStr(data.skills)}</span></div>
                        <div class="data_blocks center data_blocks_bg${i}"><span class="data_text">${data.future}%</span></div>
                    </div>
                `
            })
        })
        .catch(error => {
            console.log('error');
        })
}


//fetching row data from data.json and identify top3 and bottom3 capibility
const calcTopBottomCapibilty = () => {
    fetch('/data.json')
        .then(res => {
            return res.json()
        })
        .then(data => {
            const dataRowsTop = document.getElementById('topCapibility');
            const dataRowsBottom = document.getElementById('bottomCapibility');

            //calculating top 3 capabilities
            const topThreeCap = data.map((jsonObj, index) => {
                const sum = Number(jsonObj.future) + Number(jsonObj.today);
                jsonObj['sum'] = +sum;
                return jsonObj;
            }).sort((a, b) => b["sum"] - a["sum"]).slice(0, 3)

            const consoleTopObj = topThreeCap.map((ele, idx) => {
                const { id, sum, ...rest } = ele;
                rest["Average score"] = ele.sum / 2 + "%"
                return rest;
            })
            // 

            console.log("-> Top 3 Cababilities (Combining both 2019 and 2024 scores) :");
            console.table(consoleTopObj);

            topThreeCap.forEach((data, idx) => {
                dataRowsTop.innerHTML +=
                    `
                <div class="row">
                <div class="rank_count"><span class="data_head_txt">${idx + 1}</span></div>
                <div class="data_blocks"><span class="data_text">${joinStr(data.skills)}</span></div>
                <div class="data_blocks center"><span class="data_text">${(data.sum) / 2}%</span></div>
                </div>
                `
            })

            //calculating top 3  capabilities
            const bottomThreeCap = data.map((jsonObj, index) => {
                const sum = Number(jsonObj.future) + Number(jsonObj.today);
                jsonObj['sum'] = sum;
                return jsonObj
            }).sort((a, b) => a.sum - b.sum).slice(0, 3)

            const consoleBottomObj = bottomThreeCap.map((ele, idx) => {
                const { id, sum, ...rest } = ele;
                rest["Average score"] = ele.sum / 2 + "%"
                return rest;
            })

            console.log("-> Bottom 3 Cababilities (Combining both 2019 and 2024 scores) :");
            console.table(consoleBottomObj);
            bottomThreeCap?.forEach((data, idx) => {
                dataRowsBottom.innerHTML +=
                    `
                <div class="row">
                <div class="rank_count"><span class="data_head_txt">${idx + 1}</span></div>
                <div class="data_blocks"><span class="data_text">${joinStr(data.skills)}</span></div>
                <div class="data_blocks center"><span class="data_text">${data.sum / 2}%</span></div>
                </div>
                `
            })


        })
        .catch(error => {
            console.log('error');
        })
}


//fetching row data from data.json and ranked it according to the difference b/w scores of 2019 and 2024
const calcTopBottomThree = () => {
    fetch('/data.json')
        .then(res => {
            return res.json()
        })
        .then(data => {
            const dataRowsTop = document.getElementById('topThree');
            const dataRowsBottom = document.getElementById('bottomThree');

            //calculating top 3 accelarating capabilities
            const topThreeAcceratingCap = data.map((jsonObj, index) => {
                const diff = Number(jsonObj.future) - Number(jsonObj.today);
                jsonObj['diff'] = diff;
                return jsonObj
            }).sort((a, b) => b.diff - a.diff).slice(0, 3);

            const consoleTopObj = topThreeAcceratingCap.map((ele, idx) => {
                const { id, diff, ...rest } = ele;
                rest["Score Difference (%)"] = rest.future - rest.today + "%"
                return rest;
            })

            console.log("-> Top 3 Accelerating Cababilities (Fastest growing) :");
            console.table(consoleTopObj);

            topThreeAcceratingCap.forEach((data, idx) => {
                dataRowsTop.innerHTML +=
                    `
                <div class="row">
                <div class="rank_count"><span class="data_head_txt">${idx + 1}</span></div>
                <div class="data_blocks"><span class="data_text">${joinStr(data.skills)}</span></div>
                <div class="data_blocks center"><span class="data_text">${data.future - data.today}%</span></div>
                </div>
                `
            })

            //calculating top 3 decelarating capabilities

            const topThreeDecelerating = data.map((jsonObj, index) => {
                const diff = Number(jsonObj.future) - Number(jsonObj.today);
                jsonObj['diff'] = diff;
                return jsonObj
            }).sort((a, b) => a.diff - b.diff).slice(0, 3)

            const consoleBottomObj = topThreeDecelerating.map((ele, idx) => {
                const { id, diff, ...rest } = ele;
                rest["Score Difference (%)"] = rest.future - rest.today + "%"
                return rest;
            })

            console.log("-> Bottom 3 decelerating Cababilities (Fastest declining) :");
            console.table(consoleBottomObj);
            topThreeDecelerating?.forEach((data, idx) => {
                dataRowsBottom.innerHTML +=
                    `
                <div class="row">
                <div class="rank_count"><span class="data_head_txt">${idx + 1}</span></div>
                <div class="data_blocks"><span class="data_text">${joinStr(data.skills)}</span></div>
                <div class="data_blocks center"><span class="data_text">${data.future - data.today}%</span></div>
                </div>
                `
            })


        })
        .catch(error => {
            console.log('error');
        })
}


//finding rank of the skill on user input 
const calcRank = () => {
    const rankBody = document.getElementById('rankBody')
    const select = document.getElementById('select')
    const showRank = document.querySelector('.rank_')
    fetch('/data.json')
    .then(res => {
        return res.json()
    })
    .then(data => {
            console.log('-> select skills from web page ');
            for (ele of data) {
                select.innerHTML +=
                    `
                <option value=${ele.skills}>${joinStr(ele.skills)}</option>
                `
            }
            const sortedArrForToday = data.sort((a, b) => b.today - a.today);
            const objToday = sortedArrForToday.map((ele, idx) => {
                const { id, future, ...obj } = ele;
                obj['rank'] = idx + 1;
                return obj
            })

            const sortedArrForFuture = data.sort((a, b) => b.future - a.future);

            const objFuture = sortedArrForFuture.map((ele, idx) => {
                const { id, today, ...obj } = ele;
                obj['rank'] = idx + 1;
                return obj
            })

            select.onchange = (e) => {
                select.value = e.target.value;
                const optionVal = select.value;

                showRank.innerHTML = `
                <div class="row">
                <div style='flex:1' class="data_blocks"><span class="data_head_txt">Skills/Capabilities</span></div>
                <div style='flex:1' class="rank_count border_left"><span class="data_head_txt">Rank in 2019</span></div>
                <div style='flex:1' class="rank_count border_left"><span class="data_head_txt">Score (%) in 2019</span>
                </div>
                <div style='flex:1' class="rank_count border_left"><span class="data_head_txt">Rank in 2024</span></div>
                <div style='flex:1' class="rank_count border_left"><span class="data_head_txt">Score (%) in 2024</span>
                </div>
                </div>
                `
                console.log("->Ranks according to input");
                //calculating today data rank
                const todayRankObj = objToday.find(element => element.skills.toLowerCase() == optionVal.toLowerCase())
                console.log("->Rank in 2019 is : "+todayRankObj?.rank);
                console.log(todayRankObj);
                
                //calculating future data rank
                const futureRankObj = objFuture.find(element => element.skills.toLowerCase() == optionVal.toLowerCase())
                console.log("->Rank in 2024 is : "+futureRankObj?.rank);
                console.log(futureRankObj);

                rankBody.innerHTML = `
                <div class="row_">
                <div style='flex:1' class="data_blocks"><span class="data_text">${optionVal}</span></div>
                <div style='flex:1' class="rank_count border_left"><span class="data_text">${todayRankObj?.rank}</span>  </div>
                <div style='flex:1' class="rank_count border_left"><span class="data_text">${todayRankObj?.today}%</span></div>
                <div style='flex:1' class="rank_count border_left"><span class="data_text">${futureRankObj?.rank}</span>  </div>
                <div style='flex:1' class="rank_count border_left"><span class="data_text">${futureRankObj?.future}%</span></div>
                </div>
            </div>
                `

            }
        })
        .catch(error => {
            console.log(error);
        })

}


fetchRawData()
calRankFirst()
calRankSecond()
calcTopBottomCapibilty()
calcTopBottomThree()
calcRank()