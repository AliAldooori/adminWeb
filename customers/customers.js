import { loadCustomerList } from "../api/customer.js";
import { listCustomerOrders, cancelOreder } from "../api/booking.js";

const lines = async(customer)=>{
    let orders = []
    let output = []
    await listCustomerOrders(customer.id)
        .then((res)=>{
            if(res.success === true){
                res.bookings.forEach(booking => {
                    if(booking.active === true){
                        orders.push(booking)
                    }
                });
            }
        })
    console.log(orders);
    orders.forEach(order => {
            const line = $('<tr></tr>')
        const td_id = $(`<td>${order.id}</td>`)
        const td_name = $(`<td>${order.bil.name}</td>`)
        const td_date = $(`<td>${order.datum}</td>`)
        const td_action = $(`<td><button id="cancel-${order.id}">Cancel order</button></td>`)
        line.append(td_id, td_name, td_date, td_action)
        output.push(line)
    });
    return {output: output, orders: orders}
}

let customers = [];
export const customrPageLoaded = async () => {
  customers = [];
  await loadCustomerList().then((res) => {
    customers = res.customers;
  });

  

  customers.forEach((customer) => {
    const line = $("<tr></tr>");
    const id = $(`<td>${customer.id}</td>`);
    const customerName = $(`<td>${customer.name}</td>`);
    const userName = $(`<td>${customer.userName}</td>`);
    const passWord = $(`<td>${customer.password}</td>`);
    const adress = $(`<td>${customer.address}</td>`);
    const role = $(`<td>${customer.role}</td>`);
    line.append(id, customerName, userName, passWord, adress, role);
    $("#tbl").append(line);
    line.click(async () => {
      //await listCustomerOrders(customer.id)
      showModal(customer);
    });
  });
const showModal = async(customer) => {
    $("#modal").addClass("show");
    $('#cst-name').text(customer.name)
    $('#tbody').empty()
    await lines(customer).then((res)=>{
        console.log('res', res);
        res.output.forEach(item => {
            $('#tbody').append(item)
        });
        res.orders.forEach(order => {
            $(`#cancel-${order.id}`).click(async()=>{
                await cancelOreder(order.id)
                await showModal(customer)
            })
        });
    })
  };
  const hideModal = () => {
    $("#modal").removeClass("show");
  };
$('#close').click(hideModal)

};
