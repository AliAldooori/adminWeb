import { navigateTo } from "./nav.js";
import { endSession } from "./security/manage-login.js";

const nv_login = $("#nv-login");
const nv_all_customers = $("#nv-all-customers");
const nv_all_cars = $("#nv-all-cars");
const nv_logout = $("#nv-logout");

nv_all_customers.click(() => {
  navigateTo("customers/customers.html", 'customers');
});

nv_all_cars.click(async() => {
  navigateTo("cars/cars.html", 'cars');
});

nv_login.click(() => {
  navigateTo("login/login.html", 'login');
});

nv_logout.click(async () => {
  await endSession();
  afterLogout()
});

export const successLogin = () => {
  nv_login.addClass("hidden");
  nv_all_customers.removeClass("hidden");
  nv_all_cars.removeClass("hidden");
  nv_logout.removeClass("hidden");
  navigateTo('home/home.html')
};

const afterLogout = ()=>{
  nv_login.removeClass("hidden");
  nv_all_customers.addClass("hidden");
  nv_all_cars.addClass("hidden");
  nv_logout.addClass("hidden");
  navigateTo('home/home.html', 'home')
}

const checkLogged = ()=>{
  const token = localStorage.getItem('access_token')
  const refresh_token = localStorage.getItem('refresh_token')
  const adminName = localStorage.getItem('adminName')

  if(token && refresh_token && adminName){
    successLogin()
  }
}
navigateTo('home/home.html')
checkLogged()