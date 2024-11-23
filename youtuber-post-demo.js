const express = require('express')
const app = express()
app.listen(1234)

app.get('/youtubers', (req, res) => {

    var youtubers = {}; // 클린코드 형태로 json, list 등은 xx
    db.forEach(function(value, key){//첫번째 매개변수는 무조건 데이터(벨류) , 두번째는 무조건 인덱스(키)
        youtubers[key] = value
    })

    res.json(youtubers)
})

app.get('/youtubers/:id', function (req, res) {
    let {id} = req.params
    id = parseInt(id)

    let youtuber = db.get(id)

    if(!youtuber){
        res.json({
            message: "없는 채널"
        })
    }else{
        res.json(youtuber)
    }


})


let youtuber1 = {
    channelTitle : "유튜버1",
    sub : "593만명",
    videoNum : "993개"
}

let youtuber2 = {
    channelTitle : "유튜버2",
    sub : "227만명",
    videoNum : "6.6천개"
}

let youtuber3 = {
    channelTitle : "유튜버3",
    sub : "54.8만명",
    videoNum : "726개"
}


let db = new Map()

var dbKey = 1;

db.set(dbKey++, youtuber1)
db.set(dbKey++, youtuber2) 
db.set(dbKey++, youtuber3) 


// 유튜버등록
app.use(express.json()) 
app.post('/youtubers', (req, res) => {

    // console.log(req.body)
    db.set(dbKey++, req.body)//db에 등록

    res.json({
        // message: db.get(4).channelTitle + "유튜브 생성 추카추카"
         message: `${db.get(dbKey-1).channelTitle} 유튜브 생성 추카추카`
    })

})


//유튜버삭제
app.delete('/youtubers/:id', (req, res) => {
    let {id} = req.params
    id = parseInt(id)

    var youtuber = db.get(id)
    if (youtuber == undefined) {
        res.json({
            message: `요청한 ${id} 유튜버는 없는 사람`
        }) 
    } else{
        const name = youtuber.channelTitle
        db.delete(id)
    
        res.json({
            id: id,
            message: `${name}님 다음에 또 봐요`
        })
    }
})

//전체유튜버 삭제
app.delete('/youtubers', (req, res) => {
    
    var msg = ""
    if (db.size >= 1){
        db.clear()
        msg = "전체 삭제 됨"
    }else{
        msg = "삭제할게 없어용"
    }

    res.json({
        message: msg
    })
})


//유튜버 개별수정
app.put('/youtubers/:id', (req, res) => {
    let {id} = req.params
    id = parseInt(id)

    var youtuber = db.get(id)
    const name = youtuber.channelTitle
    const sub = youtuber.sub
    const vidoe = youtuber.videoNum
    //위 세개는 기존에 사용하던 데이터를 미리 담아둔 변수

    var msg = ""

    if (youtuber == undefined){
        msg = "수정할 사람이 없어!"
    }else{
        var newName =   req.body.channelTitle
        var newSub =   req.body.sub
        var newVideo =   req.body.videoNum
        //세개는 새로 바뀔 데이터 저장한 변수

        youtuber.channelTitle = newName
        youtuber.sub = newSub
        youtuber.videoNum = newVideo
        //기존 데이터를 새로운 데이터로 덮어씌우기

        db.set(id, youtuber)

        msg = `${name}, ${sub}, ${vidoe}이 ${newName}, ${newSub}, ${newVideo}으로 수정됐어`
    }
  
    res.json({
        message: msg
    })
})