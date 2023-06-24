import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { AttData } from '../model/att-data';
import { DataService } from '../shared/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit, OnDestroy {
  attdataList: AttData[] = [];
  carousel!: HTMLElement;
  leftBtn!: HTMLElement;
  rightBtn!: HTMLElement;
  indicators!: NodeListOf<Element>;
  leftBtn1!: HTMLElement;
  rightBtn1!: HTMLElement;
  leftBtn2!: HTMLElement;
  rightBtn2!: HTMLElement;
  span = 1364;
  prv = 0;
  currentIndex = 0;
  isMobile = false;
  timer: any;

  constructor(private elRef: ElementRef, private dataService: DataService,private router: Router) {}

  ngOnInit() {
    this.carousel = this.elRef.nativeElement.querySelector('.carousel');
    this.leftBtn = this.elRef.nativeElement.querySelector('.leftbtn');
    this.rightBtn = this.elRef.nativeElement.querySelector('.rightbtn');
    this.indicators = this.elRef.nativeElement.querySelectorAll('.indicator');
    this.leftBtn1 = this.elRef.nativeElement.querySelector('.leftbtn1');
    this.rightBtn1 = this.elRef.nativeElement.querySelector('.rightbtn1');
    this.leftBtn2 = this.elRef.nativeElement.querySelector('.leftbtn2');
    this.rightBtn2 = this.elRef.nativeElement.querySelector('.rightbtn2');

    for (let i = 0; i < this.indicators.length; i++) {
      this.indicators[i].addEventListener('click', () => {
        this.clearActive(this.currentIndex);
        this.executeMove(i);
        this.currentIndex = i;
        this.indicators[i].classList.add('active');
      });
    }

    this.leftBtn.addEventListener('click', () => {
      this.moveSlide('left');
    });

    this.rightBtn.addEventListener('click', () => {
      this.moveSlide('right');
    });

    this.leftBtn1.addEventListener('click', () => {
      this.moveSlide('left');
    });

    this.rightBtn1.addEventListener('click', () => {
      this.moveSlide('right');
    });

    this.leftBtn2.addEventListener('click', () => {
      this.moveSlide('left');
    });

    this.rightBtn2.addEventListener('click', () => {
      this.moveSlide('right');
    });

    window.addEventListener('resize', () => {
      this.checkIfMobile();
      this.span = this.carousel.offsetWidth;
      const mov = this.currentIndex * this.span;
      this.carousel.animate(
        [
          { transform: `translateX(-${this.prv}px)` },
          { transform: `translateX(-${mov}px)` }
        ],
        { duration: 300 }
      );
      this.carousel.style.transform = `translateX(-${mov}px)`;
      this.prv = mov;
    });

    this.startAutoSlide();
    this.getTwoAttractions();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  getTwoAttractions() {
    this.dataService.getAllAttractions().subscribe(
      (res: any) => {
        this.attdataList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.att_id = e.payload.doc.id;
          return data;
        }).filter((attraction: AttData) => {
          return attraction.att_name === 'Penang Botanic Gardens' || attraction.att_name === 'Penang Hill';
        }).slice(0, 2);
  
        // Manually assign image URLs for the attractions
        this.attdataList.forEach((attraction: AttData) => {
          if (attraction.att_name === 'Penang Botanic Gardens') {
            attraction.att_image = 'https://apicms.thestar.com.my/uploads/images/2021/04/30/1119173.jpg'; 
          } else if (attraction.att_name === 'Penang Hill') {
            attraction.att_image = 'https://media2.malaymail.com/uploads/articles/2018/2018-11/2111_SZ_penang_hill1.jpg';
          }
        });
      },
      (err: any) => {
        console.error('Error while fetching attractions:', err);
      }
    );
  }


  clearActive(current: number) {
    for (let i = 0; i < this.indicators.length; i++) {
      this.indicators[i].classList.remove('active');
    }
  }

  executeMove(index: number) {
    const mov = index * this.span;
    this.carousel.animate(
      [
        { transform: 'translateX(-' + this.prv + 'px)' },
        { transform: 'translateX(-' + mov + 'px)' }
      ],
      { duration: 300 }
    );
    this.carousel.style.transform = 'translateX(-' + mov + 'px)';
    this.prv = mov;
  }

  moveSlide(dir: string) {
    this.stopAutoSlide();

    if (dir === 'right') {
      this.currentIndex++;
    } else {
      this.currentIndex--;
    }

    if (this.currentIndex < 0) {
      this.currentIndex = this.indicators.length - 1;
    }

    if (this.currentIndex > this.indicators.length - 1) {
      this.currentIndex = 0;
    }

    this.clearActive(this.currentIndex);
    this.executeMove(this.currentIndex);
    this.indicators[this.currentIndex].classList.add('active');

    this.startAutoSlide();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth < 767;
  }

  startAutoSlide() {
    this.timer = setInterval(() => {
      this.moveSlide('right');
    }, 5000); 
  }

  stopAutoSlide() {
    clearInterval(this.timer);
  }

  redirectToAttractionDashboardComponent(attdata: AttData): void {
    const { att_id, att_name, att_desc, att_openHrs, att_closeHrs, att_price, att_location } = attdata;
    this.router.navigate(['/attraction-dashboard'], {
      state: {
        att_id,
        att_name,
        att_desc,
        att_openHrs,
        att_closeHrs,
        att_price,
        att_location
      }
    });
  }
}
