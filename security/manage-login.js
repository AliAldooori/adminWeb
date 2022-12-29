export const commitLogin = async (adminName, password) => {
    const result = {success: false}
    await fetch(
      "http://localhost:8080/realms/RentalCar/protocol/openid-connect/token",
      {
        method: "POST",
        header: {
          accept: "*/*",
          "Constant-type": "application/x-www-form-urlencoded;charset=UTF-8",
          "Acces-Control-Allow-Origin": "*",
          "Acces-Control-Allow-Headers": "*",
        },
        body: new URLSearchParams({
          client_id: "TWRental",
          grant_type: "password",
          scope: "openid",
          username: adminName,
          password: password,
        }),
      }
    )
      .then(async (response) => {
        if (response.status === 200) {
          const parsed = await response.json();
          localStorage.setItem("access_token", parsed.access_token);
          localStorage.setItem("refresh_token", parsed.refresh_token);
          localStorage.setItem("adminName", adminName);
  
          if(!isAdmin(parsed.access_token)){
              await endSession()
              alert('Not admin')
          }else result.success = true
        }
      })
      .catch((err) => {
        console.log(err);
      });
  
      return result
  };
  
  const isAdmin = (token) => {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return decodedToken.realm_access.roles.includes("ADMIN");
  };
  
  export const endSession = async () => {
    await fetch(
      "http://localhost:8080/realms/RentalCar/protocol/openid-connect/logout",
      {
        method: "POST",
        header: {
          accept: "*/*",
          "Constant-type": "application/x-www-form-urlencoded;charset=UTF-8",
          "Acces-Control-Allow-Origin": "*",
          "Acces-Control-Allow-Headers": "*",
        },
        body: new URLSearchParams({
          client_id: "TWRental",
          grant_type: "refresh_token",
          scope: "openid",
          refresh_token: localStorage.getItem("refresh_token"),
        }),
      }
    )
      .then(async (response) => {
        if (response.status === 204) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("adminName");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };