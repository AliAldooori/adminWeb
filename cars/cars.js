import { loadCarList, deleteCar, updateCar } from "../api/cars.js";

let cars = []

const performeDelete = async(carId)=>{
await deleteCar(carId)
await carsPageLoaded()
}

const performeUpdate = async(carId, car)=>{
await updateCar(carId, car)
await carsPageLoaded()
}

export const carsPageLoaded = async()=>{
    $('#tbl').empty()
    cars = []
    await loadCarList()
    .then((res)=>{
        cars = res.cars
    })

    const line1 = $('<tr></tr>')
    const line1_id = $('<th>id</th>')
    const line1_brand = $('<th>brand</th>')
    const line1_model = $('<th>model</th>')
    const line1_price = $('<th>price per day</th>')
    const line1_actions = $('<th>actions</th>')
    line1.append(line1_id, line1_brand, line1_model, line1_price, line1_actions)
    $('#tbl').append(line1)


    cars.forEach(car => {
    const line = $('<tr></tr>')
    const id = $(`<td>${car.id}</td>`)
    const carName = $(`<td>${car.name}</td>`)
    const model = $(`<td>${car.model}</td>`)
    const price = $(`<td>${car.priceDay}</td>`)
    const btnTd = $('<td></td>')
    const myDiv = $('<div id="buttons"></div>')
    const edit = $('<button class="btn-edit">edit</button>')
    const remove = $('<button class="btn-remove">remove</button>')
    const lbl = $('<p>new price</p>')
    const inp = $('<input type="number" />')
    const sav = $('<button>save</button>')
    const pop = $('<div class="hidden" id="pop"></div>')
    pop.append(lbl, inp, sav)
    myDiv.append(edit, remove, pop)
    btnTd.append(myDiv)
    line.append(id, carName, model, price, btnTd)
    $('#tbl').append(line)
    remove.click(async()=>{
        await performeDelete(car.id)
    })
    edit.click(()=>{
        pop.removeClass('hidden')
    })
    sav.click(async()=>{
        car.priceDay = inp.val()
        await performeUpdate(car.id, car)
        pop.addClass('hidden')
    })
});
}
