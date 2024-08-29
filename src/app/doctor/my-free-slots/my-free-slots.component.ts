import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../../Services/doctors.service';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-my-free-slots',
  templateUrl: './my-free-slots.component.html',
  styleUrl: './my-free-slots.component.css',
})
export class MyFreeSlotsComponent implements OnInit {
  doctorData: any;
  id!: string;
  freeSlots: any;

  selectedSlot: any;
  showUpdatePopup: boolean = false;
  notificationMessage: string | null = null;
  confirmMessage: string = '';

  constructor(
    private _doctorService: DoctorsService,
    private _authService: AuthService
  ) {}

  ngOnInit() {
    const decodedToken = this._authService.getDecodedToken();
    if (decodedToken) {
      this.id = decodedToken.userId;
    }
  
    this._doctorService.getDoctorById(this.id).subscribe((data) => {
      this.doctorData = data;
  
      const currentTime = new Date();
  
      // Filter slots and remove past ones from the database
      this.freeSlots = data.freeSlots.filter((slot: any) => {
        const slotDateTime = new Date(slot.date);
        const [hours, minutes] = slot.time.split(':').map(Number);
        slotDateTime.setHours(hours, minutes, 0, 0);
  
        if (slotDateTime < currentTime) {
          // Remove expired slot from the database
          this._doctorService.removeFreeSlot(this.id, slot._id).subscribe({
            next: () => {
              console.log(`Expired slot with ID ${slot._id} removed from database.`);
            },
            error: (err) => {
              console.error(`Error removing slot with ID ${slot._id}:`, err);
            }
          });
          return false; // Exclude this slot from the freeSlots array
        }
  
        return true; // Include future slots
      });
    });
  }
  
  
  

  pageSize = 3; 
  currentPage = 1;

  get pagedSlots() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.freeSlots.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.freeSlots.length / this.pageSize);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

   // Delete slots
   showConfirmPopup: boolean = false;
   slotToDelete: any;
   initiateDelete(id: any): void {
     this.slotToDelete = id;
     this.showConfirmPopup = true;
     this.confirmMessage = `Are you sure you want to delete this slot?`;

   }
   deleteSlot(){
    if (this.slotToDelete !== undefined) {
      let index = this.slotToDelete + (this.currentPage - 1) * this.pageSize;

       this._doctorService.removeFreeSlot(this.id, this.freeSlots[index]._id).subscribe({
         next: () => {
           this.showConfirmPopup = false;
           this.notificationMessage = 'slot deleted successfully!';
           setTimeout(() => this.notificationMessage = null, 2000); 
           this.freeSlots.splice(index, 1);
           this.slotToDelete = null;

         },
         error: () => {
           this.notificationMessage = 'Error deleting doctor.';
           setTimeout(() => this.notificationMessage = null, 2000); 
         }
       });
     }
   }
   cancelDelete(): void {
     this.showConfirmPopup = false;
     this.slotToDelete = null;
   }
 
}
