import React, { useState } from 'react'

export const Relaxed = () => {


  const [points, setPoints] = useState([{ x: 0, y: 0 },{x:0,y:0},{x:0,y:0}])

  const [t2, setSet2] = useState(0)
  const [t3, setSet3] = useState(0)

  const showOutput = () => {
    return (
      <div>
        <hr />
        Output:
        <br />
        t2 : {t2}
        <br />
        t3 : {t3}
        <br />
        Equation :1 : {eq1}
        <br />
        Equation :2 : {eq2}
        <br />
        Equation :3 : {eq3}
        <br />
        <br />
        P1'=[{allX[0]},{allY[0]}]
        <br />
        P2'=[{allX[1]},{allY[1]}]
        <br />
        P3'=[{allX[2]},{allY[2]}]
        {/* X= {JSON.stringify(allX)} */}
        <br />
        {/* Y= {JSON.stringify(allY)} */}

      </div>
    )
  }


  const handleDelete = (indis) => {
    let current = [...points]
    current.splice(indis, 1);
    setPoints(current)
  }

  const handleX = (indis, value) => {
    let current = [...points];
    current[indis].x = value
    setPoints(current)
  }

  const handleY = (indis, value) => {
    let current = [...points];
    current[indis].y = value
    setPoints(current)
  }

  const [eq1, setEq1] = useState('')
  const [eq2, setEq2] = useState('')
  const [eq3, setEq3] = useState('')

  let [allX, setAllX] = useState('')
  let [allY, setAllY] = useState('')

  const handleCalculate = () => {

    let current = [...points];
    let t2New = Math.sqrt(Math.pow(current[1].y - current[0].y, 2) + Math.pow(current[1].x - current[0].x, 2))
    let t3New = Math.sqrt(Math.pow(current[2].y - current[1].y, 2) + Math.pow(current[2].x - current[1].x, 2))
    setSet2(t2New)
    setSet3(t3New)
    let first = 3 / (t2New * t3New);
    let leftX = (Math.pow(t2New, 2) * (current[2].x - current[1].x)) + (Math.pow(t3New, 2) * (current[1].x - current[0].x))

    let rightNumberX = first * leftX
    let leftY = Math.pow(t2New, 2) * (current[2].y - current[1].y) + Math.pow(t3New, 2) * (current[1].y - current[0].y)
    let rightNumberY = first * leftY
    let eqnew1 = `${t3New} P'1 + ${2 * (t3New + t2New)} P'2 + ${t2New} P'3 = [${rightNumberX} , ${rightNumberY}]`
 
    let eqnew2 = `P'1 + 1/2P'2 = ${(3 / (2 * t2New)) * (current[1].x - current[0].x)} ,${(3 / (2 * t2New)) * (current[1].y - current[0].y)} `
    let eqnew3 = `2P'2 + 4P'3 = ${(6 / t3New) * (current[2].x - current[1].x)} ,${(6 / t3New) * (current[2].y - current[1].y)} `
    var Solver = require("3x3-equation-solver");

    //p1 //p2 //p3 //result
    let newAllX = Solver([
      [t3New, 2 * (t3New + t2New), t2New, rightNumberX]
      , [1, 0.5, 0, (3 / (2 * t2New)) * (current[1].x - current[0].x)]
      , [0, 2, 4, (6 / t3New) * (current[2].x - current[1].x)]
    ], true);
    let newAllY = Solver([
      [t3New, 2 * (t3New + t2New), t2New, rightNumberY]
      , [1, 0.5, 0, (3 / (2 * t2New)) * (current[1].y - current[0].y)]
      , [0, 2, 4, (6 / t3New) * (current[2].y - current[1].y)]
    ], true);

    setAllX(newAllX.result)
    setAllY(newAllY.result)
    setEq1(eqnew1)
    setEq2(eqnew2)
    setEq3(eqnew3)
  }

  const pointsArea = () => {
    return (
      <div>
        {points.map((p, index) => {
          return (
            <div>
              <input style={{ width: 50, borderRadius: 8, fontSize: 16, margin: 8 }} placeholder={"X"} onChange={(e) => handleX(index, e.target.value)} value={p.x} />
              <input style={{ width: 50, borderRadius: 8, fontSize: 16, margin: 8 }} placeholder={"Y"} onChange={(e) => handleY(index, e.target.value)} value={p.y} />
              <button style={{ backgroundColor: "teal", color: "white", borderStyle: "none", fontSize: 16, marginLeft: 16 }} onClick={() => handleDelete(index)}>X</button>
            </div>
          )
        })}
        <br />
        {/* <button style={{ backgroundColor: "tomato", color: "white", borderStyle: "none", fontSize: 16, padding: 12, borderRadius: 16, margin: 8 }} onClick={() => handleAdd()}>Add Point</button> */}
        <button style={{ backgroundColor: "tomato", color: "white", borderStyle: "none", fontSize: 16, padding: 12, borderRadius: 16, margin: 8 }} onClick={() => handleCalculate()}>Calculate</button>
      </div>
    )
  }

  return (
    <div>
      Points: {JSON.stringify(points)}
      {points.length}
      {pointsArea()}
      {showOutput()}
    </div>
  )
}