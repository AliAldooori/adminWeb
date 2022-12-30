import { loadCarList, deleteCar, updateCar, addCar } from "../api/cars.js";
const addCar_btn = $("#addCar-btn");
let cars = [];

const performeDelete = async (carId) => {
  await deleteCar(carId);
  await carsPageLoaded();
};

const performeUpdate = async (carId, car) => {
  await updateCar(carId, car);
  await carsPageLoaded();
};
const performeAdd = async (car) => {
  await addCar(car);
  await carsPageLoaded();
};

export const carsPageLoaded = async () => {
  $("#tbl").empty();
  cars = [];
  await loadCarList().then((res) => {
    cars = res.cars;
  });

  const line1 = $("<tr></tr>");
  const line1_id = $("<th>id</th>");
  const line1_brand = $("<th>brand</th>");
  const line1_model = $("<th>model</th>");
  const line1_price = $("<th>price per day</th>");
  const line1_actions = $("<th>actions</th>");
  const line1_addCar = $("<th>add car</th>");
  line1.append(
    line1_id,
    line1_brand,
    line1_model,
    line1_price,
    line1_actions,
    line1_addCar
  );
  $("#tbl").append(line1);

  cars.forEach((car) => {
    const line = $("<tr></tr>");
    const id = $(`<td>${car.id}</td>`);
    const carName = $(`<td>${car.name}</td>`);
    const model = $(`<td>${car.model}</td>`);
    const price = $(`<td>${car.priceDay}</td>`);
    const btnTd = $("<td></td>");
    const btnTd2 = $("<td></td>");
    const myDiv = $('<div id="buttons"></div>');
    const myDiv2 = $('<div id="buttons"></div>');
    const edit = $('<button class="btn-edit">edit</button>');
    // const add_btn = $('<button class="btn-add">add</button>');
    const remove = $('<button class="btn-remove">remove</button>');
    const lbl = $("<p>new price</p>");
    const inp = $('<input type="number" />');

    const lblNmae = $("<p>brand car</p>");
    const lbModel = $("<p>model</p>");
    const lblPriceDay = $("<p>price </p>");
    const inpId = $('<input type="number" />');
    const inpName = $('<input type="text" />');
    const inpModel = $('<input type="text" />');
    const inpPriceDay = $('<input type="number" />');

    const save = $("<button>save</button>");
    const pop2 = $('<div class="hidden" id="pop"></div>');
    const add_btn = $('<button class="btn-add">add</button>');

    const pop = $('<div class="hidden" id="pop"></div>');
    const sav = $("<button>save</button>");
    pop2.append(
      lblNmae,
      inpName,
      lbModel,
      inpModel,
      lblPriceDay,
      inpPriceDay,
      save
    );
    pop.append(lbl, inp, sav);
    myDiv.append(edit, remove, pop);
    myDiv2.append(add_btn, pop2);
    btnTd.append(myDiv, myDiv2);
    btnTd2.append(myDiv2);
    line.append(id, carName, model, price, btnTd, btnTd2);
    $("#tbl").append(line);
    remove.click(async () => {
      await performeDelete(car.id);
    });
    edit.click(() => {
      pop.removeClass("hidden");
    });
    add_btn.click(() => {
      pop2.removeClass("hidden");
    });

    sav.click(async () => {
      car.priceDay = inp.val();
      await performeUpdate(car.id, car);
      pop.addClass("hidden");
    });
    save.click(async () => {
      car.id = inpId.val();
      car.name = inpName.val();
      car.model = inpModel.val();
      car.priceDay = inpPriceDay.val();
      await performeAdd(car);
    });
  });
};
