import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customerFilter'
})
export class CustomerFilterPipe implements PipeTransform {

  transform(customerArray: any, searchTerm?: any): any {
  	if (customerArray != undefined && searchTerm != undefined) {	
	    return customerArray.filter((element)=>{
	    	return element.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || element.community.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || element.door_number.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
	    });
  	}
  }

}
