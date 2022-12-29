import { loadCustomerList } from "../api/customer.js";
import { navigateTo } from "../nav.js";
import { populateAll } from "./one.js";

let customers = []
 export const customrPageLoaded = async()=>{
    customers = []
    await loadCustomerList()
    .then((res)=>{
        customers = res.customers
    })

    customers.forEach(customer => {
    const line = $('<tr></tr>')
    const id = $(`<td>${customer.id}</td>`)
    const customerName = $(`<td>${customer.name}</td>`)
    const userName = $(`<td>${customer.userName}</td>`)
    const passWord = $(`<td>${customer.password}</td>`)
    const adress = $(`<td>${customer.address}</td>`)
    const role = $(`<td>${customer.role}</td>`)
    line.append(id,customerName,userName,passWord,adress ,role)
    $('#tbl').append(line)
    line.click(()=>{
        navigateTo('customers/one.html', '')
        populateAll(customer)
    })
});
}