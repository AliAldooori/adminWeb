export const loadCarList = async () => {

    const output = {
      success: false,
      cars: [],
    };
  
    await fetch("http://localhost:8085/api/v1/cars", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem('access_token'),
        accept: "*/*",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then(async (res) => {
        if (res.status === 200) {
          const result = await res.json();
          output.success = true;
          output.cars = result;
        }
      })
      .catch(() => {
        console.log("an error accured");
      });
  
    return output;
  };

export const deleteCar = async (carId) => {

    const output = {
      success: false,
      cars: [],
    };
  
    await fetch("http://localhost:8085/api/v1/deletecar", {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem('access_token'),
        accept: "*/*",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "id": carId,
      },
    })
      .then(async (res) => {
        console.log(res);
      })
      .catch(() => {
        console.log("an error accured");
      });
  
    return output;
  };

export const updateCar = async (carId, car) => {


    const output = {
      success: false,
      cars: [],
    };
  
    await fetch("http://localhost:8085/api/v1/updatecar", {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem('access_token'),
        accept: "*/*",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "id": carId,
      },
      body: JSON.stringify(car)
    })
      .then(async (res) => {
        const parsed = await res.json()
      })
      .catch(() => {
        console.log("an error accured");
      });
  
    return output;
  };