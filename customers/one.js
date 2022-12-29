const cst_id = $("#cst-id");
const cst_name = $("#cst-name");
const orders_tbl = $("#orders-tbl");

let customer = null;

export const populateAll = (person) => {
  customer = person;
  
    $('#xid').text('aaa')
  cst_name.text(customer.name);
};
