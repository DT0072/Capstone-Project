import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AttData } from '../model/att-data';
import { DataService } from '../shared/data.service';
import { CartData} from '../model/cart-data';


@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.css']
})
export class AttractionsComponent implements OnInit {
  attdataList: AttData[] = [];
  displayData: AttData[] = [];
  filteredData: AttData[] = [];
  isDataLoaded: boolean = false;
  loadedItemCount: number = 4;
  itemsToLoad: number = 8;
  startIndex: number = 4;
  selectedCategories: string[] = [];
  selectedLocations: string[] = [];
  selectedPriceRanges: string[] = [];
  isMenuOpen: boolean = false;
  isFilterChecked: boolean = false;
  cartdataList: CartData[] = [];

  categories: string[] = ['Mall', 'Museum'];
  locations: string[] = ['George Town', 'Bayan Lepas'];
  priceRanges: string[] = ['-'];

  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.getAllAttractions();
  }

  getAllAttractions() {
    this.dataService.getAllAttractions().subscribe(
      (res: any) => {
        this.attdataList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.att_id = e.payload.doc.id;
          return data;
        });
        this.sortData();
        this.isDataLoaded = true;
        this.filteredData = this.attdataList;
        this.loadedItemCount = 4; 
        this.displayData = this.filteredData.slice(0, this.loadedItemCount);
      },
      (err: any) => {
        alert('Error while fetching attractions, please try again later');
      }
    );
  }
  
  showMore() {
    if (!this.isDataLoaded) {
      return;
    }
    const remainingData = this.isFilterChecked ? this.filteredData.slice(this.startIndex) : this.attdataList.slice(this.startIndex);
    const newData = remainingData.slice(0, this.itemsToLoad);
    this.displayData = [...this.displayData, ...newData];
    this.startIndex += this.itemsToLoad;
  }
  

  formatTime(time: string): string {
    if (time === '24 Hours') {
      return time;
    } else if (time === '-' || !time) {
      return '';
    } else {
      const date = new Date(`2000-01-01T${time}`);
      const formattedTime = date.toLocaleTimeString([], {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        hourCycle: 'h23'
      });
      return formattedTime;
    }
  }

  sortData() {
    this.attdataList.sort((a, b) => {
      return a.att_name.localeCompare(b.att_name);
    });
  }

  redirectToAttractionDashboardComponent(attdata: AttData): void {
    const { att_id, att_name,att_image, att_desc, att_openHrs, att_closeHrs, att_price, att_location } = attdata;
    this.router.navigate(['/attraction-dashboard'], {
      state: {
        att_id,
        att_name,
        att_image,
        att_desc,
        att_openHrs,
        att_closeHrs,
        att_price,
        att_location
      }
    });
  }

  filterAttractions(event: any) {
    const checkbox = event.target;
    const categoryName = checkbox.name;
  
    if (checkbox.checked) {
      this.selectedCategories.push(categoryName);
    } else {
      const index = this.selectedCategories.indexOf(categoryName);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
  
    this.isFilterChecked = this.selectedCategories.length > 0 || this.selectedLocations.length > 0 || this.selectedPriceRanges.length > 0;
    this.applyFilters();
  }

  filterByLocation(event: any) {
    const checkbox = event.target;
    const locationValue = checkbox.value;
  
    if (checkbox.checked) {
      this.selectedLocations.push(locationValue);
    } else {
      const index = this.selectedLocations.indexOf(locationValue);
      if (index !== -1) {
        this.selectedLocations.splice(index, 1);
      }
    }
  
    this.isFilterChecked = this.selectedCategories.length > 0 || this.selectedLocations.length > 0 || this.selectedPriceRanges.length > 0;
    this.applyFilters();
  }

  filterByPriceRange(event: any) {
    const checkbox = event.target;
    const priceRange = checkbox.value;

    if (checkbox.checked) {
      this.selectedPriceRanges.push(priceRange);
    } else {
      const index = this.selectedPriceRanges.indexOf(priceRange);
      if (index !== -1) {
        this.selectedPriceRanges.splice(index, 1);
      }
    }

    this.isFilterChecked = this.selectedCategories.length > 0 || this.selectedLocations.length > 0 || this.selectedPriceRanges.length > 0;
    this.applyFilters();
  }

  applyFilters() {
    if (this.selectedCategories.length > 0 || this.selectedLocations.length > 0 || this.selectedPriceRanges.length > 0) {
      this.filteredData = this.attdataList.filter((attdata) => {
        const isCategoryMatch =
          this.selectedCategories.length === 0 ||
          this.selectedCategories.some((category) =>
            attdata.att_name.toLowerCase().includes(category.toLowerCase())
          );
  
        const isLocationMatch =
          this.selectedLocations.length === 0 ||
          this.selectedLocations.some((location) =>
            attdata.att_location.toLowerCase().includes(location.toLowerCase())
          );
  
        const isPriceRangeMatch =
          this.selectedPriceRanges.length === 0 ||
          this.selectedPriceRanges.includes(attdata.att_price);
  
        return isCategoryMatch && isLocationMatch && isPriceRangeMatch;
      });
    } else {
      this.filteredData = this.attdataList;
    }
  
    this.displayData = this.filteredData.slice(0, this.loadedItemCount);
    this.startIndex = this.loadedItemCount;
  }
  
  isFilterMenuOpen: boolean = false;

  toggleFilterMenu() {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
  }

  getImageUrl(attdata: AttData): string {
    return attdata.att_image;
  }
  
  addToCart(attdata: AttData) {
    const cartdata: CartData = {
      cart_id: '', // Leave it blank as Firestore will generate a unique ID
      cart_user_id: '', // Set the user ID if applicable
      cart_item_id: attdata.att_id, // Set the ID of the selected attraction
      cart_item_name: attdata.att_name, // Set the name of the selected attraction
      cart_item_price: attdata.att_price, // Set the price of the selected attraction
      cart_item_quantity: '1' // Set the initial quantity to 1
    };
  
    this.dataService.addToCart(cartdata)
      .then(() => {
        console.log('Item added to cart successfully.');
        this.router.navigate(['/cart']);
      })
      .catch((error) => {
        console.error('Error adding item to cart:', error);
      });
  }
  


  /*addToCart(
    cartID: string, 
    cartUserID: string, 
    attractionID: string, 
    attractionName: string, 
    attractionPrice: string, 
    attractionQuantity: string
    ) {
    // this.cartdata.cart_item_name = cart_item_name;
    // this.cartdata.cart_item_price = cart_item_price;
    const cartItem: CartData = {
      cart_id: cartID,
      cart_user_id: cartUserID,
      cart_item_id: attractionID,
      cart_item_name: attractionName,
      cart_item_price: attractionPrice,
      cart_item_quantity: attractionQuantity
    };

    this.dataService.addToCart(cartItem)
      .then(() => {
        console.log('Attraction added to cart successfully');
      })
      .catch(error => {
        console.error('Error adding attraction to cart:', error);
      });
    // this.dataService.addToCart(cart_item_name, cart_item_price);

    this.router.navigate(['/cart']);
  }*/

  // addToCart() {
  //   const attdata: AttData = {
  //     att_id: 'attdata_id',
  //     att_name: 'attdata_name',
  //     att_price: 'attdata_price',
  //     att_desc: 'attdata_desc',
  //     att_qty: 'attdata_quantity',
  //     att_openHrs: 'attdata_opening_hours',
  //     att_closeHrs: 'attdata_closing_hours',
  //     att_location: 'attdata_location',
  //     att_image: 'attdata_image'
  //   };
  

  // addToCart(attdata: any) {
  //   const cartItem: CartData = {
  //     cart_id: '', // Generate a unique ID for the cart item
  //     cart_user_id: '', // Set the user ID based on your authentication logic
  //     cart_item_id: attdata.att_id,
  //     cart_item_name: attdata.att_name,
  //     cart_item_price: attdata.att_price,
  //     cart_item_quantity: attdata.att_qty
  //   };
  
  //   this.dataService.addToCart(cartItem)
  //     .then(() => {
  //       // Cart item added successfully
  //       // Optionally, you can show a success message or perform additional actions
  //       this.router.navigate(['/cart']);
  //     })
  //     .catch((err: any) => {
  //       // Error occurred while adding the cart item
  //       // Handle the error, show an error message, or perform fallback actions
  //     });
  // }
  
  
}
