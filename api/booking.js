export const cancelOreder = async (bokningID ) => {
    const output = {
      success: false,
      cars: [],
    };
  
    await fetch("http://localhost:8085/api/v1/cancelorder", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
        accept: "*/*",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
         bokning_id: bokningID,

      },
      

    })
      .then(async (res) => {
        const parsed = await res.json();
        console.log(res);
        console.log(parsed);
      })
      .catch(() => {
        console.log("an error accured");
      });
  
    return output;
  };

export const listCustomerOrders = async (customer_id ) => {
    const output = {
      success: false,
      bookings: [],
    };
  
    await fetch("http://localhost:8085/api/v1/myorders", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
        accept: "*/*",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        kund_id: customer_id,
      },
      

    })
      .then(async (res) => {
        if(res.status === 226){
          const parsed = await res.json();
          output.success = true
          output.bookings = parsed
        }
      })
      .catch(() => {
        console.log("an error accured");
      });
  
    return output;
  };