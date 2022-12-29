const view = $('#view')
import { carsPageLoaded } from "./cars/cars.js";
import { customrPageLoaded } from "./customers/customers.js";

export const navigateTo = async (path, dist)=>{
    view.load(path)
    if(dist === 'cars'){
        await carsPageLoaded()
        
    }
    if (dist === 'customers') {
        await customrPageLoaded()
    }
}