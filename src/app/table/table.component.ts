import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Item } from '../data.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  items: Item[] = [];
  newItem: Item = { id: null, title: '', description: '' };
  isEditModalOpen: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // this.getData();
  }

  getData() {
    this.dataService.getItems()
      .subscribe((data: { [key: string]: any }) => {
        this.items = Object.keys(data).map(key => data[key]);
        for(const i of this.items){
          const hi = i;
           console.log(hi);
        
        }
      }, (error) => {
        console.error(error);
      });
  }

  openAdd() {
    this.isEditModalOpen = true;
  }

  // addItem() {
  
  //   const timestamp = new Date().getTime();
  //   this.newItem.id = timestamp;

  //   this.dataService.addItem(this.newItem).subscribe(
  //     (response: Item) => {
  //       this.items.push(response);
  //       this.newItem = { id: null, title: '', description: '' };
  //       this.isEditModalOpen = false; 
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }
  nextId:number=100;
  increase1:any='';
  addItem() {
    // Assuming you have a counter variable to keep track of the next ID.
   
    this.increase1=this.nextId+1; // Initialize it to 0 in your component's constructor or wherever makes sense.
  
    // Create a new item with the next unique ID.
    const newItem: Item = {
      id: this.increase1,
      title: this.newItem.title,
      description: this.newItem.description
    };
  
    this.dataService.addItem(newItem).subscribe(
      (response: Item) => {
        this.items.push(response);
        this.newItem = { id: null, title: '', description: '' };
        this.isEditModalOpen = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  

  // deleteItem(itemId: number) {
  //   console.log("Deleting item with ID:", itemId);

  //   this.dataService.deleteItem(itemId).subscribe(
  //     () => {
  //       console.log("Item deleted successfully.");
  //       this.items = this.items.splice(itemId,1);
  //     },
  //     (error) => {
  //       console.error("Error deleting item:", error);
  //     }
  //   );
  // }
  deleteItem(itemId: number) {
    console.log("Deleting item with ID:", itemId,this.increase1);

    this.dataService.deleteItem(this.increase1).subscribe(
      () => {
        console.log("Item deleted successfully.");
       
        this.items = this.items.splice(this.increase1,1);
      },
      (error) => {
        console.error("Error deleting item:", error);
      }
    );
  }
}
